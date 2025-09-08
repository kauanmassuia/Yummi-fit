import mongoose from 'mongoose';

const RateLimitSchema = new mongoose.Schema(
  {
    userPhone: { type: String, required: true, index: true },
    dayKey: { type: String, required: true, index: true }, // ex.: 2025-09-08
    count: { type: Number, required: true, default: 0 },
    // usado pelo TTL para expirar documentos e “resetar” o dia automaticamente
    expiresAt: { type: Date, required: true, index: true }, 
  },
  { collection: 'yummifit_rate_limits', timestamps: true }
);

// índice único por usuário+dia
RateLimitSchema.index({ userPhone: 1, dayKey: 1 }, { unique: true });

// TTL ~ 2 dias (172800 s); o Mongo remove após expirar (há um atraso natural do TTL)
RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // expira quando expiresAt < now [4][14]

export default mongoose.models.YummiRateLimit || mongoose.model('YummiRateLimit', RateLimitSchema);
