import { styled, Button, type ButtonProps } from "@mui/material";

export const CancelButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderColor: "rgba(0, 0, 0, 0.2)",
  color: theme.palette.text.primary,
  "&:hover": {
    borderColor: "rgba(0, 0, 0, 0.4)",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

export const ConfirmButton = styled(Button)<ButtonProps>(() => ({
  fontWeight: "bold",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: 2,
  },
}));

export const BackButton = styled(Button)<ButtonProps>(() => ({
  color: "white",
  borderColor: "rgba(255, 255, 255, 0.3)",
  "&:hover": {
    borderColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));