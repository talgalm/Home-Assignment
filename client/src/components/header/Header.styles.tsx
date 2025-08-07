import styled from "styled-components";
import { Add as addIcon } from "@mui/icons-material";

export const HeaderContainer = styled.header({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "60px",
  backgroundColor: "#1a1a1a",
  borderBottom: "1px solid #333",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  zIndex: 1000,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const HeaderTitle = styled.h1({
  color: "#f5c518",
  fontSize: "24px",
  fontWeight: "bold",
  margin: 0,
  fontFamily: "Arial, sans-serif",
  display: "flex",
  alignItems: "center",
});

export const LogoImage = styled.img({
  height: "40px",
  width: "auto",
  display: "block",
});

export const SearchContainer = styled.div({
  flex: 1,
  maxWidth: "400px",
  marginLeft: "40px",
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
