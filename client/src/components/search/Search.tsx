import React from "react";
import type { TextFieldProps } from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { StyledTextField } from "./Search.styles";
import { useLanguageDirection } from "../../hooks/useLanguageDirection";

interface CustomTextFieldProps extends Omit<TextFieldProps, "variant"> {
  icon?: React.ReactNode;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GeneralSearch: React.FC<CustomTextFieldProps> = ({
  icon,
  placeholder = "Type here...",
  value,
  onChange,
  ...rest
}) => {
  const direction = useLanguageDirection();
  return (
    <StyledTextField
      fullWidth
      dir={direction}
      variant="standard"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">{icon}</InputAdornment>
        ) : undefined,
      }}
      {...rest}
    />
  );
};

export default GeneralSearch;
