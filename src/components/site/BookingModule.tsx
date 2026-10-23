import { useMemo, useState, type ReactNode } from "react";
import { BedDouble, CheckCircle2, FileCheck2, Info, Loader2, Plane, Send, Stamp } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { COUNTRIES, DEST_CITIES, VISA_COUNTRIES, waLink } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { btn } from "./primitives";

type Kind = "billet" | "hotel" | "visa";
type Key = "nom"|"prenom"|"email"|"whatsapp"|"paysActuel"|"villeActuelle"|"typeVoyage"|"paysDest"|"villeDest"|"dateDepart"|"dateRetour"|"adultes"|"enfants"|"classe"|"remarques"|"dateArrivee"|"dateDepartHotel"|"chambres"|"categorie"|"paysVisa"|"dateVoyage"|"duree"|"personnes"|"details";
type Values = Partial<Record<Key, string>>;
type Errors = Values;

const CHOICES: { id: Kind; title: string; text: string; Icon: typeof Plane }[] = [
  { id: "billet", title: "Achat de billet", text: "Billets d'avion aller simple ou aller-retour", Icon: Plane },
  { id: "hotel", title: "Réservation d'hôtel", text: "Hébergements dans vos destinations", Icon: BedDouble },
  { id: "visa", title: "Demande de visa", text: "Visa tourisme — destinations accessibles", Icon: Stamp },
];

const req = (label: string, max = 120) => z.string().trim().min(1, `${label} est requis`).max(max, `${label} est trop long`);
const identity = {
  nom: req("Le nom", 100),
  prenom: req("Le prénom", 100),
  email: z.string().trim().min(1, "L'email est requis").email("Adresse email invalide").max(255),
  whatsapp: z.string().trim().min(1, "Le numéro WhatsApp est requis").regex(/^\+?[0-9\s().-]{8,20}$/, "Numéro invalide (ex : +226 70 00 00 00)"),
};
const location = { paysActuel: req("Le pays actuel"), villeActuelle: req("La ville actuelle") };

const schemas = {
  billet: z
    .object({
      ...identity, ...location,
      typeVoyage: z.enum(["Aller simple", "Aller-retour"]),
      paysDest: req("Le pays de destination"),
      villeDest: req("La ville de destination"),
      dateDepart: req("La date de départ"),
      dateRetour: z.string().optional(),
      adultes: req("Le nombre d'adultes"),
      enfants: z.string(),
      classe: z.string(),
      remarques: z.string().max(1000, "1000 caractères maximum").optional(),
    })
    .refine((v) => v.typeVoyage === "Aller simple" || !!v.dateRetour, { path: ["dateRetour"], message: "La date de retour est requise" })
    .refine((v) => !v.dateRetour || v.dateRetour >= v.dateDepart, { path: ["dateRetour"], message: "Le retour doit suivre le départ" }),
  hotel: z
    .object({
      ...identity, ...location,
      paysDest: req("Le pays de destination"),
      villeDest: req("La ville de destination"),
      dateArrivee: req("La date d'arrivée"),
      dateDepartHotel: req("La date de départ"),
      chambres: z.string(), adultes: z.string(), enfants: z.string(), categorie: z.string(),
      remarques: z.string().max(1000, "1000 caractères maximum").optional(),
    })
    .refine((v) => v.dateDepartHotel > v.dateArrivee, { path: ["dateDepartHotel"], message: "Le départ doit suivre l'arrivée" }),
  visa: z.object({
    ...identity, ...location,
    paysVisa: req("Le pays du visa"),
    dateVoyage: req("La date de voyage prévue"),
    duree: z.string(), personnes: z.string(),
    details: req("Les détails de votre demande", 1500),
  }),
};

