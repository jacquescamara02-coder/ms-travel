import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, BedDouble, Check, ChevronLeft, ChevronRight, Compass, Headset, MapPin, Moon, Phone, Plane, Stamp, Star, MessageCircle } from "lucide-react";
import couple from "@/assets/couple-passport.jpg";
import office from "@/assets/about-office.jpg";
import mecca from "@/assets/dest-arabie.jpg";
import {
  BLOG, CONTACT, DESTINATIONS, FAQ_HOME, HERO_SLIDES, NEWS, PARTNER_TILES, POPULAR, REVIEWS_HOME, SEO_SERVICES, SERVICES, VISA_CARDS, destBySlug, waLink,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { btn, Counter, Reveal, SectionHeading, Tilt } from "@/components/site/primitives";
import { BlogCard, Faq, Newsletter, Reviews, StatsBand } from "@/components/site/sections";
import { BookingModule } from "@/components/site/BookingModule";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M-S TRAVEL — Agence de voyage N°1 à Ouagadougou, Burkina Faso" },
      { name: "description", content: "Billets d'avion au meilleur prix, visas touristiques rapides, Hadj & Omra et hôtels. Agence de voyage de confiance à Ouagadougou depuis plus de 10 ans." },
      { property: "og:title", content: "M-S TRAVEL — Explorez le monde sans limites" },
      { property: "og:description", content: "Billets, visas tourisme, Hadj & Omra : tout depuis Ouagadougou avec M-S TRAVEL." },
    ],
  }),
  component: Home,
});

const ICONS = { plane: Plane, stamp: Stamp, moon: Moon, hotel: BedDouble, map: Compass, headset: Headset };
const SLIDE_MS = 6500;

