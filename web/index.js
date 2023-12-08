// @ts-check
import { join } from "path"
import { readFileSync } from "fs"
import express from "express"
import serveStatic from "serve-static"
import 'dotenv/config'
import shopify from "./shopify.js"
import { applyGDPREndpoints, bodyParserPrewiring, registerCustomWebhooks } from "./gdpr.js"
import { billingApiEndPoints } from "./billing.js"
import cartItemApiEndPoints from "./api/cart-item.api.js"
import productApiEndPoints from "./api/product.api.js"
import brandingApiEndPoints from "./api/branding.api.js"
import surveyApiEndPoints from "./api/survey.api.js"
import feedbackApiEndPoints from "./api/feedback.api.js"
import cors from 'cors'
import functionApiEndPoints from "./api/function.api.js"

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
)


const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`

export const app = express()
app.use(cors())
bodyParserPrewiring(app, express)

app.get(shopify.config.auth.path, shopify.auth.begin())
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
)

app.post(
  shopify.config.webhooks.path,
  (req, res, next) => {
    req.body = req.rawBody
    next() // go on to the real webhook handler
  },
  shopify.processWebhooks(registerCustomWebhooks)
)

applyGDPREndpoints(app, express)
// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js
app.use("/api/*", shopify.validateAuthenticatedSession())
app.use(express.json())

cartItemApiEndPoints(app)
surveyApiEndPoints(app)
feedbackApiEndPoints(app)
productApiEndPoints(app, shopify)
functionApiEndPoints(app, shopify)
brandingApiEndPoints(app, shopify)
billingApiEndPoints(app, shopify)

app.use(shopify.cspHeaders())
app.use(serveStatic(STATIC_PATH, { index: false }))

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")))
})


app.listen(PORT)
