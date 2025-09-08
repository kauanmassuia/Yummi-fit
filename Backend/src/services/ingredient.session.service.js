// Backend/src/services/ingredient.session.service.js

export function normalizeList(input) {
  const list = Array.isArray(input) ? input : String(input || '').split(/[,\n;]/);
  const clean = list.map((s) => String(s || '').toLowerCase().trim()).filter(Boolean);
  return Array.from(new Set(clean));
}

function nextExpiry(days = 1) {
  const dt = new Date();
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt;
}

export async function ensureSession(SessionModel, userPhone) {
  const nowExp = nextExpiry(1);
  // Define expiresAt apenas no insert; não misturar com $set do mesmo campo
  const doc = await SessionModel.findOneAndUpdate(
    { userPhone },
    {
      $setOnInsert: { userPhone, stage: 'idle', ingredients: [], source: 'unknown', expiresAt: nowExp }
      // Se quiser renovar o TTL sempre, faça em uma segunda operação separada:
      // $set: { expiresAt: nowExp } => REMOVIDO para evitar conflito
    },
    { new: true, upsert: true }
  ).lean();

  // Operação opcional (se realmente quiser renovar TTL em toda interação):
  // await SessionModel.updateOne({ userPhone }, { $set: { expiresAt: nowExp } });

  return doc;
}

export async function setConfirmState(SessionModel, userPhone, ingredients, source) {
  const ing = normalizeList(ingredients);
  const nowExp = nextExpiry(1);
  // Use apenas $set e NÃO toque expiresAt junto com $setOnInsert aqui
  await SessionModel.updateOne(
    { userPhone },
    { $set: { stage: 'confirm', ingredients: ing, source, expiresAt: nowExp } }, // apenas $set
    { upsert: true }
  );
  return ing;
}

export async function clearState(SessionModel, userPhone) {
  const nowExp = nextExpiry(1);
  await SessionModel.updateOne(
    { userPhone },
    { $set: { stage: 'idle', ingredients: [], source: 'unknown', expiresAt: nowExp } }
  );
}

export async function applyEdit(SessionModel, userPhone, text) {
  const lower = String(text || '').toLowerCase().trim();
  const addMatch = lower.startsWith('adicionar:');
  const remMatch = lower.startsWith('remover:');
  if (!addMatch && !remMatch) return null;

  const payload = lower.split(':').slice(1).join(':');
  const items = normalizeList(payload);

  const doc = await SessionModel.findOne({ userPhone }).lean();
  const current = normalizeList(doc?.ingredients || []);

  let next = current;
  if (addMatch) next = normalizeList([...current, ...items]);
  if (remMatch) {
    const removeSet = new Set(items);
    next = current.filter((x) => !removeSet.has(x));
  }

  await SessionModel.updateOne({ userPhone }, { $set: { ingredients: next } });
  return next;
}
