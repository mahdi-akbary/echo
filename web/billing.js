import { GraphqlQueryError, BillingInterval } from "@shopify/shopify-api";

export const ACTIVE_STATUS = 'ACTIVE'
export const PENDING_STATUS = 'PENDING'
export const CANCELLED_STATUS = 'CANCELLED'
export const DECLINED_STATUS = 'DECLINED'
export const EXPIRE_STATUS = 'EXPIRE'

export const BILLING_PLANS = [
    {
        name: "Free",
        id: "free",
        amount: 0,
        currencyCode: "USD",
        interval: BillingInterval.Every30Days,
        description: "For small businesses",
        features: [
            "Up to 200 orders per month",
            "All features",
            "Basic support",
        ],
    },
    {
        name: "Basic",
        id: "basic",
        amount: 29,
        currencyCode: "USD",
        interval: BillingInterval.Every30Days,
        description: "For growing businesses",
        features: [
            "Up to 2000 orders per month",
            "All features",
            "Fast email support"
        ],
    },
    {
        name: "Premium",
        id: "premium",
        subheader: "Most popular",
        amount: 99,
        currencyCode: "USD",
        interval: BillingInterval.Every30Days,
        description: "For large businesses",
        features: [
            "Unlimited orders",
            "All features",
            "Priority email support",
        ],
    },
]

export const getBillingConfig = () => {
    const billing = {};
    BILLING_PLANS.forEach(plan => {
        if (plan.amount > 0) {
            billing[plan.name] = {
                amount: plan.amount,
                currencyCode: plan.currencyCode,
                interval: plan.interval,
            }
        }
    })
    return billing;
}

export const billingApiEndPoints = (app, shopify) => {
    app.get("/api/billings", async (req, res) => {
        try {
            const session = res.locals.shopify.session
            const result = await requestLastBillingGraphql(session, shopify)
            res.status(200).send(result)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    })

    app.post('/api/billings', async (req, res) => {
        try {
            const { id } = req.body
            const { name: planName, amount: planAmount } = BILLING_PLANS.find((plan) => plan.id == id);
            if (planAmount === 0) return res.status(200).send({ url: null })
            const session = res.locals.shopify.session
            const url = await shopify.api.billing.request({
                session,
                plan: planName,
                isTest: process.env.TESTMODE === 'true',
            });
            res.status(200).send({ redirectUrl: url });
        } catch (e) {
            console.error(`Failed to process billing: ${e}`)
            res.status(500).send(e)
        }
    })
    app.post("/api/billings/unsubscribe", async (req, res, next) => {
        try {
            const session = res.locals.shopify.session
            const client = new shopify.api.clients.Graphql({ session });
            const result = await client.query({
                data: {
                    query: `mutation AppSubscriptionCancel($id: ID!) {
                        appSubscriptionCancel(id: $id) {
                            userErrors {
                            field
                            message
                            }
                            appSubscription {
                            id
                            status
                            }
                    }
                    }`,
                    variables: {
                        id: req.body.subscriptionId
                    },
                },
            })
            const { status } = result?.body?.data?.appSubscriptionCancel?.appSubscription;
            res.status(200).send();
        } catch (e) {
            console.error(`Failed to process unsubscription: ${e}`)
            res.status(500).send(e)
        }
    })
}

export const requestLastBillingGraphql = async (session, shopify) => {

    try {
        const client = new shopify.api.clients.Graphql({ session });
        const result = await client.query({
            data: QUERY_LAST_BILLING_RECORD
        })
        const [node] = result?.body?.data?.currentAppInstallation?.activeSubscriptions


        if (node) {
            const [{ lineItems: [{ plan }] }] = result?.body?.data?.currentAppInstallation?.activeSubscriptions
            return { ...node, amount: plan?.pricingDetails?.price?.amount }
        }
        return {}
    } catch (error) {
        if (error instanceof GraphqlQueryError) {
            throw new Error(
                `${error.message}\n${JSON.stringify(error.response, null, 2)}`
            );
        } else {
            throw error;
        }
    }
}

const QUERY_LAST_BILLING_RECORD = `
query {
  currentAppInstallation {
    activeSubscriptions {
        lineItems {
        plan {
            pricingDetails {
            __typename
            ... on AppRecurringPricing {
                price {
                amount
                currencyCode
                }
            }
            ... on AppUsagePricing {
                balanceUsed {
                amount
                currencyCode
                }
                cappedAmount {
                amount
                currencyCode
                }
            }
            }
        }
        }
        createdAt
        id
        name
        status
        currentPeriodEnd
        trialDays
        test
    }
  }
}`
