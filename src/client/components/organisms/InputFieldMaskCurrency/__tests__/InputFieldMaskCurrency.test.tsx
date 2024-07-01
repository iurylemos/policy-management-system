import React from "react";
import { expect, describe, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import InputFieldMaskCurrency from "@/src/client/components/organisms/InputFieldMaskCurrency"; // Adjust the import according to your file structure

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
      <InputFieldMaskCurrency
        name="amount"
        placeholder="Enter amount"
        className="input-class"
      />
    );

    const input = getByPlaceholderText("Enter amount") as HTMLInputElement;

    // Simulate typing a number
    fireEvent.change(input, { target: { value: "12345" } });
    expect(input.value).toBe("R$ 123,45");

    // Simulate typing non-numeric characters
    fireEvent.change(input, { target: { value: "12345abc" } });
    expect(input.value).toBe("R$ 123,45");

    // Simulate typing a larger number
    fireEvent.change(input, { target: { value: "1234567890" } });
    expect(input.value).toBe("R$ 12.345.678,90");
  });
});
