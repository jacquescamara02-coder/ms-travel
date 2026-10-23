import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type RoundItem = { slug: string; name: string; code: string; label: string; image: string };

/** Curved 3D ring of cards: autoplay, drag with momentum, arrows and keyboard focus. */
export function RoundCarousel({ items }: { items: RoundItem[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const angle = useRef(0);
  const velocity = useRef(0);
  const target = useRef<number | null>(null);
  const hover = useRef(false);
  const drag = useRef<{ x: number; moved: number; last: number } | null>(null);
  const [size, setSize] = useState({ w: 240, h: 340, r: 440 });
  const n = items.length;
  const step = 360 / n;

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const vw = el.clientWidth;
      const w = vw < 480 ? 150 : vw < 900 ? 190 : 240;
      const h = Math.round(w * 1.42);
      const r = Math.round((w + (vw < 480 ? 10 : 22)) / (2 * Math.tan(Math.PI / n)));
      setSize({ w, h, r });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [n]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const tick = () => {
      if (!drag.current) {
        if (target.current !== null) {
          const d = target.current - angle.current;
          angle.current += d * 0.12;
          if (Math.abs(d) < 0.05) target.current = null;
        } else if (Math.abs(velocity.current) > 0.01) {
          angle.current += velocity.current;
          velocity.current *= 0.94;
        } else if (!hover.current && !reduce) {
          angle.current -= 0.12;
        }
      }
      if (ring.current) ring.current.style.transform = `translateZ(${-size.r}px) rotateX(-6deg) rotateY(${angle.current}deg)`;
      cards.current.forEach((c, k) => {
        if (!c) return;
        const a = (((k * step + angle.current) % 360) + 540) % 360 - 180;
        const facing = Math.cos((a * Math.PI) / 180);
        c.style.filter = `brightness(${0.35 + 0.65 * Math.max(0, facing)})`;
        c.style.zIndex = String(Math.round(facing * 100) + 100);
        c.tabIndex = facing > 0.3 ? 0 : -1;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [size.r, step]);

  const goTo = (delta: number) => {
    velocity.current = 0;
    const base = Math.round((target.current ?? angle.current) / step) * step;
    target.current = base + delta * step;
  };
  const focusCard = (k: number) => {
    velocity.current = 0;
    const want = -k * step;
    const diff = ((((want - angle.current) % 360) + 540) % 360) - 180;
    target.current = angle.current + diff;
  };

  return (
    <div className="relative">
      <div
        ref={wrap}
        className="relative mx-auto touch-pan-y select-none overflow-hidden py-10 cursor-grab active:cursor-grabbing"
        style={{ perspective: `${size.r * 3}px`, height: size.h + 120 }}
        onMouseEnter={() => (hover.current = true)}
        onMouseLeave={() => (hover.current = false)}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, moved: 0, last: 0 };
          target.current = null;
          velocity.current = 0;
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          const dx = e.clientX - d.x;
          d.x = e.clientX;
          d.moved += Math.abs(dx);
          d.last = dx * 0.25;
          angle.current += d.last;
          if (d.moved > 6) (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        }}
        onPointerUp={() => {
          if (drag.current) velocity.current = drag.current.last;
          setTimeout(() => (drag.current = null), 0);
        }}
        onPointerCancel={() => (drag.current = null)}
        onClickCapture={(e) => {
          if (drag.current && drag.current.moved > 6) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        aria-roledescription="carrousel"
        aria-label="Destinations populaires"
      >
        <div className="absolute left-1/2 top-1/2" style={{ width: size.w, height: size.h, marginLeft: -size.w / 2, marginTop: -size.h / 2 }}>
          <div ref={ring} className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
            {items.map((d, k) => (
              <Link
                key={d.slug}
                ref={(el) => {
                  cards.current[k] = el;
                }}
                to="/destinations"
                hash={d.slug}
                draggable={false}
                onFocus={() => focusCard(k)}
                className="group absolute inset-0 overflow-hidden rounded-3xl border border-navy-foreground/15 shadow-soft"
                style={{ transform: `rotateY(${k * step}deg) translateZ(${size.r}px)`, backfaceVisibility: "visible" }}
              >
                <img src={d.image} alt={d.name} loading="lazy" draggable={false} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full glass px-3 py-1 text-xs font-bold text-navy-foreground">{d.code}</span>
                <div className="absolute inset-x-4 bottom-4 text-navy-foreground">
                  <p className="eyebrow text-gold">{d.label}</p>
                  <p className="mt-1 font-display text-xl font-extrabold md:text-2xl">{d.name}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">Découvrir <ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-center gap-3">
        <button type="button" onClick={() => goTo(1)} aria-label="Destination précédente" className="grid h-12 w-12 place-items-center rounded-full glass-light text-navy-foreground transition-transform duration-200 hover:-translate-y-0.5">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => goTo(-1)} aria-label="Destination suivante" className="grid h-12 w-12 place-items-center rounded-full glass-light text-navy-foreground transition-transform duration-200 hover:-translate-y-0.5">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}