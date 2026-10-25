import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Image as ImageIcon, Inbox, LayoutDashboard, Loader2, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ENTRIES } from "@/lib/content-registry";
import logo from "@/assets/ms-travel-logo.png.asset.json";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Tableau administrateur — M-S TRAVEL" },
      { name: "description", content: "Gestion complète du contenu du site M-S TRAVEL." },
      { property: "og:title", content: "Tableau administrateur — M-S TRAVEL" },
      { property: "og:description", content: "Gestion complète du contenu du site M-S TRAVEL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const groups = Array.from(new Set(ENTRIES.map((e) => e.group)));
const linkCls = "flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-navy-foreground/80 transition-colors duration-200 hover:bg-navy-foreground/10 hover:text-navy-foreground";
const activeCls = "!bg-cta !text-cta-foreground";

function AdminLayout() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const role = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      if (error) throw error;
      return data;
    },
  });

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (role.isLoading) return <div className="grid min-h-screen place-items-center"><Loader2 className="h-8 w-8 animate-spin text-navy" /></div>;
  if (!role.data)
    return (
      <div className="grid min-h-screen place-items-center px-6 text-center">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Accès réservé</h1>
          <p className="mt-2 text-muted-foreground">Ce compte n'a pas les droits administrateur.</p>
          <button onClick={signOut} className="mt-6 cursor-pointer rounded-full bg-cta px-6 py-3 font-semibold text-cta-foreground">Se déconnecter</button>
        </div>
      </div>
    );

  const nav = (
    <nav className="flex flex-col gap-1" onClick={() => setOpen(false)}>
      <Link to="/admin" activeOptions={{ exact: true }} className={linkCls} activeProps={{ className: activeCls }}><LayoutDashboard className="h-4 w-4" />Vue d'ensemble</Link>
      <Link to="/admin/demandes" className={linkCls} activeProps={{ className: activeCls }}><Inbox className="h-4 w-4" />Demandes & abonnés</Link>
      <Link to="/admin/medias" className={linkCls} activeProps={{ className: activeCls }}><ImageIcon className="h-4 w-4" />Médiathèque</Link>
      {groups.map((g) => (
        <div key={g} className="mt-4">
          <p className="px-3 pb-1 text-[0.65rem] font-bold uppercase tracking-widest text-gold">{g}</p>
          {ENTRIES.filter((e) => e.group === g).map((e) => (
            <Link key={e.key} to="/admin/contenu/$key" params={{ key: e.key }} className={linkCls} activeProps={{ className: activeCls }}>{e.label}</Link>
          ))}
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-secondary/40 lg:grid lg:grid-cols-[280px_1fr]">
      <aside className={`bg-navy-gradient fixed inset-y-0 left-0 z-40 w-[280px] overflow-y-auto p-5 text-navy-foreground transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-6 flex items-center justify-between">
          <img src={logo.url} alt="M-S TRAVEL" className="h-10 w-auto rounded-lg bg-card p-1" />
          <button className="cursor-pointer lg:hidden" onClick={() => setOpen(false)} aria-label="Fermer le menu"><X className="h-5 w-5" /></button>
        </div>
        {nav}
        <div className="mt-6 border-t border-navy-foreground/15 pt-4">
          <a href="/" target="_blank" rel="noreferrer" className={linkCls}><ExternalLink className="h-4 w-4" />Voir le site</a>
          <button onClick={signOut} className={`${linkCls} w-full`}><LogOut className="h-4 w-4" />Se déconnecter</button>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-card/95 px-5 py-3 backdrop-blur">
          <button className="cursor-pointer lg:hidden" onClick={() => setOpen(true)} aria-label="Ouvrir le menu"><Menu className="h-5 w-5 text-navy" /></button>
          <p className="text-sm font-bold text-navy">Tableau administrateur</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </header>
        <main className="mx-auto max-w-5xl p-5 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
