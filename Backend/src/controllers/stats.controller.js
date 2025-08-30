import Message from '../models/Message.js';

export async function overviewToday(req, res, next) {
  try {
    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date();
    const received = await Message.countDocuments({ direction: 'in', createdAt: { $gte: start, $lte: end } });
    const sent = await Message.countDocuments({ direction: 'out', createdAt: { $gte: start, $lte: end } });
    res.json({ received, sent, from: start, to: end });
  } catch (e) { next(e); }
}
