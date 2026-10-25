import { useRef, useState } from "react";
import { ImagePlus, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Field } from "@/lib/content-registry";

const TWENTY_YEARS = 60 * 60 * 24 * 365 * 20;
export const input = "w-full rounded-xl border bg-background px-3 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export async function uploadMedia(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${new Date().toISOString().slice(0, 7)}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage.from("site-media").createSignedUrl(path, TWENTY_YEARS);
  if (e2 || !data) throw e2 ?? new Error("URL indisponible");
  return data.signedUrl;
}

function MediaInput({ value, onChange, kind }: { value: string; onChange: (v: string) => void; kind: "image" | "video" }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const pick = async (f?: File) => {
    if (!f) return;
    setBusy(true);
    try {
      onChange(await uploadMedia(f));
      toast.success("Fichier envoyé. Pensez à enregistrer.");
    } catch {
      toast.error("Envoi impossible (200 Mo maximum).");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="grid h-28 w-40 shrink-0 place-items-center overflow-hidden rounded-xl border bg-secondary">
        {value ? (kind === "image" ? <img src={value} alt="" className="h-full w-full object-cover" /> : <video src={value} className="h-full w-full object-cover" muted />) : <ImagePlus className="h-6 w-6 text-muted-foreground" />}
      </div>
      <div className="flex-1 space-y-2">
        <input className={input} value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={kind === "video" ? "Lien YouTube ou fichier envoyé" : "Adresse de l'image"} />
        <input ref={ref} type="file" accept={kind === "image" ? "image/*" : "video/*"} hidden onChange={(e) => pick(e.target.files?.[0])} />
        <button type="button" onClick={() => ref.current?.click()} disabled={busy} className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-secondary">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}Envoyer {kind === "image" ? "une image" : "une vidéo"}
        </button>
      </div>
    </div>
  );
}

function JsonInput({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const [text, setText] = useState(() => (value === undefined ? "" : JSON.stringify(value, null, 2)));
  const [bad, setBad] = useState(false);
  return (
    <>
      <textarea className={`${input} min-h-32 font-mono text-xs`} value={text} onChange={(e) => {
        setText(e.target.value);
        if (!e.target.value.trim()) { setBad(false); return onChange(undefined); }
        try { onChange(JSON.parse(e.target.value)); setBad(false); } catch { setBad(true); }
      }} />
      {bad && <p className="mt-1 text-xs font-semibold text-destructive">Format invalide — non pris en compte.</p>}
    </>
  );
}

export function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const id = `f-${field.name}-${Math.random().toString(36).slice(2, 7)}`;
  let control;
  switch (field.type) {
    case "textarea":
      control = <textarea id={id} className={`${input} min-h-28`} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />;
      break;
    case "lines":
      control = <textarea id={id} className={`${input} min-h-28`} value={Array.isArray(value) ? value.join("\n") : ""} onChange={(e) => onChange(e.target.value.split("\n").map((l) => l.trim()).filter(Boolean))} />;
      break;
    case "select":
      control = (
        <select id={id} className={`${input} cursor-pointer`} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">—</option>
          {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
      break;
    case "image":
    case "video":
      control = <MediaInput kind={field.type} value={(value as string) ?? ""} onChange={onChange} />;
      break;
    case "json":
      control = <JsonInput value={value} onChange={onChange} />;
      break;
    default:
      control = <input id={id} className={input} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />;
  }
  return (
    <div className={field.type === "textarea" || field.type === "lines" || field.type === "image" || field.type === "video" || field.type === "json" ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy">{field.label}</label>
      {control}
      {field.help && <p className="mt-1 text-xs text-muted-foreground">{field.help}</p>}
    </div>
  );
}
