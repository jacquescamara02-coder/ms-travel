import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/ms-travel-logo.png.asset.json";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Connexion administrateur — M-S TRAVEL" },
      { name: "description", content: "Espace réservé à l'administration du site M-S TRAVEL." },
      { property: "og:title", content: "Connexion administrateur — M-S TRAVEL" },
      { property: "og:description", content: "Espace réservé à l'administration du site M-S TRAVEL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const field = "h-12 w-full rounded-xl border bg-background px-4 text-foreground focus:border-sky focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
      setBusy(false);
      if (error) return toast.error("Envoi impossible. Réessayez.");
      toast.success("Un lien de réinitialisation vous a été envoyé par e-mail.");
      return setMode("login");
    }
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) return toast.error(error.message.includes("confirmed") ? "Confirmez d'abord votre adresse via l'e-mail reçu." : "E-mail ou mot de passe incorrect.");
    navigate({ to: "/admin" });
  };

  return (
    <div className="bg-navy-gradient grain flex min-h-screen items-center justify-center px-4 py-16">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-card p-8 shadow-soft md:p-10">
        <img src={logo.url} alt="M-S TRAVEL" className="mx-auto h-14 w-auto" />
        <h1 className="mt-6 flex items-center justify-center gap-2 text-center text-2xl font-extrabold text-navy"><Lock className="h-5 w-5 text-brand-red" />{mode === "login" ? "Espace administrateur" : "Mot de passe oublié"}</h1>
        <label className="mt-8 block text-sm font-semibold text-navy" htmlFor="email">E-mail</label>
        <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} mt-2`} />
        {mode === "login" && (
          <>
            <label className="mt-5 block text-sm font-semibold text-navy" htmlFor="pw">Mot de passe</label>
            <input id="pw" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${field} mt-2`} />
          </>
        )}
        <button type="submit" disabled={busy} className="mt-8 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-cta font-semibold text-cta-foreground transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}{mode === "login" ? "Se connecter" : "Envoyer le lien"}
        </button>
        <div className="mt-5 flex justify-between text-sm">
          <button type="button" onClick={() => setMode(mode === "login" ? "forgot" : "login")} className="cursor-pointer font-semibold text-petrol hover:underline">{mode === "login" ? "Mot de passe oublié ?" : "Retour à la connexion"}</button>
          <Link to="/" className="font-semibold text-muted-foreground hover:underline">Voir le site</Link>
        </div>
      </form>
    </div>
  );
}
