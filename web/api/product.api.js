import { supabase } from "../supabase/service.js";

export default function productApiEndPoints(app, shopify) {
    app.get("/api/products", async (req, res) => {
        const body = req.body;
        const { session } = res.locals.shopify;
        try {
            const { data, error } = await supabase
                .from('gift_products')
                .insert({
                    shop: session?.shop,
                    product_id: body?.productId,
                    variant_id: body?.id,
                    variant_title: body?.title,
                    product_title: body?.productTitle,
                    handle: body?.handle,
                    price: body?.price.amount,
                    price_currency: body?.price.currencyCode,
                    image_alt: body?.image.altText,
                    image_url: body?.image.url
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
            const {body: {data: {productVariants: {edges}}}} = await client.query({
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
            console.log(edges)
            res.status(200).send(edges);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })

}
