import React, { forwardRef } from "react";
import { useFormContext, Controller } from "react-hook-form";

type Props = {
  mask: string;
  name: string;
  placeholder: string;
  className: string;
};

const InputFieldMask = forwardRef<HTMLInputElement, Props>(
  ({ mask, name, placeholder, className }, ref): JSX.Element => {
    const { control } = useFormContext();

    const formatValue = (inputValue: string): string => {
      const numericValue = inputValue.replace(/\D/g, "");
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

InputFieldMask.displayName = "InputFieldMask";

export default InputFieldMask;
