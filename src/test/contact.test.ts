import { describe, expect, it } from "vitest";
import { validateContactForm } from "@/lib/contact";

describe("validateContactForm", () => {
  it("rejects empty fields", () => {
    expect(validateContactForm({ name: "", email: "", message: "" })).toBe("Please complete all fields.");
  });

  it("rejects malformed email", () => {
    expect(
      validateContactForm({
        name: "Jeet",
        email: "jeet-at-email",
        message: "Hello",
      }),
    ).toBe("Please enter a valid email address.");
  });

  it("accepts valid payload", () => {
    expect(
      validateContactForm({
        name: "Jeet Soni",
        email: "jeet@example.com",
        message: "Let's collaborate.",
      }),
    ).toBe("");
  });
});
