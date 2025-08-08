import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyledInput } from "./Input.styles";
import { useLanguageDirection } from "../../hooks/useLanguageDirection";

type GeneralInputProps = {
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
};

const GeneralInput: React.FC<GeneralInputProps> = ({
  name,
  placeholder,
  type = "text",
  required = false,
  defaultValue,
}) => {
  const { control } = useFormContext();
  const direction = useLanguageDirection();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ""}
      render={({ field, fieldState }) => (
        <StyledInput
          {...field}
          type={type}
          required={required}
          placeholder={placeholder}
          fullWidth
          variant="outlined"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          $direction={direction}
          inputProps={{
            dir: direction,
            style: {
              direction,
              textAlign: direction === "rtl" ? "right" : "left",
            },
          }}
        />
      )}
    />
  );
};

export default GeneralInput;
