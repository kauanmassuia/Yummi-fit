import { sendText, sendTemplate } from '../services/whatsapp.service.js';

export async function sendTextController(req, res, next) {
  try {
    const { to, body } = req.body;
    const result = await sendText(to, body);
    res.json(result);
  } catch (e) { next(e); }
}

export async function sendTemplateController(req, res, next) {
  try {
    const { to, name, language = 'en_US', components } = req.body;
    const result = await sendTemplate(to, name, language, components);
    res.json(result);
  } catch (e) { next(e); }
}
