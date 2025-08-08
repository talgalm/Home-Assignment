import styled from "@emotion/styled";

export const StyledMovieDetail = styled.div<{ $direction?: "ltr" | "rtl" }>`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  direction: ${({ $direction = "ltr" }) => $direction};
  text-align: ${({ $direction = "ltr" }) =>
    $direction === "rtl" ? "right" : "left"};

  @media (max-width: 768px) {
    padding: 16px;
  }
`;
