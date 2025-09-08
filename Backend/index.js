// index.js — YummiFit: texto, áudio (Whisper), imagem (Visão), onboarding, rate limit e confirmação/edição com saudações

import 'dotenv/config'; // .env [5]

import wppconnect from '@wppconnect-team/wppconnect'; // WhatsApp [1]
import OpenAI from 'openai'; // OpenAI SDK [2]
import fs from 'node:fs'; // [6]
import fsPromises from 'node:fs/promises'; // [6]

// OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // [2]

// Banco e services (imports dinâmicos centralizados)
async function initDatabaseAndModels() {
  const mongoose = (await import('mongoose')).default; // [6]
  const Message = (await import('./src/models/Message.js')).default;
  const Conversation = (await import('./src/models/Conversation.js')).default;
  const RateLimit = (await import('./src/models/RateLimit.js')).default;
  const Session = (await import('./src/models/Session.js')).default; // passo 2 (confirmação) [7]

  const { Schema, model, models } = mongoose;
  const OnboardingSchema = new Schema(
    {
      userPhone: { type: String, unique: true, index: true, required: true },
      firstSeenAt: { type: Date, default: Date.now },
    },
    { collection: 'yummifit_onboarding' }
  );
  const Onboarding =
    models.yummifit_onboarding || model('yummifit_onboarding', OnboardingSchema);

  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/seu-banco', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }); // [8]
  console.log('Conectado ao MongoDB');
  return { mongoose, Message, Conversation, Onboarding, RateLimit, Session };
}

async function initServices() {
  const { ensureConversationAndDebitIfNeeded } = await import('./src/services/credits.service.js');
  const { visionIdentifyIngredients, generateRecipe } = await import('./src/services/openai.service.js');
  const { checkAndIncrementDailyLimit } = await import('./src/services/ratelimit.service.js'); // passo 1 [9]
  const { ensureSession, setConfirmState, clearState, applyEdit } = await import('./src/services/ingredient.session.service.js'); // passo 2 [10]
  return {
    ensureConversationAndDebitIfNeeded,
    visionIdentifyIngredients,
    generateRecipe,
    checkAndIncrementDailyLimit,
    ensureSession,
    setConfirmState,
    clearState,
    applyEdit,
  };
}

// Utils
function guessAudioExtension(message) {
  const mime = message?.mimetype || '';
  if (mime.includes('ogg')) return '.ogg';
  if (mime.includes('mp3') || mime.includes('mpeg')) return '.mp3';
  if (mime.includes('wav')) return '.wav';
  if (mime.includes('amr')) return '.amr';
  return '.ogg';
}

// Onboarding (primeira vez) [11]
async function ensureOnboarding(Onboarding, userPhone) {
  const existing = await Onboarding.findOne({ userPhone }).lean();
  if (existing) return false;
  await Onboarding.create({ userPhone, firstSeenAt: new Date() });
  return true;
}

// Confirmação — helpers
function buildConfirmMessage(ingredients, remaining = null) {
  const list = ingredients.join(', ');
  const head = `Tudo certo com estes ingredientes? ${list}`;
  const tail = [
    '',
    'Responda: "sim" para gerar agora.',
    'Ou edite: "adicionar: item1, item2" / "remover: item".',
  ];
  if (typeof remaining === 'number') {
    tail.push(`(Solicitações restantes hoje: ${remaining})`);
  }
  return [head, ...tail].join('\n');
}
function isYes(text) {
  const t = String(text || '').toLowerCase().trim();
  return ['sim', 'gerar', 'ok', 'pode gerar'].includes(t);
}
function isCancel(text) {
  const t = String(text || '').toLowerCase().trim();
  return ['cancelar', 'parar', 'não', 'nao'].includes(t);
}

