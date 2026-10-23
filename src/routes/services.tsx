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

import { PageHero } from "@/components/site/sections";
import heroWing from "@/assets/hero-wing.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Nos services — Billets, Visa tourisme, Hadj & Omra | M-S TRAVEL" },
    { name: "description", content: "Billetterie aérienne, visa tourisme, Hadj & Omra, hôtels et circuits depuis Ouagadougou. Découvrez tous les services de M-S TRAVEL." },
    { property: "og:title", content: "Les services de M-S TRAVEL" },
    { property: "og:description", content: "Billets d'avion, visas tourisme, pèlerinages et séjours organisés depuis le Burkina Faso." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ServicesPage,
});

const ICONS = { plane: Plane, stamp: Stamp, moon: Moon, hotel: BedDouble, map: Compass, headset: Headset };

function ServicesPage() {
  return (
    <>
      <PageHero image={heroWing} badge="Ce que nous faisons" title={<>Nos <span className="text-gold-gradient">Services</span></>} text="De la billetterie aux circuits clé-en-main, nous gérons chaque détail de votre voyage avec professionnalisme depuis Ouagadougou.">
        <Link to="/reservation" className={btn({ variant: "cta", size: "lg" })}>Réserver maintenant</Link>
        <a href="#hadj" className={btn({ variant: "ghostLight", size: "lg" })}>Hadj & Omra</a>
      </PageHero>
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
      <section id="hadj" className="relative isolate scroll-mt-24 overflow-hidden bg-navy py-24 text-navy-foreground md:py-32">
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
    </>
  );
}
