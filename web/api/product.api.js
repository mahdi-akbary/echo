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
    // app.post("/api/products/search", async (req, res) => {
    //     const { query } = req.body;
    //     const { session } = res.locals.shopify;
    //     try {
    //         const client = new shopify.api.clients.Graphql({ session });
    //         const {body: {data: {productVariants: {edges}}}} = await client.query({
    //             data: `query {
    //                     productVariants(first: 10, query:"${query}" ) {
    //                     edges {
    //                         node {
    //                             id
    //                             title
    //                             displayName
    //                             price
    //                             inventoryQuantity
    //                         }
    //                     }
    //                 }
    //             }`,
    //         });
    //         console.log(edges)
    //         res.status(200).send(edges);
    //     } catch (error) {
    //         console.error(error)
    //         res.status(500).send(error);
    //     }
    // })

    // app.post("/api/products/search", async (req, res) => {
    //     const { query } = req.body;
    //     const { session } = res.locals.shopify;
    //     try {
    //         const client = new shopify.api.clients.Graphql({ session });
    //         const result = await client.query({
    //             data: {
    //                 query: `mutation {
    //                     discountAutomaticAppCreate(automaticAppDiscount: {
    //                       title: "Volume discount",
    //                       functionId: "01H60XKG5130S7YRH2BS7JZ995",
    //                       startsAt: "2022-06-22T00:00:00"
    //                     }) {
    //                        automaticAppDiscount {
    //                         discountId
    //                        }
    //                        userErrors {
    //                         field
    //                         message
    //                        }
    //                     }
    //                   }`,
    //             },
    //         })
    //         res.status(200).send(result);
    //     } catch (error) {
    //         console.error(error)
    //         res.status(500).send(error);
    //     }
    // })

    app.post("/api/products/search", async (req, res) => {
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

            // const result = await client.query({
            //     data: {
            //         query: `mutation {
            //             discountAutomaticAppUpdate(
            //               id: "gid://shopify/DiscountAutomaticNode/1396167246104",
            //               automaticAppDiscount: {
            //                 metafields: [
            //                   {
            //                     namespace: "volume-discount"
            //                     key: "function-configuration"
            //                     value: "{ \\"threshold\\": 8000, \\"giftsId\\": [
            //                         \\"gid://shopify/ProductVariant/45509861671192\\",
            //                         \\"gid://shopify/ProductVariant/45509861671192\\",
            //                         \\"gid://shopify/ProductVariant/45509861671192\\"
            //                     ] }"
            //                     type: "json"
            //                   }
            //                 ]
            //               }
            //           ) {
            //               metafields {
            //                 id
            //               }
            //               userErrors {
            //                 field
            //                 message
            //               }
            //             }
            //           }`,
            //     },
            // })
            res.status(200).send(result);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })

}