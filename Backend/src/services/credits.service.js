import Conversation from '../models/Conversation.js';
// TODO: conectar com CreditsLedger e regras reais

export async function ensureConversationAndDebitIfNeeded({ userPhone, type, metadata }) {
  const now = new Date();
  let conv = await Conversation.findOne({ userPhone, active: true });
  if (conv && conv.expiresAt > now) return conv;

  // abrir nova
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  conv = await Conversation.create({
    userPhone,
    category: 'service', // simplificado
    openedAt: now,
    expiresAt,
    active: true
  });

  // TODO: debitar 1 crédito aqui
  return conv;
}
