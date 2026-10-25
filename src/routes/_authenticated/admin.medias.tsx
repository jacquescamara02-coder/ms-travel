import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Copy, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { uploadMedia } from "@/components/admin/fields";

export const Route = createFileRoute("/_authenticated/admin/medias")({ component: Medias });

const YEARS = 60 * 60 * 24 * 365 * 20;

function Medias() {
  const qc = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const files = useQuery({
    queryKey: ["admin-media"],
    queryFn: async () => {
      const bucket = supabase.storage.from("site-media");
      const { data: folders } = await bucket.list("", { limit: 1000 });
      const all: { path: string; url: string; video: boolean }[] = [];
      for (const f of folders ?? []) {
        if (f.id) continue; // root-level file
        const { data } = await bucket.list(f.name, { limit: 1000, sortBy: { column: "created_at", order: "desc" } });
        const paths = (data ?? []).map((d) => `${f.name}/${d.name}`);
        if (!paths.length) continue;
        const { data: signed } = await bucket.createSignedUrls(paths, YEARS);
        signed?.forEach((s) => s.signedUrl && all.push({ path: s.path ?? "", url: s.signedUrl, video: /\.(mp4|webm|mov|m4v)$/i.test(s.path ?? "") }));
      }
      return all;
    },
  });
  const upload = async (list: FileList | null) => {
    if (!list?.length) return;
    setBusy(true);
    try {
      for (const f of Array.from(list)) await uploadMedia(f);
      toast.success("Fichiers envoyés.");
    } catch {
      toast.error("Un fichier n'a pas pu être envoyé (200 Mo maximum).");
    }
    setBusy(false);
    qc.invalidateQueries({ queryKey: ["admin-media"] });
  };
  const remove = async (path: string) => {
    if (!confirm("Supprimer ce fichier ? Il disparaîtra des pages qui l'utilisent.")) return;
    await supabase.storage.from("site-media").remove([path]);
    qc.invalidateQueries({ queryKey: ["admin-media"] });
  };
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold text-navy">Médiathèque</h1>
        <input ref={ref} type="file" multiple accept="image/*,video/*" hidden onChange={(e) => upload(e.target.files)} />
        <button onClick={() => ref.current?.click()} disabled={busy} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-5 py-3 text-sm font-semibold text-cta-foreground transition-transform duration-200 hover:-translate-y-0.5">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}Envoyer des fichiers</button>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Copiez l'adresse d'un fichier pour le réutiliser dans n'importe quelle rubrique.</p>
      {files.isLoading && <Loader2 className="mt-8 h-6 w-6 animate-spin text-navy" />}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {files.data?.map((f) => (
          <div key={f.path} className="overflow-hidden rounded-2xl border bg-card">
            {f.video ? <video src={f.url} className="aspect-square w-full object-cover" muted /> : <img src={f.url} alt="" loading="lazy" className="aspect-square w-full object-cover" />}
            <div className="flex justify-between p-2">
              <button className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-navy" onClick={() => { navigator.clipboard.writeText(f.url); toast.success("Adresse copiée"); }}><Copy className="h-3.5 w-3.5" />Copier</button>
              <button aria-label="Supprimer" className="cursor-pointer text-destructive" onClick={() => remove(f.path)}><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
      {files.data && !files.data.length && <p className="mt-6 text-muted-foreground">Aucun fichier pour l'instant.</p>}
    </div>
  );
}
