import styled from "styled-components";

export const AppContainer = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "#0f0f0f",
  paddingTop: "60px", // Account for fixed header height
  overflowX: "hidden",
  width: "100%",
  maxWidth: "100vw",
  boxSizing: "border-box",
}));
