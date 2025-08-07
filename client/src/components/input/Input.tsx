import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyledInput } from "./Input.styles";

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
        />
      )}
    />
  );
};

export default GeneralInput;
