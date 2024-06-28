import { expect, describe, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Welcome from "@/src/client/components/organisms/Welcome";

describe("<Welcome />", () => {
  afterEach(() => {
    cleanup();
  });

  it("should check if text in each box are the message correct", () => {
    render(<Welcome />);

    const messageBox01 = screen.getByText("Acompanhamento!");
    const messageBox02 = screen.getByText("Help Desk 24 Horas!");
    const messageBox03 = screen.getByText("Sonho!");
    const messageBox04 = screen.getByText("Segurança!");

    expect(messageBox01).toBeDefined();
    expect(messageBox02).toBeDefined();
    expect(messageBox03).toBeDefined();
    expect(messageBox04).toBeDefined();
  });
});
