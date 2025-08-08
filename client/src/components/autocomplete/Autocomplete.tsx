import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { StyledAutocomplete } from "./Autocomplete.styles";
import { useLanguageDirection } from "../../hooks/useLanguageDirection";

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
  const direction = useLanguageDirection();

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
          dir={direction}
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
              label={''}
              placeholder={placeholder}
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: {
                  direction,
                  textAlign: direction === "rtl" ? "right" : "left",
                },
              }}
              inputProps={{
                ...params.inputProps,
                dir: direction,
                style: {
                  direction,
                  textAlign: direction === "rtl" ? "right" : "left",
                },
              }}
            />
          )}
        />
      )}
    />
  );
};

export default Autocomplete;
