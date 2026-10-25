import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Copy, Loader2, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { DEFAULTS, entryByKey, PAGES, type Entry, type Field } from "@/lib/content-registry";
import { clearSiteContentCache } from "@/lib/content-client";
import { FieldInput, input } from "@/components/admin/fields";

export const Route = createFileRoute("/_authenticated/admin/contenu/$key")({
  loader: ({ params }) => {
    const entry = entryByKey(params.key);
    if (!entry) throw notFound();
    return { key: entry.key };
  },
  component: Page,
});

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v ?? null));

function Page() {
  const { key } = Route.useLoaderData();
  const entry = entryByKey(key)!;
  const row = useQuery({
    queryKey: ["content", key],
    queryFn: async () => (await supabase.from("site_content").select("value").eq("key", key).maybeSingle()).data,
  });
  if (row.isLoading) return <Loader2 className="h-6 w-6 animate-spin text-navy" />;
  return <Editor key={key} entry={entry} initial={clone(row.data?.value ?? DEFAULTS[key])} custom={!!row.data} />;
}

type Item = Record<string, unknown>;

function Editor({ entry, initial, custom }: { entry: Entry; initial: unknown; custom: boolean }) {
  const [value, setValue] = useState<unknown>(initial);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const qc = useQueryClient();
  const set = (v: unknown) => { setValue(v); setDirty(true); };

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const after = async () => {
    clearSiteContentCache();
    await qc.invalidateQueries({ queryKey: ["content", entry.key] });
    await router.invalidate();
  };
  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_content").upsert({ key: entry.key, value: value as Json, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) { toast.error("Enregistrement impossible : droits administrateur requis."); return; }
    setDirty(false);
    toast.success("Enregistré — visible sur le site.");
    await after();
  };
  const reset = async () => {
    if (!confirm("Revenir au contenu d'origine pour cette rubrique ?")) return;
    await supabase.from("site_content").delete().eq("key", entry.key);
    setValue(clone(DEFAULTS[entry.key]));
    setDirty(false);
    toast.success("Contenu d'origine rétabli.");
    await after();
  };

  return (
    <div className="pb-24">
      <p className="text-xs font-bold uppercase tracking-widest text-gold">{entry.group}</p>
      <h1 className="mt-1 text-3xl font-extrabold text-navy">{entry.label}</h1>
      {entry.description && <p className="mt-1 text-muted-foreground">{entry.description}</p>}
      <div className="mt-8">
        {entry.kind === "list" && <ListEditor fields={entry.fields!} titleKey={entry.itemTitle} items={(value as Item[]) ?? []} onChange={set} />}
        {entry.kind === "object" && <ObjectForm fields={entry.fields!} value={(value as Item) ?? {}} onChange={set} />}
        {entry.kind === "strings" && (
          <div className="rounded-2xl border bg-card p-5">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy" htmlFor="lines">Un élément par ligne</label>
            <textarea id="lines" className={`${input} min-h-64`} value={((value as string[]) ?? []).join("\n")} onChange={(e) => set(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} />
          </div>
        )}
        {entry.kind === "json" && (
          <div className="rounded-2xl border bg-card p-5"><FieldInput field={{ name: "json", label: "Données (format avancé)", type: "json" }} value={value} onChange={set} /></div>
        )}
        {entry.kind === "heroes" && <HeroesEditor value={(value as Record<string, Item>) ?? {}} onChange={set} />}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-card/95 backdrop-blur lg:left-[280px]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3">
          <span className="text-sm text-muted-foreground">{dirty ? "Modifications non enregistrées" : custom ? "Contenu personnalisé" : "Contenu d'origine"}</span>
          <div className="flex gap-2">
            <button onClick={reset} className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold text-navy hover:bg-secondary"><RotateCcw className="h-4 w-4" /><span className="hidden sm:inline">Contenu d'origine</span></button>
            <button onClick={save} disabled={saving || !dirty} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-cta-foreground transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ObjectForm({ fields, value, onChange }: { fields: Field[]; value: Item; onChange: (v: Item) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => <FieldInput key={f.name} field={f} value={value[f.name]} onChange={(v) => onChange({ ...value, [f.name]: v })} />)}
    </div>
  );
}

