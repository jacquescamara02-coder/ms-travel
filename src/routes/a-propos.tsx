import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Eye, Handshake, Heart, Inbox, Mail, MapPin, Phone, Quote, ShieldCheck, Target, Zap } from "lucide-react";
import office from "@/assets/about-office.jpg";
import directeur from "@/assets/about-directeur-operations.jpg.asset.json";
import { CONTACT } from "@/lib/site-data";
import { btn, Counter, Reveal, SectionHeading, Tilt } from "@/components/site/primitives";
import { PageHero, StatsBand } from "@/components/site/sections";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — M-S TRAVEL, agence de voyage à Ouagadougou depuis 10+ ans" },
      { name: "description", content: "Découvrez M-S TRAVEL : plus de 10 ans d'expertise visa tourisme, Hadj & Omra à Ouagadougou. Nos valeurs, notre histoire et notre localisation." },
      { property: "og:title", content: "À propos de M-S TRAVEL" },
      { property: "og:description", content: "Votre agence de voyage de confiance à Ouagadougou depuis plus de 10 ans." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const VALUES = [
  { t: "Confiance", p: "Nous basons notre relation avec chaque client sur la transparence totale. Aucune surprise, aucun frais caché. Votre confiance est notre priorité absolue.", Icon: ShieldCheck },
  { t: "Rapidité", p: "Votre temps est précieux. Nous traitons vos dossiers dans les plus brefs délais et vous tenons informés à chaque étape du processus.", Icon: Zap },
  { t: "Passion", p: "Nous aimons les voyages autant que vous. Cette passion se ressent dans chaque conseil que nous vous donnons et dans l'attention portée à votre dossier.", Icon: Heart },
  { t: "Engagement", p: "Nous nous engageons à obtenir votre visa ou à vous rembourser intégralement. Votre satisfaction est notre réussite.", Icon: Handshake },
];

function About() {
  const mapQ = encodeURIComponent("Échangeur du Nord, Nonsin, Ouagadougou, Burkina Faso");
  return (
    <>
      <PageHero
        image={directeur.url}
        imageClass="object-[18%_0%] md:object-[44%_0%]"
        overlayClass="bg-night-overlay bg-navy/30"
        scrim
        badge="10+ ans d'expérience"
        title={<>À propos de <span className="text-brand-red">M-S TRAVEL</span></>}
        text="Votre agence de voyage de confiance à Ouagadougou depuis plus de 10 ans. Nous transformons vos rêves de voyage en réalité avec professionnalisme et passion."
        bottom={
          <div className="flex flex-wrap gap-8 text-navy-foreground">
            {[[10, "+", "ans d'expérience"], [500, "+", "clients satisfaits"], [14, "+", "destinations"]].map(([v, s, l]) => (
              <div key={l as string}><p className="font-display text-4xl font-extrabold text-gold-gradient"><Counter value={v as number} suffix={s as string} /></p><p className="text-sm text-navy-foreground/70">{l}</p></div>
            ))}
          </div>
        }
      >
        <a href="#histoire" className={btn({ variant: "cta", size: "lg" })}>Découvrir notre équipe</a>
        <a href="#contact" className={btn({ variant: "ghostLight", size: "lg" })}>Nous contacter</a>
      </PageHero>

      <section id="histoire" className="mx-auto grid max-w-7xl scroll-mt-24 items-center gap-14 px-6 py-24 md:py-32 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={office} alt="L'équipe M-S TRAVEL accueille un client" loading="lazy" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-soft" />
          <div className="absolute -bottom-6 -left-2 rounded-3xl bg-navy p-6 text-navy-foreground shadow-soft md:-left-6">
            <p className="font-display text-5xl font-extrabold text-gold-gradient"><Counter value={10} suffix="+" /></p>
            <p className="text-xs font-bold uppercase tracking-widest">Années</p>
          </div>
        </Reveal>
        <div>
          <SectionHeading center={false} eyebrow="Notre histoire" title={<>Qui sommes-nous — <span className="text-brand-red">M-S TRAVEL</span></>} />
          <Reveal delay={100} className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p className="font-display text-lg font-bold text-navy">Votre partenaire de confiance pour vos voyages.</p>
            <p>M-S TRAVEL est une agence de voyages basée à <strong className="text-navy">Ouagadougou, Burkina Faso</strong>, fondée en <strong className="text-navy">janvier 2020</strong> par M. Ould Ahmad Nouradine BARRY. Elle s'appuie sur l'expérience de son fondateur dans le secteur de la billetterie aérienne et sur une ambition claire : accompagner ses clients dans leurs projets de voyage avec <strong className="text-navy">professionnalisme, disponibilité et rigueur</strong>.</p>
            <p>Notre engagement est de proposer un accompagnement adapté aux besoins de chaque client, en privilégiant la <strong className="text-navy">qualité du service</strong>, la <strong className="text-navy">transparence des informations</strong> et l'établissement de <strong className="text-navy">relations durables</strong>. L'agence est née de la volonté de mettre une expérience professionnelle approfondie du secteur du voyage au service des particuliers, des entreprises et des organisations.</p>
            <p>Nous accordons une importance particulière à la <strong className="text-navy">rigueur</strong>, à la qualité du travail et au respect des engagements pris envers nos clients, avec une communication claire sur les prestations proposées, les conditions applicables et les informations utiles à la préparation des voyages. Nous plaçons les besoins de nos clients au centre de notre démarche et privilégions des relations professionnelles fondées sur le respect mutuel et la recherche de bénéfices durables.</p>
            <p>Notre spécialité : <strong className="text-navy">tous les types de visa</strong> — tourisme, études, travail, affaires, immigration — vers le monde entier (pays arabes, espace Schengen, Royaume-Uni, Canada, États-Unis), ainsi que l'organisation du <strong className="text-navy">Hadj et de l'Omra</strong>.</p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Traitement rapide des dossiers", "Équipe professionnelle", "Billets au meilleur prix", "Prix compétitifs garantis", "Suivi personnalisé A à Z", "Disponibilité 7j/7"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-semibold text-navy"><Check className="h-4 w-4 text-gold" />{t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={300} className="mt-10"><Link to="/destinations" className={btn({ variant: "navy", size: "lg" })}>Voir nos destinations <ArrowRight className="h-5 w-5" /></Link></Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Tilt className="h-full">
              <article className="group h-full rounded-3xl border bg-card p-8 shadow-soft">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold transition-transform duration-500 group-hover:-rotate-6"><Target className="h-7 w-7" /></span>
                <h3 className="mt-6 text-2xl font-extrabold text-navy">Notre mission</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">Faciliter l'organisation des voyages en proposant des solutions adaptées aux besoins des clients, un accompagnement professionnel et une assistance attentive à chaque étape de leur parcours.</p>
              </article>
            </Tilt>
          </Reveal>
          <Reveal delay={120}>
            <Tilt className="h-full">
              <article className="group h-full rounded-3xl border bg-card p-8 shadow-soft">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold transition-transform duration-500 group-hover:-rotate-6"><Eye className="h-7 w-7" /></span>
                <h3 className="mt-6 text-2xl font-extrabold text-navy">Notre vision</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">Faire de M-S TRAVEL une agence de voyages de référence au Burkina Faso, reconnue pour son professionnalisme, la fiabilité de ses services, la qualité de son accompagnement et la solidité de ses relations avec ses clients et partenaires.</p>
              </article>
            </Tilt>
          </Reveal>
        </div>
        <Reveal delay={200} className="mt-8">
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">Les prestations effectivement disponibles sont communiquées par notre équipe selon la demande du client et les possibilités de prise en charge.</p>
        </Reveal>
      </section>

      {/* Notre dirigeant */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow="Notre dirigeant" title={<>M. Ould Ahmad Nouradine <span className="text-brand-red">BARRY</span></>} text="Fondateur et Gérant de M-S TRAVEL" />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-3xl border bg-card p-8 shadow-soft md:p-10">
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gold-gradient font-display text-2xl font-extrabold text-navy shadow-gold">MB</span>
                <div>
                  <p className="font-display text-xl font-extrabold text-navy">M. Ould Ahmad Nouradine BARRY</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Fondateur &amp; Gérant</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                <p>Entrepreneur burkinabè et professionnel du voyage, il cumule plus de <strong className="text-navy">quatorze années d'expérience</strong> dans le domaine de la billetterie aérienne. Son parcours, marqué par douze années d'exercice comme <strong className="text-navy">chef d'agence chez ARAFA VOYAGES de 2012 à 2024</strong>, lui a permis de développer des compétences en gestion d'agence, en relation clientèle et en organisation des prestations de voyage.</p>
                <p>En fondant M-S TRAVEL en <strong className="text-navy">janvier 2020</strong>, il a donné forme à une ambition entrepreneuriale : développer une agence structurée, orientée vers la qualité du service et la confiance des clients.</p>
                <p>Sa vision est de faire progresser durablement l'entreprise, de renforcer ses partenariats et de contribuer au développement économique du Burkina Faso.</p>
              </div>
            </article>
          </Reveal>
          <Reveal delay={120}>
            <article className="flex h-full flex-col rounded-3xl border bg-card p-8 shadow-soft md:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold"><Quote className="h-7 w-7" /></span>
              <h3 className="mt-6 text-2xl font-extrabold text-navy">Pourquoi choisir M-S TRAVEL ?</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">Choisir M-S TRAVEL, c'est bénéficier d'un interlocuteur professionnel pour préparer ses déplacements et être accompagné dans ses démarches de voyage. Notre approche repose sur :</p>
              <ul className="mt-6 space-y-3">
                {[
                  "Une expérience professionnelle dans le secteur de la billetterie aérienne.",
                  "Une écoute attentive des besoins des clients.",
                  "Des informations claires sur les prestations et leurs conditions.",
                  "Un accompagnement adapté aux demandes individuelles et professionnelles.",
                  "Une volonté de construire des relations durables avec les clients et les partenaires.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm font-semibold text-navy"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{t}</li>
                ))}
              </ul>
              <p className="mt-auto border-t pt-6 text-sm italic leading-relaxed text-muted-foreground">Chez M-S TRAVEL, nous considérons chaque projet de voyage comme une responsabilité qui mérite attention, organisation et sérieux. Notre priorité : fournir un service professionnel, communiquer des informations fiables et accompagner chaque client dans la préparation de son déplacement.</p>
            </article>
          </Reveal>
        </div>
      </section>

      <StatsBand stats={[{ value: 500, suffix: "+", label: "Clients satisfaits" }, { value: 14, suffix: "+", label: "Destinations" }, { value: 10, suffix: "+", label: "Ans d'expérience" }, { value: 100, suffix: "%", label: "Visa tourisme" }]} />

      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow="Ce qui nous distingue" title={<>Nos <span className="text-brand-red">Valeurs</span></>} />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ t, p, Icon }, k) => (
            <Reveal key={t} delay={k * 90}>
              <Tilt className="h-full">
                <article className="group h-full rounded-3xl border bg-card p-8 shadow-soft">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-gradient text-navy shadow-gold transition-transform duration-500 group-hover:rotate-[360deg]"><Icon className="h-7 w-7" /></span>
                  <h3 className="mt-6 text-2xl font-extrabold text-navy">{t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p}</p>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-secondary/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Où nous trouver" title={<>Notre <span className="text-brand-red">Localisation</span></>} text="Venez nous rendre visite à notre bureau à Ouagadougou. Notre équipe est disponible pour vous recevoir et étudier votre projet de voyage." />
          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
            <Reveal className="space-y-3">
              {[
                { Icon: MapPin, l: "Adresse", v: CONTACT.address },
                { Icon: Phone, l: "Téléphones", v: `${CONTACT.phone1} | ${CONTACT.phone2}` },
                { Icon: Mail, l: "Email", v: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { Icon: Clock, l: "Horaires", v: CONTACT.hours },
                { Icon: Inbox, l: "Boîte postale", v: `BP : ${CONTACT.bp}, Ouagadougou, Burkina Faso` },
              ].map(({ Icon, l, v, href }) => (
                <div key={l} className="flex gap-4 rounded-2xl border bg-card p-5 transition-all hover:border-gold">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold"><Icon className="h-5 w-5" /></span>
                  <div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{l}</p>{href ? <a href={href} className="font-semibold text-navy hover:text-cta">{v}</a> : <p className="font-semibold text-navy">{v}</p>}</div>
                </div>
              ))}
            </Reveal>
            <Reveal delay={120} className="overflow-hidden rounded-3xl border bg-card shadow-soft">
              <iframe title="Carte — M-S TRAVEL à Nonsin, Ouagadougou" src={`https://www.google.com/maps?q=${mapQ}&output=embed`} className="h-[420px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <div className="flex items-center justify-between p-4">
                <p className="text-sm text-muted-foreground">Nonsin, échangeur du Nord</p>
                <a href={`https://www.google.com/maps/search/?api=1&query=${mapQ}`} target="_blank" rel="noreferrer" className={btn({ variant: "cta", size: "sm" })}>Ouvrir dans Maps</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
