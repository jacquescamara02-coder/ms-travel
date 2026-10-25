import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Nouveau mot de passe — M-S TRAVEL" },
      { name: "description", content: "Définir un nouveau mot de passe administrateur." },
      { property: "og:title", content: "Nouveau mot de passe — M-S TRAVEL" },
      { property: "og:description", content: "Définir un nouveau mot de passe administrateur." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.length < 8) { toast.error("8 caractères minimum."); return; }
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) { toast.error("Lien expiré ou invalide. Recommencez depuis « Mot de passe oublié »."); return; }
    toast.success("Mot de passe mis à jour.");
    navigate({ to: "/admin" });
  };
  return (
    <div className="bg-navy-gradient flex min-h-screen items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-card p-8 shadow-soft">
        <h1 className="text-2xl font-extrabold text-navy">Nouveau mot de passe</h1>
        <label htmlFor="npw" className="mt-6 block text-sm font-semibold text-navy">Mot de passe</label>
        <input id="npw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="mt-2 h-12 w-full rounded-xl border bg-background px-4 focus-visible:ring-2 focus-visible:ring-ring" />
        <button className="mt-6 h-12 w-full cursor-pointer rounded-full bg-cta font-semibold text-cta-foreground">Enregistrer</button>
      </form>
    </div>
  );
}
