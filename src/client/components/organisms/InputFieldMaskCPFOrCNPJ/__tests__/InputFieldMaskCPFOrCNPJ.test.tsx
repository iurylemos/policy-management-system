import React from "react";
import { expect, describe, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import InputFieldMaskCPFOrCNPJ from "@/src/client/components/organisms/InputFieldMaskCPFOrCNPJ"; // Adjust the import according to your file structure

vi.mock("next/navigation", () => ({
  usePathname() {
    return "";
  },
}));

const renderWithFormProvider = (ui: React.ReactElement) => {
  const Wrapper = () => {
    const methods = useForm();
    return <FormProvider {...methods}>{ui}</FormProvider>;
  };
  return render(<Wrapper />);
};

describe("<InputFieldMaskCurrency />", () => {
  it("should format input as currency and only accept numeric input", () => {
    const { getByPlaceholderText } = renderWithFormProvider(
      <InputFieldMaskCPFOrCNPJ
        name="CPF/CNPJ"
        placeholder="Enter CPF or CNPJ"
        className="input-class"
      />
    );

    const input = getByPlaceholderText("Enter CPF or CNPJ") as HTMLInputElement;

    // Simulate typing a number
    fireEvent.change(input, { target: { value: "12345" } });
    expect(input.value).toBe("123.45");

    // Simulate typing non-numeric characters
    fireEvent.change(input, { target: { value: "12345abc" } });
    expect(input.value).toBe("123.45");

    // Simulate typing a larger number
    fireEvent.change(input, { target: { value: "12345678901" } });
    expect(input.value).toBe("123.456.789-01");
  });
});
