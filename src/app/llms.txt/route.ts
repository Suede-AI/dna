import { buildLlmsTxt } from '@/lib/llms';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dna.suedeai.ai';

export const dynamic = 'force-static';

export function GET(): Response {
  return new Response(buildLlmsTxt(SITE_URL), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
