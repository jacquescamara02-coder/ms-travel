import { AnimatedHeading } from "@/components/ui/hero-shutter-text";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { Footer, FloatingActions, Header } from "@/components/site/SiteChrome";
import { CONTACT } from "@/lib/site-data";

function NotFoundComponent() {
  return (
    <div className="bg-navy-gradient grain flex min-h-screen items-center justify-center px-4 text-navy-foreground">
      <div className="max-w-md text-center">
        <p className="font-display text-8xl font-extrabold text-gold-gradient">404</p>
        <AnimatedHeading as="h1" className="mt-4 text-2xl font-bold">Cette page s'est envolée</AnimatedHeading>
        <p className="mt-2 text-sm text-navy-foreground/70">La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <div className="mt-8">
          <Link to="/" className="inline-flex h-12 items-center justify-center rounded-full bg-cta px-6 text-sm font-semibold text-cta-foreground shadow-cta transition-transform hover:-translate-y-0.5">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <AnimatedHeading as="h1" className="text-xl font-semibold tracking-tight text-foreground">Cette page n'a pas pu se charger</AnimatedHeading>
        <p className="mt-2 text-sm text-muted-foreground">Une erreur est survenue. Réessayez ou revenez à l'accueil.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Réessayer
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "M-S TRAVEL",
  description: "Agence de voyage à Ouagadougou : billets d'avion, visas tourisme, Hadj & Omra, hôtels.",
  url: "https://mstravel-bk.com",
  email: CONTACT.email,
  telephone: [CONTACT.phone1, CONTACT.phone2],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nonsin, échangeur du Nord, immeuble orange après la passerelle",
    postOfficeBoxNumber: CONTACT.bp,
    addressLocality: "Ouagadougou",
    addressCountry: "BF",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "14:00" },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "M-S TRAVEL — Agence de voyage à Ouagadougou" },
      { name: "description", content: "Billets d'avion, visas tourisme, Hadj & Omra et hôtels depuis Ouagadougou, Burkina Faso." },
      { name: "author", content: "M-S TRAVEL" },
      { name: "theme-color", content: "#0A1330" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Manrope:wght@400;500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
