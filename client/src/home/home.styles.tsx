import styled from "styled-components";
import { Add as addIcon } from "@mui/icons-material";

export const HomeContainer = styled.div({
  width: "100%",
  maxWidth: "100vw",
  overflowX: "hidden",
  boxSizing: "border-box",
  padding: "0 16px",
});

export const AddIcon = styled(addIcon)({
  color: "#f5c518",
  fontSize: 28,
  ml: 2,
});
