import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
  userPhone: { type: String, index: true },
  category: { type: String, index: true },
  openedAt: Date,
  expiresAt: Date,
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Conversation', ConversationSchema);
