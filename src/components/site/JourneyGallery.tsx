import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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

/** Scoped Web Animations adapt the supplied out-to-in gallery without global timelines. */
export function JourneyGallery() {
  const stage = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el || reduced) return;
    let animations: Animation[] = [];
    let visible = false;
    const zones: [number, number][] = [[-1, -1], [1, 1], [1, -1], [-1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]];
    const sync = () => animations.forEach((animation) => {
      if (paused || !visible || document.hidden) animation.pause();
      else animation.play();
    });
    const create = () => {
      animations.forEach((animation) => animation.cancel());
      const { width, height } = el.getBoundingClientRect();
      const narrow = width < 640;
      animations = Array.from(el.querySelectorAll<HTMLElement>(".journey-flight")).map((tile, index) => {
        const [x, y] = zones[index % zones.length] ?? [0, 0];
        const tx = width * (narrow ? 0.28 : 0.32) * x;
        const ty = height * 0.30 * y;
        const transform = (distance: number, scale: number) => `translate(calc(-50% + ${tx * distance}px), calc(-50% + ${ty * distance}px)) scale(${scale})`;
        return tile.animate([
          { transform: transform(1.65, 1.7), opacity: 0, offset: 0 },
          { transform: transform(1, 1), opacity: 1, offset: 0.22 },
          { transform: transform(0.96, 1), opacity: 1, offset: 0.65 },
          { transform: transform(0.38, 0.08), opacity: 0, offset: 0.84 },
          { transform: transform(0.38, 0.08), opacity: 0, offset: 1 },
        ], { duration: 12000, delay: -index * 1500, iterations: Infinity, easing: "ease-in-out" });
      });
      sync();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; sync(); }, { threshold: 0.08 });
    observer.observe(el);
    const resize = new ResizeObserver(create);
    resize.observe(el);
    document.addEventListener("visibilitychange", sync);
    create();
    return () => {
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", sync);
      animations.forEach((animation) => animation.cancel());
    };
  }, [paused, reduced]);

  return (
    <section aria-label="Carnet de voyages" className="journey-gallery overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 md:flex-row md:items-end">
        <SectionHeading center={false} eyebrow="Carnet de voyages" title={<>Le monde se découvre <span className="text-gold-gradient">ensemble</span></>} text="En famille, en couple ou entre amis : des destinations qui rapprochent et des moments qui restent." />
        {!reduced && <Button variant="outline" className="sr-only focus:not-sr-only" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? "Reprendre l’animation" : "Mettre l’animation en pause"}</Button>}
      </div>
      <Reveal className="mt-12">
        <div ref={stage} className="journey-stage" data-static={reduced} role="group" aria-label="Voyages au Maroc, à Dubaï, en Thaïlande et au Kenya">
          {[...journeys, ...journeys].map((journey, index) => (
            <figure key={`${journey.country}-${index}`} className="journey-flight" aria-hidden={index >= journeys.length}>
              <img src={journey.image} alt={index < journeys.length ? journey.alt : ""} loading="lazy" width={1200} height={900} draggable={false} />
              <figcaption>{journey.country} · {journey.category}</figcaption>
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
