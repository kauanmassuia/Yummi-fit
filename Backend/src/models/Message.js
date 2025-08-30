import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  direction: { type: String, enum: ['in','out'], required: true },
  userPhone: String,
  to: String,
  type: String,
  body: String,
  metaMessageId: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export default mongoose.model('Message', MessageSchema);
