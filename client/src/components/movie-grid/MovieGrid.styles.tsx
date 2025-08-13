import styled from "@emotion/styled";
import MovieIcon from "@mui/icons-material/Movie";

export const MovieGridContainer = styled("div")<{
  isEmpty: boolean;
  $direction?: "ltr" | "rtl";
}>(({ isEmpty, $direction = "ltr" }) => ({
  display: "grid",
  gap: 24, // Increased gap for better spacing
  padding: "24px 0",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  overflowX: "hidden",
  alignItems: "stretch",
  minHeight: 300,
  direction: $direction,
  textAlign: $direction === "rtl" ? "right" : "left",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", // Slightly larger minimum

  "@media (min-width: 600px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  },
  "@media (min-width: 900px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  },
  "@media (min-width: 1200px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  },
  "@media (min-width: 1500px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  },

  ...(isEmpty && {
    "& > div:first-of-type": {
      gridColumn: "1 / -1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }),
}));

export const EmptyStateWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: 400, // Increased height
  width: "100%",
  textAlign: "center",
  background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "40px",
});

export const EmptyStateIcon = styled(MovieIcon)({
  fontSize: "4rem",
  color: "#E50914",
  marginBottom: "20px",
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
});

export const EmptyStateText = styled("p")({
  color: "#E50914",
  fontSize: "1.2rem",
  fontWeight: 600,
  margin: 0,
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
});

export const LoadMoreWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingTop: 40,
  paddingBottom: 40,
  gridColumn: "1 / -1",
  minHeight: 120,
});

export const LoadMoreContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
});

export const NoMoreMoviesWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingTop: 32,
  paddingBottom: 32,
  gridColumn: "1 / -1",
});

export const NoMoreMoviesText = styled("p")({
  color: "#E50914",
  fontSize: "1.1rem",
  fontWeight: 600,
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
});
