import { Router } from 'express';
import webhookRoutes from './webhook.routes.js';
import waRoutes from './wa.routes.js';
import statsRoutes from './stats.routes.js';
import billingRoutes from './billing.routes.js';
import authRoutes from './auth.routes.js';
import kiwifyRoutes from "./kiwify.routes.js";

const router = Router();

// Whatsapp
router.use('/webhook', webhookRoutes);
router.use('/wa', waRoutes);
router.use('/stats', statsRoutes);
router.use('/billing', billingRoutes);
router.use('/auth', authRoutes);

// Kiwify
router.use("/webhooks", kiwifyRoutes);    // expõe POST /api/v1/webhooks/kiwify


export default router;
