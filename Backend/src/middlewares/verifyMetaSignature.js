import crypto from 'crypto';

export default function verifyMetaSignature(req, res, next) {
  try {
    const signature = req.headers['x-hub-signature-256'] || req.headers['x-hub-signature'];
    if (!signature) return res.sendStatus(401);
    const appSecret = process.env.META_WA_APP_SECRET;
    const payload = JSON.stringify(req.body);
    const hmac = crypto.createHmac('sha256', appSecret);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');
    if (signature !== digest) return res.sendStatus(403);
    next();
  } catch {
    return res.sendStatus(401);
  }
}
