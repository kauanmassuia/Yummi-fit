import { Router } from 'express';
import { sendTextController, sendTemplateController } from '../controllers/wa.controller.js';

const router = Router();
router.post('/send-text', sendTextController);
router.post('/send-template', sendTemplateController);
export default router;
