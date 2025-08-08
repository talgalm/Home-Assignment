import styled from "@emotion/styled";
import MovieIcon from "@mui/icons-material/Movie";

export const MovieGridContainer = styled("div")<{
  isEmpty: boolean;
  $direction?: "ltr" | "rtl";
}>(({ isEmpty, $direction = "ltr" }) => ({
  display: "grid",
  gap: 16,
  padding: "16px 0",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  overflowX: "hidden",
  alignItems: "stretch",
  minHeight: 300,
  direction: $direction,
  textAlign: $direction === "rtl" ? "right" : "left",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",

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
  height: 300,
  width: "100%",
  textAlign: "center",
});

export const EmptyStateIcon = styled(MovieIcon)({});

export const EmptyStateText = styled("p")({
  color: "#f5c518",
});

export const LoadMoreWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingTop: 32,
  paddingBottom: 32,
  gridColumn: "1 / -1",
  minHeight: 100,
});

export const LoadMoreContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
});

export const NoMoreMoviesWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingTop: 24,
  paddingBottom: 24,
  gridColumn: "1 / -1",
});

export const NoMoreMoviesText = styled("p")({
  color: "red",
});
