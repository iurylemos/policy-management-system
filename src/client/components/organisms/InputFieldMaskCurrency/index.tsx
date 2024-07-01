import React, { forwardRef } from "react";
import { useFormContext, Controller } from "react-hook-form";

type Props = {
  name: string;
  placeholder: string;
  className: string;
};

const InputFieldMaskCurrency = forwardRef<HTMLInputElement, Props>(
  ({ name, placeholder, className }, ref) => {
    const { control } = useFormContext();

    const formatCurrency = (value: string | number): string => {
      if (!value) return "";
      const numericValue =
        parseFloat(value.toString().replace(/[^\d]/g, "")) / 100;

      return numericValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
    };

    const parseValue = (value: string): number => {
      const numericValue =
        parseFloat(value.replace(/[^\d]/g, "").replace(",", ".")) / 100;
      return isNaN(numericValue) ? 0 : numericValue;
    };

    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            {...field}
            ref={ref}
            value={formatCurrency(field.value * 100)}
            onChange={(event) => {
              const inputValue = event.target.value;
              const numericValue = parseValue(inputValue);
              field.onChange(numericValue);
            }}
            placeholder={placeholder}
            className={className}
          />
        )}
      />
    );
  }
);

InputFieldMaskCurrency.displayName = "InputFieldMaskCurrency";

export default InputFieldMaskCurrency;
