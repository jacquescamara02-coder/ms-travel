import { useLocation } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { PAGE_BLOCKS, VIDEOS } from "@/lib/site-data";
import { pageKeyForPath } from "@/lib/content-registry";
import { markSegments, youtubeId } from "@/lib/content-client";
import { btn, Reveal, SectionHeading } from "./primitives";

export function Marked({ text }: { text: string }) {
  return <>{markSegments(text).map((s, i) => (s.red ? <span key={i} className="text-brand-red">{s.t}</span> : <span key={i}>{s.t}</span>))}</>;
}

function VideoPlayer({ url, title }: { url: string; title: string }) {
  const yt = youtubeId(url);
  if (yt) return <iframe className="aspect-video w-full" src={`https://www.youtube-nocookie.com/embed/${yt}`} title={title} loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen />;
  return <video className="aspect-video w-full bg-navy object-cover" src={url} controls preload="metadata" playsInline />;
}

export function VideoNews() {
  if (!VIDEOS.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading eyebrow="En images" title={<>Actualités <span className="text-brand-red">vidéo</span></>} text="Nos départs, nos pèlerinages et nos annonces en vidéo." />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v, i) => (
          <Reveal key={`${v.url}-${i}`} delay={i * 80}>
            <article className="group h-full overflow-hidden rounded-3xl border bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1">
              <VideoPlayer url={v.url} title={v.title} />
              <div className="p-6">
                <p className="eyebrow flex items-center gap-2 text-gold"><PlayCircle className="h-4 w-4" />{v.date}</p>
                <h3 className="mt-2 text-xl font-extrabold text-navy">{v.title}</h3>
                {v.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Admin-added blocks and video news, rendered after each page's own content. */
export function ExtraContent() {
  const { pathname } = useLocation();
  const page = pageKeyForPath(pathname);
  if (!page) return null;
  const blocks = PAGE_BLOCKS.filter((b) => b.page === page);
  const showVideos = page === "accueil" || page === "nouveautes";
  return (
    <>
      {showVideos && <VideoNews />}
      {blocks.map((b, i) => (
        <section key={`${b.title}-${i}`} className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          {b.image && (
            <Reveal className={i % 2 ? "lg:order-2" : ""}>
              <img src={b.image} alt="" loading="lazy" className="h-auto w-full rounded-[2rem] shadow-soft" />
            </Reveal>
          )}
          <Reveal className={b.image ? "" : "lg:col-span-2 mx-auto max-w-3xl text-center"}>
            <h2 className="text-4xl font-extrabold text-navy md:text-5xl"><Marked text={b.title} /></h2>
            {b.text.split(/\n+/).filter(Boolean).map((p, k) => <p key={k} className="mt-5 leading-relaxed text-foreground/85">{p}</p>)}
            {b.buttonLabel && b.buttonUrl && <a href={b.buttonUrl} className={`${btn({ variant: "cta", size: "lg" })} mt-8`}>{b.buttonLabel}</a>}
          </Reveal>
        </section>
      ))}
    </>
  );
}
