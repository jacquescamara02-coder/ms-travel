import { AnimatedHeading } from "@/components/ui/hero-shutter-text";
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
import { RoundCarousel } from "@/components/site/RoundCarousel";
import { JourneyGallery } from "@/components/site/JourneyGallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M-S TRAVEL — Agence de voyage N°1 à Ouagadougou, Burkina Faso" },
      { name: "description", content: "Billets d'avion au meilleur prix, visas touristiques rapides, Hadj & Omra et hôtels. Agence de voyage de confiance à Ouagadougou depuis plus de 10 ans." },
      { property: "og:title", content: "M-S TRAVEL — Explorez le monde sans limites" },
      { property: "og:description", content: "Billets, visas tourisme, Hadj & Omra : tout depuis Ouagadougou avec M-S TRAVEL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  const s = HERO_SLIDES[i];

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-navy text-navy-foreground" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carrousel" aria-label="Destinations à la une">
      {HERO_SLIDES.map((sl, k) => (
        <div key={sl.code} className={cn("absolute inset-0 -z-20 transition-opacity duration-[1400ms] ease-out", k === i ? "opacity-100" : "opacity-0")} aria-hidden={k !== i}>
          <img src={sl.image} alt="" fetchPriority={k === 0 ? "high" : "low"} loading={k === 0 ? "eager" : "lazy"} className={cn("h-full w-full object-cover brightness-[1.1] saturate-[1.06]", k === i && "animate-kenburns")} />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-night-overlay" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/72 via-navy/22 to-transparent" />
      <div className="grain absolute inset-0 -z-10" />

      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-6 pb-20 pt-36 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass-light px-4 py-2 text-xs font-bold tracking-wider">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" /> AGENCE N°1 — OUAGADOUGOU, BURKINA FASO
            </span>
          </Reveal>
          <Reveal delay={100}><p className="eyebrow mt-8 text-gold">Votre partenaire de voyage de confiance</p></Reveal>
          <Reveal delay={180}>
            <AnimatedHeading as="h1" className="mt-4 text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-[5.5rem]">
              Explorez le monde <span className="text-brand-red">sans limites</span> avec M-S TRAVEL
            </AnimatedHeading>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-navy-foreground/80">Billets d'avion au meilleur prix, visas touristiques rapides et accompagnement complet pour votre Hadj — tout depuis Ouagadougou.</p>
          </Reveal>
          <Reveal delay={340} className="mt-10 flex flex-wrap gap-3">
            <Link to="/reservation" className={btn({ variant: "cta", size: "lg" })}>Réserver maintenant <ArrowRight className="h-5 w-5" /></Link>
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
        <SectionHeading eyebrow="Ce que nous faisons" title={<>Nos <span className="text-brand-red">Services</span></>} text="De la billetterie aux circuits clé-en-main, nous gérons chaque détail de votre voyage avec professionnalisme depuis Ouagadougou." />
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
      <section className="bg-night-gradient grain relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading light center={false} eyebrow="Explorez le monde" title={<>Nos Destinations <span className="text-brand-red">populaires</span></>} text="Visa tourisme rapide et garanti pour des destinations accessibles, sûres et inoubliables." />
            <Reveal><Link to="/destinations" className={btn({ variant: "cta" })}>Toutes les destinations <ArrowRight className="h-4 w-4" /></Link></Reveal>
          </div>
        </div>
        <Reveal className="mt-8">
          <RoundCarousel items={POPULAR.map((p) => { const d = destBySlug(p.slug); return { slug: d.slug, name: d.name, code: d.code, image: d.image, label: p.label }; })} />
        </Reveal>
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
            <SectionHeading center={false} eyebrow="Qui sommes-nous" title={<>À propos de <span className="text-brand-red">M-S TRAVEL</span></>} />
            <Reveal delay={100} className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>M-S TRAVEL est une agence de voyage basée à <strong className="text-navy">Ouagadougou, Burkina Faso</strong>, spécialisée dans l'accompagnement pour <strong className="text-navy">tous les types de visa</strong> et les pèlerinages religieux. Nous mettons un point d'honneur à simplifier vos démarches et à vous permettre de voyager sans stress.</p>
              <p>Nous traitons <strong className="text-navy">tous les types de visa</strong> — tourisme, études, travail, affaires et immigration — vers <strong className="text-navy">toutes les destinations</strong> : pays arabes et Moyen-Orient, espace Schengen, Royaume-Uni, Canada et États-Unis.</p>
              <p><strong className="text-navy">Situés à Nonsin, échangeur du Nord</strong> — immeuble orange après la passerelle, à quelques mètres de la Caisse Populaire de Nonsin. <strong className="text-navy">BP : 17 BP OUAGA 498.</strong></p>
            </Reveal>
            <Reveal delay={200}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Traitement rapide des dossiers", "Équipe professionnelle", "Billets au meilleur prix", "Prix compétitifs garantis", "Suivi personnalisé A à Z", "Disponibilité & réactivité"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm font-semibold text-navy"><Check className="h-4 w-4 text-gold" />{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={300} className="mt-10"><Link to="/services" className={btn({ variant: "cta", size: "lg" })}>Découvrez nos services <ArrowRight className="h-5 w-5" /></Link></Reveal>
          </div>
        </div>
      </section>

      <JourneyGallery />

      {/* Reviews */}
      <section className="py-24 md:py-32">
        <div className="px-6"><SectionHeading eyebrow="Ils nous font confiance" title={<>Avis de nos <span className="text-brand-red">clients</span></>} /></div>
        <div className="mt-14"><Reviews items={REVIEWS_HOME} /></div>
      </section>

      <StatsBand stats={[{ value: 500, suffix: "+", label: "Clients satisfaits" }, { value: 14, suffix: "+", label: "Destinations" }, { value: 10, suffix: "+", label: "Ans d'expérience" }, { value: 100, suffix: "%", label: "Visa tourisme" }]} />
      <Newsletter />

      {/* Final CTA */}
      <section className="px-4 pb-24 md:px-6">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-cta px-8 py-16 text-center text-cta-foreground shadow-cta md:py-20">
          <Plane className="absolute -left-6 top-6 h-32 w-32 -rotate-12 opacity-10" aria-hidden />
          <AnimatedHeading className="text-4xl font-extrabold md:text-6xl">Votre prochain voyage commence ici</AnimatedHeading>
          <p className="mx-auto mt-5 max-w-xl text-lg opacity-90">Visa, billets, hôtel, Hadj : parlez à un conseiller M-S TRAVEL dès maintenant.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/reservation" className={btn({ variant: "navy", size: "lg" })}>Réserver maintenant</Link>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className={btn({ variant: "ghostLight", size: "lg" })}><MessageCircle className="h-5 w-5" />WhatsApp</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}