import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ENTRIES } from "@/lib/content-registry";
import { BLOG, DESTINATIONS, NEWS, VIDEOS } from "@/lib/site-data";

export const Route = createFileRoute("/_authenticated/admin/")({ component: Overview });

function Overview() {
  const counts = useQuery({
    queryKey: ["admin-counts"],
    queryFn: async () => {
      const [r, n] = await Promise.all([
        supabase.from("booking_requests").select("id", { count: "exact", head: true }),
        supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
      ]);
      return { requests: r.count ?? 0, subscribers: n.count ?? 0 };
    },
  });
  const stats = [
    { l: "Demandes reçues", v: counts.data?.requests ?? "…" },
    { l: "Abonnés newsletter", v: counts.data?.subscribers ?? "…" },
    { l: "Destinations", v: DESTINATIONS.length },
    { l: "Nouveautés", v: NEWS.length },
    { l: "Articles", v: BLOG.length },
    { l: "Vidéos", v: VIDEOS.length },
  ];
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-navy">Bienvenue</h1>
      <p className="mt-1 text-muted-foreground">Modifiez ici chaque partie du site. Chaque enregistrement est visible immédiatement sur le site.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.l} className="rounded-2xl border bg-card p-5 shadow-soft">
            <p className="font-display text-3xl font-extrabold text-navy">{s.v}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-10 text-xl font-extrabold text-navy">Toutes les rubriques</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {ENTRIES.map((e) => (
          <Link key={e.key} to="/admin/contenu/$key" params={{ key: e.key }} className="group flex cursor-pointer items-center justify-between rounded-2xl border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft">
            <span><span className="block font-bold text-navy">{e.label}</span><span className="text-xs text-muted-foreground">{e.group}{e.description ? ` — ${e.description}` : ""}</span></span>
            <ArrowRight className="h-4 w-4 shrink-0 text-cta transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
