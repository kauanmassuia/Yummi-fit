import logger from '../utils/logger.js';
export default function errorMiddleware(err, _req, res, _next) {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ error: 'internal_error' });
}
