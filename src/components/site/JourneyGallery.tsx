import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading, btn } from "./primitives";
import { GALLERY, type GalleryShot as Shot } from "@/lib/site-data";

function Card({ shot }: { shot: Shot }) {
  return (
    <figure className="journey-card" data-shape={shot.shape}>
      <img src={shot.image} alt={shot.alt} loading="lazy" width={shot.shape === "portrait" ? 900 : 1200} height={shot.shape === "portrait" ? 1200 : 900} draggable={false} />
      <figcaption>{shot.label} · {shot.note}</figcaption>
    </figure>
  );
}

/** Two counter-scrolling rows of client photos; the loop is scoped to this component and paused off-screen. */
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
    const sync = () => animations.forEach((animation) => {
      if (paused || !visible || document.hidden) animation.pause();
      else animation.play();
    });
    const create = () => {
      animations.forEach((animation) => animation.cancel());
      animations = Array.from(el.querySelectorAll<HTMLElement>(".journey-track")).map((track, index) => {
        const group = track.querySelector<HTMLElement>(".journey-group");
        const distance = Math.max(group?.offsetWidth ?? 0, 1);
        const from = index % 2 === 0 ? 0 : -distance;
        const to = index % 2 === 0 ? -distance : 0;
        return track.animate([{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }], { duration: 46000, iterations: Infinity, easing: "linear" });
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
          {[GALLERY.filter((_, k) => k % 2 === 0), GALLERY.filter((_, k) => k % 2 === 1)].filter((r) => r.length).map((row, index) => (
            <div key={`row-${index}`} className="journey-row">
              <div className="journey-track">
                {[0, 1].map((copy) => (
                  <div key={copy} className="journey-group" aria-hidden={copy === 1}>
                    {row.map((shot, k) => (
                      <div key={`${shot.label}-${k}`} className="journey-cell">
                        <Card shot={shot} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
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
