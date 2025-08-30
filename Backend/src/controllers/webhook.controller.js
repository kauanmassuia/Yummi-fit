import logger from '../utils/logger.js';
import { handleIncoming } from '../services/whatsapp.service.js';

export function verifyHub(req, res) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === process.env.META_WA_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
}

export async function receiveWebhook(req, res, next) {
  try {
    // responder 200 rápido
    res.sendStatus(200);
    const body = req.body;
    if (!body?.entry?.length) return;

    for (const entry of body.entry) {
      for (const change of entry.changes || []) {
        const value = change.value;
        const messages = value.messages || [];
        for (const msg of messages) {
          await handleIncoming(value, msg);
        }
      }
    }
  } catch (err) {
    logger.error({ err }, 'Webhook error');
    next(err);
  }
}
