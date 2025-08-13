import styled from "@emotion/styled";
import { IconButton, Menu, MenuItem, type MenuProps } from "@mui/material";
import type { JSX } from "react/jsx-runtime";

export const StyledLanguageSwitcher = styled("div")<{
  $direction?: "ltr" | "rtl";
}>(({ $direction = "ltr" }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: $direction === "rtl" ? "0" : "16px",
  marginRight: $direction === "rtl" ? "16px" : "0",
}));

export const StyledIconButton = styled(IconButton)(() => ({
  color: "#ffffff",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    transform: "translateY(-1px)",
  },
}));

export const StyledMenu = styled(
  (props: JSX.IntrinsicAttributes & MenuProps) => (
    <Menu
      {...props}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(20, 20, 20, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          minWidth: 140,
          borderRadius: "8px",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.8)",
        },
      }}
    />
  )
)(() => ({}));

interface StyledMenuItemProps {
  selected?: boolean;
}

export const StyledMenuItem = styled(MenuItem)<StyledMenuItemProps>(
  ({ selected }) => ({
    color: selected ? "#E50914" : "#ffffff",
    fontWeight: selected ? 600 : 400,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(229, 9, 20, 0.1)",
    },
    "&.Mui-selected": {
      backgroundColor: "rgba(229, 9, 20, 0.15)",
      "&:hover": {
        backgroundColor: "rgba(229, 9, 20, 0.25)",
      },
    },
  })
);
