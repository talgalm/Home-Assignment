import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { StyledAutocomplete } from "./Autocomplete.styles";

interface AutocompleteProps {
  name: string;
  options: string[];
  placeholder?: string;
  label?: string;
  multiple?: boolean;
  freeSolo?: boolean;
  defaultValue?: string[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  name,
  options,
  placeholder = "Select options",
  label,
  multiple = true,
  freeSolo = true,
  defaultValue = [],
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <StyledAutocomplete
          multiple={multiple}
          freeSolo={freeSolo}
          options={options}
          value={field.value || []}
          onChange={(_, newValueRaw) => {
            if (multiple && Array.isArray(newValueRaw)) {
              const normalized = newValueRaw.map(
                (option) =>
                  option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()
              );
              const uniqueOptions = Array.from(new Set(normalized));
              field.onChange(uniqueOptions);
            } else if (!multiple) {
              field.onChange(newValueRaw);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />
      )}
    />
  );
};

export default Autocomplete;
