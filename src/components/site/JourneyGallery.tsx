import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading, btn } from "./primitives";
import morocco from "@/assets/journey-morocco.jpg";
import dubai from "@/assets/journey-dubai.jpg";
import thailand from "@/assets/journey-thailand.jpg";
import kenya from "@/assets/journey-kenya.jpg";

const journeys = [
  { image: morocco, country: "Maroc", place: "Marrakech", title: "Le bonheur de partir ensemble", category: "En famille", alt: "Illustration IA d’une famille noire dans un palais marocain à Marrakech" },
  { image: dubai, country: "Émirats arabes unis", place: "Dubaï", title: "De nouveaux horizons à deux", category: "En couple", alt: "Illustration IA d’un couple noir devant la skyline de Dubaï" },
  { image: thailand, country: "Thaïlande", place: "La baie de Phang Nga", title: "Des souvenirs à partager", category: "En famille", alt: "Illustration IA d’une famille noire en bateau dans une baie thaïlandaise" },
  { image: kenya, country: "Kenya", place: "La savane", title: "L’aventure nous rassemble", category: "Entre amis", alt: "Illustration IA de voyageurs noirs en safari au Kenya" },
];

/** Native scroll owns gestures; frame-based emphasis never traps page scrolling. */
export function JourneyGallery() {
  const rail = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const paint = () => {
      const viewport = el.getBoundingClientRect();
      const center = viewport.left + viewport.width / 2;
      let closest = 0;
      let minimum = Infinity;
      slides.current.forEach((slide, index) => {
        if (!slide) return;
        const box = slide.getBoundingClientRect();
        const distance = Math.abs(box.left + box.width / 2 - center);
        const emphasis = Math.max(0, 1 - distance / (viewport.width * 0.65));
        slide.style.setProperty("--journey-scale", String(media.matches ? 1 : 0.88 + emphasis * 0.12));
        slide.style.setProperty("--journey-opacity", String(media.matches ? 1 : 0.65 + emphasis * 0.35));
        if (distance < minimum) { minimum = distance; closest = index; }
      });
      setActive(closest);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(paint); };
    el.addEventListener("scroll", schedule, { passive: true });
    const resize = new ResizeObserver(schedule);
    resize.observe(el);
    media.addEventListener("change", schedule);
    paint();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); el.removeEventListener("scroll", schedule); media.removeEventListener("change", schedule); };
  }, []);

  const go = (direction: number) => {
    const el = rail.current;
    const slide = slides.current[(active + direction + journeys.length) % journeys.length];
    if (!el || !slide) return;
    el.scrollTo({ left: slide.offsetLeft - el.clientWidth / 2 + slide.offsetWidth / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <section aria-label="Carnet de voyages" className="journey-gallery overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 md:flex-row md:items-end">
        <SectionHeading center={false} eyebrow="Carnet de voyages" title={<>Le monde se découvre <span className="text-gold-gradient">ensemble</span></>} text="En famille, en couple ou entre amis : des destinations qui rapprochent et des moments qui restent." />
        <Reveal className="flex shrink-0 items-center gap-3">
          <span className="mr-3 font-display text-sm font-bold text-muted-foreground" aria-live="polite">0{active + 1} / 0{journeys.length}</span>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" aria-label="Voyage précédent" title="Voyage précédent" onClick={() => go(-1)}><ArrowLeft /></Button>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" aria-label="Voyage suivant" title="Voyage suivant" onClick={() => go(1)}><ArrowRight /></Button>
        </Reveal>
      </div>
      <Reveal className="mt-12">
        <div ref={rail} className="journey-rail" tabIndex={0} role="region" aria-roledescription="carrousel" aria-label="Illustrations de voyages"
          onKeyDown={(e) => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); go(e.key === "ArrowRight" ? 1 : -1); } }}
          onPointerDown={(e) => { if (e.pointerType !== "mouse" || e.button !== 0) return; drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false }; e.currentTarget.setPointerCapture(e.pointerId); }}
          onPointerMove={(e) => { const start = drag.current; if (!start) return; start.moved = Math.abs(e.clientX - start.x) > 4; e.currentTarget.scrollLeft = start.left - (e.clientX - start.x); }}
          onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
          {journeys.map((journey, i) => (
            <figure key={journey.country} ref={(el) => { slides.current[i] = el; }} className="journey-slide">
              <div className="journey-image group relative aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
                <img src={journey.image} alt={journey.alt} loading="lazy" width={1200} height={912} draggable={false} className="h-full w-full select-none object-cover transition-transform duration-300 group-hover:scale-[1.035]" />
                <span className="absolute left-5 top-5 rounded-full bg-navy px-4 py-2 text-xs font-bold text-navy-foreground">{journey.category}</span>
              </div>
              <figcaption className="px-1 pt-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><MapPin className="h-4 w-4 text-cta" />{journey.country} · {journey.place}</p>
                <h3 className="mt-3 text-2xl font-bold leading-snug text-foreground">{journey.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
      <Reveal className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">Visuels créés par IA pour illustrer nos destinations — ils ne représentent pas des clients réels.</p>
        <Link to="/reservation" className={btn({ variant: "navy" })}>Préparer mon voyage <ArrowRight className="h-4 w-4" /></Link>
      </Reveal>
    </section>
  );
}