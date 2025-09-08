import logger from '../utils/logger.js';

export default function errorMiddleware(err, _req, res, _next) {
  if (res.headersSent) {
    return _next(err); // Evita envio se headers já foram enviados
  }
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ error: 'internal_error' });
}
