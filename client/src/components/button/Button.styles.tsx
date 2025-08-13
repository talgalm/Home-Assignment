import { styled, Button, type ButtonProps } from "@mui/material";

export const CancelButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderColor: "rgba(255, 255, 255, 0.2)",
  color: theme.palette.text.primary,
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderWidth: "2px",
  borderRadius: "6px",
  padding: "10px 20px",
  fontWeight: 600,
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    borderColor: "rgba(255, 255, 255, 0.4)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  },
}));

export const ConfirmButton = styled(Button)<ButtonProps>(() => ({
  fontWeight: 700,
  background: "linear-gradient(135deg, #E50914 0%, #ff1a1a 100%)",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  padding: "12px 24px",
  fontSize: "1rem",
  textTransform: "none",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 12px rgba(229, 9, 20, 0.3)",

  "&:hover": {
    background: "linear-gradient(135deg, #ff1a1a 0%, #E50914 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(229, 9, 20, 0.4)",
  },

  "&:active": {
    transform: "translateY(0px)",
    boxShadow: "0 4px 12px rgba(229, 9, 20, 0.3)",
  },
}));

export const BackButton = styled(Button)<ButtonProps>(() => ({
  color: "#ffffff",
  borderColor: "rgba(255, 255, 255, 0.3)",
  borderWidth: "2px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "6px",
  padding: "10px 20px",
  fontWeight: 600,
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    borderColor: "rgba(255, 255, 255, 0.6)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  },
}));
