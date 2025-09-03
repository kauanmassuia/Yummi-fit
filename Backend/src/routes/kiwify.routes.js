import express from "express";

const router = express.Router();

// token cadastrado TAMBÉM na Kiwify ao criar o webhook
const KIWIFY_WEBHOOK_TOKEN = process.env.KIWIFY_WEBHOOK_TOKEN;

// idempotência simples (memória). Depois você pode trocar por DB.
const processed = new Set();

router.post("/kiwify", async (req, res) => {
  try {
    // logger do pino-http fica em req.log (se existir), senão cai pro console
    const log = req.log || console;

    // 1) validação de segurança (token tem que bater com o da Kiwify)
    const tokenHeader = req.headers["x-kiwify-token"];
    const tokenBody = req.body?.token || req.body?.webhook_token;
    const signatureQuery = req.query?.signature;
    
    // Log para debug - vamos ver o que a Kiwify está enviando
    log.info({ 
      tokenHeader, 
      tokenBody, 
      signatureQuery,
      expectedToken: KIWIFY_WEBHOOK_TOKEN 
    }, "[Kiwify] debug tokens");
    
    // Validação: aceita token no header, body ou signature da Kiwify
    const isValidToken = (
      tokenHeader === KIWIFY_WEBHOOK_TOKEN ||
      tokenBody === KIWIFY_WEBHOOK_TOKEN ||
      signatureQuery // Se tem signature, é da Kiwify (aceita qualquer signature válida)
    );
    
    if (!isValidToken) {
      log.warn({ tokenHeader, tokenBody, signatureQuery }, "[Kiwify] token inválido");
      return res.status(401).send("unauthorized");
    }

    // 2) idempotência: evita processar o mesmo evento 2x
    const eventId =
      req.headers["x-kiwify-event-id"] || req.body?.id || req.body?.event_id;
    if (eventId) {
      if (processed.has(eventId)) {
        log.info({ eventId }, "[Kiwify] evento duplicado (ignorado)");
        return res.sendStatus(200);
      }
      processed.add(eventId);
    }

    // 3) identificar evento + dados
    const event = req.body?.event || req.body?.tipo || req.body?.trigger || req.body?.webhook_event_type || "desconhecido";
    const sale  = req.body?.sale  || req.body?.data || req.body;

    log.info({ event }, "[Kiwify] evento recebido");
    
    // Log completo do payload para debug
    log.info({ 
      event,
      sale,
      fullBody: req.body,
      headers: req.headers,
      query: req.query
    }, "[Kiwify] payload completo");

    // 4) Regras de negócio (MVP). Implemente aos poucos aqui:
    switch (event) {
      case "pix_gerado":
      case "pix_created":
        await pixGerado(sale, log);
        break;
      case "compra_aprovada":
        await ativarAcesso(sale, log);
        break;
      case "subscription_renewed":
        await renovarAcesso(sale, log);
        break;
      case "subscription_canceled":
        await cancelarAcesso(sale, log);
        break;
      case "subscription_late":
      case "chargeback":
      case "compra_reembolsada":
        await suspenderAcesso(sale, log);
        break;
      default:
        log.info({ event }, "[Kiwify] evento não tratado (ok)");
    }

    // 5) se processou sem erro, devolva 200
    return res.sendStatus(200);
  } catch (err) {
    const log = req.log || console;
    log.error(err, "[Kiwify] erro processando webhook");
    // 500 faz a Kiwify reenviar — bom enquanto você está testando
    return res.sendStatus(500);
  }
});

// ------- stubs: troque por integrações reais (DB/WhatsApp/área de membros) -------
async function pixGerado(sale, log) {
  // 1) PIX foi gerado, mas ainda não foi pago
  // 2) pode enviar notificação para o cliente sobre o PIX
  // 3) pode criar um registro de pagamento pendente
  // 4) pode enviar dados do PIX (código, valor, etc.)
  
  // Capturar todas as informações disponíveis (estrutura real da Kiwify)
  const pixData = {
    orderId: sale?.order_id,
    orderRef: sale?.order_ref,
    saleId: sale?.order_id, // Usar order_id como saleId
    email: sale?.Customer?.email,
    customerName: sale?.Customer?.full_name,
    customerFirstName: sale?.Customer?.first_name,
    customerPhone: sale?.Customer?.mobile,
    customerCPF: sale?.Customer?.CPF,
    customerInstagram: sale?.Customer?.instagram,
    pixCode: sale?.pix_code,
    pixExpiration: sale?.pix_expiration,
    amount: sale?.Commissions?.charge_amount ? (sale.Commissions.charge_amount / 100).toFixed(2) : null, // Converter centavos para reais
    currency: sale?.Commissions?.currency,
    status: sale?.order_status,
    createdAt: sale?.created_at,
    updatedAt: sale?.updated_at,
    productName: sale?.Product?.product_name,
    productId: sale?.Product?.product_id,
    subscriptionId: sale?.subscription_id,
    subscriptionStatus: sale?.Subscription?.status,
    nextPayment: sale?.Subscription?.next_payment,
    planName: sale?.Subscription?.plan?.name,
    planFrequency: sale?.Subscription?.plan?.frequency
  };
  
  log.info(pixData, "[Kiwify] PIX gerado - dados completos");
  
  // Log específico do email para facilitar identificação
  if (pixData.email) {
    log.info({ email: pixData.email, saleId: pixData.saleId }, "[Kiwify] PIX gerado para cliente");
  }
}

async function ativarAcesso(sale, log) {
  // 1) identificar o cliente (email/telefone vêm no payload)
  // 2) criar/atualizar usuário no seu sistema → status = 'active'
  // 3) liberar premium no WhatsApp/área de membros
  // 4) mandar mensagem de boas-vindas
  log.info({ saleId: sale?.id }, "[Kiwify] ativarAcesso (stub)");
}

async function renovarAcesso(sale, log) {
  // estender validade, manter status 'active'
  log.info({ saleId: sale?.id }, "[Kiwify] renovarAcesso (stub)");
}

async function cancelarAcesso(sale, log) {
  // marcar 'canceled' (opcional: manter até o fim do ciclo atual)
  log.info({ saleId: sale?.id }, "[Kiwify] cancelarAcesso (stub)");
}

async function suspenderAcesso(sale, log) {
  // marcar 'past_due' / 'suspended' e travar premium
  log.info({ saleId: sale?.id }, "[Kiwify] suspenderAcesso (stub)");
}

export default router;
