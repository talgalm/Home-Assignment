import styled from "@emotion/styled";

export const MovieGridContainer = styled("div")<{ isEmpty: boolean }>(
  ({ isEmpty }) => ({
    display: "grid",
    gap: 16,
    padding: "16px 0",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    overflowX: "hidden",
    alignItems: "stretch",
    minHeight: "300px",

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
  })
);
