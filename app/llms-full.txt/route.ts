import { getLLMText, source } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  const scanned = source.getPages().map(getLLMText);
  const content = await Promise.all(scanned);

  return new Response(content.join('\n\n'));
}
