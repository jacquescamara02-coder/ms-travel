import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUp, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { btn, FacebookIcon, InstagramIcon, Logo, WhatsAppIcon } from "./primitives";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/destinations", label: "Destinations" },
  { to: "/a-propos", label: "À propos" },
  { to: "/blog", label: "Blog" },
  { to: "/nouveautes", label: "Nouveautés" },
] as const;

function Socials({ className }: { className?: string }) {
  const items = [
    { href: CONTACT.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: CONTACT.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: CONTACT.whatsappUrl, label: "WhatsApp", Icon: WhatsAppIcon },
  ];
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="orbit-border-btn grid h-8 w-8 place-items-center rounded-full border border-navy-foreground/15 text-navy-foreground/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold">
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={cn("hidden bg-navy text-navy-foreground/80 transition-all duration-300 md:block", scrolled ? "h-0 overflow-hidden opacity-0" : "h-10 opacity-100")}>
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-xs">
          <div className="flex items-center gap-6">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 transition-colors hover:text-gold"><Mail className="h-3.5 w-3.5" />{CONTACT.email}</a>
            <a href={CONTACT.phone1Href} className="flex items-center gap-2 transition-colors hover:text-gold"><Phone className="h-3.5 w-3.5" />{CONTACT.phone1}</a>
            <a href={CONTACT.phone2Href} className="transition-colors hover:text-gold">{CONTACT.phone2}</a>
          </div>
          <Socials />
        </div>
      </div>
      <div className={cn("transition-all duration-300", scrolled ? "bg-navy shadow-soft border-b border-gold/20" : "bg-navy/95")}>
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-6" aria-label="Navigation principale">
          <Link to="/" aria-label="M-S TRAVEL — Accueil"><Logo /></Link>
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className={cn("relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200", isActive(n.to) ? "text-gold" : "text-navy-foreground/85 hover:text-navy-foreground")}>
                  {n.label}
                  {isActive(n.to) && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold" />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Link to="/reservation" className={cn(btn({ variant: "cta", size: "sm" }), "hidden sm:inline-flex")}>Réserver</Link>
            <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full glass-light text-navy-foreground lg:hidden" aria-label="Ouvrir le menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>
      {/* Mobile full-screen menu */}
      <div className={cn("fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-navy-gradient grain transition-all duration-500 lg:hidden", open ? "visible opacity-100" : "invisible opacity-0")} aria-hidden={!open}>
        <div className="flex h-20 shrink-0 items-center justify-between px-5">
          <Logo />
          <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full glass-light text-navy-foreground" aria-label="Fermer le menu"><X className="h-5 w-5" /></button>
        </div>
        <ul className="mt-4 flex-1 space-y-1 px-6">
          {NAV.map((n, i) => (
            <li key={n.to} style={{ transitionDelay: `${open ? 80 + i * 60 : 0}ms` }} className={cn("transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
              <Link to={n.to} className={cn("block py-2.5 font-display text-3xl font-extrabold", isActive(n.to) ? "text-gold" : "text-navy-foreground")}>{n.label}</Link>
            </li>
          ))}
        </ul>
        <div className="shrink-0 space-y-4 px-6 pb-10 pt-6">
          <Link to="/reservation" onClick={() => setOpen(false)} className={cn(btn({ variant: "cta", size: "lg" }), "w-full")}>Réserver</Link>
          <div className="flex items-center justify-between text-sm text-navy-foreground/75">
            <a href={CONTACT.phone2Href}>{CONTACT.phone2}</a>
            <Socials />
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const col = "space-y-3 text-sm text-navy-foreground/70";
  const link = "transition-colors duration-200 hover:text-gold";
  return (
    <footer className="bg-navy-gradient grain relative overflow-hidden text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-6 text-sm leading-relaxed text-navy-foreground/70">Votre partenaire de confiance pour voyager en toute sérénité depuis Ouagadougou, Burkina Faso.</p>
          <p className="mt-3 text-sm text-navy-foreground/70">BP : {CONTACT.bp}</p>
          <Socials className="mt-6" />
        </div>
        <div>
          <h3 className="eyebrow text-gold">Navigation</h3>
          <ul className={cn(col, "mt-5")}>
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className={link}>{n.label}</Link></li>)}
            <li><Link to="/reservation" className={link}>Réservation</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-gold">Services</h3>
          <ul className={cn(col, "mt-5")}>
            {["Billetterie Aérienne", "Demande de Visa", "Hadj & Omra", "Réservation Hôtel", "Circuits Touristiques"].map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-gold">Offres</h3>
          <ul className={cn(col, "mt-5")}>
            <li><Link to="/destinations" hash="dubai" className={link}>Dubaï</Link></li>
            <li><Link to="/nouveautes" className={link}>Hadj 2025</Link></li>
            <li><Link to="/destinations" hash="thailande" className={link}>Thaïlande</Link></li>
            <li><Link to="/destinations" hash="turquie" className={link}>Turquie</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-gold">Contact</h3>
          <ul className={cn(col, "mt-5")}>
            <li><a href={CONTACT.phone1Href} className={link}>{CONTACT.phone1}</a></li>
            <li><a href={CONTACT.phone2Href} className={link}>{CONTACT.phone2}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a></li>
            <li><a href={`mailto:${CONTACT.emailSecondary}`} className={link}>{CONTACT.emailSecondary}</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{CONTACT.addressShort}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-navy-foreground/55 md:flex-row md:pr-24">
          <p>© 2026 M-S TRAVEL — Tous droits réservés</p>
          <p>Designed by Leano Studio</p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setShow(window.scrollY > 500);
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const C = 2 * Math.PI * 22;
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Remonter en haut de la page"
        className={cn("relative grid h-12 w-12 place-items-center rounded-full bg-navy text-gold shadow-soft transition-all duration-300 hover:-translate-y-1", show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0")}
      >
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden>
          <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
          <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} strokeLinecap="round" />
        </svg>
        <ArrowUp className="h-5 w-5" />
      </button>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Discuter sur WhatsApp" className="orbit-border-btn relative grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-navy shadow-soft transition-transform duration-300 hover:scale-110">
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring" aria-hidden />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
    </div>
  );
}
