// Backend/src/services/ratelimit.service.js
export function getDayKey(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getExpiryDate(days = 2) {
  const dt = new Date();
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt;
}

// Incrementa e retorna { allowed: boolean, remaining: number }
export async function checkAndIncrementDailyLimit(RateLimitModel, userPhone, maxPerDay = 15) {
  const dayKey = getDayKey();
  const expiresAt = getExpiryDate(2);

  // Estratégia: só define expiresAt em $setOnInsert (evita conflito).
  // Para manter o TTL fresco, podemos ocasionalmente fazer um $set separado em outra operação caso precise.
  const res = await RateLimitModel.findOneAndUpdate(
    { userPhone, dayKey },
    {
      $setOnInsert: { userPhone, dayKey, count: 0, expiresAt },
      $inc: { count: 1 }
      // NÃO usar $set: { expiresAt } na mesma operação para evitar conflito
    },
    { new: true, upsert: true }
  ).lean();

  const remaining = Math.max(0, maxPerDay - res.count);
  return { allowed: res.count <= maxPerDay, remaining };
}
