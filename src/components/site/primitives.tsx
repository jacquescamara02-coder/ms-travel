import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/ms-travel-logo.png.asset.json";

export const btn = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        cta: "bg-cta text-cta-foreground shadow-cta hover:-translate-y-0.5 hover:brightness-110",
        gold: "bg-gold-gradient text-navy shadow-gold hover:-translate-y-0.5 hover:brightness-105",
        ghostLight: "glass-light text-navy-foreground hover:bg-navy-foreground/20 hover:-translate-y-0.5",
        outline: "border border-primary/20 text-primary hover:border-gold hover:bg-accent hover:-translate-y-0.5",
        navy: "bg-navy text-navy-foreground hover:bg-navy-2 hover:-translate-y-0.5",
        whatsapp: "bg-whatsapp text-navy hover:-translate-y-0.5 hover:brightness-105",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "cta", size: "md" },
  },
);
export type BtnVariants = VariantProps<typeof btn>;

export function Reveal({ children, delay = 0, className, as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" | "article" }) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function Counter({ value, suffix = "", prefix = "", duration = 1800 }: { value: number; suffix?: string | undefined; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
        if (!e) return;
      if (!e?.isIntersecting) return;
      io.disconnect();
      if (reduce) return setN(value);
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, text, light, center = true }: { eyebrow: string; title: ReactNode; text?: string; light?: boolean; center?: boolean }) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <p className={cn("eyebrow inline-flex items-center gap-3", light ? "text-gold" : "text-gold")}>
        <span className="h-px w-8 bg-gold" aria-hidden />
        {eyebrow}
        {center && <span className="h-px w-8 bg-gold" aria-hidden />}
      </p>
      <h2 className={cn("mt-4 text-4xl font-extrabold leading-[1.05] md:text-5xl", light ? "text-navy-foreground" : "text-navy")}>{title}</h2>
      {text && <p className={cn("mt-5 text-base leading-relaxed md:text-lg", light ? "text-navy-foreground/75" : "text-muted-foreground")}>{text}</p>}
    </Reveal>
  );
}

/** Tilt-on-hover card wrapper */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={cn("transition-transform duration-300 ease-out will-change-transform", className)}>
      {children}
    </div>
  );
}

export function Stars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="5 étoiles sur 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

export function FacebookIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={p.className} fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
    </svg>
  );
}
export function InstagramIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
export function WhatsAppIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={p.className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.7-1.2 2.2 2.2 0 00.2-1.2c-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center rounded-xl px-2.5 py-1.5", light ? "bg-background shadow-soft" : "")}>
      <img src={logoAsset.url} alt="M-S TRAVEL" className="h-11 w-auto md:h-12" />
    </span>
  );
}
