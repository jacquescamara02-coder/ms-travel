import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Search, X } from "lucide-react";
import wing from "@/assets/dest-dubai.jpg";
import { CONTACT, DESTINATIONS, FAQ_DEST, REVIEWS_DEST, waLink, type Destination, type Region } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { btn, Reveal, SectionHeading } from "@/components/site/primitives";
import { DestinationCard, Faq, ImportantInfo, PageHero, Reviews, StatsBand } from "@/components/site/sections";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations Visa Tourisme — 14 pays | M-S TRAVEL Ouagadougou" },
      { name: "description", content: "Dubaï, Turquie, Thaïlande, Maroc, Kenya, Qatar… 14 destinations visa tourisme garanties depuis Ouagadougou avec M-S TRAVEL." },
      { property: "og:title", content: "Explorez nos 14 destinations visa tourisme" },
      { property: "og:description", content: "Visas tourisme, billets et séjours vers l'Afrique, l'Asie et le Moyen-Orient depuis le Burkina Faso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DestinationsPage,
});

const FILTERS: ("Toutes" | Region)[] = ["Toutes", "Asie", "Moyen-Orient", "Afrique"];
const ORDER: Region[] = ["Moyen-Orient", "Asie", "Afrique"];

function DestinationsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Toutes");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Destination | null>(null);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    return DESTINATIONS.filter((d) => (filter === "Toutes" || d.region === filter) && (!s || `${d.name} ${d.tagline} ${d.code}`.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(s)));
  }, [filter, q]);
  const count = (r: Region) => DESTINATIONS.filter((d) => d.region === r).length;

  return (
    <>
      <PageHero
        image={wing}
        badge="14 destinations disponibles"
        title={<>Explorez nos <span className="text-gold-gradient">Destinations</span> Visa Tourisme</>}
        text="Du Burkina Faso vers le monde — M-S TRAVEL vous accompagne pour vos visas tourisme, billets d'avion et séjours organisés vers les plus belles destinations d'Afrique, d'Asie et du Moyen-Orient."
        bottom={
          <div className="grid max-w-3xl grid-cols-3 gap-3">
            {[["14", "Destinations"], ["10+", "Ans d'expérience"], ["3–5j", "Délai visa Dubaï"]].map(([v, l]) => (
              <div key={l} className="rounded-2xl glass p-4"><p className="font-display text-3xl font-extrabold text-gold-gradient">{v}</p><p className="text-xs uppercase tracking-wider text-navy-foreground/70">{l}</p></div>
            ))}
          </div>
        }
      >
        <a href="#liste" className={btn({ variant: "cta", size: "lg" })}>Voir toutes les destinations</a>
        <Link to="/reservation" className={btn({ variant: "ghostLight", size: "lg" })}>Réserver maintenant</Link>
      </PageHero>

      <div id="liste" className="sticky top-20 z-30 scroll-mt-20 border-b glass-light bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Filtrer par région">
            {FILTERS.map((f) => (
              <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={cn("shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200", filter === f ? "bg-navy text-navy-foreground shadow-soft" : "bg-card text-navy hover:bg-accent")}>
                {f} ({f === "Toutes" ? DESTINATIONS.length : count(f)})
              </button>
            ))}
          </div>
          <label className="relative md:w-80">
            <span className="sr-only">Rechercher une destination</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une destination..." className="h-11 w-full rounded-full border bg-card pl-11 pr-4 text-sm focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/15" />
          </label>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {list.length === 0 && <p className="py-20 text-center text-muted-foreground">Aucune destination ne correspond à « {q} ».</p>}
        {ORDER.map((r) => {
          const items = list.filter((d) => d.region === r);
          if (!items.length) return null;
          return (
            <div key={r} className="mb-20 last:mb-0">
              <Reveal><h2 className="flex items-baseline gap-3 text-3xl font-extrabold text-navy md:text-4xl">{r}<span className="text-base font-semibold text-gold">— {items.length} destination{items.length > 1 ? "s" : ""}</span></h2></Reveal>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((d, k) => <Reveal key={d.slug} delay={(k % 3) * 80}><DestinationCard d={d} onMore={() => setOpen(d)} /></Reveal>)}
              </div>
            </div>
          );
        })}
      </section>

      <StatsBand stats={[{ value: 14, label: "Destinations visa tourisme" }, { value: 100, suffix: "%", label: "Spécialisés visa tourisme" }, { value: 10, suffix: "+", label: "Ans d'expérience" }, { value: 0, display: "3–5j", label: "Délai moyen visa Dubaï" }]} />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading eyebrow="M-S TRAVEL en chiffres" title="Votre agence de confiance depuis Ouagadougou" text="Plus de 10 ans d'expertise au service des voyageurs du Burkina Faso vers le monde entier avec sérieux, fiabilité et passion." />
        <div className="mt-20">
          <SectionHeading eyebrow="Comment ça marche" title={<>Obtenez votre visa en <span className="text-gold-gradient">4 étapes simples</span></>} text="M-S TRAVEL s'occupe de tout depuis Ouagadougou. Vous déposez votre dossier, nous faisons le reste." />
          <ol className="relative mt-14 grid gap-6 md:grid-cols-4">
            <span className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold to-transparent md:block" aria-hidden />
            {[
              ["Contactez-nous", "Appelez ou WhatsApp le +226 58 27 07 07. Décrivez votre destination et projet de voyage. Conseil gratuit et immédiat."],
              ["Déposez le dossier", "Nous vous indiquons précisément les documents requis. Vous les déposez à notre bureau à Nonsin, Ouagadougou."],
              ["On s'occupe de tout", "Notre équipe traite votre demande auprès de l'ambassade avec suivi en temps réel jusqu'à l'obtention du visa."],
              ["Partez sereinement", "Visa en main ! Nous pouvons aussi vous aider pour le billet d'avion, l'hôtel et l'assurance voyage."],
            ].map(([t, p], k) => (
              <Reveal as="li" key={t} delay={k * 120} className="relative text-center">
                <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-navy font-display text-2xl font-extrabold text-gold shadow-soft ring-8 ring-background">{k + 1}</span>
                <h3 className="mt-6 text-xl font-extrabold text-navy">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="mt-24"><ImportantInfo /></div>
      </section>

      <section className="bg-secondary/60 py-24">
        <div className="px-6"><SectionHeading eyebrow="Ils nous font confiance" title="Avis de nos clients" /></div>
        <div className="mt-12"><Reviews items={REVIEWS_DEST} /></div>
      </section>

      <section className="px-6 py-24">
        <SectionHeading eyebrow="Questions fréquentes" title="FAQ Destinations & Visas" />
        <div className="mt-10"><Faq items={FAQ_DEST} /></div>
      </section>

      {open && <DestinationModal d={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function DestinationModal({ d, onClose }: { d: Destination; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-navy/70 p-0 backdrop-blur-sm animate-in fade-in duration-300 md:items-center md:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="dm-title">
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] bg-card shadow-soft animate-in slide-in-from-bottom-8 duration-500 md:rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} autoFocus aria-label="Fermer" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full glass text-navy-foreground transition-transform hover:rotate-90"><X className="h-5 w-5" /></button>
        <div className="relative aspect-[16/9]">
          <img src={d.image} alt={d.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
          <div className="absolute bottom-6 left-6 text-navy-foreground">
            <p className="eyebrow text-gold">{d.code} · {d.tagline}</p>
            <h2 id="dm-title" className="text-4xl font-extrabold md:text-5xl">{d.name}</h2>
          </div>
        </div>
        <div className="p-6 md:p-10">
          <p className="text-lg leading-relaxed text-foreground/85">{d.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">{d.chips.map((c) => <span key={c} className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-navy">{c}</span>)}</div>
          <p className="mt-6 flex items-center gap-2 font-semibold text-success"><Check className="h-5 w-5" />{d.check}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/reservation" onClick={onClose} className={btn({ variant: "cta", size: "lg" })}>Demander mon visa <ArrowRight className="h-5 w-5" /></Link>
            <a href={waLink(`Bonjour M-S TRAVEL, je souhaite des informations sur un voyage / visa pour : ${d.name}.`)} target="_blank" rel="noreferrer" className={btn({ variant: "outline", size: "lg" })}>WhatsApp {CONTACT.phone2}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
