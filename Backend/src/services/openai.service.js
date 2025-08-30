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
      { role: 'system', content: 'Extraia alimentos/ingredientes visíveis da imagem.' },
      { role: 'user', content: [
        { type: 'text', text: 'Liste ingredientes principais.' },
        { type: 'image_url', image_url: { url: imageUrl } }
      ]}
    ]
  });
  return resp.choices.message.content;
}

export async function generateRecipe(ingredientsOrName) {
  const prompt = `Crie uma receita fitness usando: ${ingredientsOrName}.
Inclua: nome, porções, macros por porção (proteínas, carboidratos, gorduras), ingredientes e modo de preparo passo a passo.`;
  const resp = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }]
  });
  return resp.choices.message.content;
}
