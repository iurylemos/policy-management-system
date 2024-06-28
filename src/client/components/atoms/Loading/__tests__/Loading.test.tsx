import { expect, describe, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Loading from "@/src/client/components/atoms/Loading";

describe("<Loading />", () => {
  afterEach(() => {
    cleanup();
  });

  it("should check if the message is correct", () => {
    render(<Loading />);

    const loadingMessage = screen.getByText("Por favor, aguarde...");

    expect(loadingMessage).toBeDefined();
  });
});
