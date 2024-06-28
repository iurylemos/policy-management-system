import { expect, describe, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import InfoboxWelcome from "@/src/client/components/atoms/InfoboxWelcome";

describe("<InfoboxWelcome />", () => {
  afterEach(() => {
    cleanup();
  });

  it("should check if href in create button are path correct", () => {
    render(<InfoboxWelcome />);

    const createButton: HTMLButtonElement = screen.getByRole("link", {
      name: /Criar Apólice/i,
    });

    expect(createButton).toBeDefined();

    expect(createButton.getAttribute("href")).toBe("/apolice/create");
  });
});
