import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, MessageCircle, Search } from "lucide-react";
import blogHero from "@/assets/hero-blog.jpg";
import { BLOG, CONTACT, type BlogCategory } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { btn, Reveal } from "@/components/site/primitives";
import { BlogCard, PageHero } from "@/components/site/sections";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog & Actualités voyage — Conseils visa, Oumrah | M-S TRAVEL" },
      { name: "description", content: "Guides de destination, conseils pratiques, informations visa et actualités de M-S Travel pour voyager mieux depuis Ouagadougou." },
      { property: "og:title", content: "Blog & Actualités — M-S TRAVEL" },
      { property: "og:description", content: "Conseils voyage, visas et pèlerinages depuis le Burkina Faso." },
    ],
  }),
  component: BlogPage,
});

const CATS: ("Tous" | BlogCategory)[] = ["Tous", "Annonces", "Oumrah & Pèlerinage", "Voyage"];

function BlogPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("Tous");
  const [input, setInput] = useState("");
  const [q, setQ] = useState("");
  const list = useMemo(() => BLOG.filter((p) => (cat === "Tous" || p.category === cat) && (!q || `${p.title} ${p.excerpt}`.toLowerCase().includes(q.toLowerCase()))), [cat, q]);
  const count = (c: BlogCategory) => BLOG.filter((p) => p.category === c).length;

  return (
    <>
      <PageHero image={blogHero} badge="Conseils & actualités voyage" title={<>Blog & <span className="text-gold-gradient">Actualités</span></>} text="Guides de destination, conseils pratiques, informations visa et actualités de M-S Travel. Tout pour voyager mieux depuis Ouagadougou.">
        <form onSubmit={(e) => { e.preventDefault(); setQ(input.trim()); }} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row" role="search">
          <label className="relative flex-1">
            <span className="sr-only">Rechercher un article</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-foreground/60" />
            <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={100} placeholder="Rechercher un article..." className="h-14 w-full rounded-full glass-light pl-11 pr-4 text-navy-foreground placeholder:text-navy-foreground/55 focus:outline-none" />
          </label>
          <button className={btn({ variant: "cta", size: "lg" })}>Rechercher</button>
        </form>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap gap-2" role="tablist">
          {CATS.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={cn("rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200", cat === c ? "bg-navy text-navy-foreground shadow-soft" : "bg-card text-navy hover:bg-accent")}>{c}</button>
          ))}
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="grid content-start gap-6 md:grid-cols-2">
            {list.length === 0 && <p className="text-muted-foreground md:col-span-2">Aucun article ne correspond à votre recherche.</p>}
            {list.map((p, k) => <Reveal key={p.slug} delay={k * 80}><BlogCard p={p} /></Reveal>)}
          </div>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-navy-gradient grain relative overflow-hidden rounded-3xl p-7 text-navy-foreground">
              <h2 className="text-2xl font-extrabold">Votre prochain voyage</h2>
              <p className="mt-3 text-sm text-navy-foreground/75">Visa, billets, séjours... Nos experts vous accompagnent de A à Z.</p>
              <Link to="/reservation" className={cn(btn({ variant: "gold" }), "mt-6 w-full")}>Demander un devis</Link>
            </div>
            <div className="rounded-3xl border bg-card p-7">
              <h2 className="eyebrow text-gold">Catégories</h2>
              <ul className="mt-4 space-y-1">
                {(["Tous", "Annonces", "Oumrah & Pèlerinage", "Voyage"] as const).map((c) => (
                  <li key={c}><button onClick={() => setCat(c)} className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-navy transition-colors hover:bg-accent"><span>{c === "Tous" ? "Tous les articles" : c}</span><span className="rounded-full bg-secondary px-2 text-xs">{c === "Tous" ? BLOG.length : count(c)}</span></button></li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-card p-7">
              <h2 className="eyebrow text-gold">Voir aussi</h2>
              <ul className="mt-4 space-y-3 text-sm font-semibold text-navy">
                <li><Link to="/nouveautes" className="flex items-center justify-between hover:text-cta">Offres & Nouveautés <ArrowRight className="h-4 w-4" /></Link></li>
                <li><Link to="/destinations" className="flex items-center justify-between hover:text-cta">Destinations <ArrowRight className="h-4 w-4" /></Link></li>
                <li><a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-cta">WhatsApp direct <MessageCircle className="h-4 w-4" /></a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
