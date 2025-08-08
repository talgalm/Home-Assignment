import React from "react";
import GeneralTypography from "../typography/Typography";
import { LoaderContainer, LoaderSpinner } from "./loader.styles";

interface LoaderProps {
  loading: boolean;
  text?: string;
  size?: number;
}

const GeneralLoader: React.FC<LoaderProps> = ({
  loading,
  text = "Loading...",
  size = 60,
}) => {
  if (!loading) return null;

  return (
    <LoaderContainer>
      <LoaderSpinner size={size} />
      <GeneralTypography
        value={text}
        variant="h6"
        styleProps={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 500 }}
      />
    </LoaderContainer>
  );
};

export default GeneralLoader;
