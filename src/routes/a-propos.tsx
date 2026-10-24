import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Heart, Mail, MapPin, Phone, ShieldCheck, Zap, Handshake, Inbox } from "lucide-react";
import office from "@/assets/about-office.jpg";
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
        image={office}
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
            <p>M-S TRAVEL est une agence de voyage basée à <strong className="text-navy">Ouagadougou, Burkina Faso</strong>, fondée par des passionnés du voyage et des experts en tourisme international. Depuis plus de 10 ans, nous accompagnons les Burkinabè et les ressortissants de la sous-région dans leurs projets de voyages.</p>
            <p>Notre spécialité : <strong className="text-navy">tous les types de visa</strong> — tourisme, études, travail, affaires, immigration — vers le monde entier (pays arabes, espace Schengen, Royaume-Uni, Canada, États-Unis), ainsi que l'organisation du <strong className="text-navy">Hadj et de l'Omra</strong>. Nous croyons que chaque personne mérite de voir le monde. C'est pourquoi nous mettons notre expertise au service de ceux qui souhaitent voyager sereinement, sans stress et sans mauvaises surprises.</p>
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
