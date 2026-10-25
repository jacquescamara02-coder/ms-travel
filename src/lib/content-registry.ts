import {
  BLOG, CONTACT, COUNTRIES, DEST_CITIES, DESTINATIONS, FAQ_DEST, FAQ_HOME, GALLERY, HERO_SLIDES, NEWS,
  PAGE_BLOCKS, PAGE_HEROES, PARTNER_TILES, POPULAR, REVIEWS_DEST, REVIEWS_HOME, SEO_SERVICES, SERVICES,
  VIDEOS, VISA_CARDS, VISA_COUNTRIES,
} from "./site-data";

export type FieldType = "text" | "textarea" | "image" | "video" | "select" | "lines" | "json";
export type Field = { name: string; label: string; type: FieldType; options?: string[]; help?: string };
export type EntryKind = "list" | "object" | "strings" | "heroes" | "json";
export type Entry = {
  key: string;
  label: string;
  group: string;
  description: string;
  kind: EntryKind;
  fields?: Field[];
  itemTitle?: string;
  target: unknown;
};

export const PAGES = [
  { key: "accueil", label: "Accueil", path: "/" },
  { key: "destinations", label: "Destinations", path: "/destinations" },
  { key: "services", label: "Services", path: "/services" },
  { key: "a-propos", label: "À propos", path: "/a-propos" },
  { key: "nouveautes", label: "Nouveautés", path: "/nouveautes" },
  { key: "blog", label: "Blog", path: "/blog" },
  { key: "reservation", label: "Réservation", path: "/reservation" },
] as const;

export function pageKeyForPath(path: string): string | undefined {
  const clean = path.replace(/\/+$/, "") || "/";
  return PAGES.find((p) => p.path === clean)?.key;
}

const review: Field[] = [
  { name: "text", label: "Avis", type: "textarea" },
  { name: "name", label: "Nom", type: "text" },
  { name: "meta", label: "Précision (voyage, année…)", type: "text" },
];
const faq: Field[] = [
  { name: "q", label: "Question", type: "text" },
  { name: "a", label: "Réponse", type: "textarea" },
];

