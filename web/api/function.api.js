import { supabase } from "../supabase/service.js";

const DISCOUNT_NAME = "Checkout_Automatic_Gift_Discount"
const DISCOUNT_TYPE = "DiscountAutomaticApp"

export default function functionApiEndPoints(app, shopify) {

    app.post("/api/functions", async (req, res) => {
        const body = req.body;
        const { session } = res.locals.shopify;

        try {

            /**  
             * 1- check whether the function exist eg queryAutomaticDiscountAppGraphql()
             * 2- if not > create the function with function extension ID
             * 3- the funtion should be applied to all 
            */

            const client = new shopify.api.clients.Graphql({ session });
            const { body: { data: { discountNodes: { edges } } } } =
                await queryAutomaticDiscountAppGraphql(client)

            let isAutomaticDiscountExistsOnShopify = false
            let existingAutomaticDiscountId = null
            edges.forEach(edge => {
                const { node: { discount: { status, title, __typename: type }, id } } = edge
                if (title === DISCOUNT_NAME) {
                    isAutomaticDiscountExistsOnShopify = true
                    existingAutomaticDiscountId = id
                }
            });

            let discountData = {
                shop: session.shop,
                amount: body?.amount,
                discountId: existingAutomaticDiscountId
            }

            if (!isAutomaticDiscountExistsOnShopify && existingAutomaticDiscountId == null) {
                const { body: { data: { discountAutomaticAppCreate: { automaticAppDiscount, userErrors } } } } =
                    await createDiscountGraphQl(client)

                if (automaticAppDiscount == null) {
                    console.error(userErrors)
                    throw new Error(`Can't create discount on shopify! ` + userErrors.message);
                }
                discountData.discountId = automaticAppDiscount.discountId
            }

            const { data, error } = await dbInsertDiscount(discountData)
            if (error) throw new Error(error.message)
            const giftDiscount = data[0]
            await setMetaFields(client, discountData)
            res.status(200).send(giftDiscount);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })

    async function queryAutomaticDiscountAppGraphql(client) {
        return await client.query({
            data: ` {
                discountNodes (first: 10) {
                    edges {
                      node {
                            id
                            discount {
                                __typename
                                ... on DiscountAutomaticApp {
                                    status
                                    title
                                }
                            }
                        }
                    }
                }
            }`,
        });
    }
    async function dbInsertDiscount({ shop, amount, discountId }) {
        return await supabase
            .from('gift_discounts')
            .insert({
                shop: shop,
                amount: amount,
                discount_id: discountId
            })
            .select()
    }

    app.put("/api/products/discounts/:id", async (req, res) => {
        const body = req.body;
        const { session } = res.locals.shopify;
        const client = new shopify.api.clients.Graphql({ session });
        try {
            const { data, error } = await supabase
                .from('gift_discounts')
                .update({ amount: +body?.amount })
                .eq('id', req.params.id)
                .select()
            if (error) throw new Error(error.message)
            const giftDiscount = data[0]

            await setMetaFields(client, {
                shop: session?.shop,
                amount: giftDiscount.amount,
                discountId: body?.discountId
            })
            res.status(200).send(giftDiscount);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })

    async function createDiscountGraphQl(client) {
        return await client.query({
            data: {
                query: `mutation {
                    discountAutomaticAppCreate(automaticAppDiscount: {
                        title: "${DISCOUNT_NAME}",
                        functionId: "${process.env.SHOPIFY_PRODUCT_DISCOUNT_ID}",
                        startsAt: "${new Date().toISOString()}"
                    }) {
                        automaticAppDiscount {
                            discountId
                        }
                        userErrors {
                            field
                            message
                        }
                    }
                }`,
            },
        })
    }

    async function setMetaFields(client, { shop, amount, discountId }) {

        const { data, error } = await supabase
            .from('gift_products')
            .select()
            .eq('shop', shop)
        if (error) throw new Error(error.message)

        const value = {
            threshold: amount,
            giftsId: data?.map(item => item?.variant_id)
        }
        return await client.query({
            data: {
                query: `mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
                    metafieldsSet(metafields: $metafields) {
                        metafields {
                            key
                            namespace
                            value
                            createdAt
                            updatedAt
                        }
                        userErrors {
                            field
                            message
                            code
                        }
                    }
                }`,
                variables: {
                    metafields: [
                        {
                            key: "gift-function-configuration",
                            namespace: "gift-discount",
                            ownerId: discountId,
                            value: JSON.stringify(value),
                            type: "json"
                        }
                    ]
                },
            },
        });
    }
}
