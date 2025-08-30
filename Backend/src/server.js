import './config/env.js';
import { createServer } from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import logger from './utils/logger.js';

const port = process.env.PORT || 3000;

async function bootstrap() {
  await connectDB();
  const server = createServer(app);
  server.listen(port, () => logger.info({ port }, `HTTP server on ${port}`));
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
