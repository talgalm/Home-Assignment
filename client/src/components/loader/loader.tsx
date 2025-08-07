import { Box, CircularProgress } from "@mui/material";
import GeneralTypography from "../typography/Typography";

interface LoaderProps {
  loading: boolean;
  text?: string;
  size?: number;
}

const GeneralLoader = ({
  loading,
  text = "Loading...",
  size = 60,
}: LoaderProps) => {
  if (!loading) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 6,
      }}
    >
      <CircularProgress
        size={size}
        sx={{
          color: "#f5c518",
          mb: 2,
        }}
      />
      <GeneralTypography
        value={text}
        variant="h6"
        styleProps={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 500 }}
      />
    </Box>
  );
};

export default GeneralLoader;
