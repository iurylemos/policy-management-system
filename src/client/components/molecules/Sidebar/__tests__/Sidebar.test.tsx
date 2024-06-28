import { expect, describe, it, afterEach, vi } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import Sidebar from "@/src/client/components/molecules/Sidebar";

vi.mock("next/navigation", () => ({
  usePathname() {
    return "";
  },
}));

describe("<Sidebar />", () => {
  afterEach(() => {
    cleanup();
  });

  it("should check if the href button is correct", async () => {
    render(<Sidebar />);

    const loadingMessage = screen.getByText("Apólice Tool");

    const createButton: HTMLButtonElement = screen.getByRole("link", {
      name: /Apólices/i,
    });

    expect(loadingMessage).toBeDefined();
    expect(createButton).toBeDefined();

    await waitFor(() => {
      expect(createButton.getAttribute("href")).toBe("/apolice");
    });
  });
});
