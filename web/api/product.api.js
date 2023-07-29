import { supabase } from "../supabase/service.js";

export default function productApiEndPoints (app, shopify) {
    app.get("/api/products", async (req, res) => {
        const { session } = res.locals.shopify;
        try {
            const { data, error } = await supabase
                .from('gift_products')
                .select()
                .eq('shop', session?.shop)
            if (error) throw new Error(error.message)
            res.status(200).send(data);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })
    app.post("/api/products", async (req, res) => {
        const body = req.body;
        const { session } = res.locals.shopify;
        const client = new shopify.api.clients.Graphql({ session });
        try {
            const { data: exists, error: existsError } = await supabase
                .from('gift_products')
                .select()
                .eq('shop', session?.shop)
                .eq('variant_id', body?.id)
            if (existsError) throw new Error(existsError.message)
            if (exists?.length > 0) throw new Error('Already exists!')
            const { data, error } = await supabase
                .from('gift_products')
                .insert({
                    shop: session?.shop,
                    variant_id: body?.id,
                    title: body?.title,
                    display_name: body?.displayName,
                    inventory_quantity: body?.inventoryQuantity,
                    price: body?.price,
                    image_url: body?.image?.url || body?.product?.featuredImage?.url
                })
                .select()
            if (error) throw new Error(error.message)

            await setMetaFields(client, body?.discountId, session?.shop, body?.discountAmount)
            res.status(200).send(data[0]);
        } catch (error) {
            console.error(error)
            res.status(500).send({message: error.message});
        }
    })
    app.delete("/api/products/:id", async (req, res) => {
        try {
            const { data, error } = await supabase
                .from('gift_products')
                .delete()
                .eq('id', req.params.id)
            if (error) throw new Error(error.message)
            res.status(200).send(data);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })
    app.post("/api/products/search", async (req, res) => {
        const { query } = req.body;
        const { session } = res.locals.shopify;
        try {
            const client = new shopify.api.clients.Graphql({ session });
            const { body: { data: { productVariants: { edges } } } } = await client.query({
                data: `query {
                        productVariants(first: 10, query:"${query}" ) {
                        edges {
                            node {
                                id
                                title
                                displayName
                                price
                                inventoryQuantity
                                image {
                                    url
                                }
                                product {
                                    id
                                    status
                                    featuredImage {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }`,
            });
            res.status(200).send(edges);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })

    app.get("/api/products/discounts", async (req, res) => {
        const { session } = res.locals.shopify;
        try {
            const { data, error } = await supabase
                .from('gift_discounts')
                .select()
                .eq('shop', session?.shop)
            if (error) throw new Error(error.message)
            res.status(200).send(data[0]);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })
    app.post("/api/products/discounts", async (req, res) => {
        const body = req.body;
        const { session } = res.locals.shopify;

        try {

            const client = new shopify.api.clients.Graphql({ session });
            const { body: { data: { discountAutomaticAppCreate: { automaticAppDiscount } } } } = await createDiscount(client)
            if (automaticAppDiscount == null) {
                throw new Error(`Can't create discount on shopify!`);
            }
            const { data, error } = await supabase
                .from('gift_discounts')
                .insert({
                    shop: session?.shop,
                    amount: body?.amount,
                    discount_id: automaticAppDiscount.discountId
                })
                .select()
            if (error) throw new Error(error.message)

            const giftDiscount = data[0]
            await setMetaFields(client, automaticAppDiscount.discountId, session?.shop, giftDiscount.amount)
            res.status(200).send(giftDiscount);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })

    app.put("/api/products/discounts/:id", async (req, res) => {
        const body = req.body;
        console.log(body, req.params.id)
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

            await setMetaFields(client, body?.discountId, session?.shop, giftDiscount.amount)
            res.status(200).send(giftDiscount);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })

    async function createDiscount (client) {
        return await client.query({
            data: {
                query: `mutation {
                    discountAutomaticAppCreate(automaticAppDiscount: {
                        title: "Gift discount",
                        functionId: "${process.env.SHOPIFY_PRODUCT_DISCOUNT_ID}",
                        startsAt: "2022-06-22T00:00:00"
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
    async function setMetaFields (client, discountId, shop, amount = null) {

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
