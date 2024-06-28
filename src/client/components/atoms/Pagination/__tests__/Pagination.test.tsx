import { expect, describe, it, vi, afterEach } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
import Pagination from "@/src/client/components/atoms/Pagination";

describe("Pagination", () => {
  afterEach(() => {
    cleanup();
  });

  it("should renders a button back page and dispatch props to handle page", async () => {
    const functionPageChange = vi.fn();

    const props = {
      currentPage: 3,
      totalPages: 10,
      onPageChange: functionPageChange,
    };

    render(
      <Pagination
        currentPage={props.currentPage}
        onPageChange={props.onPageChange}
        totalPages={props.totalPages}
      />
    );

    const button = screen.getByRole("button", { name: /Voltar/i });

    expect(button).toBeDefined();

    fireEvent.click(button);

    await waitFor(() => {
      expect(functionPageChange).toHaveBeenCalledTimes(1);
    });
  });

  it("should renders a button next page and dispatch props to handle page", async () => {
    const functionPageChange = vi.fn();

    const props = {
      currentPage: 3,
      totalPages: 10,
      onPageChange: functionPageChange,
    };

    render(
      <Pagination
        currentPage={props.currentPage}
        onPageChange={props.onPageChange}
        totalPages={props.totalPages}
      />
    );

    const button = screen.getByRole("button", { name: /Próxima/i });

    expect(button).toBeDefined();

    fireEvent.click(button);

    await waitFor(() => {
      expect(functionPageChange).toHaveBeenCalledTimes(1);
    });
  });
});
