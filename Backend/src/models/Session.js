// Backend/src/models/Session.js
import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema(
  {
    userPhone: { type: String, required: true, unique: true, index: true }, // ex.: 5511999...@c.us
    stage: { type: String, enum: ['idle', 'confirm'], default: 'idle' },     // estado da conversa
    ingredients: { type: [String], default: [] },                            // ingredientes em edição
    source: { type: String, enum: ['text', 'audio', 'image', 'unknown'], default: 'unknown' }, // origem
    expiresAt: { type: Date, required: true, index: true },                  // usado pelo TTL (auto limpeza)
  },
  { collection: 'yummifit_sessions', timestamps: true }
);

// TTL: remove documento quando expiresAt < now
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // [1][2]

export default mongoose.models.YummiSession || mongoose.model('YummiSession', SessionSchema);
