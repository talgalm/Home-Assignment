import styled from "styled-components";
import { Add as addIcon } from "@mui/icons-material";

export const HomeContainer = styled("div")<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    width: "100%",
    maxWidth: "100vw",
    overflowX: "hidden",
    boxSizing: "border-box",
    padding: "0 16px",
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",
  })
);

export const AddIcon = styled(addIcon)(() => ({
  color: "#f5c518",
  fontSize: 28,
  marginLeft: 8,
}));
