import React from "react";
import type { ButtonProps } from "@mui/material";
import { CancelButton, ConfirmButton, BackButton } from "./Button.styles";

export type GeneralButtonVariant = "cancel" | "confirm" | "back" | "custom";

interface GeneralButtonProps
  extends Omit<ButtonProps, "variant" | "color" | "children"> {
  variantType?: GeneralButtonVariant;
  text: string;
}

const GeneralButton: React.FC<GeneralButtonProps> = ({
  variantType = "custom",
  text,
  ...rest
}) => {
  switch (variantType) {
    case "cancel":
      return (
        <CancelButton variant="outlined" {...rest}>
          {text}
        </CancelButton>
      );
    case "confirm":
      return (
        <ConfirmButton variant="contained" color="primary" {...rest}>
          {text}
        </ConfirmButton>
      );
    case "back":
      return (
        <BackButton variant="outlined" {...rest}>
          {text}
        </BackButton>
      );
    case "custom":
    default:
      return <ConfirmButton {...rest}>{text}</ConfirmButton>;
  }
};

export default GeneralButton;
