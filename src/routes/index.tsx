import { AnimatedHeading } from "@/components/ui/hero-shutter-text";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  BedDouble,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  Headset,
  MapPin,
  MessageCircle,
  Moon,
  Plane,
  ShieldCheck,
  Stamp,
  Star,
} from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg.asset.json";
import {
  CONTACT,
  HERO_SLIDES,
  PAGE_HEROES,
  POPULAR,
  REVIEWS_HOME,
  SERVICES,
  destBySlug,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { btn, Counter, Reveal, SectionHeading } from "@/components/site/primitives";
import { Newsletter, Reviews, StatsBand } from "@/components/site/sections";
import { Marked } from "@/components/site/ExtraContent";
import { JourneyGallery } from "@/components/site/JourneyGallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M-S TRAVEL — Agence de voyage à Ouagadougou, Burkina Faso" },
      { name: "description", content: "Billets d'avion, visas, Hadj & Omra et hôtels avec un accompagnement personnalisé depuis Ouagadougou." },
      { property: "og:title", content: "M-S TRAVEL — Votre prochain voyage commence ici" },
      { property: "og:description", content: "Billets, visas, séjours et pèlerinages — préparons votre prochain départ ensemble." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

type RequestKind = "billet" | "visa" | "hotel";

const SERVICE_OPTIONS: {
  id: RequestKind;
  label: string;
  detail: string;
  Icon: typeof Plane;
}[] = [
  { id: "billet", label: "Billet", detail: "Comparer les options et préparer votre demande.", Icon: Plane },
  { id: "visa", label: "Visa", detail: "Faire vérifier les formalités de votre destination.", Icon: Stamp },
  { id: "hotel", label: "Hôtel", detail: "Trouver un hébergement adapté à votre séjour.", Icon: BedDouble },
];

const SERVICE_ICONS = {
  plane: Plane,
  stamp: Stamp,
  moon: Moon,
  hotel: BedDouble,
  map: Compass,
  headset: Headset,
};

const SLIDE_MS = 6500;

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [requestType, setRequestType] = useState<RequestKind>("billet");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const total = HERO_SLIDES.length;
  const go = useCallback((step: number) => setIndex((current) => (current + step + total) % total), [total]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const paused = hovered || focused || reducedMotion;
  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => go(1), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, go]);

  const current = HERO_SLIDES[index];
  const hero = PAGE_HEROES["accueil"] ?? {};
  const selectedService = SERVICE_OPTIONS.find((item) => item.id === requestType)!;

  return (
    <section
      className="travel-hero relative isolate min-h-[780px] overflow-hidden bg-navy text-navy-foreground lg:min-h-[calc(100svh-2.5rem)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      aria-roledescription="carrousel"
      aria-label="Destinations inspirantes"
    >
      {HERO_SLIDES.map((slide, slideIndex) => (
        <div
          key={slide.code}
          className={cn(
            "absolute inset-0 -z-20 transition-opacity duration-1000 ease-out",
            slideIndex === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={slideIndex !== index}
        >
          <img
            src={slide.image}
            alt=""
            fetchPriority={slideIndex === 0 ? "high" : "low"}
            loading={slideIndex === 0 ? "eager" : "lazy"}
            className={cn(
              "h-full w-full object-cover",
              slideIndex === index && "animate-kenburns",
            )}
          />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,35,48,.92)_0%,rgba(4,49,63,.74)_48%,rgba(4,49,63,.18)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(3,35,48,.58),transparent_48%)]" />

      <div className="mx-auto grid min-h-[780px] max-w-7xl items-center gap-12 px-5 pb-28 pt-36 sm:px-8 lg:min-h-[calc(100svh-2.5rem)] lg:grid-cols-[1.08fr_.82fr] lg:gap-16 lg:px-10 lg:pb-32">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-wide text-white backdrop-blur-md">
              <MapPin className="h-3.5 w-3.5 text-sky-300" />
              OUAGADOUGOU · BURKINA FASO
            </span>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mt-8 text-sky-200">Votre agence, à chaque étape</p>
          </Reveal>
          <Reveal delay={180}>
            <AnimatedHeading
              as="h1"
              className="mt-4 max-w-3xl text-[clamp(3.2rem,7vw,6.25rem)] font-extrabold leading-[.94] tracking-[-.045em]"
            >
              {hero.title ? (
                <Marked text={hero.title} />
              ) : (
                <>
                  Le monde vous attend. <span className="text-[#71d4ed]">Partons.</span>
                </>
              )}
            </AnimatedHeading>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              {hero.text ||
                "Billets, visas, séjours et voyages spirituels : nous simplifions la préparation pour que vous puissiez vous concentrer sur le départ."}
            </p>
          </Reveal>
          <Reveal delay={340} className="mt-8 flex flex-wrap gap-3">
            <Link to="/destinations" className={btn({ variant: "cta", size: "lg" })}>
              Explorer les destinations <ArrowRight className="h-5 w-5" />
            </Link>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className={btn({ variant: "ghostLight", size: "lg" })}>
              <MessageCircle className="h-5 w-5" /> Parler à un conseiller
            </a>
          </Reveal>
          <Reveal delay={420} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-white/80">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sky-300" /> Suivi personnalisé</span>
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-sky-300" /> Réponse rapide</span>
          </Reveal>
        </div>

        <Reveal delay={220} className="lg:ml-auto lg:w-full lg:max-w-[450px]">
          <aside className="home-trip-card rounded-[1.75rem] border border-white/70 bg-white p-5 text-foreground shadow-[0_30px_80px_-28px_rgba(0,0,0,.5)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-primary">Organisons la suite</p>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">Quel est votre projet ?</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Choisissez un service pour démarrer votre demande.</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-primary"><Compass className="h-5 w-5" /></span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2" role="group" aria-label="Choisir un service">
              {SERVICE_OPTIONS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={requestType === id}
                  onClick={() => setRequestType(id)}
                  className={cn(
                    "flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-sm font-bold transition-all duration-200",
                    requestType === id
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "border-border bg-background text-navy hover:border-primary/50 hover:bg-secondary/70",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              ))}
            </div>

            <p className="mt-4 min-h-10 text-sm leading-relaxed text-muted-foreground" aria-live="polite">
              {selectedService.detail}
            </p>

            <Link
              to="/reservation"
              search={{ kind: requestType }}
              className={cn(btn({ variant: "cta", size: "lg" }), "mt-3 w-full")}
            >
              Continuer ma demande <ArrowRight className="h-5 w-5" />
            </Link>

            <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Check className="h-4 w-4" /></span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Aucun paiement en ligne. Un conseiller vous accompagne pour la suite.
              </p>
            </div>
          </aside>
        </Reveal>
      </div>

      <div className="absolute bottom-6 right-5 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-navy/45 px-2 py-1.5 text-white backdrop-blur-md sm:bottom-8 sm:right-8">
        <span className="px-2 text-xs font-bold tracking-wider" aria-live="polite" aria-atomic="true">
          {current.name} · {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
        <button type="button" onClick={() => go(-1)} aria-label="Destination précédente" className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/15">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1" role="group" aria-label="Choisir une destination">
          {HERO_SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.code}
              type="button"
              onClick={() => setIndex(slideIndex)}
              aria-label={`Afficher ${slide.name}`}
              aria-current={slideIndex === index ? "true" : undefined}
              className={cn("h-1.5 rounded-full bg-white/45 transition-all", slideIndex === index ? "w-5 bg-white" : "w-1.5 hover:bg-white")}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Destination suivante" className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/15">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

function Home() {
  const destinations = POPULAR.slice(0, 4).map((item) => ({
    ...destBySlug(item.slug),
    label: item.label,
  }));

  return (
    <>
      <HeroSlider />

      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-white shadow-[0_22px_60px_-34px_rgba(6,56,74,.4)] sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: 10, suffix: "+", label: "ans d'expérience" },
            { value: 500, suffix: "+", label: "voyageurs accompagnés" },
            { value: 14, suffix: "", label: "destinations" },
            { value: 7, suffix: "/7", label: "à vos côtés" },
          ].map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70} className={cn("flex items-center gap-4 px-5 py-5 sm:px-7", index > 0 && "border-t border-border sm:border-l sm:border-t-0")}>
              <p className="font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="max-w-28 text-xs font-bold uppercase leading-relaxed tracking-wide text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <SectionHeading
            center={false}
            eyebrow="Un seul interlocuteur"
            title={<>Tout le voyage, <span className="text-brand-red">bien accompagné.</span></>}
            text="Des premiers documents jusqu'au jour du départ, notre équipe simplifie les démarches et reste disponible."
          />
          <Reveal className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Link to="/services" className={btn({ variant: "outline" })}>Voir tous les services <ArrowRight className="h-4 w-4" /></Link>
            <a href={CONTACT.phone1Href} className="text-sm font-bold text-primary transition-colors hover:text-brand-red">{CONTACT.phone1}</a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <Reveal key={service.title} delay={(index % 3) * 70}>
                <article className="service-card group flex h-full min-h-56 flex-col rounded-3xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-soft sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-4xl font-extrabold text-secondary transition-colors group-hover:text-sky-200">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight text-navy">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="destination-section overflow-hidden bg-[#f0f7f8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              center={false}
              eyebrow="Choisissez votre horizon"
              title={<>Des destinations, <span className="text-brand-red">des possibles.</span></>}
              text="Des escapades ensoleillées aux voyages spirituels, trouvons le bon itinéraire pour vous."
            />
            <Reveal><Link to="/destinations" className={btn({ variant: "navy" })}>Toutes les destinations <ArrowRight className="h-4 w-4" /></Link></Reveal>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <Reveal key={destination.slug} delay={index * 60}>
                <Link to="/destinations" hash={destination.slug} className="destination-tile group relative block min-h-[340px] overflow-hidden rounded-[1.5rem] bg-navy text-white shadow-soft sm:min-h-[400px]">
                  <img src={destination.image} alt={`${destination.name} — ${destination.tagline}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                  <span className="destination-scrim absolute inset-0" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-navy/25 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-white backdrop-blur-sm">{destination.code} · {destination.region}</span>
                  <span className="absolute inset-x-5 bottom-5">
                    <span className="eyebrow block text-sky-200">{destination.label}</span>
                    <span className="mt-2 flex items-end justify-between gap-2">
                      <span className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{destination.name}</span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-primary transition-transform group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[2rem]">
            <img src={aboutTeam.url} alt="Un conseiller M-S TRAVEL à l'accueil de son bureau" loading="lazy" className="aspect-[4/3] w-full object-cover sm:aspect-[5/4]" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-navy/35 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">Une agence de proximité</span>
          </div>
          <div className="absolute -bottom-6 right-3 rounded-2xl bg-white px-5 py-4 shadow-soft sm:-right-5 sm:px-7">
            <p className="font-display text-4xl font-extrabold text-primary"><Counter value={10} suffix="+" /></p>
            <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">Années d'expérience</p>
          </div>
        </Reveal>
        <div>
          <SectionHeading
            center={false}
            eyebrow="M-S TRAVEL · Ouagadougou"
            title={<>Le conseil d'ici, <span className="text-brand-red">l'horizon partout.</span></>}
            text="Nous connaissons les démarches, les questions et les imprévus qui accompagnent un départ. Notre rôle : vous aider à partir préparé et bien entouré."
          />
          <Reveal delay={120}>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Un conseiller à votre écoute",
                "Des informations claires sur les étapes",
                "Un suivi adapté à votre demande",
                "Un point de contact à Ouagadougou",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-navy">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Check className="h-3 w-3" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200} className="mt-9 flex flex-wrap gap-3">
            <Link to="/a-propos" className={btn({ variant: "navy", size: "lg" })}>Notre histoire <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/reservation" search={{ kind: "billet" }} className={btn({ variant: "outline", size: "lg" })}>Préparer mon voyage</Link>
          </Reveal>
        </div>
      </section>

      <JourneyGallery />

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Simple, étape par étape"
            title={<>Du premier échange <span className="text-brand-red">au départ.</span></>}
            text="Vous gardez le fil. Notre équipe vous guide dans les démarches liées à votre projet."
          />
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Parlons du projet", "Destination, dates et service : nous commençons par comprendre votre besoin."],
              ["02", "Préparons le dossier", "Vous recevez les informations utiles et les prochaines étapes."],
              ["03", "Suivons l'avancement", "Un conseiller reste votre point de contact tout au long du traitement."],
              ["04", "Partez sereinement", "Billet, visa, hôtel ou pèlerinage : les détails sont prêts pour le départ."],
            ].map(([number, title, text], index) => (
              <Reveal key={number} delay={index * 70}>
                <li className="h-full rounded-3xl border border-border bg-background p-6 sm:p-7">
                  <span className="font-display text-sm font-extrabold tracking-[.2em] text-brand-red">{number}</span>
                  <h3 className="mt-7 font-display text-xl font-extrabold text-navy">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#f0f7f8] py-24 md:py-32">
        <div className="px-5 sm:px-8"><SectionHeading eyebrow="Des voyageurs, des histoires" title={<>Ils sont partis avec <span className="text-brand-red">M-S TRAVEL</span></>} /></div>
        <div className="mt-12"><Reviews items={REVIEWS_HOME} /></div>
      </section>

      <StatsBand stats={[
        { value: 500, suffix: "+", label: "Voyageurs accompagnés" },
        { value: 14, label: "Destinations" },
        { value: 10, suffix: "+", label: "Ans dans le voyage" },
        { value: 100, suffix: "%", label: "À l'écoute de votre projet" },
      ]} />

      <Newsletter />

      <section className="px-5 pb-20 sm:px-8 md:pb-28">
        <Reveal className="travel-final-cta relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-navy px-6 py-14 text-white shadow-soft sm:px-10 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(43,170,213,.32),transparent_34%),linear-gradient(120deg,#06384A,#0D4255)]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="eyebrow text-sky-200">Prêt à commencer ?</p>
            <AnimatedHeading className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">Votre prochain départ mérite une bonne préparation.</AnimatedHeading>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75">Parlez-nous de votre projet : un conseiller M-S TRAVEL vous aidera à choisir la suite.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/reservation" search={{ kind: "billet" }} className={btn({ variant: "cta", size: "lg" })}>Commencer ma demande <ArrowRight className="h-5 w-5" /></Link>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className={btn({ variant: "ghostLight", size: "lg" })}><MessageCircle className="h-5 w-5" /> WhatsApp</a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
