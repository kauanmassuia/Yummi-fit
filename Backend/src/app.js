import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import pino from 'pino';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/error.js';
import security from './config/security.js';

const app = express();

// Configuração do logger com pino-pretty
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, // cores no console
      translateTime: 'SYS:standard', // formata timestamps
      ignore: 'pid,hostname', // opcional: ignora pid e hostname
    },
  },
});

app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(pinoHttp({ logger })); // substitui morgan

security(app);

app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

app.use('/api/v1', routes);

app.use(errorMiddleware);

export default app;
