import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Facebook, Link2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { BLOG } from "@/lib/site-data";
import { btn, Reveal } from "@/components/site/primitives";
import { BlogCard } from "@/components/site/sections";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOG.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title.slice(0, 60)} | Blog M-S TRAVEL` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-48 text-center">
      <h1 className="text-3xl font-extrabold text-navy">Article introuvable</h1>
      <Link to="/blog" className={btn({ variant: "cta", size: "md" }) + " mt-8"}>Retour au blog</Link>
    </div>
  ),
  component: Article,
});

function Article() {
  const { post } = Route.useLoaderData();
  const related = BLOG.filter((p) => p.slug !== post.slug);
  const share = (net: "wa" | "fb" | "copy") => {
    const url = window.location.href;
    if (net === "copy") {
      navigator.clipboard.writeText(url);
      return toast.success("Lien copié");
    }
    const href = net === "wa" ? `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}` : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(href, "_blank", "noopener");
  };
  return (
    <article>
      <header className="bg-navy-gradient grain relative overflow-hidden px-6 pb-16 pt-40 text-navy-foreground">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-navy-foreground/70 hover:text-gold"><ArrowLeft className="h-4 w-4" />Retour au blog</Link>
          <p className="eyebrow mt-8 text-gold">{post.category}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">{post.title}</h1>
          <p className="mt-6 text-sm text-navy-foreground/70">{post.date} · Par {post.author}</p>
        </div>
      </header>
      <div className="mx-auto -mt-2 max-w-4xl px-6">
        <Reveal><img src={post.image} alt="" className="w-full rounded-[2rem] object-contain shadow-soft" /></Reveal>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
          {post.body.map((p, i) => <p key={i}>{p}</p>)}
          {post.list && <ul className="space-y-3">{post.list.map((l) => <li key={l} className="flex items-center gap-3"><Check className="h-5 w-5 text-gold" />{l}</li>)}</ul>}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-3 border-y py-6">
          <span className="text-sm font-bold text-navy">Partager :</span>
          <button onClick={() => share("wa")} className={btn({ variant: "outline", size: "sm" })}><MessageCircle className="h-4 w-4" />WhatsApp</button>
          <button onClick={() => share("fb")} className={btn({ variant: "outline", size: "sm" })}><Facebook className="h-4 w-4" />Facebook</button>
          <button onClick={() => share("copy")} className={btn({ variant: "outline", size: "sm" })}><Link2 className="h-4 w-4" />Copier le lien</button>
        </div>
        <div className="bg-navy-gradient mt-12 rounded-3xl p-8 text-center text-navy-foreground">
          <h2 className="text-2xl font-extrabold">Prêt à partir ?</h2>
          <p className="mt-2 text-navy-foreground/75">Nos experts vous accompagnent de A à Z.</p>
          <Link to="/" hash="reservation" className={btn({ variant: "gold", size: "lg" }) + " mt-6"}>Demander un devis</Link>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-3xl font-extrabold text-navy">Articles liés</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">{related.map((p) => <BlogCard key={p.slug} p={p} />)}</div>
      </section>
    </article>
  );
}
