import express from 'express';
import bodyParser from 'body-parser';
import webhookRoutes from './routes/webhook.routes.js';

const app = express();

// Permitir raw body para validação HMAC
app.use(bodyParser.json({
  verify: (req, res, buf) => { req.rawBody = buf; }
}));

// Rotas do webhook
app.use('/api/v1/webhook', webhookRoutes);

export default app;
