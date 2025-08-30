import axios from 'axios';
import { WA_BASE_URL } from '../config/whatsapp.js';

const ACCESS_TOKEN = process.env.META_WA_ACCESS_TOKEN;

export async function getMediaUrl(mediaId) {
  const url = `${WA_BASE_URL}/${mediaId}`;
  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
  });
  return data.url; // URL assinada curta
}

export async function downloadBuffer(fileUrl) {
  const { data } = await axios.get(fileUrl, {
    responseType: 'arraybuffer',
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
  });
  return Buffer.from(data);
}
