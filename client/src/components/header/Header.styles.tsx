import styled from "styled-components";
import { Add as addIcon } from "@mui/icons-material";

export const HeaderContainer = styled("header")<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "60px",
    backgroundColor: "#1a1a1a",
    borderBottom: "1px solid #333",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    zIndex: 1000,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    direction: $direction,
    "@media (max-width: 600px)": {
      height: "120px",
      width: "100%",
      padding: 1,
      flexDirection: "column",
    },
  })
);

export const HeaderTitle = styled("h1")({
  color: "#f5c518",
  fontSize: "24px",
  fontWeight: "bold",
  margin: 0,
  fontFamily: "Arial, sans-serif",
  display: "flex",
  alignItems: "center",
});

export const LogoImage = styled("img")({
  height: "40px",
  width: "auto",
  display: "block",
});

export const SearchContainer = styled("div")<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    flex: 1,
    maxWidth: "400px",
    marginLeft: $direction === "rtl" ? "0" : "40px",
    marginRight: $direction === "rtl" ? "40px" : "0",
    display: "flex",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    "@media (max-width: 600px)": {
      flexDirection: "column",
      marginRight: 10,
    },
  })
);

export const DisplayConteinr = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "65%",
  justifyContent: "space-between",
  "@media (max-width: 600px)": {
    width: "100%",
    padding: 4,
  },
});

export const ButtonsContainer = styled("div")({
  display: "flex",
  gap: 20,
  justifyContent: "center",
  alignItems: "center",
});

export const AddIcon = styled(addIcon)({
  color: "#f5c518",
  fontSize: 28,
  marginLeft: "8px",
});
