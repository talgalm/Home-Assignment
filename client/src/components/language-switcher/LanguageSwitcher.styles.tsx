import styled from "@emotion/styled";

export const StyledLanguageSwitcher = styled.div<{
  $direction?: "ltr" | "rtl";
}>`
  display: flex;
  align-items: center;
  margin-left: ${({ $direction = "ltr" }) =>
    $direction === "rtl" ? "0" : "16px"};
  margin-right: ${({ $direction = "ltr" }) =>
    $direction === "rtl" ? "16px" : "0"};
`;
