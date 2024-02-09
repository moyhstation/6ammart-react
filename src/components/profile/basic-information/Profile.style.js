import { styled } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const SaveButton = styled(LoadingButton)(({ theme }) => ({
  color: "#ffffff",
  borderRadius: "5px",

  [theme.breakpoints.up("xs")]: {
    height: "42.04px",
  },
  [theme.breakpoints.up("md")]: {
    color: "#ffffff",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
  },
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
}));
export const CouponCard = styled(Grid)(({ theme }) => ({
  alignItems: "center",
  justify: "center",
}));
