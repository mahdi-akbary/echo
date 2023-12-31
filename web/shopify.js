import { BillingInterval, LATEST_API_VERSION, ApiVersion } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";

import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";
const DB_PATH = `${process.cwd()}/db.sqlite`;

import { getBillingConfig } from "./billing.js"
import { PostgresSessionStorage } from "./postgresSessionStorage.js";

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.

console.log('LATEST_API_VERSION', ApiVersion);

const shopify = shopifyApp({
  api: {
    apiVersion: '2023-10',
    restResources,
    billing: getBillingConfig(), // or replace with billingConfig above to enable example billing
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  // This should be replaced with your preferred storage strategy
  sessionStorage: new PostgresSessionStorage()
});

export default shopify;