export const ENTRIES: Entry[] = [
  { key: "page_heroes", group: "Pages", label: "Bannières des pages (héros)", description: "Image, badge, titre et texte en haut de chaque page.", kind: "heroes", target: PAGE_HEROES },
  { key: "hero_slides", group: "Pages", label: "Diaporama de l'accueil", description: "Images qui défilent en fond de la bannière d'accueil.", kind: "list", itemTitle: "name", target: HERO_SLIDES, fields: [
    { name: "image", label: "Image", type: "image" }, { name: "name", label: "Pays", type: "text" }, { name: "code", label: "Code (ex. AE)", type: "text" }, { name: "tagline", label: "Sous-titre", type: "text" },
  ] },
  { key: "page_blocks", group: "Pages", label: "Blocs supplémentaires", description: "Ajoutez des sections libres (titre, texte, image, bouton) en bas de n'importe quelle page.", kind: "list", itemTitle: "title", target: PAGE_BLOCKS, fields: [
    { name: "page", label: "Page", type: "select", options: PAGES.map((p) => p.key) }, { name: "title", label: "Titre (*mot* en rouge)", type: "text" }, { name: "text", label: "Texte", type: "textarea" }, { name: "image", label: "Image", type: "image" }, { name: "buttonLabel", label: "Texte du bouton", type: "text" }, { name: "buttonUrl", label: "Lien du bouton", type: "text" },
  ] },
  { key: "destinations", group: "Catalogue", label: "Destinations", description: "Toutes les destinations affichées sur le site.", kind: "list", itemTitle: "name", target: DESTINATIONS, fields: [
    { name: "image", label: "Image", type: "image" }, { name: "name", label: "Nom", type: "text" }, { name: "slug", label: "Identifiant (sans espace)", type: "text" }, { name: "code", label: "Code pays", type: "text" },
    { name: "region", label: "Région", type: "select", options: ["Asie", "Moyen-Orient", "Afrique", "Europe", "Amérique"] }, { name: "tagline", label: "Accroche", type: "text" }, { name: "badge", label: "Badge", type: "text" },
    { name: "description", label: "Description", type: "textarea" }, { name: "chips", label: "Étiquettes (une par ligne)", type: "lines" }, { name: "check", label: "Mention verte", type: "text" },
  ] },
  { key: "popular", group: "Catalogue", label: "Carrousel des destinations populaires", description: "Destinations du carrousel circulaire de l'accueil (identifiant de destination).", kind: "list", itemTitle: "slug", target: POPULAR, fields: [
    { name: "slug", label: "Identifiant de la destination", type: "text" }, { name: "label", label: "Accroche", type: "text" },
  ] },
  { key: "visa_cards", group: "Catalogue", label: "Cartes visa de l'accueil", description: "Cartes de visas mises en avant.", kind: "list", itemTitle: "slug", target: VISA_CARDS, fields: [
    { name: "slug", label: "Identifiant de la destination", type: "text" }, { name: "text", label: "Texte", type: "textarea" },
  ] },
  { key: "partner_tiles", group: "Catalogue", label: "Mosaïque de destinations", description: "Identifiants des destinations de la mosaïque.", kind: "strings", target: PARTNER_TILES },
  { key: "services", group: "Catalogue", label: "Services", description: "Liste des services.", kind: "list", itemTitle: "title", target: SERVICES, fields: [
    { name: "title", label: "Titre", type: "text" }, { name: "text", label: "Texte", type: "textarea" }, { name: "icon", label: "Icône", type: "select", options: ["plane", "stamp", "moon", "hotel", "map", "headset"] },
  ] },
  { key: "seo_services", group: "Catalogue", label: "Liste des prestations", description: "Liste courte des prestations.", kind: "strings", target: SEO_SERVICES },
  { key: "news", group: "Publications", label: "Nouveautés & offres", description: "Offres, actualités et vidéos de la page Nouveautés.", kind: "list", itemTitle: "title", target: NEWS, fields: [
    { name: "image", label: "Image", type: "image" }, { name: "title", label: "Titre", type: "text" }, { name: "id", label: "Identifiant", type: "text" }, { name: "kind", label: "Catégorie", type: "select", options: ["Offres", "Actualités", "Vidéos"] },
    { name: "tag", label: "Étiquette", type: "text" }, { name: "badge", label: "Badge", type: "text" }, { name: "date", label: "Date", type: "text" }, { name: "price", label: "Prix", type: "text" }, { name: "text", label: "Texte", type: "textarea" },
    { name: "details", label: "Détails (avancé)", type: "json", help: 'Format : [{"label":"Inclus","items":["Visa","Billet"]}]' },
  ] },
  { key: "blog", group: "Publications", label: "Articles du blog", description: "Articles avec leur propre page.", kind: "list", itemTitle: "title", target: BLOG, fields: [
    { name: "image", label: "Image de couverture", type: "image" }, { name: "title", label: "Titre", type: "text" }, { name: "slug", label: "Adresse de l'article (sans espace)", type: "text" },
    { name: "category", label: "Catégorie", type: "select", options: ["Annonces", "Oumrah & Pèlerinage", "Voyage"] }, { name: "excerpt", label: "Résumé", type: "textarea" },
    { name: "body", label: "Contenu (un paragraphe par ligne)", type: "lines" }, { name: "list", label: "Liste à puces (une par ligne)", type: "lines" }, { name: "date", label: "Date", type: "text" }, { name: "author", label: "Auteur", type: "text" },
  ] },
  { key: "videos", group: "Publications", label: "Actualités vidéo", description: "Vidéos affichées sur l'accueil et la page Nouveautés (fichier ou lien YouTube).", kind: "list", itemTitle: "title", target: VIDEOS, fields: [
    { name: "url", label: "Vidéo (fichier ou lien YouTube)", type: "video" }, { name: "title", label: "Titre", type: "text" }, { name: "description", label: "Description", type: "textarea" }, { name: "date", label: "Date", type: "text" },
  ] },
  { key: "gallery", group: "Publications", label: "Carnet de voyage", description: "Photos de la galerie animée.", kind: "list", itemTitle: "label", target: GALLERY, fields: [
    { name: "image", label: "Photo", type: "image" }, { name: "label", label: "Légende", type: "text" }, { name: "note", label: "Précision", type: "text" }, { name: "shape", label: "Format", type: "select", options: ["landscape", "portrait"] }, { name: "alt", label: "Description de la photo", type: "textarea" },
  ] },
  { key: "reviews_home", group: "Témoignages", label: "Avis clients — accueil", description: "", kind: "list", itemTitle: "name", target: REVIEWS_HOME, fields: review },
  { key: "reviews_dest", group: "Témoignages", label: "Avis clients — destinations", description: "", kind: "list", itemTitle: "name", target: REVIEWS_DEST, fields: review },
  { key: "faq_home", group: "Témoignages", label: "FAQ — accueil", description: "", kind: "list", itemTitle: "q", target: FAQ_HOME, fields: faq },
  { key: "faq_dest", group: "Témoignages", label: "FAQ — destinations", description: "", kind: "list", itemTitle: "q", target: FAQ_DEST, fields: faq },
  { key: "contact", group: "Réglages", label: "Coordonnées & réseaux", description: "E-mails, téléphones, WhatsApp, adresse, horaires, réseaux sociaux.", kind: "object", target: CONTACT, fields: [
    { name: "email", label: "E-mail principal", type: "text" }, { name: "emailSecondary", label: "E-mail secondaire", type: "text" }, { name: "phone1", label: "Téléphone 1", type: "text" }, { name: "phone1Href", label: "Lien téléphone 1 (tel:+226…)", type: "text" },
    { name: "phone2", label: "Téléphone 2", type: "text" }, { name: "phone2Href", label: "Lien téléphone 2", type: "text" }, { name: "whatsapp", label: "Numéro WhatsApp (chiffres)", type: "text" }, { name: "whatsappUrl", label: "Lien WhatsApp", type: "text" },
    { name: "bp", label: "Boîte postale", type: "text" }, { name: "addressShort", label: "Adresse courte", type: "text" }, { name: "address", label: "Adresse complète", type: "textarea" }, { name: "hours", label: "Horaires", type: "text" },
    { name: "facebook", label: "Facebook", type: "text" }, { name: "instagram", label: "Instagram", type: "text" },
  ] },
  { key: "countries", group: "Réglages", label: "Pays du formulaire billet", description: "", kind: "strings", target: COUNTRIES },
  { key: "visa_countries", group: "Réglages", label: "Pays du formulaire visa", description: "", kind: "strings", target: VISA_COUNTRIES },
  { key: "dest_cities", group: "Réglages", label: "Villes par pays (avancé)", description: "Villes proposées dans le formulaire.", kind: "json", target: DEST_CITIES },
];

export const entryByKey = (key: string) => ENTRIES.find((e) => e.key === key);

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));
export const DEFAULTS: Record<string, unknown> = Object.fromEntries(ENTRIES.map((e) => [e.key, clone(e.target)]));

/** Replace the shared site-data objects in place so every page reads admin-edited content. Idempotent. */
export function applyContent(rows: Record<string, unknown> | undefined) {
  for (const e of ENTRIES) {
    const value = clone(rows?.[e.key] ?? DEFAULTS[e.key]);
    const t = e.target as Record<string, unknown> | unknown[];
    if (Array.isArray(t)) {
      if (Array.isArray(value)) t.splice(0, t.length, ...value);
    } else if (value && typeof value === "object") {
      for (const k of Object.keys(t)) delete (t as Record<string, unknown>)[k];
      Object.assign(t, value);
    }
  }
}
