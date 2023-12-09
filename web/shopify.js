import { BillingInterval, LATEST_API_VERSION, ApiVersion } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";

import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";
const DB_PATH = `${process.cwd()}/db.sqlite`;

import { getBillingConfig } from "./billing.js"
import { PostgresSessionStorage } from "./postgresSessionStorage.js";

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, stat } from 'fs/promises';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function logDirectoryStructure(dir, prefix = '') {
  const files = await readdir(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stats = await stat(filePath);

    console.log(prefix + file);

    // If the file is a directory, recurse into it
    if (stats.isDirectory()) {
      await logDirectoryStructure(filePath, prefix + '  ');
    }
  }
}

// Use __dirname to reference the directory where the current file is located
logDirectoryStructure(__dirname).catch(console.error);

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