function ListEditor({ fields, items, titleKey, onChange }: { fields: Field[]; items: Item[]; titleKey?: string | undefined; onChange: (v: Item[]) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j]!, next[i]!];
    onChange(next);
    setOpen(j);
  };
  const iconBtn = "grid h-8 w-8 cursor-pointer place-items-center rounded-full text-navy transition-colors duration-200 hover:bg-secondary";
  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const img = fields.find((f) => f.type === "image");
        return (
          <div key={i} className="rounded-2xl border bg-card shadow-soft">
            <div className="flex items-center gap-3 p-3">
              <button className="flex flex-1 cursor-pointer items-center gap-3 text-left" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                {img && typeof it[img.name] === "string" && it[img.name] ? <img src={it[img.name] as string} alt="" className="h-12 w-16 rounded-lg object-cover" /> : <span className="grid h-12 w-12 place-items-center rounded-lg bg-secondary text-sm font-bold text-navy">{i + 1}</span>}
                <span className="line-clamp-1 font-bold text-navy">{String((titleKey && it[titleKey]) || `Élément ${i + 1}`)}</span>
                <ChevronDown className={`ml-auto h-4 w-4 text-navy transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <button className={iconBtn} aria-label="Monter" onClick={() => move(i, -1)}><ArrowUp className="h-4 w-4" /></button>
              <button className={iconBtn} aria-label="Descendre" onClick={() => move(i, 1)}><ArrowDown className="h-4 w-4" /></button>
              <button className={iconBtn} aria-label="Dupliquer" onClick={() => onChange([...items.slice(0, i + 1), clone(it), ...items.slice(i + 1)])}><Copy className="h-4 w-4" /></button>
              <button className={`${iconBtn} !text-destructive`} aria-label="Supprimer" onClick={() => { if (confirm("Supprimer cet élément ?")) { onChange(items.filter((_, k) => k !== i)); setOpen(null); } }}><Trash2 className="h-4 w-4" /></button>
            </div>
            {open === i && <div className="border-t p-5"><ObjectForm fields={fields} value={it} onChange={(v) => onChange(items.map((x, k) => (k === i ? v : x)))} /></div>}
          </div>
        );
      })}
      <button onClick={() => { onChange([...items, Object.fromEntries(fields.map((f) => [f.name, f.type === "lines" ? [] : f.type === "json" ? undefined : ""]))]); setOpen(items.length); }} className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-dashed border-navy/30 px-5 py-3 text-sm font-bold text-navy transition-colors duration-200 hover:border-cta hover:text-cta">
        <Plus className="h-4 w-4" />Ajouter
      </button>
    </div>
  );
}

const heroFields: Field[] = [
  { name: "image", label: "Image de fond", type: "image" },
  { name: "badge", label: "Badge", type: "text" },
  { name: "title", label: "Titre", type: "text", help: "Entourez un mot d'astérisques pour le mettre en rouge : Nos *Services*" },
  { name: "text", label: "Texte", type: "textarea" },
];

function HeroesEditor({ value, onChange }: { value: Record<string, Item>; onChange: (v: Record<string, Item>) => void }) {
  return (
    <div className="space-y-6">
      <p className="rounded-xl bg-secondary p-4 text-sm text-navy">Laissez un champ vide pour garder le contenu actuel. Sur l'accueil, l'image de fond se règle dans « Diaporama de l'accueil ».</p>
      {PAGES.filter((p) => p.key !== "reservation").map((p) => (
        <section key={p.key} className="rounded-2xl border bg-card p-5 shadow-soft">
          <h2 className="mb-4 text-lg font-extrabold text-navy">{p.label}</h2>
          <ObjectForm fields={p.key === "accueil" ? heroFields.slice(1) : heroFields} value={value[p.key] ?? {}} onChange={(v) => onChange({ ...value, [p.key]: v })} />
        </section>
      ))}
    </div>
  );
}
