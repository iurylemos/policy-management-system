import React, { forwardRef } from "react";
import { useFormContext, Controller } from "react-hook-form";

type Props = {
  name: string;
  placeholder: string;
  className: string;
};

const InputFieldMaskCPForCNPJ = forwardRef<HTMLInputElement, Props>(
  ({ name, placeholder, className }, ref): JSX.Element => {
    const { control } = useFormContext();

    const CPF_MASK = "000.000.000-00";
    const CNPJ_MASK = "00.000.000/0000-00";

    const formatValue = (inputValue: string): string => {
      const numericValue = inputValue.replace(/\D/g, "");
      let mask = numericValue.length > 11 ? CNPJ_MASK : CPF_MASK;
      let maskedValue = "";
      let valueIndex = 0;

      for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
        if (valueIndex >= numericValue.length) {
          break;
        }

        if (mask[maskIndex] === "0") {
          maskedValue += numericValue[valueIndex];
          valueIndex++;
        } else {
          maskedValue += mask[maskIndex];
        }
      }

      return maskedValue;
    };

    return (
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <input
            {...field}
            ref={ref}
            value={formatValue(field.value || "")}
            onChange={(event) => {
              const formattedValue = formatValue(event.target.value);
              field.onChange(formattedValue);
            }}
            placeholder={placeholder}
            className={className}
          />
        )}
      />
    );
  }
);

InputFieldMaskCPForCNPJ.displayName = "InputFieldMaskCPForCNPJ";

export default InputFieldMaskCPForCNPJ;