function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = HERO_SLIDES.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i, paused, go]);
  const s = HERO_SLIDES[i]!;

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-navy text-navy-foreground" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carrousel" aria-label="Destinations à la une">
      {HERO_SLIDES.map((sl, k) => (
        <div key={sl.code} className={cn("absolute inset-0 -z-20 transition-opacity duration-[1400ms] ease-out", k === i ? "opacity-100" : "opacity-0")} aria-hidden={k !== i}>
          <img src={sl.image} alt="" fetchPriority={k === 0 ? "high" : "low"} loading={k === 0 ? "eager" : "lazy"} className={cn("h-full w-full object-cover", k === i && "animate-kenburns")} />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-night-overlay" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/85 via-navy/30 to-transparent" />
      <div className="grain absolute inset-0 -z-10" />

      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-6 pb-40 pt-36 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass-light px-4 py-2 text-xs font-bold tracking-wider">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" /> AGENCE N°1 — OUAGADOUGOU, BURKINA FASO
            </span>
          </Reveal>
          <Reveal delay={100}><p className="eyebrow mt-8 text-gold">Votre partenaire de voyage de confiance</p></Reveal>
          <Reveal delay={180}>
            <h1 className="mt-4 text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-[5.5rem]">
              Explorez le monde <span className="text-gold-gradient">sans limites</span> avec M-S TRAVEL
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-navy-foreground/80">Billets d'avion au meilleur prix, visas touristiques rapides et accompagnement complet pour votre Hadj — tout depuis Ouagadougou.</p>
          </Reveal>
          <Reveal delay={340} className="mt-10 flex flex-wrap gap-3">
            <a href="#reservation" className={btn({ variant: "cta", size: "lg" })}>Réserver maintenant <ArrowRight className="h-5 w-5" /></a>
            <Link to="/destinations" className={btn({ variant: "ghostLight", size: "lg" })}>Voir les destinations</Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:ml-auto lg:w-80">
          {[
            { v: 500, s: "+", l: "Clients satisfaits" },
            { v: 14, s: "+", l: "Destinations" },
            { v: 10, s: "+", l: "Ans d'expérience" },
            { v: 100, s: "%", l: "Confiance" },
          ].map((st, k) => (
            <Reveal key={st.l} delay={400 + k * 90}>
              <div className={cn("rounded-2xl glass p-5 transition-transform duration-300 hover:-translate-y-1", k % 2 === 1 && "lg:translate-y-6")}>
                <p className="font-display text-4xl font-extrabold text-gold-gradient"><Counter value={st.v} suffix={st.s} /></p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-navy-foreground/75">{st.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Caption + controls */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="flex gap-1.5" role="tablist" aria-label="Choisir une destination">
            {HERO_SLIDES.map((sl, k) => (
              <button key={sl.code} onClick={() => setI(k)} role="tab" aria-selected={k === i} aria-label={sl.name} className="group relative h-1 w-8 overflow-hidden rounded-full bg-navy-foreground/25 sm:w-12">
                {k === i && <span key={`${i}-${paused}`} className="absolute inset-0 origin-left bg-gold" style={{ animation: paused ? "none" : `progress ${SLIDE_MS}ms linear forwards`, transform: paused ? "scaleX(1)" : undefined }} />}
                {k < i && <span className="absolute inset-0 bg-navy-foreground/60" />}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5 md:pr-20">
            <div key={s.code} className="text-right animate-in fade-in slide-in-from-bottom-2 duration-700" aria-live="polite">
              <p className="eyebrow text-gold">{s.code} · {String(i + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}</p>
              <p className="font-display text-2xl font-extrabold">{s.name}</p>
              <p className="text-sm text-navy-foreground/70">{s.tagline}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(-1)} aria-label="Destination précédente" className="grid h-12 w-12 place-items-center rounded-full glass-light transition-all hover:border-gold hover:text-gold"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={() => go(1)} aria-label="Destination suivante" className="grid h-12 w-12 place-items-center rounded-full glass-light transition-all hover:border-gold hover:text-gold"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const names = DESTINATIONS.map((d) => d.name);
  const all = [...names, ...names];
  return (
    <div className="overflow-hidden border-y border-navy-foreground/10 bg-navy py-5 text-navy-foreground" aria-hidden>
      <div className="flex w-max animate-marquee gap-10">
        {all.map((n, k) => (
          <span key={k} className="flex items-center gap-10 font-display text-2xl font-bold uppercase tracking-tight text-navy-foreground/80">
            {n}<Plane className="h-5 w-5 text-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <HeroSlider />
      <Marquee />

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow="Ce que nous faisons" title={<>Nos <span className="text-gold-gradient">Services</span></>} text="De la billetterie aux circuits clé-en-main, nous gérons chaque détail de votre voyage avec professionnalisme depuis Ouagadougou." />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, k) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.title} delay={k * 80}>
                <Tilt className="h-full">
                  <article className="group relative h-full overflow-hidden rounded-3xl border bg-card p-8 shadow-soft">
                    <span className="absolute right-6 top-4 font-display text-7xl font-extrabold text-secondary transition-colors duration-300 group-hover:text-accent">{String(k + 1).padStart(2, "0")}</span>
                    <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"><Icon className="h-7 w-7" /></span>
                    <h3 className="relative mt-8 text-2xl font-extrabold text-navy">{s.title}</h3>
                    <p className="relative mt-3 leading-relaxed text-muted-foreground">{s.text}</p>
                    <span className="absolute inset-x-8 bottom-0 h-1 origin-left scale-x-0 rounded-full bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100" />
                  </article>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Popular destinations carousel */}
      <section className="bg-navy-gradient grain relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading light center={false} eyebrow="Explorez le monde" title={<>Nos Destinations <span className="text-gold-gradient">populaires</span></>} text="Visa tourisme rapide et garanti pour des destinations accessibles, sûres et inoubliables." />
            <Reveal><Link to="/destinations" className={btn({ variant: "gold" })}>Toutes les destinations <ArrowRight className="h-4 w-4" /></Link></Reveal>
          </div>
        </div>
        <div className="mt-14 overflow-hidden">
          <div className="flex w-max gap-5 px-6 animate-marquee [animation-duration:70s] hover:[animation-play-state:paused]">
            {[...POPULAR, ...POPULAR].map((p, k) => {
              const d = destBySlug(p.slug);
              return (
                <Link key={k} to="/destinations" hash={d.slug} className="group relative h-[420px] w-[280px] shrink-0 overflow-hidden rounded-3xl">
                  <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-xs font-bold text-navy-foreground">{d.code}</span>
                  <div className="absolute inset-x-5 bottom-5 text-navy-foreground">
                    <p className="eyebrow text-gold">{p.label}</p>
                    <p className="mt-1 font-display text-3xl font-extrabold">{d.name}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100">Découvrir <ArrowRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner countries */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow="Nos pays partenaires" title="Destinations Touristiques" text="Spécialisés dans les destinations à procédures rapides et garanties. Pas de visa Europe, USA ou Canada." />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {PARTNER_TILES.map((slug, k) => {
            const d = destBySlug(slug);
            return (
              <Reveal key={slug} delay={k * 70}>
                <Link to="/destinations" hash={slug} className="group relative block aspect-[4/3] overflow-hidden rounded-3xl">
                  <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-baseline gap-2 text-navy-foreground">
                    <span className="font-display text-2xl font-extrabold md:text-3xl">{d.name}</span>
                    <span className="text-sm font-bold text-gold">{d.code}</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Visa Tourisme */}
      <section className="bg-secondary/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Procédures simplifiées" title={<>Visa <span className="text-gold-gradient">Tourisme</span></>} text="Chez M-S TRAVEL, nous croyons que le tourisme est une porte vers la liberté. Nous vous accompagnons pas à pas pour des destinations fascinantes." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VISA_CARDS.map((v, k) => {
              const d = destBySlug(v.slug);
              return (
                <Reveal key={v.slug} delay={k * 60}>
                  <Tilt className="h-full">
                    <article className="group flex h-full flex-col rounded-3xl border bg-card p-6 shadow-soft">
                      <div className="flex items-center justify-between">
                        <span className="h-12 w-12 overflow-hidden rounded-2xl"><img src={d.image} alt="" loading="lazy" className="h-full w-full object-cover" /></span>
                        <span className="rounded-full bg-navy px-3 py-1 font-display text-xs font-bold text-gold">{d.code}</span>
                      </div>
                      <h3 className="mt-5 text-xl font-extrabold text-navy">{d.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                    </article>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mx-auto mt-14 max-w-4xl rounded-3xl border-l-4 border-cta bg-card p-8 shadow-soft">
            <p className="eyebrow text-cta">Informations importantes</p>
            <p className="mt-3 leading-relaxed text-foreground/85">Nous ne faisons pas de visa d'études, de travail ou de regroupement familial. Nous ne traitons pas les demandes pour les pays européens, américains ou canadiens. Nos services concernent uniquement les visas touristiques pour des destinations accessibles, rapides et sûres.</p>
          </Reveal>
        </div>
      </section>

      {/* Hadj & Omra */}
      <section className="relative isolate overflow-hidden bg-navy py-24 text-navy-foreground md:py-32">
        <img src={mecca} alt="La Kaaba et les pèlerins à La Mecque" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <SectionHeading light center={false} eyebrow="Voyage spirituel" title={<>Hadj <span className="text-gold-gradient">& Omra</span></>} />
            <Reveal delay={100}>
              <p className="mt-6 text-lg leading-relaxed text-navy-foreground/80">Le pèlerinage n'est pas qu'un simple déplacement, c'est l'<strong className="text-gold">accomplissement d'une vie spirituelle</strong>. Chez M-S TRAVEL, nous prenons soin de chaque détail pour que votre voyage vers la Mecque soit fluide, serein et mémorable.</p>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {["Assistance complète pour votre visa et vos documents", "Formation et accompagnement avant le départ", "Gestion de la billetterie et de l'hébergement à La Mecque", "Suivi jusqu'à votre arrivée sur les lieux saints", "Guide spirituel et logistique sur place"].map((t, k) => (
                <Reveal as="li" key={t} delay={150 + k * 60} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold text-navy"><Check className="h-4 w-4" /></span>{t}
                </Reveal>
              ))}
            </ul>
            <Reveal delay={500} className="mt-10">
              <a href={waLink("Bonjour M-S TRAVEL, je souhaite un accompagnement pour le Hadj / la Omra.")} target="_blank" rel="noreferrer" className={btn({ variant: "gold", size: "lg" })}>
                <MessageCircle className="h-5 w-5" /> Demander mon accompagnement
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="reservation" className="scroll-mt-24 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.6fr]">
            <div className="lg:sticky lg:top-28">
              <SectionHeading center={false} eyebrow="Commencez l'aventure" title={<>Réservez votre voyage <span className="text-gold-gradient">maintenant</span></>} text="Remplissez le formulaire et notre équipe vous contactera rapidement pour organiser votre voyage idéal." />
              <Reveal delay={100} className="relative mt-8 hidden overflow-hidden rounded-3xl lg:block">
                <img src={couple} alt="Couple souriant tenant passeports et billets" loading="lazy" className="aspect-[4/5] w-full object-cover" />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl glass p-4 text-navy-foreground">
                  <p className="eyebrow text-gold">Appelez-nous</p>
                  <p className="mt-1 font-display font-bold">{CONTACT.phone1} | {CONTACT.phone2}</p>
                </div>
              </Reveal>
              <div className="mt-6 grid gap-3">
                <a href={CONTACT.phone1Href} className="flex items-center gap-4 rounded-2xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold"><Phone className="h-5 w-5" /></span>
                  <span><span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Téléphone</span><span className="font-semibold text-navy">{CONTACT.phone1} | {CONTACT.phone2}</span></span>
                </a>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-whatsapp text-navy"><MessageCircle className="h-5 w-5" /></span>
                  <span><span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">WhatsApp</span><span className="font-semibold text-navy">{CONTACT.phone2}</span></span>
                </a>
                <div className="flex items-start gap-4 rounded-2xl border bg-card p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold"><MapPin className="h-5 w-5" /></span>
                  <span><span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Adresse</span><span className="text-sm text-navy">Nonsin, échangeur du Nord — Immeuble orange après la passerelle, Ouagadougou. BP : {CONTACT.bp}</span></span>
                </div>
              </div>
            </div>
            <Reveal delay={150}><BookingModule /></Reveal>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-secondary/60 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <Reveal className="relative">
            <img src={office} alt="Conseillère M-S TRAVEL accueillant un client" loading="lazy" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-soft" />
            <div className="absolute -bottom-6 -right-2 rounded-3xl bg-gold-gradient p-6 text-navy shadow-gold md:-right-6">
              <p className="font-display text-5xl font-extrabold"><Counter value={10} suffix="+" /></p>
              <p className="text-xs font-bold uppercase tracking-widest">Ans d'expérience</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading center={false} eyebrow="Qui sommes-nous" title={<>À propos de <span className="text-gold-gradient">M-S TRAVEL</span></>} />
            <Reveal delay={100} className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>M-S TRAVEL est une agence de voyage basée à <strong className="text-navy">Ouagadougou, Burkina Faso</strong>, spécialisée dans l'accompagnement pour les visas touristiques et les pèlerinages religieux. Nous mettons un point d'honneur à simplifier vos démarches et à vous permettre de voyager sans stress.</p>
              <p>Nous ne faisons pas de visa d'étude, de travail ni de regroupement familial. Aucun visa pour le <strong className="text-navy">Canada, les États-Unis ni les pays européens</strong>. Notre expertise se concentre sur les <strong className="text-navy">voyages touristiques et spirituels</strong> vers des destinations accessibles et sûres.</p>
              <p><strong className="text-navy">Situés à Nonsin, échangeur du Nord</strong> — immeuble orange après la passerelle, à quelques mètres de la Caisse Populaire de Nonsin. <strong className="text-navy">BP : 17 BP OUAGA 498.</strong></p>
            </Reveal>
            <Reveal delay={200}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Traitement rapide des dossiers", "Équipe professionnelle", "Billets au meilleur prix", "Prix compétitifs garantis", "Suivi personnalisé A à Z", "Disponibilité & réactivité"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm font-semibold text-navy"><Check className="h-4 w-4 text-gold" />{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={300} className="mt-10"><Link to="/a-propos" className={btn({ variant: "navy", size: "lg" })}>Découvrez nos services <ArrowRight className="h-5 w-5" /></Link></Reveal>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 md:py-32">
        <div className="px-6"><SectionHeading eyebrow="Ils nous font confiance" title={<>Avis de nos <span className="text-gold-gradient">clients</span></>} /></div>
        <div className="mt-14"><Reviews items={REVIEWS_HOME} /></div>
      </section>

      <StatsBand stats={[{ value: 500, suffix: "+", label: "Clients satisfaits" }, { value: 14, suffix: "+", label: "Destinations" }, { value: 10, suffix: "+", label: "Ans d'expérience" }, { value: 100, suffix: "%", label: "Visa tourisme" }]} />

      {/* Latest news */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading center={false} eyebrow="Promotions actuelles" title="Dernières nouveautés" />
          <Reveal><Link to="/nouveautes" className={btn({ variant: "outline" })}>Toutes les nouveautés <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {NEWS.slice(0, 3).map((n, k) => (
            <Reveal key={n.id} delay={k * 80}>
              <Tilt className="h-full">
                <Link to="/nouveautes" className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-soft">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={n.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute left-4 top-4 rounded-full bg-cta px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-cta-foreground">{n.badge}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow text-gold">{n.tag} · {n.date}</p>
                    <h3 className="mt-3 line-clamp-2 text-lg font-extrabold text-navy">{n.title}</h3>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SEO block */}
      <section className="bg-secondary/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-4xl">
            <p className="eyebrow text-gold">Votre agence au Burkina Faso</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy md:text-5xl">Agence de Voyage au Burkina Faso spécialisée dans les Billets d'Avion, Visas, Hadj, Omra et Voyages Internationaux</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">M-S Travel est une agence de voyage basée à Ouagadougou au Burkina Faso, spécialisée dans l'organisation complète de voyages internationaux. Nous accompagnons les particuliers, les entreprises, les ONG, les institutions et les professionnels dans la réservation de billets d'avion, les demandes de visa, les réservations d'hôtels, les assurances voyage, les voyages d'affaires, les séjours touristiques, le Hadj, la Omra ainsi que toutes les formalités administratives liées au voyage.</p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { t: "Pourquoi choisir M-S Travel ?", p: "Voyager demande une organisation rigoureuse. Notre équipe accompagne chaque client depuis la préparation du dossier jusqu'au retour de voyage. Nous recherchons les meilleurs itinéraires, les meilleurs tarifs et les solutions les plus adaptées selon votre budget et votre destination. Notre objectif est simple : rendre chaque voyage plus simple, plus rapide et plus sécurisé." },
              { t: "Destinations populaires", p: "Nous accompagnons nos voyageurs vers de nombreuses destinations internationales telles que Dubai, Turquie, Thaïlande, Chine, Maroc, Arabie Saoudite, Qatar, France, Canada, États-Unis, Royaume-Uni ainsi que plusieurs pays d'Europe, d'Afrique, d'Asie et du Moyen-Orient." },
              { t: "Agence de voyage à Ouagadougou", p: "Si vous recherchez une agence de voyage fiable à Ouagadougou ou au Burkina Faso, M-S Travel met à votre disposition des conseillers expérimentés capables de gérer toutes les étapes de votre projet de voyage : réservation de billet d'avion, obtention de visa, organisation touristique, accompagnement administratif et assistance avant, pendant et après votre départ." },
            ].map((b, k) => (
              <Reveal key={b.t} delay={k * 80} className="rounded-3xl border bg-card p-8 shadow-soft">
                <h2 className="text-2xl font-extrabold text-navy">{b.t}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{b.p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16">
            <h2 className="text-3xl font-extrabold text-navy">Nos principaux services</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SEO_SERVICES.map((s) => (
                <li key={s} className="flex items-center gap-3 rounded-2xl border bg-card px-5 py-4 text-sm font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-gold">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-gold"><Check className="h-4 w-4" /></span>{s}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="mt-20">
            <SectionHeading eyebrow="FAQ" title="Questions fréquentes" />
            <div className="mt-10"><Faq items={FAQ_HOME} /></div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading center={false} eyebrow="Actualités & conseils" title="Notre Blog Voyage" />
          <Reveal><Link to="/blog" className={btn({ variant: "outline" })}>Tous les articles <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[BLOG[0]!, BLOG[2]!].map((p, k) => <Reveal key={p.slug} delay={k * 80}><BlogCard p={p} /></Reveal>)}
        </div>
      </section>

      <Newsletter />

      {/* Final CTA */}
      <section className="px-4 pb-24 md:px-6">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-cta px-8 py-16 text-center text-cta-foreground shadow-cta md:py-20">
          <Plane className="absolute -left-6 top-6 h-32 w-32 -rotate-12 opacity-10" aria-hidden />
          <h2 className="text-4xl font-extrabold md:text-6xl">Votre prochain voyage commence ici</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg opacity-90">Visa, billets, hôtel, Hadj : parlez à un conseiller M-S TRAVEL dès maintenant.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#reservation" className={btn({ variant: "navy", size: "lg" })}>Réserver maintenant</a>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className={btn({ variant: "ghostLight", size: "lg" })}><MessageCircle className="h-5 w-5" />WhatsApp</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
