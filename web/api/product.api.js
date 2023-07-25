import { supabase } from "../supabase/service.js";

export default function productApiEndPoints(app, shopify) {
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
        try {
            const { data, error } = await supabase
                .from('gift_products')
                .insert({
                    shop: session?.shop,
                    variant_id: body?.id,
                    title: body?.title,
                    display_name: body?.displayName,
                    inventory_quantity: body?.inventoryQuantity,
                    price: body?.price
                })
                .select()
            if (error) throw new Error(error.message)
            res.status(200).send(data[0]);
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

    async function createDiscount(client) {
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

    app.post("/api/products/update-metafield", async (req, res) => {
        const { query } = req.body;
        const { session } = res.locals.shopify;
        try {
            const client = new shopify.api.clients.Graphql({ session });
            const result = await client.query({
                data: {
                    "query": `mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
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
                    "variables": {
                        "metafields": [
                            {
                                "key": "function-configuration",
                                "namespace": "volume-discount",
                                "ownerId": "gid://shopify/DiscountAutomaticNode/1396167246104",
                                "value": `{ \"threshold\": 8000, \"giftsId\": [
                                        \"gid://shopify/ProductVariant/45509861671192\",
                                        \"gid://shopify/ProductVariant/45509861671192\",
                                        \"gid://shopify/ProductVariant/45509861671192\"
                                ] }`,
                                "type": "json"
                            }
                        ]
                    },
                },
            });
            res.status(200).send(result);
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
            res.status(200).send(data[0]);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })

    app.put("/api/products/discounts/:id", async (req, res) => {
        const body = req.body;
        console.log(body, req.params.id)
        const { session } = res.locals.shopify;

        try {

            const { data, error } = await supabase
                .from('gift_discounts')
                .update({ amount: +body?.amount })
                .eq('id', req.params.id)
                .select()
            console.log(error)
            if (error) throw new Error(error.message)
            res.status(200).send(data[0]);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })

}