// App
(async () => {
  const { Message, Onboarding, RateLimit, Session } = await initDatabaseAndModels();
  const {
    ensureConversationAndDebitIfNeeded,
    visionIdentifyIngredients,
    generateRecipe,
    checkAndIncrementDailyLimit,
    ensureSession,
    setConfirmState,
    clearState,
    applyEdit,
  } = await initServices();

  console.log('Iniciando sessão WPPConnect...');

  wppconnect
    .create({
      session: 'meu-bot-fitness',
      headless: true,
      useChrome: true,
      logQR: true,
      catchQR: (base64Qr, asciiQR, attempts) => {
        console.log('Tentativas de QR:', attempts);
        console.log('QR:\n', asciiQR);
      },
      statusFind: (status, session) => {
        console.log('Status sessão:', status, 'Sessão:', session);
      },
    })
    .then((client) => {
      console.log('Bot conectado com sucesso!');

      client.onMessage(async (message) => {
        try {
          console.log('Mensagem recebida de:', message.from, 'Tipo:', message.type);

          const from = message.from; // 5511...@c.us [12]
          const type = message.type;
          const to = 'yummifit-bot';

          // Rate limit diário (15/dia por usuário) — checar antes de tudo [9]
          try {
            const { allowed, remaining } = await checkAndIncrementDailyLimit(RateLimit, from, 15);
            if (!allowed) {
              await client.sendText(
                from,
                `Hoje já foram 15 solicitações 😊\nVolte amanhã para continuar.\nDica: mande lista objetiva de ingredientes para respostas mais rápidas.`
              ); // [1]
              return;
            }
          } catch (e) {
            console.warn('Falha no rate limit:', e);
          }

          // Onboarding (primeiro contato)
          try {
            const firstTime = await ensureOnboarding(Onboarding, from); // [11]
            if (firstTime) {
              await client.sendText(from, buildWelcomeMessage()); // [1]
            }
          } catch (e) {
            console.warn('Falha ao checar onboarding:', e);
          }

          // Garante sessão viva para confirmação/edição
          await ensureSession(Session, from); // [10]

          // Controle/créditos
          await ensureConversationAndDebitIfNeeded({ userPhone: from, type });

          let responseText = '';

          // TEXTO -> saudações/ajuda/edição/confirm/heurística
          if (type === 'chat') {
            const bodyRaw = message.body || '';
            const body = bodyRaw.trim();
            const lower = body.toLowerCase();

            // Saudações e ajuda — não entram em confirmação
            const isGreeting = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'eae', 'e aí', 'eai'].includes(lower);
            const isHelp = ['ajuda', 'menu', 'como usar', 'help'].includes(lower);

            if (isGreeting) {
              await client.sendText(
                from,
                [
                  'Oi! Vamos cozinhar saudável? 😄',
                  'Mande ingredientes (ex.: frango, brócolis, arroz integral), um áudio falando os itens 🎤 ou uma foto 📷.',
                  'Se quiser, digite "menu" para atalhos.',
                ].join('\n')
              ); // [1]
              responseText = '';
            } else if (isHelp) {
              await client.sendText(
                from,
                [
                  'Atalhos:',
                  '- Escrever ingredientes: frango, brócolis, arroz integral',
                  '- Áudio: fale os ingredientes 🎤',
                  '- Foto: prato ou ingredientes 📷',
                  'Dicas: “adicionar: item”, “remover: item”, “sim” para gerar, “cancelar” para parar.',
                ].join('\n')
              ); // [1]
              responseText = '';
            } else {
              // edição durante confirmação
              const edited = await applyEdit(Session, from, body); // [10]
              if (edited) {
                await client.sendText(from, buildConfirmMessage(edited)); // [1]
                responseText = '';
              } else if (isYes(body)) {
                const doc = await Session.findOne({ userPhone: from }).lean();
                const ing = doc?.ingredients || [];
                if (ing.length === 0) {
                  responseText = 'Me diga os ingredientes ou envie uma foto para começarmos 🙂';
                } else {
                  responseText = await generateRecipe(ing.join(', ')); // [8]
                  await clearState(Session, from); // [10]
                }
              } else if (isCancel(body)) {
                await clearState(Session, from); // [10]
                responseText = 'Beleza! Se quiser, mande novos ingredientes ou uma foto.';
              } else {
                // Só entra em confirmação se parecer lista de ingredientes
                const seemsList = body.includes(',') || lower.startsWith('ingredientes:') || lower.startsWith('lista:');
                if (!seemsList) {
                  await client.sendText(
                    from,
                    'Mande ingredientes separados por vírgula (ex.: frango, brócolis) ou diga "menu" para atalhos.'
                  ); // [1]
                  responseText = '';
                } else {
                  const ing = body.split(/[,\n;]/).map((s) => s.trim()).filter(Boolean);
                  const normalized = await setConfirmState(Session, from, ing, 'text'); // [10]
                  await client.sendText(from, buildConfirmMessage(normalized)); // [1]
                  responseText = '';
                }
              }
            }

          // IMAGEM -> visão com saída estruturada, entra em confirmação
          } else if (type === 'image') {
            try {
              const buffer = await client.decryptFile(message); // [1]
              const imgPath = `imagem_temp_${Date.now()}.jpg`;
              fs.writeFileSync(imgPath, buffer);

              const b64 = buffer.toString('base64');
              const dataUrl = `data:image/jpeg;base64,${b64}`;

              const prompt = `
                Você é um classificador de imagens focado em alimentos.
                1) Classifique a imagem em um dos tipos: "prato_preparado", "ingredientes_in_natura", "ingrediente_embalado", "produto_pronto_industrializado", "nao_alimenticio".
                2) Se "prato_preparado", "ingredientes_in_natura" ou "ingrediente_embalado", liste até 10 ingredientes visíveis (sem quantidades). Use "possível" quando houver dúvida.
                3) Se "produto_pronto_industrializado" ou "nao_alimenticio", não liste ingredientes.
                4) Responda ESTRITAMENTE neste JSON de uma única linha:
                {"tipo":"<uma_das_categorias>", "ingredientes":["...","..."]}
              `.trim();

              const completion = await openai.chat.completions.create({
                model: 'gpt-4o-mini', // visão [3]
                messages: [
                  {
                    role: 'user',
                    content: [
                      { type: 'text', text: prompt },
                      { type: 'image_url', image_url: { url: dataUrl } },
                    ],
                  },
                ],
                temperature: 0.1,
              }); // [3][4]

              const raw = completion.choices.message.content.trim() || ''; // [13][3]
              let parsed;
              try { parsed = JSON.parse(raw); } catch { parsed = null; }

              if (!parsed || !parsed.tipo) {
                responseText = 'Não consegui identificar a imagem com confiança. Tente outra foto com boa iluminação.';
              } else if (parsed.tipo === 'produto_pronto_industrializado' || parsed.tipo === 'nao_alimenticio') {
                responseText = 'Isso parece um produto pronto/industrializado. Envie ingredientes ou um prato preparado.';
              } else {
                const ingredientes = Array.isArray(parsed.ingredientes) ? parsed.ingredientes.filter(Boolean) : [];
                if (!ingredientes.length) {
                  responseText = 'Não identifiquei ingredientes suficientes. Tente outra foto com os alimentos visíveis.';
                } else {
                  const normalized = await setConfirmState(Session, from, ingredientes, 'image'); // [10]
                  await client.sendText(from, buildConfirmMessage(normalized)); // [1]
                  responseText = '';
                }
              }

              try { await fsPromises.unlink(imgPath); } catch {}
            } catch (error) {
              console.error('Erro ao analisar imagem:', error);
              responseText = 'Desculpe, não consegui analisar a imagem. Tente outra foto!';
            }

          // ÁUDIO -> Whisper -> entra em confirmação
          } else if (type === 'ptt' || type === 'audio') {
            try {
              const buffer = await client.decryptFile(message); // [1]
              const ext = guessAudioExtension(message);
              const audioPath = `audio_temp_${Date.now()}${ext}`;
              fs.writeFileSync(audioPath, buffer);

              const transcription = await openai.audio.transcriptions.create({
                file: fs.createReadStream(audioPath),
                model: 'whisper-1',
              }); // [14][2]

              const userText = (transcription.text || '').trim();
              if (!userText) {
                responseText = 'Não consegui entender o áudio. Pode tentar novamente?';
              } else {
                const ing = userText.split(/[,\n;]/).map((s) => s.trim()).filter(Boolean);
                const normalized = await setConfirmState(Session, from, ing, 'audio'); // [10]
                await client.sendText(from, buildConfirmMessage(normalized)); // [1]
                responseText = '';
              }

              try { await fsPromises.unlink(audioPath); } catch {}
            } catch (error) {
              console.error('Erro ao processar áudio/Whisper:', error);
              responseText = 'Desculpe, não consegui transcrever o áudio agora. Tente novamente!';
            }

          } else {
            responseText = 'Por enquanto entendo texto, imagem e áudio. Mande ingredientes ou uma foto do prato 🙂';
          }

          if (responseText) {
            await client.sendText(from, responseText); // [1]
          }

          // Persistência
          await Message.create({
            direction: 'in',
            userPhone: from,
            to,
            type,
            body: message.body,
            metaMessageId: message.id,
          });
          await Message.create({
            direction: 'out',
            userPhone: from,
            to,
            type: 'text',
            body: responseText || '(mensagem guiada/confirm)',
          });
        } catch (err) {
          console.error('Erro no handler onMessage:', err);
          try {
            await client.sendText(message.from, 'Ocorreu um erro interno. Tente novamente em instantes.');
          } catch {}
        }
      });
    })
    .catch((error) => {
      console.error('Erro ao conectar o bot:', error);
      process.exit(1);
    });
})();
