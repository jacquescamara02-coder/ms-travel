import { describe, expect, it } from "vitest";
import { applyContent } from "@/lib/content-registry";
import { markSegments } from "@/lib/content-client";
import { CONTACT, DESTINATIONS } from "@/lib/site-data";

describe("admin content", () => {
  it("admin edits replace site data and removal restores the original", () => {
    const original = DESTINATIONS.length;
    applyContent({ destinations: [{ slug: "x", name: "Test" }], contact: { email: "info@mstravel-bf.com" } });
    expect(DESTINATIONS.length).toBe(1);
    expect(CONTACT.email).toBe("info@mstravel-bf.com");
    applyContent({});
    expect(DESTINATIONS.length).toBe(original);
    expect(CONTACT.email).toBe("contact@mstravel-bf.com");
  });

  it("starred words in titles are shown in red", () => {
    expect(markSegments("Nos *Services*")).toEqual([{ t: "Nos ", red: false }, { t: "Services", red: true }]);
  });
});
