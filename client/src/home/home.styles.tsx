import styled from "styled-components";
import { Add as addIcon } from "@mui/icons-material";

export const HomeContainer = styled("div")<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    width: "100%",
    maxWidth: "100vw",
    overflowX: "hidden",
    boxSizing: "border-box",
    padding: "90px 24px 24px 24px", // Increased top padding for header
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",
    background:
      "linear-gradient(180deg, #000000 0%, #141414 50%, #000000 100%)",
    minHeight: "100vh",
  })
);

export const AddIcon = styled(addIcon)(() => ({
  color: "#E50914", // Netflix red
  fontSize: 30,
  marginLeft: 8,
  filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
}));
