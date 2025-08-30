import { creditAfterPayment } from '../services/billing.service.js';

export async function paymentWebhook(req, res, next) {
  try {
    // TODO: validar assinatura do PSP
    const event = req.body;
    await creditAfterPayment(event);
    res.sendStatus(200);
  } catch (e) { next(e); }
}
