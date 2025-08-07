import styled from "@emotion/styled";

export const MovieGridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gap: 16,
  padding: "16px 0",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  overflowX: "hidden",
  alignItems: "stretch",

  // Responsive grid columns
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",

  // Media queries for better control
  "@media (min-width: 600px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  },

  "@media (min-width: 900px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  },

  "@media (min-width: 1200px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  },

  "@media (min-width: 1500px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  },
}));
