import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageBack() {
  return (
    <div className="mb-8">
      <Button
        type="button"
        variant="outline"
        onClick={() => (window.history.length > 1 ? window.history.back() : (window.location.href = "/"))}
        className="group h-10 rounded-full px-4 font-semibold transition-all duration-200 hover:-translate-x-0.5 focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Retour à la page précédente"
      >
        <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
        Retour
      </Button>
    </div>
  );
}