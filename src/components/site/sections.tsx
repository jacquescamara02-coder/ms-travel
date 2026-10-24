import { AnimatedHeading } from "@/components/ui/hero-shutter-text";
import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Loader2, Mail, Plus, Quote } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost, Destination } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { btn, Counter, Reveal, SectionHeading, Stars, Tilt } from "./primitives";
import { PageBack } from "./PageBack";

export function PageHero({ image, badge, title, text, children, bottom }: { image: string; badge: string; title: ReactNode; text: string; children?: ReactNode; bottom?: ReactNode }) {
  return (
    <section className="relative isolate flex min-h-[86vh] items-end overflow-hidden bg-navy pb-16 pt-40 text-navy-foreground">
      <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover animate-kenburns" />
      <div className="absolute inset-0 -z-10 bg-night-overlay bg-navy/15" />
      <div className="grain absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <PageBack />
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2 rounded-full glass-light px-4 py-2 text-gold">{badge}</span>
        </Reveal>
        <Reveal delay={100}>
          <AnimatedHeading as="h1" className="mt-6 max-w-4xl text-5xl font-extrabold leading-[0.98] md:text-7xl">{title}</AnimatedHeading>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-foreground/80">{text}</p>
        </Reveal>
        {children && <Reveal delay={300} className="mt-9 flex flex-wrap gap-3">{children}</Reveal>}
        {bottom && <Reveal delay={400} className="mt-14">{bottom}</Reveal>}
      </div>
    </section>
  );
}

