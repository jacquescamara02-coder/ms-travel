import dubai from "@/assets/dest-dubai.jpg";
import turquie from "@/assets/dest-turquie.jpg";
import thailande from "@/assets/dest-thailande.jpg";
import arabie from "@/assets/dest-arabie.jpg";
import maroc from "@/assets/dest-maroc.jpg";
import kenya from "@/assets/dest-kenya.jpg";
import qatar from "@/assets/dest-qatar.jpg";
import chine from "@/assets/dest-chine.jpg";
import madagascar from "@/assets/dest-madagascar.jpg";
import ethiopie from "@/assets/dest-ethiopie.jpg";
import ouganda from "@/assets/dest-ouganda.jpg";
import zambie from "@/assets/dest-zambie.jpg";
import cameroun from "@/assets/dest-cameroun.jpg";
import burkina from "@/assets/dest-burkina.jpg";
import wing from "@/assets/hero-wing.jpg";
import blogHero from "@/assets/hero-blog.jpg";

export const CONTACT = {
  email: "contact@mstravel-bf.com",
  emailSecondary: "service@mstravel-bf.com",
  phone1: "+226 25 65 97 74",
  phone1Href: "tel:+22625659774",
  phone2: "+226 58 27 07 07",
  phone2Href: "tel:+22658270707",
  whatsapp: "22658270707",
  whatsappUrl: "https://wa.me/22658270707",
  bp: "17 BP OUAGA 498",
  addressShort: "Nonsin, Ouagadougou",
  address:
    "Nonsin, près de l'échangeur du Nord, à quelques mètres de la Caisse Populaire de Nonsin. Immeuble orange, juste après la passerelle.",
  hours: "Lundi–Samedi : 8h00–18h00 | Dimanche : 9h00–14h00",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
};

