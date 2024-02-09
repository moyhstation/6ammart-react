import { Stack, styled, Typography } from "@mui/material";

export const ItemWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
}));
export const ModalCustomTypography = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  minWidth: "150px",
  [theme.breakpoints.down("sm")]: {
    minWidth: "100px",
  },
}));
