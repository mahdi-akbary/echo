import crypto from "crypto";
import shopify from "./shopify.js";

export const validateWebhookRequest = async (req, res, next) =>  {
    try {
        const hmac = req.header('X-Shopify-Hmac-Sha256')
        const topic = req.header('X-Shopify-Topic')
        const shop = req.header('X-Shopify-Shop-Domain')
        if (!hmac || !topic || !shop) {
            res.send({})
            return
        }
        const secret = shopify.api.config.apiSecretKey
        if (!secret) {
            throw Error('Check logs.')
        }

        const generatedHash = crypto
			  .createHmac("sha256", secret)
			  .update(JSON.stringify(req.body), "utf8")
			  .digest("base64");

        if (generatedHash !== hmac) {
            console.log('hmac validation failed')
            res.status(401).send({})
            return
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(403).send({})
    }
}