export function waLink(text: string) {
  return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export type Region = "Asie" | "Moyen-Orient" | "Afrique";

export type Destination = {
  slug: string;
  name: string;
  code: string;
  region: Region;
  tagline: string;
  description: string;
  chips: [string, string, string];
  badge?: string;
  check: string;
  image: string;
};

export const DESTINATIONS: Destination[] = [
  { slug: "qatar", name: "Qatar", code: "QA", region: "Moyen-Orient", tagline: "Culture & Prospérité", description: "Doha la moderne, le Musée National du Qatar, les souks colorés et Katara Cultural Village. Le visa est délivré à l'arrivée pour un séjour culturel simplifié et une expérience unique.", chips: ["Visa à l'arrivée", "Oct–Avr", "Hub Qatar Airways"], check: "Visa garanti", image: qatar },
  { slug: "turquie", name: "Turquie", code: "TR", region: "Moyen-Orient", tagline: "Orient & Occident", badge: "Top vente", description: "Istanbul et sa Mosquée Bleue, la Cappadoce et ses montgolfières au lever du soleil, Éphèse et ses ruines antiques, les plages d'Antalya. La Turquie est une épopée entre deux continents.", chips: ["Visa 30 jours", "Avr–Oct", "Gastronomie renommée"], check: "Visa garanti", image: turquie },
  { slug: "arabie-saoudite", name: "Arabie Saoudite", code: "SA", region: "Moyen-Orient", tagline: "Spirituel & Tourisme", badge: "Hadj & Omra", description: "La Mecque et Médine pour les pèlerins, Al-Ula et ses merveilles archéologiques, Riyad la capitale moderne. M-S TRAVEL organise votre Hadj, votre Omra et vos séjours touristiques complets.", chips: ["Hadj & Omra", "Toute l'année", "Visa tourisme"], check: "Visa garanti", image: arabie },
  { slug: "dubai", name: "Dubaï", code: "AE", region: "Asie", tagline: "Luxe & Modernité", badge: "Populaire", description: "Burj Khalifa, Dubai Mall, Palm Jumeirah, safari désert en 4x4 et restaurants gastronomiques. La ville des records vous ouvre ses portes pour une expérience unique de luxe et de modernité depuis Ouagadougou.", chips: ["Visa 30 jours", "Toute l'année", "Vol direct possible"], check: "Visa garanti", image: dubai },
  { slug: "thailande", name: "Thaïlande", code: "TH", region: "Asie", tagline: "Plages & Temples", badge: "Coup de cœur", description: "Bangkok et ses temples majestueux, Phuket et ses plages paradisiaques, Chiang Mai et ses éléphants. La Thaïlande est un paradis tropical aux mille visages accessible depuis le Burkina Faso.", chips: ["Visa 30 jours", "Nov–Avr idéal", "28–35 degrés"], check: "Visa garanti", image: thailande },
  { slug: "chine", name: "Chine", code: "CN", region: "Asie", tagline: "Traditions & Modernité", description: "La Grande Muraille, la Cité Interdite de Pékin, Shanghai futuriste, Chengdu et ses pandas géants. La Chine est une destination grandiose riche d'une civilisation millénaire fascinante.", chips: ["Visa 30 jours", "Avr–Oct", "Sites UNESCO"], check: "Visa garanti", image: chine },
  { slug: "maroc", name: "Maroc", code: "MA", region: "Afrique", tagline: "Couleurs & Saveurs", badge: "Tendance", description: "Marrakech et ses souks enivrants, le désert du Sahara à Merzouga et ses dunes dorées, Fès la médiévale, Casablanca et les plages d'Agadir. Une destination culturelle exceptionnelle très accessible.", chips: ["Visa 90 jours", "Mars–Mai", "Vols fréquents"], check: "Visa garanti", image: maroc },
  { slug: "kenya", name: "Kenya", code: "KE", region: "Afrique", tagline: "Safari & Big Five", description: "Le Masai Mara et sa grande migration des gnous de juillet à octobre, Amboseli avec le Kilimandjaro, les plages de corail de Mombasa. Le Kenya est LA référence mondiale du safari africain.", chips: ["E-visa en ligne", "Juil–Oct", "Big Five garanti"], check: "Visa garanti", image: kenya },
  { slug: "madagascar", name: "Madagascar", code: "MG", region: "Afrique", tagline: "L'île aux merveilles", description: "L'allée des Baobabs au coucher de soleil, les lémuriens uniques au monde, les plages immaculées de Nosy Be. Madagascar est une île continent à la biodiversité unique, un voyage hors du temps.", chips: ["Visa à l'arrivée", "Avr–Nov", "Biodiversité unique"], check: "Visa garanti", image: madagascar },
  { slug: "ethiopie", name: "Éthiopie", code: "ET", region: "Afrique", tagline: "Berceau de l'humanité", description: "Les églises rupestres de Lalibela sculptées dans la roche, le lac Tana et ses monastères flottants, Axoum et ses obélisques millénaires. L'Éthiopie est l'une des plus anciennes civilisations du monde.", chips: ["Visa en ligne", "Oct–Mars", "Patrimoine UNESCO"], check: "Visa garanti", image: ethiopie },
  { slug: "ouganda", name: "Ouganda", code: "UG", region: "Afrique", tagline: "Perle de l'Afrique", description: "Les derniers gorilles des montagnes dans la forêt de Bwindi, les chutes Murchison sur le Nil et le lac Victoria. Un trek inoubliable au cœur d'une nature sauvage et préservée d'exception.", chips: ["Visa à l'arrivée", "Juin–Sept", "Gorilles & Chimpanzés"], check: "Visa garanti", image: ouganda },
  { slug: "zambie", name: "Zambie", code: "ZM", region: "Afrique", tagline: "Chutes Victoria", description: "Les chutes Victoria — 7e merveille naturelle du monde avec 1 700 m de large — le South Luangwa safari et le rafting sur le Zambèze. La Zambie est l'aventure africaine dans sa plus pure expression.", chips: ["Visa à l'arrivée", "Avr–Oct", "7e merveille naturelle"], check: "Visa garanti", image: zambie },
  { slug: "cameroun", name: "Cameroun", code: "CM", region: "Afrique", tagline: "Afrique en miniature", description: "Les plages de sable blanc de Kribi où des cascades tombent dans l'océan, le mont Cameroun volcan actif à 4 095 m, Douala et Yaoundé les grandes villes. Le Cameroun concentre toute la diversité africaine.", chips: ["Visa consulat", "Nov–Février", "Diversité extrême"], check: "Visa garanti", image: cameroun },
  { slug: "burkina-faso", name: "Burkina Faso", code: "BF", region: "Afrique", tagline: "Pays des hommes intègres", badge: "Notre berceau", description: "Ouagadougou et le FESPACO festival de cinéma africain, Bobo-Dioulasso et son architecture soudano-sahélienne, les cascades de Karfiguéla à Banfora. Une terre de culture et d'hospitalité légendaire.", chips: ["Visa selon nationalité", "Nov–Février", "Hospitalité légendaire"], check: "Accompagnement", image: burkina },
];

export const destBySlug = (slug: string) => DESTINATIONS.find((d) => d.slug === slug)!;

export const HERO_SLIDES = [
  { code: "AE", name: "Dubaï", tagline: "Luxe & gratte-ciel", image: dubai },
  { code: "TR", name: "Turquie", tagline: "Istanbul & Orient", image: turquie },
  { code: "TH", name: "Thaïlande", tagline: "Plages paradisiaques", image: thailande },
  { code: "SA", name: "Arabie Saoudite", tagline: "Voyage spirituel", image: arabie },
  { code: "MA", name: "Maroc", tagline: "Désert & Médinas", image: maroc },
  { code: "KE", name: "Kenya", tagline: "Safari & Savane", image: kenya },
  { code: "QA", name: "Qatar", tagline: "Doha & Modernité", image: qatar },
  { code: "CN", name: "Chine", tagline: "Grande Muraille", image: chine },
];

export const POPULAR = [
  { slug: "dubai", label: "Luxe & Modernité" },
  { slug: "thailande", label: "Plages & Temples" },
  { slug: "qatar", label: "Culture & Modernité" },
  { slug: "turquie", label: "Orient & Occident" },
  { slug: "arabie-saoudite", label: "Spirituel & Tourisme" },
  { slug: "maroc", label: "Couleurs & Saveurs" },
  { slug: "ethiopie", label: "Patrimoine africain" },
  { slug: "ouganda", label: "Nature & Safari" },
  { slug: "kenya", label: "Safari & Aventure" },
  { slug: "madagascar", label: "Nature sauvage" },
  { slug: "zambie", label: "Victoria Falls" },
];

export const SERVICES = [
  { title: "Billetterie Aérienne", text: "Réservation de billets d'avion aux meilleurs prix pour toutes destinations. Émission rapide, sécurisée et fiable.", icon: "plane" },
  { title: "Visa Tourisme", text: "Accompagnement complet : Dubaï, Thaïlande, Turquie, Qatar, Chine, Arabie Saoudite. Dossier préparé et suivi A à Z.", icon: "stamp" },
  { title: "Hadj & Omra", text: "Organisation complète du pèlerinage : visa, billet, hébergement à La Mecque et accompagnement spirituel personnalisé.", icon: "moon" },
  { title: "Réservation Hôtel", text: "Sélection et réservation d'hébergements adaptés à votre budget dans toutes vos destinations de voyage.", icon: "hotel" },
  { title: "Circuits Touristiques", text: "Séjours clé en main avec itinéraires personnalisés, transferts aéroport et guides locaux pour une expérience mémorable.", icon: "map" },
  { title: "Assistance Complète", text: "Notre équipe vous accompagne avant, pendant et après votre voyage, disponible par téléphone et WhatsApp.", icon: "headset" },
] as const;

export const VISA_CARDS = [
  { slug: "dubai", text: "Luxe, soleil et divertissement : vivez l'expérience unique du désert et des gratte-ciel." },
  { slug: "thailande", text: "Des plages à couper le souffle, des temples dorés et une culture d'une richesse incroyable." },
  { slug: "turquie", text: "Découvrez Istanbul, entre Orient et Occident, avec un accompagnement professionnel." },
  { slug: "qatar", text: "Modernité, luxe et culture arabe — visa touristique géré en toute sérénité." },
  { slug: "chine", text: "Explorez la Grande Muraille, les traditions millénaires et la modernité asiatique." },
  { slug: "arabie-saoudite", text: "Pour un voyage spirituel ou touristique, partez en toute tranquillité." },
  { slug: "madagascar", text: "L'île rouge vous attend : une nature sauvage et une aventure inoubliable." },
  { slug: "kenya", text: "Vivez l'Afrique authentique à travers safaris et découvertes culturelles." },
];

export const PARTNER_TILES = ["dubai", "thailande", "turquie", "arabie-saoudite", "madagascar", "kenya"];

export const SEO_SERVICES = [
  "Billets d'avion internationaux", "Réservation de vols au départ du Burkina Faso", "Assistance pour les demandes de visa", "Visa touristique", "Visa d'affaires", "Organisation du Hadj", "Organisation de la Omra", "Réservation d'hôtel", "Assurance voyage", "Voyages de groupe", "Voyages d'affaires", "Séjours touristiques", "Location de voiture", "Accueil à l'aéroport", "Organisation complète de voyages internationaux",
];

export const REVIEWS_HOME = [
  { text: "Voyage sans stress grâce à M-S Travel ! Billet, hôtel et assurance... tout a été géré avec efficacité. Bravo à l'équipe !", name: "Adama S.", meta: "Client fidèle" },
  { text: "Tarifs imbattables et service au top ! M-S Travel, c'est l'agence qu'il vous faut pour voyager en toute tranquillité.", name: "Fatima Benali S.", meta: "Voyage Dubaï" },
  { text: "Merci M-S Travel ! Grâce à vous, mon voyage à Dubaï s'est déroulé sans aucune complication. Une vraie tranquillité d'esprit.", name: "Roger K.", meta: "Visa Dubaï" },
  { text: "Je ne changerai plus d'agence ! Professionnalisme, accueil chaleureux et disponibilité. M-S Travel coche toutes les cases.", name: "Sophie D.", meta: "Circuit Turquie" },
  { text: "Très bonne expérience ! M-S Travel m'a conseillé la meilleure option de vol selon mon budget. Merci pour la patience et le professionnalisme !", name: "Zyadath A.", meta: "Billetterie" },
  { text: "Fiable et efficace ! En quelques heures, tout était prêt pour mon voyage. Merci à M-S Travel pour ce service irréprochable.", name: "Ahmadou K.", meta: "Voyage express" },
  { text: "Je recommande à 100 % ! Si vous cherchez une agence honnête, compétente et réactive au Burkina, M-S Travel est le bon choix.", name: "Suleymane A.", meta: "Hadj & Omra" },
  { text: "Une agence sérieuse à Ouagadougou ! Je recommande M-S Travel pour vos billets et visas. Rapide et fiable.", name: "Ahmed B.", meta: "Billet d'avion" },
];

export const REVIEWS_DEST = [
  { text: "Voyage sans stress grâce à M-S Travel ! Billet, hôtel et visa Dubaï tout a été géré avec professionnalisme. Une équipe vraiment réactive. Je recommande vivement !", name: "Adama S.", meta: "Voyage Dubaï — 2024" },
  { text: "M-S Travel c'est l'agence parfaite depuis Ouagadougou ! Tarifs compétitifs, équipe sérieuse et visa Thaïlande en une semaine. Mon séjour à Phuket était incroyable !", name: "Fatima B.", meta: "Séjour Thaïlande — 2025" },
  { text: "Mon pèlerinage au Hadj s'est déroulé parfaitement. M-S Travel a géré visa, billet et hôtel à La Mecque. Une équipe de confiance, je leur suis éternellement reconnaissant !", name: "Suleymane A.", meta: "Hadj 2024 — Ouagadougou" },
  { text: "Je recommande M-S Travel à 100% ! Agence sérieuse et toujours disponible. Visa Turquie obtenu rapidement. Istanbul et la Cappadoce étaient un rêve éveillé. Merci !", name: "Roger K.", meta: "Circuit Turquie — 2024" },
];

export const FAQ_HOME = [
  { q: "Comment réserver un billet d'avion ?", a: "Contactez simplement notre équipe. Nous recherchons les meilleurs vols disponibles selon votre destination et votre budget." },
  { q: "Proposez-vous l'assistance pour les visas ?", a: "Oui. Nous accompagnons nos clients dans la préparation complète des dossiers de demande de visa selon le pays concerné." },
  { q: "Organisez-vous le Hadj et la Omra ?", a: "Oui. Nous proposons un accompagnement complet comprenant le visa, les billets d'avion, l'hébergement, les transferts et le suivi administratif." },
  { q: "Travaillez-vous avec les entreprises ?", a: "Oui. Nous accompagnons les entreprises, les ONG et les institutions dans l'organisation de leurs déplacements professionnels." },
];

export const FAQ_DEST = [
  { q: "Quelles destinations sont disponibles depuis Ouagadougou avec M-S Travel ?", a: "Nous accompagnons vos visas tourisme vers 14 destinations : Dubaï, Thaïlande, Chine, Qatar, Turquie, Arabie Saoudite, Maroc, Kenya, Madagascar, Éthiopie, Ouganda, Zambie, Cameroun, ainsi que l'accueil au Burkina Faso." },
  { q: "M-S Travel fait-il les visas pour l'Europe, les USA ou le Canada ?", a: "Non. Nous ne traitons aucun visa pour l'Union Européenne, les États-Unis ou le Canada. Notre expertise porte uniquement sur le visa tourisme vers l'Afrique, l'Asie et le Moyen-Orient." },
  { q: "Quel est le délai pour obtenir un visa tourisme avec M-S Travel ?", a: "Le délai dépend de la destination. Pour Dubaï, il est en moyenne de 3 à 5 jours. Notre équipe vous indique le délai exact dès l'étude de votre dossier." },
  { q: "M-S Travel organise-t-il le Hadj et l'Omra depuis Burkina Faso ?", a: "Oui. Nous gérons le visa, le billet, l'hébergement à La Mecque et Médine ainsi que l'accompagnement spirituel, depuis Ouagadougou." },
  { q: "M-S Travel réserve-t-il aussi les billets d'avion et les hôtels ?", a: "Oui. En plus du visa, nous réservons vos billets d'avion aux meilleurs prix, vos hôtels et votre assurance voyage." },
  { q: "Où se trouve l'agence M-S Travel à Ouagadougou ?", a: "À Nonsin, près de l'échangeur du Nord, à quelques mètres de la Caisse Populaire de Nonsin. Immeuble orange, juste après la passerelle. BP : 17 BP OUAGA 498." },
];

export type NewsCategory = "Offres" | "Actualités" | "Vidéos";
export type NewsItem = {
  id: string;
  kind: NewsCategory;
  tag: string;
  badge: string;
  title: string;
  text: string;
  date: string;
  price?: string;
  details?: { label: string; items: string[] }[];
  image: string;
};

export const NEWS: NewsItem[] = [
  { id: "oumrah-groupe", kind: "Vidéos", tag: "Oumrah", badge: "Oumrah — Août 2026", title: "Alhamdouilillah, notre groupe Oumrah poursuit son voyage spirituel", text: "Nos pèlerins sont bien arrivés et poursuivent leur magnifique voyage spirituel. Prochaine étape : Médine.", date: "17 août 2026", image: arabie },
  { id: "hadj-2027", kind: "Actualités", tag: "Hadj 2027", badge: "Places limitées", title: "Hadj 2027 : Les pré-inscriptions sont ouvertes avec M-S Travel Burkina", text: "Le pèlerinage à La Mecque est l'un des moments les plus importants dans la vie d'un musulman. Il représente un voyage de foi, de recueillement et d'accomplissement spirituel. Pour vivre cette expérience dans les meilleures conditions, il est essentiel de choisir une agence sérieuse, expérimentée et reconnue. M-S Travel Burkina ouvre officiellement les pré-inscriptions pour le Hadj 2027, afin de permettre aux futurs pèlerins de préparer leur voyage en toute sérénité et d'assurer leur place dès maintenant.", date: "21 juil. 2026", image: arabie },
  { id: "camp-vip", kind: "Actualités", tag: "Camp vacances VIP", badge: "Édition 2026", title: "Camp Vacances VIP à La Mecque – Édition 2026", text: "L'Agence M-S Travel vous offre une expérience spirituelle unique et inoubliable à travers son prestigieux Camp Vacances VIP à La Mecque. Du 07 au 27 août 2026 · Âge : 7 ans et plus. Un séjour exceptionnel pour apprendre, partager, découvrir et vivre des moments spirituels inoubliables dans les lieux saints de l'islam.", price: "1.600.000 F CFA", details: [ { label: "Activités et avantages", items: ["La Oumrah", "Visites des lieux saints et historiques", "Activités religieuses, sociales et culturelles", "Hébergement dans des hôtels 5 étoiles", "Transport et restauration", "Assurance voyage", "Gadgets et kits de voyage"] }, { label: "Pourquoi choisir l'agence M-S TRAVEL ?", items: ["Encadrement professionnel", "Accompagnement personnalisé", "Sécurité et confort", "Ambiance fraternelle", "Assistance disponible durant tout le séjour"] } ], date: "12 mai 2026", image: arabie },
  { id: "maroc-sans-visa", kind: "Offres", tag: "Sans visa", badge: "Bonne nouvelle", title: "Bonne nouvelle pour les Burkinabè !", text: "Les Burkinabè peuvent désormais se rendre au Maroc sans visa pour un séjour jusqu'à 90 jours. C'est le moment idéal pour découvrir : Casablanca, Marrakech, Rabat, Tanger, Fès.", details: [{ label: "M-S Travel vous accompagne pour", items: ["Réservation et vente de billets d'avion", "Réservation d'hôtels", "Assistance voyage", "Conseils et accompagnement"] }], date: "12 mai 2026", image: maroc },
  { id: "site-web", kind: "Actualités", tag: "Site web", badge: "Nouveau", title: "Découvrez le site web de l'agence M-S TRAVEL !", text: "Vos voyages sont désormais à portée de clic. Réservez facilement vos billets d'avion, hôtels, assurances voyage et bénéficiez d'une assistance visa complète sur mstravel-bf.com.", date: "12 mai 2026", image: wing },
  { id: "hadj-oumrah-2027", kind: "Offres", tag: "Pèlerinage", badge: "Hadj & Oumrah — Édition 2027", title: "Hadj 2025 — Pèlerinage tout compris", text: "Inscription ouverte pour le Hadj 2025. Visa spécial, billet, hébergement à La Mecque et Médine, accompagnement spirituel. Places limitées.", price: "3.285.000 F CFA (prix provisoire)", date: "9 mai 2026", image: arabie },
  { id: "forfait-dubai", kind: "Offres", tag: "Visa + Billet", badge: "Promo", title: "Forfait Dubaï — Visa + Billet aller-retour", text: "Profitez de notre forfait tout inclus pour Dubaï : visa tourisme garanti, billet aller-retour et assistance complète. Offre valable pour les départs de Ouagadougou.", date: "9 mai 2026", image: dubai },
  { id: "erreurs-visa", kind: "Actualités", tag: "Visa", badge: "Conseils", title: "Les 10 erreurs qui provoquent le refus d'un visa (et comment les éviter)", text: "Découvrez les 10 erreurs les plus fréquentes qui entraînent un refus de visa et apprenez comment préparer un dossier solide pour maximiser vos chances d'obtenir votre visa avec MS TRAVEL.", date: "4 août 2026", image: blogHero },
];

export type BlogCategory = "Annonces" | "Oumrah & Pèlerinage" | "Voyage";
export type BlogPost = {
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  body: string[];
  list?: string[];
  date: string;
  author: string;
  image: string;
};

export const BLOG: BlogPost[] = [
  { slug: "oumrah-experience-qui-transforme-le-coeur", category: "Oumrah & Pèlerinage", title: "OUMRAH : quand un voyage devient une expérience qui transforme le cœur", excerpt: "À travers les images et les témoignages de nos pèlerins, une chose devient évidente : l'Oumrah est bien plus qu'un voyage.", body: ["À travers les images et les témoignages de nos pèlerins, une chose devient évidente : l'Oumrah est bien plus qu'un voyage. C'est un moment de recueillement, de découverte et de connexion spirituelle.", "Découvrez l'expérience vécue par les pèlerins accompagnés par M-S Travel et laissez-vous inspirer pour votre propre départ."], date: "19 août 2026", author: "M-S Travel", image: arabie },
  { slug: "formalites-de-voyage-dossier-complet", category: "Voyage", title: "Formalités de voyage — Partez avec un dossier complet", excerpt: "Vérification des documents, conseils personnalisés, accompagnement professionnel : partez en toute sérénité.", body: ["Avec M-S Travel, voyagez en toute tranquillité et à moindre coût.", "Tél : +226 25 65 97 74 · App : +226 58 27 07 07 · mstravel-bf.com"], list: ["Vérification des documents", "Conseils personnalisés", "Accompagnement professionnel", "Départ en toute sérénité"], date: "12 mai 2026", author: "M-S Travel", image: blogHero },
  { slug: "feeb-awards-premiere-place", category: "Annonces", title: "Nous sommes heureux et honorés de vous annoncer que, grâce à votre précieux soutien,", excerpt: "M-S Travel a été classée 1ère aux FEEB Awards à l'issue des votes. Cette victoire est la vôtre !", body: ["GRANDE ANNONCE – M-S TRAVEL : Nous sommes heureux et honorés de vous annoncer que, grâce à votre précieux soutien, M-S Travel a été classée 1ère aux FEEB Awards à l'issue des votes.", "Cette victoire est la vôtre ! Merci pour votre confiance et votre fidélité. En attendant les résultats finaux du jury prévus le 31 mai, nous vous adressons nos sincères remerciements.", "Ensemble, continuons à aller plus loin ! Avec M-S Travel, voyager en toute tranquillité et à moindre coût."], date: "20 mai 2026", author: "M-S Travel", image: wing },
];

export const COUNTRIES = [
  "Burkina Faso", "Côte d'Ivoire", "Mali", "Niger", "Ghana", "Togo", "Bénin", "Sénégal", "Guinée", "Cameroun", "Nigeria", "France", "Autre",
];

export const DEST_CITIES: Record<string, string[]> = {
  "Émirats arabes unis": ["Dubaï", "Abu Dhabi", "Sharjah"],
  "Turquie": ["Istanbul", "Antalya", "Ankara", "Cappadoce"],
  "Thaïlande": ["Bangkok", "Phuket", "Chiang Mai", "Pattaya"],
  "Arabie Saoudite": ["Djeddah", "Médine", "Riyad", "La Mecque"],
  "Qatar": ["Doha"],
  "Chine": ["Pékin", "Shanghai", "Canton", "Chengdu"],
  "Maroc": ["Casablanca", "Marrakech", "Rabat", "Fès", "Tanger", "Agadir"],
  "Kenya": ["Nairobi", "Mombasa"],
  "Madagascar": ["Antananarivo", "Nosy Be"],
  "Éthiopie": ["Addis-Abeba"],
  "Ouganda": ["Entebbe", "Kampala"],
  "Zambie": ["Lusaka", "Livingstone"],
  "Cameroun": ["Douala", "Yaoundé"],
  "France": ["Paris", "Lyon", "Marseille"],
  "Côte d'Ivoire": ["Abidjan"],
  "Sénégal": ["Dakar"],
  "Autre": ["Autre ville"],
};

export const VISA_COUNTRIES = [
  "Dubaï (AE)", "Thaïlande (TH)", "Turquie (TR)", "Qatar (QA)", "Arabie Saoudite (SA)", "Chine (CN)", "Maroc (MA)", "Kenya (KE)", "Éthiopie (ET)", "Madagascar (MG)", "Zambie (ZM)", "Cameroun (CM)",
];
