import { expect, describe, it, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import MobileMenu from "@/src/client/components/molecules/MobileMenu";

describe("<MobileMenu />", () => {
  afterEach(() => {
    cleanup();
  });

  it("should check if the href button is correct", async () => {
    render(<MobileMenu />);

    const button = screen.getByTestId("mobile-menu-hamburguer");

    const loadingMessage = screen.getByText("Apólice Tool");

    const createButton: HTMLButtonElement = screen.getByRole("link", {
      name: /Home/i,
    });

    expect(loadingMessage).toBeDefined();
    expect(button).toBeDefined();
    expect(createButton).toBeDefined();

    await waitFor(() => {
      expect(createButton.getAttribute("href")).toBe("/");
    });
  });
});
