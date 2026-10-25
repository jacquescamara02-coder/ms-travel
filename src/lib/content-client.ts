import type { Json } from "@/integrations/supabase/types";
import { getSiteContent } from "./content.functions";
import { applyContent } from "./content-registry";

let cache: { at: number; data: Record<string, Json> } | undefined;
const TTL = 15_000;

export async function loadSiteContent(): Promise<Record<string, Json>> {
  if (cache && Date.now() - cache.at < TTL) {
    applyContent(cache.data);
    return cache.data;
  }
  let data: Record<string, Json> = {};
  try {
    data = await getSiteContent();
  } catch (e) {
    console.error(e);
    data = cache?.data ?? {};
  }
  cache = { at: Date.now(), data };
  applyContent(data);
  return data;
}

export function clearSiteContentCache() {
  cache = undefined;
}

/** Split "Mot *rouge* suite" into segments; starred parts are highlighted. */
export function markSegments(text: string): { t: string; red: boolean }[] {
  return text.split(/(\*[^*]+\*)/g).filter(Boolean).map((p) => (p.startsWith("*") && p.endsWith("*") ? { t: p.slice(1, -1), red: true } : { t: p, red: false }));
}

export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  return m?.[1] ?? null;
}
