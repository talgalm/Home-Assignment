import styled from "@emotion/styled";

export const MovieGridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gap: 16,
  padding: 16,

  // This makes 5 cards per row on desktop
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(5, 1fr)",
  },

  // On mobile: 1 card per row (you can adjust this)
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));
