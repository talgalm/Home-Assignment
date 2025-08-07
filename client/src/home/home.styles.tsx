import styled from "styled-components";
import { Search as icon } from "@mui/icons-material";
import { Add as addIcon } from "@mui/icons-material";

export const HomeContainer = styled("div")(({ theme }) => ({}));

export const SeacrhIcon = styled(icon)(({ theme }) => ({
  color: "#f5c518",
  fontSize: 28,
  ml: 2,
}));

export const AddIcon = styled(addIcon)(({ theme }) => ({
  color: "#f5c518",
  fontSize: 28,
  ml: 2,
}));
