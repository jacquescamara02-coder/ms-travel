import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Download, MessageCircle, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { input } from "@/components/admin/fields";

export const Route = createFileRoute("/_authenticated/admin/demandes")({ component: Requests });

function csv(rows: Record<string, unknown>[], name: string) {
  if (!rows.length) return;
  const cols = Object.keys(rows[0]!);
  const esc = (v: unknown) => `"${String(typeof v === "object" ? JSON.stringify(v) : v ?? "").replace(/"/g, '""')}"`;
  const blob = new Blob([[cols.join(";"), ...rows.map((r) => cols.map((c) => esc(r[c])).join(";"))].join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}

function Requests() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<"req" | "nl">("req");
  const [q, setQ] = useState("");
  const req = useQuery({ queryKey: ["admin-requests"], queryFn: async () => (await supabase.from("booking_requests").select("*").order("created_at", { ascending: false })).data ?? [] });
  const nl = useQuery({ queryKey: ["admin-subs"], queryFn: async () => (await supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false })).data ?? [] });
  const list = useMemo(() => (req.data ?? []).filter((r) => JSON.stringify(r).toLowerCase().includes(q.toLowerCase())), [req.data, q]);

  const del = async (table: "booking_requests" | "newsletter_subscribers", id: string) => {
    if (!confirm("Supprimer définitivement ?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) { toast.error("Suppression impossible."); return; }
    qc.invalidateQueries({ queryKey: [table === "booking_requests" ? "admin-requests" : "admin-subs"] });
  };

  const tabCls = (on: boolean) => `cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${on ? "bg-navy text-navy-foreground" : "bg-card text-navy hover:bg-secondary"}`;
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-navy">Demandes & abonnés</h1>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button className={tabCls(tab === "req")} onClick={() => setTab("req")}>Demandes ({req.data?.length ?? 0})</button>
        <button className={tabCls(tab === "nl")} onClick={() => setTab("nl")}>Newsletter ({nl.data?.length ?? 0})</button>
        <button className="ml-auto inline-flex cursor-pointer items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold text-navy hover:bg-secondary" onClick={() => csv((tab === "req" ? list : nl.data ?? []) as Record<string, unknown>[], tab === "req" ? "demandes.csv" : "abonnes.csv")}><Download className="h-4 w-4" />Exporter</button>
      </div>
      {tab === "req" ? (
        <>
          <div className="relative mt-5"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input className={`${input} pl-9`} placeholder="Rechercher un nom, un e-mail, une destination…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <div className="mt-5 space-y-3">
            {list.map((r) => (
              <details key={r.id} className="rounded-2xl border bg-card p-4 shadow-soft">
                <summary className="flex cursor-pointer flex-wrap items-center gap-3">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase text-navy">{r.request_type}</span>
                  <span className="font-bold text-navy">{r.first_name} {r.last_name}</span>
                  <span className="text-sm text-muted-foreground">{new Date(r.created_at).toLocaleString("fr-FR")}</span>
                </summary>
                <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  <p><strong>E-mail :</strong> <a className="text-navy underline" href={`mailto:${r.email}`}>{r.email}</a></p>
                  <p><strong>WhatsApp :</strong> {r.whatsapp}</p>
                  {Object.entries((r.details ?? {}) as Record<string, unknown>).map(([k, v]) => <p key={k}><strong>{k} :</strong> {String(typeof v === "object" ? JSON.stringify(v) : v)}</p>)}
                </div>
                <div className="mt-4 flex gap-2">
                  <a href={`https://wa.me/${r.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-navy-foreground"><MessageCircle className="h-4 w-4" />WhatsApp</a>
                  <button onClick={() => del("booking_requests", r.id)} className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" />Supprimer</button>
                </div>
              </details>
            ))}
            {!list.length && <p className="text-muted-foreground">Aucune demande.</p>}
          </div>
        </>
      ) : (
        <div className="mt-5 divide-y rounded-2xl border bg-card">
          {(nl.data ?? []).map((s) => (
            <div key={s.id} className="flex items-center justify-between p-4 text-sm">
              <span className="font-semibold text-navy">{s.email}</span>
              <span className="flex items-center gap-3 text-muted-foreground">{new Date(s.created_at).toLocaleDateString("fr-FR")}<button aria-label="Supprimer" onClick={() => del("newsletter_subscribers", s.id)} className="cursor-pointer text-destructive"><Trash2 className="h-4 w-4" /></button></span>
            </div>
          ))}
          {!nl.data?.length && <p className="p-4 text-muted-foreground">Aucun abonné.</p>}
        </div>
      )}
    </div>
  );
}
