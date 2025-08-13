import styled from "styled-components";

export const AppContainer = styled("div")<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    minHeight: "100vh",
    backgroundColor: "#000000",
    paddingTop: "60px",
    overflowX: "hidden",
    width: "100%",
    maxWidth: "100vw",
    boxSizing: "border-box",
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",
  })
);
