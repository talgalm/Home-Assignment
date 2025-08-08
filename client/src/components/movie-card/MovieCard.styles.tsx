import styled from "@emotion/styled";
import { Typography, Box } from "@mui/material";

export const MovieCardContainer = styled.div<{ $direction?: "ltr" | "rtl" }>`
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  width: 100%;
  height: 100%;
  direction: ${({ $direction = "ltr" }) => $direction};
  text-align: ${({ $direction = "ltr" }) =>
    $direction === "rtl" ? "right" : "left"};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;
export const MovieTitle = styled(Typography)`
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const MovieInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MovieDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
