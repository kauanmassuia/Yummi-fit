import { Router } from 'express';
import { overviewToday } from '../controllers/stats.controller.js';

const router = Router();
router.get('/overview', overviewToday);
export default router;
