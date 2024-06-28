import { expect, describe, it, vi } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import ApolicePage from "@/app/apolice/page";
import axios from "axios";
import { getApoliceMock } from "./__mocks__/getApolice.mock";

vi.mock("axios");

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("<ApolicePage />", () => {
  it("should renders a heading with Apólices name inside", () => {
    render(<ApolicePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Apólices/i })
    ).toBeDefined();
  });

  it("should show the data about Apólices get from API", async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({
      data: getApoliceMock,
    });

    await act(async () => {
      render(<ApolicePage />);
    });

    await waitFor(() => {
      const val = screen.getByText(getApoliceMock.content[0].numero.toString());

      expect(val).toBeDefined();
    });
  });
});
