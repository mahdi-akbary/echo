import shopify from "./shopify.js"
import { validateWebhookRequest } from "./validateWebhookRequest.js";
import { DeliveryMethod } from "@shopify/shopify-api";
import { supabase } from "./supabase/service.js";

export const bodyParserPrewiring = (server, express) => {
  // save a raw (unprocessed) version of 'body' to 'rawBody'
  function parseVerify(req, res, buf, encoding) {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8')
    }

  }
  server.use(express.json({
    verify: parseVerify,
    limit: '10mb'
  }));

  server.use(express.urlencoded({
    extended: true,
    verify: parseVerify,
    limit: '10mb'
  }));
}

export function applyGDPREndpoints(app, express) {
  app.use(express.json());

  app.post(
    `${shopify.config.webhooks.path}/customers/data_request`,
    validateWebhookRequest,
    async (req, res) => {
      const { customer, shop_domain } = req.body;
      res.status(200).json({});
    })

  app.post(
    `${shopify.config.webhooks.path}/customers/redact`,
    validateWebhookRequest,
    async (req, res) => {
      const { customer, shop_domain } = req.body;
      res.status(200).json({});
    })

  app.post(
    `${shopify.config.webhooks.path}/shop/redact`,
    validateWebhookRequest,
    async (req, res) => {
      res.status(200).json({});
    })
}


export const registerCustomWebhooks = {
  webhookHandlers: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/api/webhooks",
      callback: async (topic, shop, body, webhookId) => {
        await supabase
          .from('gift_discounts')
          .delete()
          .eq('shop', shop)
        console.info('APP Removed**************************************')
      },
    }
  }
}
