import { getMediaUrl, downloadBuffer } from './media.service.js';
import { transcribeAudio, visionIdentifyIngredients, generateRecipe } from './openai.service.js';

export async function analyzeAndReply(input) {
  if (input.kind === 'text') {
    const ingredients = input.body;
    const recipe = await generateRecipe(ingredients);
    return recipe;
  }
  if (input.kind === 'image') {
    const url = await getMediaUrl(input.mediaId);
    const ingredients = await visionIdentifyIngredients(url);
    const recipe = await generateRecipe(ingredients);
    return recipe;
  }
  if (input.kind === 'audio') {
    const url = await getMediaUrl(input.mediaId);
    const buf = await downloadBuffer(url);
    const text = await transcribeAudio(buf, 'audio.ogg');
    const recipe = await generateRecipe(text);
    return recipe;
  }
  return 'Não consegui processar este tipo de conteúdo.';
}
