import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { from, insert } = vi.hoisted(() => ({
  from: vi.fn(),
  insert: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from },
}));

import { BookingModule } from "@/components/site/BookingModule";
import { DEST_CITIES } from "@/lib/site-data";

function fillTicketRequest() {
  fireEvent.change(screen.getByPlaceholderText("Votre nom"), {
    target: { value: "Camara" },
  });
  fireEvent.change(screen.getByPlaceholderText("Votre prénom"), {
    target: { value: "Jacques" },
  });
  fireEvent.change(screen.getByPlaceholderText("vous@exemple.com"), {
    target: { value: "jacques@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("+226 XX XX XX XX"), {
    target: { value: "+226 70 00 00 00" },
  });
  fireEvent.change(screen.getByPlaceholderText("Ex : Ouagadougou"), {
    target: { value: "Ouagadougou" },
  });

  const country = Object.keys(DEST_CITIES)[0]!;
  fireEvent.change(screen.getByLabelText(/Pays de destination/), {
    target: { value: country },
  });
  fireEvent.change(screen.getByLabelText(/Ville de destination/), {
    target: { value: DEST_CITIES[country]![0] },
  });
  fireEvent.change(screen.getByLabelText(/Date de départ/), {
    target: { value: "2027-10-01" },
  });
  fireEvent.change(screen.getByLabelText(/Date de retour/), {
    target: { value: "2027-10-10" },
  });
}

describe("BookingModule", () => {
  beforeEach(() => {
    from.mockReturnValue({ insert });
    insert.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it("confirms when a request is saved and opens the prefilled WhatsApp message", async () => {
    const popup = { location: { href: "" } };
    vi.spyOn(window, "open").mockReturnValue(popup as unknown as Window);
    render(<BookingModule />);
    fillTicketRequest();

    fireEvent.click(screen.getByRole("button", { name: "Envoyer la demande via WhatsApp" }));

    expect(await screen.findByRole("heading", { name: "Demande enregistrée" })).toBeInTheDocument();
    expect(insert).toHaveBeenCalledOnce();
    expect(popup.location.href).toContain("wa.me");
  });

  it("does not claim a request was saved when the database rejects it", async () => {
    insert.mockResolvedValue({ error: { message: "insert failed" } });
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(window, "open").mockReturnValue(null);
    render(<BookingModule />);
    fillTicketRequest();

    fireEvent.click(screen.getByRole("button", { name: "Envoyer la demande via WhatsApp" }));

    expect(
      await screen.findByRole("heading", { name: "Message prêt dans WhatsApp" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/enregistrement en ligne n'a pas abouti/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ouvrir WhatsApp" })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me"),
    );
  });
});
