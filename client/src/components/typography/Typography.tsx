import React from "react";
import { StyledTypography } from "./Typography.styles";

interface TopographyProps {
  value: string | number | undefined;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2";
  styleProps?: React.CSSProperties;
  onClick?(): void;
}

const GeneralTypography: React.FC<TopographyProps> = ({
  value,
  variant,
  styleProps,
  onClick,
}) => {
  return (
    <StyledTypography
      variant={variant}
      onClick={onClick}
      sx={{
        ...styleProps,
      }}
    >
      {value}
    </StyledTypography>
  );
};

export default GeneralTypography;
