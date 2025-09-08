import { openai } from '../config/openai.js';

export async function transcribeAudio(buffer, filename = 'audio.ogg') {
  // Whisper (ex.: multipart usado pelo SDK)
  const file = new File([buffer], filename, { type: 'audio/ogg' });
  const resp = await openai.audio.transcriptions.create({
    file,
    model: 'whisper-1'
  });
  return resp.text;
}

export async function visionIdentifyIngredients(imageUrl) {
  const resp = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Você é um chef fitness. Receberá uma foto de comida e deve identificar de 3 a 8 ingredientes visíveis, separados por vírgula. Se a imagem não for de comida, responda "SEM_COMIDA".' },
      { role: 'user', content: [
        { type: 'image_url', image_url: { url: imageUrl } }
      ]}
    ]
  });
  const txt = resp.choices?.[0]?.message?.content?.trim() || 'SEM_COMIDA';
  if (txt.includes('SEM_COMIDA')) throw new Error('Imagem sem comida');
  return txt;  // ex.: "frango, arroz integral, brócolis"
}

export async function generateRecipe(ingredientsOrName) {
  const prompt = `Crie uma receita fitness usando: ${ingredientsOrName}.
Inclua: nome, porções, macros por porção (proteínas, carboidratos, gorduras), ingredientes e modo de preparo passo a passo. Use linguagem clara e motivadora de vez em quando.`;
  const resp = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }]
  });
  if (!resp || !resp.choices || resp.choices.length === 0 || !resp.choices[0].message || !resp.choices[0].message.content) {
    throw new Error('Resposta da OpenAI vazia ou inválida.');
  }
  const rawRecipe = resp.choices[0].message.content;
  return emojiEnhance(rawRecipe);
}

export function emojiEnhance(text) {
  // Poucos emojis, só para destacar seções principais (sem excesso)
  const emojis = {
    'Nome:': '📛 Nome:',
    'Porções:': '🥗 Porções:',
    'Macros por porção:': '📊 Macros (Proteínas, Carboidratos, Gorduras):',
    'Ingredientes:': '🧂 Ingredientes:',
    'Modo de preparo:': '👩‍🍳 Modo de Preparo:',
    '###': '',  // Remove headers chatos
  };
  let enhancedText = text;
  for (const [key, value] of Object.entries(emojis)) {
    enhancedText = enhancedText.replace(new RegExp(key, 'gi'), value);
  }
  // Adiciona uma mensagem amigável no final (não fofa, só motivadora de vez em quando)
  enhancedText += '\n\nBom apetite! Mantenha o foco nos treinos. 😊';
  return enhancedText;
}
