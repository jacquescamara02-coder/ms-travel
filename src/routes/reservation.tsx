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
import { PageBack } from "@/components/site/PageBack";

export const Route = createFileRoute("/reservation")({
  validateSearch: (search: Record<string, unknown>): { kind: "billet" | "hotel" | "visa" } => ({
    kind: search.kind === "visa" || search.kind === "hotel" ? search.kind : "billet",
  }),
  head: () => ({ meta: [
    { title: "Réservation — Billet, hôtel ou visa | M-S TRAVEL Ouagadougou" },
    { name: "description", content: "Demandez votre billet d'avion, votre hôtel ou votre visa tourisme en ligne. Réponse sous 30 min en jours ouvrés via WhatsApp." },
    { property: "og:title", content: "Réservez votre voyage avec M-S TRAVEL" },
    { property: "og:description", content: "Billets, hôtels et visas tourisme : envoyez votre demande en 2 minutes." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ReservationPage,
});

function ReservationPage() {
  const { kind } = Route.useSearch();
  return (
    <>
      <div className="bg-navy-gradient grain h-28" aria-hidden />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <PageBack />
          <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.6fr]">
            <div className="lg:sticky lg:top-28">
              <SectionHeading center={false} eyebrow="Commencez l'aventure" title={<>Réservez votre voyage <span className="text-brand-red">maintenant</span></>} text="Remplissez le formulaire et notre équipe vous contactera rapidement pour organiser votre voyage idéal." />
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
            <Reveal delay={150}><BookingModule initialKind={kind} /></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
