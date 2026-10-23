import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Calendar, Check, Play, X } from "lucide-react";
import wing from "@/assets/hero-wing.jpg";
import { BLOG, NEWS, waLink, type NewsItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { btn, Reveal, SectionHeading, Tilt } from "@/components/site/primitives";
import { BlogCard, Newsletter, PageHero } from "@/components/site/sections";

export const Route = createFileRoute("/nouveautes")({
  head: () => ({
    meta: [
      { title: "Nouveautés & Offres — Hadj 2027, Forfait Dubaï | M-S TRAVEL" },
      { name: "description", content: "Offres spéciales, Hadj 2027, Camp VIP à La Mecque, Maroc sans visa et forfaits Dubaï : toutes les nouveautés M-S TRAVEL." },
      { property: "og:title", content: "Actualités & Nouveautés M-S TRAVEL" },
      { property: "og:description", content: "Promotions exclusives, pèlerinages et nouvelles destinations depuis Ouagadougou." },
    ],
  }),
  component: News,
});

const CHIPS = ["Tout voir", "Offres", "Actualités", "Vidéos"] as const;

function News() {
  const [f, setF] = useState<(typeof CHIPS)[number]>("Tout voir");
  const [open, setOpen] = useState<NewsItem | null>(null);
  const list = NEWS.filter((n) => f === "Tout voir" || n.kind === f);
  return (
    <>
      <PageHero image={wing} badge="Offres spéciales disponibles" title={<>Actualités & <span className="text-gold-gradient">Nouveautés</span></>} text="Découvrez nos dernières offres, promotions exclusives, nouvelles destinations et conseils voyage. M-S TRAVEL vous garde toujours informé pour voyager mieux.">
        <a href="#offres" className={btn({ variant: "cta", size: "lg" })}>Voir les offres</a>
        <Link to="/blog" className={btn({ variant: "ghostLight", size: "lg" })}>Lire le blog</Link>
      </PageHero>

      <section id="offres" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading center={false} eyebrow="Promotions actuelles" title="Nos Offres & Nouveautés" />
          <Reveal><a href={waLink("Bonjour M-S TRAVEL, je souhaite réserver une de vos offres.")} target="_blank" rel="noreferrer" className={btn({ variant: "cta" })}>Réserver une offre</a></Reveal>
        </div>
        <div className="mt-10 flex flex-wrap gap-2" role="tablist">
          {CHIPS.map((c) => (
            <button key={c} role="tab" aria-selected={f === c} onClick={() => setF(c)} className={cn("rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200", f === c ? "bg-navy text-navy-foreground shadow-soft" : "bg-card text-navy hover:bg-accent")}>{c}</button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((n, k) => (
            <Reveal key={n.id} delay={(k % 3) * 80}>
              <Tilt className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-soft">
                  <button onClick={() => setOpen(n)} className="relative block aspect-[16/10] overflow-hidden text-left" aria-label={`Voir le détail : ${n.title}`}>
                    <img src={n.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-cta px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-cta-foreground">{n.badge}</span>
                    {n.kind === "Vidéos" && <span className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-navy shadow-gold transition-transform group-hover:scale-110"><Play className="ml-1 h-7 w-7 fill-current" /></span>}
                    <span className="absolute bottom-4 left-4 rounded-full glass px-3 py-1 text-xs font-semibold text-navy-foreground">{n.kind}</span>
                  </button>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow text-gold">{n.tag}</p>
                    <h3 className="mt-3 text-xl font-extrabold leading-snug text-navy">{n.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{n.text}</p>
                    {n.price && <p className="mt-4 font-display text-lg font-extrabold text-cta">{n.price}</p>}
                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="h-3.5 w-3.5" />{n.date}</span>
                      <a href={waLink(`Bonjour M-S TRAVEL, je souhaite un devis pour l'offre : ${n.title}`)} target="_blank" rel="noreferrer" className={btn({ variant: "navy", size: "sm" })}>Demander un devis</a>
                    </div>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <Newsletter />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading center={false} eyebrow="Conseils & guides" title="Articles & Conseils" />
          <Reveal><Link to="/blog" className={btn({ variant: "outline" })}>Voir tout le blog <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">{BLOG.map((p, k) => <Reveal key={p.slug} delay={k * 80}><BlogCard p={p} /></Reveal>)}</div>
      </section>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-navy/70 backdrop-blur-sm animate-in fade-in md:items-center md:p-6" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-labelledby="nm-title">
          <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-card animate-in slide-in-from-bottom-8 duration-500 md:rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} autoFocus aria-label="Fermer" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full glass text-navy-foreground"><X className="h-5 w-5" /></button>
            <img src={open.image} alt="" className="aspect-[16/9] w-full object-cover" />
            <div className="p-6 md:p-10">
              <p className="eyebrow text-gold">{open.tag} · {open.date}</p>
              <h2 id="nm-title" className="mt-3 text-3xl font-extrabold text-navy">{open.title}</h2>
              <p className="mt-4 leading-relaxed text-foreground/85">{open.text}</p>
              {open.price && <p className="mt-6 inline-block rounded-2xl bg-accent px-5 py-3 font-display text-xl font-extrabold text-navy">Coût : {open.price}</p>}
              {open.details?.map((d) => (
                <div key={d.label} className="mt-8">
                  <h3 className="text-lg font-extrabold text-navy">{d.label}</h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">{d.items.map((i) => <li key={i} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 shrink-0 text-gold" />{i}</li>)}</ul>
                </div>
              ))}
              <a href={waLink(`Bonjour M-S TRAVEL, je souhaite un devis pour l'offre : ${open.title}`)} target="_blank" rel="noreferrer" className={cn(btn({ variant: "cta", size: "lg" }), "mt-10 w-full")}>Demander un devis</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