export function StatsBand({ stats }: { stats: { value: number; suffix?: string; label: string; display?: string }[] }) {
  return (
    <section className="bg-navy-gradient grain relative overflow-hidden py-20 text-navy-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className="text-center">
            <p className="font-display text-5xl font-extrabold text-gold-gradient md:text-6xl">
              {s.display ?? <Counter value={s.value} suffix={s.suffix} />}
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-navy-foreground/70">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-3xl border bg-card shadow-soft">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8">
              <span className="font-display text-lg font-bold text-navy">{it.q}</span>
              <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300", isOpen ? "rotate-45 border-gold bg-gold text-navy" : "text-navy")}>
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div className={cn("grid transition-all duration-300 ease-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-relaxed text-muted-foreground md:px-8">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Reviews({ items }: { items: { text: string; name: string; meta: string }[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]">
        {doubled.map((r, i) => (
          <figure key={i} className="w-[340px] shrink-0 rounded-3xl border bg-card p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1 md:w-[400px]">
            <div className="flex items-center justify-between">
              <Stars />
              <Quote className="h-7 w-7 text-gold/40" />
            </div>
            <blockquote className="mt-5 leading-relaxed text-foreground/85">« {r.text} »</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-navy font-display font-bold text-gold">{r.name[0]}</span>
              <span>
                <span className="block font-bold text-navy">{r.name}</span>
                <span className="text-sm text-muted-foreground">{r.meta}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function VisaScope() {
  const zones = [
    { t: "Pays arabes & Moyen-Orient", p: "Qatar, Dubaï, Arabie Saoudite, Turquie, Israël, Maroc, Égypte et tous les pays arabes." },
    { t: "Espace Schengen", p: "France, Belgique, Italie, Allemagne et l'ensemble des pays Schengen." },
    { t: "Europe & Royaume-Uni", p: "Angleterre / Royaume-Uni et les autres destinations européennes." },
    { t: "Amérique du Nord", p: "Canada et États-Unis d'Amérique." },
  ];
  const types = ["Tourisme", "Études", "Travail", "Affaires", "Immigration", "Hadj & Omra"];
  return (
    <Reveal className="mx-auto max-w-4xl rounded-3xl border border-gold/40 bg-card p-8 shadow-soft md:p-12">
      <p className="eyebrow text-gold">Nos visas</p>
      <h3 className="mt-3 text-3xl font-extrabold text-navy">Tous les visas, <span className="text-brand-red">tous les pays</span></h3>
      <p className="mt-4 leading-relaxed text-foreground/85">M-S TRAVEL traite aujourd'hui <strong className="text-navy">tous les types de visa</strong> vers l'ensemble des destinations : pays arabes et Moyen-Orient, espace Schengen, Royaume-Uni, Canada et États-Unis.</p>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {zones.map((z) => (
          <li key={z.t} className="flex gap-4">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-success/15 text-success"><Check className="h-4 w-4" /></span>
            <span>
              <strong className="block text-navy">{z.t}</strong>
              <span className="text-sm text-muted-foreground">{z.p}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-2">
        {types.map((t) => <span key={t} className="rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-navy">{t}</span>)}
      </div>
    </Reveal>
  );
}

const emailSchema = z.string().trim().email("Adresse email invalide").max(255);

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? "Email invalide"); return; }
    setState("loading");
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: parsed.data.toLowerCase() });
    if (error && error.code !== "23505") {
      setState("idle");
      toast.error("Inscription impossible pour le moment. Réessayez."); return;
    }
    setState("done");
    toast.success("Inscription confirmée — merci !");
  };
  return (
    <section className="px-4 py-20 md:px-6">
      <Reveal className="bg-navy-gradient grain relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-14 text-navy-foreground md:px-16">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" aria-hidden />
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">Newsletter</p>
            <AnimatedHeading className="mt-3 text-4xl font-extrabold">Restez informé de nos <span className="text-brand-red">offres</span></AnimatedHeading>
            <p className="mt-4 text-navy-foreground/75">Recevez nos dernières promotions, nouvelles destinations et conseils voyage directement dans votre boîte mail.</p>
          </div>
          {state === "done" ? (
            <p className="flex items-center gap-3 rounded-2xl glass-light p-5 font-semibold"><Check className="h-5 w-5 text-gold" />Vous êtes inscrit. À très vite !</p>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="nl-email" className="sr-only">Votre adresse email</label>
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-foreground/50" />
                <input id="nl-email" type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Votre adresse email..." className="h-14 w-full rounded-full glass-light pl-11 pr-4 text-navy-foreground placeholder:text-navy-foreground/70 focus:border-gold focus:outline-none" />
              </div>
              <button type="submit" disabled={state === "loading"} className={btn({ variant: "cta", size: "lg" })}>
                {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "S'inscrire"}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export function DestinationCard({ d, onMore }: { d: Destination; onMore: () => void }) {
  return (
    <Tilt className="h-full">
      <article id={d.slug} className="group flex h-full scroll-mt-40 flex-col overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={d.image} alt={`${d.name} — ${d.tagline}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 font-display text-xs font-bold text-navy-foreground">{d.code}</span>
          {d.badge && <span className="absolute right-4 top-4 rounded-full bg-cta px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-cta-foreground">{d.badge}</span>}
          <div className="absolute bottom-4 left-5 text-navy-foreground">
            <p className="eyebrow text-gold">{d.tagline}</p>
            <h3 className="mt-1 text-3xl font-extrabold">{d.name}</h3>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {d.chips.map((c) => <span key={c} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-navy">{c}</span>)}
          </div>
          <div className="mt-auto flex items-center justify-between pt-6">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-success"><Check className="h-4 w-4" />{d.check}</span>
            <button onClick={onMore} className="group/btn inline-flex items-center gap-1 text-sm font-bold text-navy transition-colors hover:text-cta">
              En savoir plus <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </article>
    </Tilt>
  );
}

export function BlogCard({ p }: { p: BlogPost }) {
  return (
    <Tilt className="h-full">
      <Link to="/blog/$slug" params={{ slug: p.slug }} className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="aspect-[16/10] overflow-hidden">
          <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="eyebrow text-gold">{p.category}</p>
          <h3 className="mt-3 line-clamp-3 text-xl font-extrabold leading-snug text-navy">{p.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
          <div className="mt-auto flex items-center justify-between pt-6 text-sm">
            <span className="text-muted-foreground">{p.date} · {p.author}</span>
            <span className="inline-flex items-center gap-1 font-bold text-navy group-hover:text-cta">Lire l'article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}

export { SectionHeading };
