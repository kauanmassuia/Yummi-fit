import axios from 'axios';
import { WA_BASE_URL } from '../config/whatsapp.js';
import logger from '../utils/logger.js';
import { ensureConversationAndDebitIfNeeded } from './credits.service.js';
import { analyzeAndReply } from './recipe.service.js';
import Message from '../models/Message.js';

const ACCESS_TOKEN = process.env.META_WA_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.META_WA_PHONE_NUMBER_ID;

function headers() {
  return {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  };
}

export async function sendText(to, text) {
  const url = `${WA_BASE_URL}/${PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: text, preview_url: false }
  };
  const { data: resp } = await axios.post(url, data, { headers: headers() });
  return resp;
}

export async function sendTemplate(to, name, language = 'en_US', components = []) {
  const url = `${WA_BASE_URL}/${PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: { name, language: { code: language }, components }
  };
  const { data: resp } = await axios.post(url, data, { headers: headers() });
  return resp;
}

export async function sendImage(to, link) {
  const url = `${WA_BASE_URL}/${PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: 'whatsapp',
    to,
    type: 'image',
    image: { link }
  };
  const { data: resp } = await axios.post(url, data, { headers: headers() });
  return resp;
}

export async function sendAudio(to, link) {
  const url = `${WA_BASE_URL}/${PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: 'whatsapp',
    to,
    type: 'audio',
    audio: { link }
  };
  const { data: resp } = await axios.post(url, data, { headers: headers() });
  return resp;
}

// processamento de entrada
export async function handleIncoming(value, message) {
  const from = message.from; // telefone do usuário
  const type = message.type; // text, image, audio...
  const to = value.metadata?.display_phone_number;

  // garantir janela de conversa + débito de créditos
  await ensureConversationAndDebitIfNeeded({ userPhone: from, type, metadata: value });

  let responseText = '';
  if (type === 'text') {
    const body = message.text?.body || '';
    responseText = await analyzeAndReply({ kind: 'text', body });
  } else if (type === 'image') {
    const mediaId = message.image?.id;
    responseText = await analyzeAndReply({ kind: 'image', mediaId });
  } else if (type === 'audio') {
    const mediaId = message.audio?.id;
    responseText = await analyzeAndReply({ kind: 'audio', mediaId });
  } else {
    responseText = 'Desculpe, no momento só entendo texto, imagem e áudio.';
  }

  await sendText(from, responseText);

  await Message.create({
    direction: 'in',
    userPhone: from,
    to,
    type,
    body: message.text?.body,
    metaMessageId: message.id
  });
  await Message.create({
    direction: 'out',
    userPhone: from,
    to,
    type: 'text',
    body: responseText
  });

  logger.info({ from, type }, 'Processed incoming');
}
