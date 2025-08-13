import styled from "styled-components";
import { Add as addIcon } from "@mui/icons-material";

export const HeaderContainer = styled("header")<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "70px",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 100%)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    zIndex: 1000,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    direction: $direction,
    transition: "all 0.3s ease",
    "@media (max-width: 600px)": {
      height: "120px",
      width: "100%",
      padding: 1,
      flexDirection: "column",
    },
  })
);

export const HeaderTitle = styled("h1")({
  color: "#E50914", // Netflix red
  fontSize: "28px",
  fontWeight: "900",
  margin: 0,
  fontFamily: "Inter, Arial, sans-serif",
  display: "flex",
  alignItems: "center",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  letterSpacing: "-0.02em",
});

export const LogoImage = styled("img")({
  height: "45px",
  width: "auto",
  display: "block",
  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))",
});

export const SearchContainer = styled("div")<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    flex: 1,
    maxWidth: "450px",
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
  color: "#E50914", // Netflix red
  fontSize: 30,
  marginLeft: "8px",
  filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
});
