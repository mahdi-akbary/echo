import { supabase } from "../supabase/service.js";

export default function cartItemApiEndPoints (app) {
    app.post("/api/cart-items", async (req, res) => {
        const body = req.body;
        const { session } = res.locals.shopify;
        try {
            const { data, error } = await supabase
                .from('cart_items')
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

    app.get("/api/cart-items", async (_req, res) => {
        let status = 200;
        let error = null;

        try {
            const { session } = res.locals.shopify;
        } catch (e) {
            console.log(e);
            status = 500;
            error = e.message;
        }
        res.status(status).send({ success: status === 200, error });
    });

    app.get("/api/cart-items/chart/count", async (req, res) => {
        try {
            const { session } = res.locals.shopify;
            const now = new Date()
            const sevenDaysAgo = new Date((new Date).setDate(now.getDate() - 7))
            const tomorrow = new Date((new Date).setDate(now.getDate() + 1))
            const { data, error } = await supabase
                .from('cart_item_count_view')
                .select('key, value')
                .gt('key', sevenDaysAgo.toISOString())
                .eq('shop', session?.shop)
            
            if (error) throw new Error(error.message)
            res.status(200).send([...data, {key: tomorrow.toISOString(), value: null}]);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    });

    app.get("/api/cart-items/top", async (req, res) => {
        try {
            const { session } = res.locals.shopify;
            const { data, error } = await supabase
                .from('cart_item_top_products')
                .select()
                .eq('shop', session?.shop)
                .limit(10)
            
            if (error) throw new Error(error.message)
            res.status(200).send(data);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    });

}