const LABELS: Record<string, string> = {
  nom: "Nom", prenom: "Prénom", email: "Email", whatsapp: "WhatsApp", paysActuel: "Pays actuel", villeActuelle: "Ville actuelle",
  typeVoyage: "Type de voyage", paysDest: "Pays de destination", villeDest: "Ville de destination", dateDepart: "Date de départ", dateRetour: "Date de retour",
  adultes: "Adultes", enfants: "Enfants (2–11 ans)", classe: "Classe", remarques: "Remarques", dateArrivee: "Arrivée", dateDepartHotel: "Départ",
  chambres: "Chambres", categorie: "Catégorie d'hôtel", paysVisa: "Pays pour le visa", dateVoyage: "Date de voyage prévue", duree: "Durée du séjour", personnes: "Nombre de personnes", details: "Détails",
};
const TITLES: Record<Kind, string> = { billet: "DEMANDE DE BILLET D'AVION", hotel: "DEMANDE DE RÉSERVATION D'HÔTEL", visa: "DEMANDE DE VISA TOURISME" };

const fmtDate = (s?: string) => (s ? new Date(s + "T00:00:00").toLocaleDateString("fr-FR") : "");

export function buildWhatsAppMessage(kind: Kind, v: Values) {
  const lines = [`*${TITLES[kind]} — M-S TRAVEL*`, ""];
  const group = (title: string, keys: string[]) => {
    const rows = (keys as Key[]).filter((k) => v[k]).map((k) => `• ${LABELS[k]} : ${k.startsWith("date") ? fmtDate(v[k]) : v[k]}`);
    if (rows.length) lines.push(`*${title}*`, ...rows, "");
  };
  group("Vos informations", ["nom", "prenom", "email", "whatsapp"]);
  group("Localisation actuelle", ["paysActuel", "villeActuelle"]);
  if (kind === "billet") group("Détails du voyage", ["typeVoyage", "paysDest", "villeDest", "dateDepart", "dateRetour", "adultes", "enfants", "classe", "remarques"]);
  if (kind === "hotel") group("Séjour", ["paysDest", "villeDest", "dateArrivee", "dateDepartHotel", "chambres", "adultes", "enfants", "categorie", "remarques"]);
  if (kind === "visa") group("Destination du visa", ["paysVisa", "dateVoyage", "duree", "personnes", "details"]);
  lines.push("Merci de me recontacter.");
  return lines.join("\n");
}

const DEFAULTS: Record<Kind, Values> = {
  billet: { typeVoyage: "Aller-retour", adultes: "1 adulte", enfants: "Aucun", classe: "Économique", paysActuel: "Burkina Faso" },
  hotel: { chambres: "1 chambre", adultes: "1 adulte", enfants: "Aucun", categorie: "3 étoiles", paysActuel: "Burkina Faso" },
  visa: { duree: "Moins d'une semaine", personnes: "1 personne", paysActuel: "Burkina Faso" },
};

/* ---------- Field primitives ---------- */
const inputCls = "h-12 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground transition-colors duration-200 placeholder:text-muted-foreground/70 hover:border-navy/30 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/15 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive";

