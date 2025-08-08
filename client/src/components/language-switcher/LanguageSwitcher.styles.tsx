import styled from "@emotion/styled";
import { IconButton, Menu, MenuItem, type MenuProps } from "@mui/material";
import type { JSX } from "react/jsx-runtime";

export const StyledLanguageSwitcher = styled.div<{
  $direction?: "ltr" | "rtl";
}>`
  display: flex;
  align-items: center;
  margin-left: ${({ $direction = "ltr" }) =>
    $direction === "rtl" ? "0" : "16px"};
  margin-right: ${({ $direction = "ltr" }) =>
    $direction === "rtl" ? "16px" : "0"};
`;

export const StyledIconButton = styled(IconButton)`
  color: white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

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
)``;

interface StyledMenuItemProps {
  selected?: boolean;
}

export const StyledMenuItem = styled(MenuItem)<StyledMenuItemProps>`
  color: ${({ selected }) => (selected ? "#f5c518" : "white")};

  &:hover {
    background-color: rgba(245, 197, 24, 0.1);
  }

  &.Mui-selected {
    background-color: rgba(245, 197, 24, 0.2);

    &:hover {
      background-color: rgba(245, 197, 24, 0.3);
    }
  }
`;
