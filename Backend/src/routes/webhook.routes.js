import { Router } from 'express';
import { verifyHub, receiveWebhook } from '../controllers/webhook.controller.js';
import verifyMetaSignature from '../middlewares/verifyMetaSignature.js';

const router = Router();

// GET para validação hub.challenge
router.get('/', verifyHub);

// POST para eventos (mensagens/status)
router.post('/', verifyMetaSignature, receiveWebhook);

export default router;
