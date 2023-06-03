import { GraphqlQueryError, BillingInterval } from "@shopify/shopify-api";

export const BILLING_PLANS = [
    {
        name: "Free plan",
        amount: "0",
        currencyCode: "USD",
        interval: BillingInterval.Every30Days,
        description: "For small businesses",
        features: [
            "Up to 200 orders per month",
            "Countdown timer",
            "Product recommendations",
            "Trust badges",
            "Custom image banner",
            "Basic support",
        ],
    },
    {
        name: "Basic",
        amount: "$29.99",
        currencyCode: "USD",
        interval: BillingInterval.Every30Days,
        description: "For growing businesses",
        features: [
            "Up to 2000 orders per month",
            "Countdown timer",
            "Product recommendations",
            "Trust badges",
            "Custom image banner",
            "Fast email support"
        ],
    },
    {
        name: "Premium",
        subheader: "Most popular",
        amount: "$59.99",
        currencyCode: "USD",
        interval: BillingInterval.Every30Days,
        description: "For large businesses",
        features: [
            "Unlimited orders",
            "Countdown timer",
            "Product recommendations",
            "Trust badges",
            "Custom image banner",
            "Priority email support",
        ],
    },
]

export const getBillingConfig = () => {
  const billing = {};
  BILLING_PLANS.forEach(plan => {
    billing[plan.name] = {
      amount: plan.amount,
      currencyCode: plan.currencyCode,
      interval: plan.interval,
    }
  })
  return billing;
}