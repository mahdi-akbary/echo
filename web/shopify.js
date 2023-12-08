import { BillingInterval, LATEST_API_VERSION, ApiVersion } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import {PostgreSQLSessionStorage} from '@shopify/shopify-app-session-storage-postgresql';

import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";
const DB_PATH = `${process.cwd()}/db.sqlite`;

import { getBillingConfig } from "./billing.js"

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
  sessionStorage: new PostgreSQLSessionStorage(
    'postgres://default:oAqP7JpmdXc5@ep-jolly-voice-76934282.us-east-1.postgres.vercel-storage.com:5432/verceldb?ssl=true',
  ),
});

export default shopify;
