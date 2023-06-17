// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import 'dotenv/config'
import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import { billingApiEndPoints, BILLING_PLANS } from "./billing.js";

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || '',
);

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// Supabase API
app.get("/billings", async (_req, res) => {

  // const { data, error } = await supabase
  //   .from('plans')
  //   .insert([
  //     { 
  //       shop_id: 'example.myshopify.com', 
  //       plan_id: '1233',
  //       plan_name: 'Basic Plan',
  //     },
  //   ])

  // if (error) {
  //   console.log('Error', error)
  //   res.status(402).send({ success: false });
  // } else {
  //   console.log('data:', data)
  //   res.status(200).send({ success: true });
  // }

  res.status(200).send({ success: true });

});

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js
app.use("/api/*", shopify.validateAuthenticatedSession());
app.use(express.json());

// api to insert to supabase database reading from req body
app.post("/api/cart-items", async (req, res) => {
  const body = req.body;
  const session = res.locals.shopify.session;
  console.log(body)
  try {
    const { data, error } = await supabase
      .from('card_items')
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
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});


// // Billing API
// app.post("/api/billings", async (req, res, next) => {
//   const session = res.locals.shopify.session;
//   const id = req.body.id;
//   // Find the plan that matches the id
//   const plan = BILLING_PLANS.find((plan) => plan.id === id);
//   const client = new shopify.api.clients.Graphql({ session });


//   // Create a new recurring application charge with graghql
//   const response = await client.query({
//     data: `mutation {
//       appSubscriptionCreate(
//         name: "${plan?.name}",
//         returnUrl: "${ process.env.HOST }/billings?shop=${ session.shop }&host=${ session.shop }",
//         test: true,
//         lineItems: [
//           {
//             plan: {
//               appRecurringPricingDetails: {
//                 price: { amount: ${plan?.amount}, currencyCode: USD }
//                 interval: EVERY_30_DAYS
//               }
//             }
//           }
//         ]
//       ) {
//         userErrors {
//           field
//           message
//         }
//         confirmationUrl
//         appSubscription {
//           id
//         }
//       }
//     }`,
//  });

//   return res.status(200).send({
//     data: response?.body?.data?.appSubscriptionCreate,
//     status: response?.body?.data?.appSubscriptionCreate.userErrors.length > 0 ? 'error' : 'success'
//   });

// });

billingApiEndPoints(app, shopify)
app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});


app.listen(PORT);
