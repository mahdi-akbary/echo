import { supabase } from "../supabase/service.js";

export default function surveyApiEndPoints (app) {
    app.post("/api/surveys", async (req, res) => {
        const body = req.body;
        const { session } = res.locals.shopify;
        try {
            const { data, error } = await supabase
                .from('surveys')
                .insert({
                    shop: session?.shop,
                    option: body?.option,
                    option_name: body?.option_name,
                })
                .select()
            if (error) throw new Error(error.message)
            res.status(200).send(data[0]);
        } catch (error) {
            console.error(error)
            res.status(500).send(error);
        }
    })

    app.get("/api/surveys/chart/count", async (req, res) => {
        try {
            const { session } = res.locals.shopify;
            const now = new Date()
            const sevenDaysAgo = new Date((new Date).setDate(now.getDate() - 7))
            const tomorrow = new Date((new Date).setDate(now.getDate() + 1))
            const { data, error } = await supabase
                .from('survey_count_view')
                .select()
                // .eq('shop', session?.shop)
            
            if (error) throw new Error(error.message)
            res.status(200).send([...data, {key: tomorrow.toISOString(), value: null}]);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    });

    app.get("/api/surveys/top", async (req, res) => {
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
