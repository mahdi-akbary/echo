import express from "express";
import { BILLING_PLANS, unsubscribeBilling } from "../billing.js";
import { getShopFromSession } from "../frontend/Services/HelperService.js";
import shopify from "../shopify.js";

export default function applyBillingApiEndpoints (app) {
    app.use(express.json());

    app.get("/api/billings", async (req, res) => {
        const shop = await getShopFromSession(req, res);
        const session = res.locals.shopify.session
        const plans = BILLING_PLANS
        if (subscription) {
            res.status(200).send({
                plans: plans
            })
        } else {
            res.status(200).send({
                plans: plans
            })
        }
    })
    
    app.post("/api/billings", async (req, res, next) => {
        try {
            const session = res.locals.shopify.session
            const url = await shopify.api.billing.request({
                session,
                plan: req.body.name,
                isTest: false,
            });
            res.status(200).send({ url: url });
        } catch (e) {
            console.log(`Failed to process products/create: ${e.message}`)
            res.status(500).send(e.message)
        }
    })
    app.post("/api/billings/unsubscribe", async (req, res, next) => {
        try {
            const session = res.locals.shopify.session
            const result = await unsubscribeBilling(session, req.body.subscriptionId)
            const { id, status } = result?.body?.data?.appSubscriptionCancel?.appSubscription;
            console.log()
            const isUpdated = await SubscriptionModel.updateStatus(id, { status: status })
            if (isUpdated) {
                return res.status(200).send({
                    plans: BILLING_PLANS,
                    subscription: null
                });
            }
            res.status(404).send();
        } catch (e) {
            console.log(`Failed to process products/create: ${e.message}`)
            res.status(500).send(e.message)
        }
    })
}
