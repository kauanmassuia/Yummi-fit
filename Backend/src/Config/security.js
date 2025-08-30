import rateLimit from 'express-rate-limit';

export default function security(app) {
  const limiter = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
    max: Number(process.env.RATE_LIMIT_MAX || 120)
  });
  app.use(limiter);
}
