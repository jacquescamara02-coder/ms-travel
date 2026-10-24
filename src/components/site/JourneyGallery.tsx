import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading, btn } from "./primitives";
import tarmacAccompagnement from "@/assets/journey-tarmac-accompagnement.jpg.asset.json";
import departPasserelle from "@/assets/journey-depart-passerelle.jpg.asset.json";
import equipeEscorte from "@/assets/journey-equipe-escorte.jpg.asset.json";
import remiseKits from "@/assets/journey-remise-kits.jpg.asset.json";
import groupeTarmac from "@/assets/journey-groupe-tarmac.jpg.asset.json";
import documentsEmbarquement from "@/assets/journey-documents-embarquement.jpg.asset.json";
import marcheSacs from "@/assets/journey-marche-sacs.jpg.asset.json";
import mainMain from "@/assets/journey-main-main.jpg.asset.json";
import terminalVoile from "@/assets/journey-terminal-voile.jpg.asset.json";
import agentSourire from "@/assets/journey-agent-sourire.jpg.asset.json";

const journeys = [
  { image: tarmacAccompagnement, label: "Sur le tarmac", note: "Accompagnement", shape: "landscape", alt: "Voyageurs souriants accompagnés sur le tarmac par un agent M-S TRAVEL en gilet jaune" },
  { image: departPasserelle, label: "À la passerelle", note: "Départ", shape: "portrait", alt: "Voyageur en tenue traditionnelle, sac de l'agence à la main, au pied de la passerelle d'embarquement" },
  { image: equipeEscorte, label: "Notre équipe", note: "Assistance", shape: "portrait", alt: "Trois agents M-S TRAVEL en gilets jaunes posant au pied de l'escalier d'un avion" },
  { image: remiseKits, label: "Remise des kits", note: "Départ de groupe", shape: "landscape", alt: "Groupe de clients devant l'agence M-S TRAVEL tenant leurs kits de voyage" },
  { image: groupeTarmac, label: "Groupe de voyageurs", note: "Assistance", shape: "landscape", alt: "Voyageurs et agents en gilets jaunes sur le tarmac devant un avion" },
  { image: documentsEmbarquement, label: "Documents d'embarquement", note: "Suivi", shape: "portrait", alt: "Voyageur souriant tenant ses documents d'embarquement devant la passerelle" },
  { image: marcheSacs, label: "Sur le tarmac", note: "Accompagnement", shape: "portrait", alt: "Deux voyageurs marchant sur le tarmac, grands sacs de voyage à l'épaule" },
  { image: mainMain, label: "Main dans la main", note: "Assistance", shape: "landscape", alt: "Voyageur âgé tenu par la main et escorté par un agent en gilet jaune sur le tarmac" },
  { image: terminalVoile, label: "Au terminal", note: "Suivi", shape: "landscape", alt: "Voyageuse voilée tenant ses documents de voyage à l'entrée du terminal" },
  { image: agentSourire, label: "Notre agent", note: "Escorte", shape: "portrait", alt: "Agent M-S TRAVEL en gilet jaune souriante sur le tarmac" },
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
    const zones: [number, number][] = [[-1, -1], [1, 1], [1, -1], [-1, 1], [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -0.4], [1, 0.4]];
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
        const tx = width * (narrow ? 0.22 : 0.26) * x;
        const ty = height * 0.22 * y;
        const transform = (distance: number, scale: number) => `translate(calc(-50% + ${tx * distance}px), calc(-50% + ${ty * distance}px)) scale(${scale})`;
        return tile.animate([
          { transform: transform(1.45, 1.28), opacity: 0, offset: 0 },
          { transform: transform(1, 1), opacity: 1, offset: 0.22 },
          { transform: transform(0.96, 1), opacity: 1, offset: 0.65 },
          { transform: transform(0.38, 0.08), opacity: 0, offset: 0.84 },
          { transform: transform(0.38, 0.08), opacity: 0, offset: 1 },
        ], { duration: 12000, delay: -index * 1200, iterations: Infinity, easing: "ease-in-out" });
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
        <SectionHeading center={false} eyebrow="Carnet de voyages" title={<>Le monde se découvre <span className="text-brand-red">ensemble</span></>} text="En famille, en couple ou entre amis : nos départs, nos accompagnements et les moments qui restent." />
        {!reduced && <Button variant="outline" className="sr-only focus:not-sr-only" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? "Reprendre l’animation" : "Mettre l’animation en pause"}</Button>}
      </div>
      <Reveal className="mt-12">
        <div ref={stage} className="journey-stage" data-static={reduced} role="group" aria-label="Photos de départs et d'accompagnements de voyageurs M-S TRAVEL">
          {journeys.map((journey, index) => (
            <figure key={journey.label + index} className="journey-flight" data-shape={journey.shape}>
              <img src={journey.image.url} alt={journey.alt} loading="lazy" width={journey.shape === "portrait" ? 900 : 1200} height={journey.shape === "portrait" ? 1200 : 900} draggable={false} />
              <figcaption>{journey.label} · {journey.note}</figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
      <Reveal className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">Photos prises lors de nos départs et de nos accompagnements à l'aéroport.</p>
        <Link to="/reservation" className={btn({ variant: "navy" })}>Préparer mon voyage <ArrowRight className="h-4 w-4" /></Link>
      </Reveal>
    </section>
  );
}