function Field({ id, label, required, error, children, className }: { id: string; label: string; required?: boolean; error?: string | undefined; children: ReactNode; className?: string | undefined }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/80">
        {label} {required && <span className="text-cta">*</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

function Fieldset({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-2xl border bg-background/60 p-5 md:p-6">
      <legend className="flex items-center gap-3 px-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-navy font-display text-xs font-bold text-gold">{step}</span>
        <span className="eyebrow text-navy">{title}</span>
      </legend>
      <div className="mt-2 grid gap-4 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function BookingModule() {
  const [kind, setKind] = useState<Kind>("billet");
  const [values, setValues] = useState<Values>(DEFAULTS.billet);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [lastUrl, setLastUrl] = useState("");

  const select = (k: Kind) => {
    setKind(k);
    setValues(DEFAULTS[k]);
    setErrors({});
    setStatus("idle");
  };
  const set = (k: Key) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setValues((v) => ({ ...v, [k]: val, ...(k === "paysDest" ? { villeDest: "" } : {}) }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: "" }));
  };
  const a = (k: Key) => ({ id: `f-${k}`, name: k, value: values[k] ?? "", onChange: set(k), "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `f-${k}-err` : undefined });
  const cities = useMemo(() => DEST_CITIES[values.paysDest ?? ""] ?? [], [values.paysDest]);
  const today = new Date().toISOString().slice(0, 10);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const blank = { nom: "", prenom: "", email: "", whatsapp: "", paysActuel: "", villeActuelle: "", paysDest: "", villeDest: "", dateDepart: "", dateArrivee: "", dateDepartHotel: "", paysVisa: "", dateVoyage: "", details: "" };
    const parsed = schemas[kind].safeParse({ ...blank, ...values });
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[String(i.path[0]) as Key] ??= i.message;
      setErrors(errs);
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      toast.error("Merci de compléter les champs requis.");
      return;
    }
    const v = parsed.data as Values;
    setStatus("sending");
    const url = waLink(buildWhatsAppMessage(kind, v));
    // Open WhatsApp synchronously-ish to avoid popup blockers
    const win = window.open("", "_blank");
    const { nom = "", prenom = "", email = "", whatsapp = "", ...details } = v;
    const { error } = await supabase.from("booking_requests").insert({ request_type: kind, last_name: nom, first_name: prenom, email, whatsapp, details });
    if (error) console.error(error);
    if (win) win.location.href = url;
    else window.location.href = url;
    setLastUrl(url);
    setStatus("done");
  };

  return (
    <div>
      <p className="eyebrow text-center text-gold">Choisissez votre besoin</p>
      <div role="tablist" aria-label="Type de demande" className="mt-5 grid gap-4 md:grid-cols-3">
        {CHOICES.map(({ id, title, text, Icon }) => {
          const active = kind === id;
          return (
            <button key={id} role="tab" aria-selected={active} onClick={() => select(id)} className={cn("group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1", active ? "border-gold bg-navy text-navy-foreground shadow-gold" : "bg-card hover:border-gold/60 hover:shadow-soft")}>
              <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-colors", active ? "bg-gold text-navy" : "bg-secondary text-navy group-hover:bg-accent")}><Icon className="h-6 w-6" /></span>
              <span>
                <span className="block font-display text-lg font-bold">{title}</span>
                <span className={cn("text-sm", active ? "text-navy-foreground/70" : "text-muted-foreground")}>{text}</span>
              </span>
              {active && <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-gold" />}
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-[1.75rem] border bg-card p-5 shadow-soft md:p-8">
        {status === "done" ? (
          <div className="flex flex-col items-center py-12 text-center" role="status">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-success/15 text-success"><CheckCircle2 className="h-10 w-10" /></span>
            <h3 className="mt-6 text-3xl font-extrabold text-navy">Demande envoyée</h3>
            <p className="mt-3 max-w-md text-muted-foreground">Votre demande est enregistrée et WhatsApp s'est ouvert avec votre message pré-rempli. Notre équipe vous répond sous 30 min en jours ouvrés.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={lastUrl} target="_blank" rel="noreferrer" className={btn({ variant: "whatsapp" })}><Send className="h-4 w-4" />Rouvrir WhatsApp</a>
              <button onClick={() => select(kind)} className={btn({ variant: "outline" })}>Nouvelle demande</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-6" aria-label={CHOICES.find((c) => c.id === kind)!.title}>
            {kind === "visa" && (
              <div className="flex gap-3 rounded-2xl bg-accent p-4 text-sm text-accent-foreground">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p><strong>Destinations disponibles :</strong> Dubaï AE · Thaïlande TH · Turquie TR · Qatar QA · Arabie Saoudite SA · Chine CN · Maroc MA · Kenya KE · Éthiopie ET · Madagascar MG · Zambie ZM · Cameroun CM</p>
              </div>
            )}
            <Fieldset step="1" title="Vos informations">
              <Field id="f-nom" label="Nom" required error={errors.nom}><input {...a("nom")} autoComplete="family-name" maxLength={100} className={inputCls} placeholder="Votre nom" /></Field>
              <Field id="f-prenom" label="Prénom" required error={errors.prenom}><input {...a("prenom")} autoComplete="given-name" maxLength={100} className={inputCls} placeholder="Votre prénom" /></Field>
              <Field id="f-email" label="Email" required error={errors.email}><input {...a("email")} type="email" autoComplete="email" maxLength={255} className={inputCls} placeholder="vous@exemple.com" /></Field>
              <Field id="f-whatsapp" label="WhatsApp" required error={errors.whatsapp}><input {...a("whatsapp")} type="tel" autoComplete="tel" maxLength={20} className={inputCls} placeholder="+226 XX XX XX XX" /></Field>
            </Fieldset>
            <Fieldset step="2" title="Localisation actuelle">
              <Field id="f-paysActuel" label="Pays actuel" required error={errors.paysActuel}>
                <select {...a("paysActuel")} className={inputCls}><option value="">Sélectionnez un pays</option>{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</select>
              </Field>
              <Field id="f-villeActuelle" label="Ville actuelle" required error={errors.villeActuelle}><input {...a("villeActuelle")} maxLength={80} className={inputCls} placeholder="Ex : Ouagadougou" /></Field>
            </Fieldset>

            {kind === "billet" && (
              <Fieldset step="3" title="Détails du voyage">
                <div className="md:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/80">Type de voyage</span>
                  <div role="radiogroup" className="inline-flex rounded-full bg-secondary p-1">
                    {["Aller simple", "Aller-retour"].map((t) => (
                      <button type="button" role="radio" aria-checked={values.typeVoyage === t} key={t} onClick={() => setValues((v) => ({ ...v, typeVoyage: t, ...(t === "Aller simple" ? { dateRetour: "" } : {}) }))} className={cn("rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200", values.typeVoyage === t ? "bg-navy text-navy-foreground shadow-soft" : "text-navy/70 hover:text-navy")}>{t}</button>
                    ))}
                  </div>
                </div>
                <DestFields a={a} errors={errors} cities={cities} hasCountry={!!values.paysDest} />
                <Field id="f-dateDepart" label="Date de départ" required error={errors.dateDepart}><input {...a("dateDepart")} type="date" min={today} className={inputCls} /></Field>
                <Field id="f-dateRetour" label="Date de retour" required={values.typeVoyage === "Aller-retour"} error={errors.dateRetour}><input {...a("dateRetour")} type="date" min={values.dateDepart || today} disabled={values.typeVoyage !== "Aller-retour"} className={inputCls} /></Field>
                <Field id="f-adultes" label="Adultes" required><select {...a("adultes")} className={inputCls}>{Array.from({ length: 9 }, (_, i) => `${i + 1} adulte${i ? "s" : ""}`).map((o) => <option key={o}>{o}</option>)}</select></Field>
                <Field id="f-enfants" label="Enfants 2–11 ans"><select {...a("enfants")} className={inputCls}>{["Aucun", "1 enfant", "2 enfants", "3 enfants", "4 enfants", "5 enfants"].map((o) => <option key={o}>{o}</option>)}</select></Field>
                <Field id="f-classe" label="Classe souhaitée" className="md:col-span-2"><select {...a("classe")} className={inputCls}>{["Économique", "Premium", "Affaires", "Première"].map((o) => <option key={o}>{o}</option>)}</select></Field>
                <Field id="f-remarques" label="Remarques / Précisions" error={errors.remarques} className="md:col-span-2"><textarea {...a("remarques")} rows={3} maxLength={1000} className={cn(inputCls, "h-auto py-3")} placeholder="Ex : bagage supplémentaire, préférence compagnie aérienne, demandes spéciales..." /></Field>
              </Fieldset>
            )}

            {kind === "hotel" && (
              <Fieldset step="3" title="Votre séjour">
                <DestFields a={a} errors={errors} cities={cities} hasCountry={!!values.paysDest} />
                <Field id="f-dateArrivee" label="Date d'arrivée" required error={errors.dateArrivee}><input {...a("dateArrivee")} type="date" min={today} className={inputCls} /></Field>
                <Field id="f-dateDepartHotel" label="Date de départ" required error={errors.dateDepartHotel}><input {...a("dateDepartHotel")} type="date" min={values.dateArrivee || today} className={inputCls} /></Field>
                <Field id="f-chambres" label="Nombre de chambres"><select {...a("chambres")} className={inputCls}>{Array.from({ length: 6 }, (_, i) => `${i + 1} chambre${i ? "s" : ""}`).map((o) => <option key={o}>{o}</option>)}</select></Field>
                <Field id="f-categorie" label="Catégorie d'hôtel"><select {...a("categorie")} className={inputCls}>{["2 étoiles", "3 étoiles", "4 étoiles", "5 étoiles", "Appartement"].map((o) => <option key={o}>{o}</option>)}</select></Field>
                <Field id="f-adultes" label="Adultes"><select {...a("adultes")} className={inputCls}>{Array.from({ length: 9 }, (_, i) => `${i + 1} adulte${i ? "s" : ""}`).map((o) => <option key={o}>{o}</option>)}</select></Field>
                <Field id="f-enfants" label="Enfants"><select {...a("enfants")} className={inputCls}>{["Aucun", "1 enfant", "2 enfants", "3 enfants", "4 enfants"].map((o) => <option key={o}>{o}</option>)}</select></Field>
                <Field id="f-remarques" label="Remarques" error={errors.remarques} className="md:col-span-2"><textarea {...a("remarques")} rows={3} maxLength={1000} className={cn(inputCls, "h-auto py-3")} placeholder="Ex : vue mer, petit-déjeuner inclus, proximité d'un lieu..." /></Field>
              </Fieldset>
            )}

            {kind === "visa" && (
              <>
                <Fieldset step="3" title="Destination du visa">
                  <Field id="f-paysVisa" label="Pays pour le visa" required error={errors.paysVisa}><select {...a("paysVisa")} className={inputCls}><option value="">Sélectionnez un pays</option>{VISA_COUNTRIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
                  <Field id="f-dateVoyage" label="Date de voyage prévue" required error={errors.dateVoyage}><input {...a("dateVoyage")} type="date" min={today} className={inputCls} /></Field>
                  <Field id="f-duree" label="Durée du séjour"><select {...a("duree")} className={inputCls}>{["Moins d'une semaine", "1 à 2 semaines", "2 à 4 semaines", "Plus d'un mois"].map((o) => <option key={o}>{o}</option>)}</select></Field>
                  <Field id="f-personnes" label="Nombre de personnes"><select {...a("personnes")} className={inputCls}>{Array.from({ length: 8 }, (_, i) => `${i + 1} personne${i ? "s" : ""}`).map((o) => <option key={o}>{o}</option>)}</select></Field>
                </Fieldset>
                <Fieldset step="4" title="Détails & message">
                  <Field id="f-details" label="Détails de votre demande" required error={errors.details} className="md:col-span-2"><textarea {...a("details")} rows={4} maxLength={1500} className={cn(inputCls, "h-auto py-3")} placeholder="Précisez votre situation : premier voyage, passeport disponible, questions sur les documents requis, délais souhaités, etc." /></Field>
                  <div className="flex gap-3 rounded-2xl border border-gold/40 bg-accent/60 p-4 text-sm md:col-span-2">
                    <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <p><strong className="text-navy">Documents généralement requis</strong><br /><span className="text-foreground/80">Passeport valide (min. 6 mois) · Photos d'identité récentes · Justificatif de revenus · Réservation hôtel/vol · Assurance voyage. Notre équipe vous précise les documents exacts selon votre destination.</span></p>
                  </div>
                </Fieldset>
              </>
            )}

            <div className="flex flex-col items-center gap-3 border-t pt-6 sm:flex-row sm:justify-between">
              <p className="text-xs text-muted-foreground"><span className="text-cta">*</span> Champs obligatoires · Réponse sous 30 min en jours ouvrés</p>
              <button type="submit" disabled={status === "sending"} className={cn(btn({ variant: "cta", size: "lg" }), "w-full sm:w-auto")}>
                {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                Envoyer la demande via WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function DestFields({ a, errors, cities, hasCountry }: { a: (k: Key) => object; errors: Errors; cities: string[]; hasCountry: boolean }) {
  return (
    <>
      <Field id="f-paysDest" label="Pays de destination" required error={errors.paysDest}>
        <select {...a("paysDest")} className={inputCls}><option value="">Sélectionnez un pays</option>{Object.keys(DEST_CITIES).map((c) => <option key={c}>{c}</option>)}</select>
      </Field>
      <Field id="f-villeDest" label="Ville de destination" required error={errors.villeDest}>
        <select {...a("villeDest")} disabled={!hasCountry} className={inputCls}><option value="">{hasCountry ? "Sélectionnez une ville" : "Sélectionnez d'abord le pays"}</option>{cities.map((c) => <option key={c}>{c}</option>)}</select>
      </Field>
    </>
  );
}
