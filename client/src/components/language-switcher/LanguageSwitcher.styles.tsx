import styled from "@emotion/styled";
import { IconButton, Menu, MenuItem, type MenuProps } from "@mui/material";
import type { JSX } from "react/jsx-runtime";

export const StyledLanguageSwitcher = styled("div")<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    display: "flex",
    alignItems: "center",
    marginLeft: $direction === "rtl" ? "0" : "16px",
    marginRight: $direction === "rtl" ? "16px" : "0",
  })
);

export const StyledIconButton = styled(IconButton)(() => ({
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

export const StyledMenu = styled(
  (props: JSX.IntrinsicAttributes & MenuProps) => (
    <Menu
      {...props}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(26, 26, 26, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          minWidth: 120,
        },
      }}
    />
  )
)(() => ({}));

interface StyledMenuItemProps {
  selected?: boolean;
}

export const StyledMenuItem = styled(MenuItem)<StyledMenuItemProps>(({ selected }) => ({
  color: selected ? "#f5c518" : "white",
  "&:hover": {
    backgroundColor: "rgba(245, 197, 24, 0.1)",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(245, 197, 24, 0.2)",
    "&:hover": {
      backgroundColor: "rgba(245, 197, 24, 0.3)",
    },
  },
}));