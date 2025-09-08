// app.js (trechos relevantes)
import express from 'express';
import bodyParser from 'body-parser';
import webhookRoutes from './routes/webhook.routes.js';

const app = express();

<<<<<<< HEAD
// Permitir raw body para validação HMAC
app.use(bodyParser.json({
  verify: (req, res, buf) => { req.rawBody = buf; }
}));

// Rotas do webhook
app.use('/api/v1/webhook', webhookRoutes);
=======
// Configuração do logger com pino-pretty
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, // cores no console
      translateTime: 'SYS:standard', // formata timestamps
      ignore: 'pid,hostname' } // opcional: ignora pid e hostname
    },
});

app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(pinoHttp({ logger }));

security(app);

app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

// Rotas internas da sua API
app.use('/api/v1', routes);

app.use(errorMiddleware);
>>>>>>> origin/prog/webhook-kiwify

export default app;
