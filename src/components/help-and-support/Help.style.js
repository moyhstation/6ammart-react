import { Box, Grid, Typography, styled, alpha } from "@mui/material";

export const HelpBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  padding: "30px 0px 30px 0px",
  // width:'100%'
}));

export const HelpTypographyBox = styled(Box)(() => ({
  textAlign: "center",
}));
export const VisitBox = styled(Box)(({ theme }) => ({
  height: "250px",
  background: alpha(theme.palette.primary.main, 0.1),
  borderRadius: "10px",
  padding: "40px",
}));
export const HelpImgBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  paddingBottom: "10px",
}));
export const HelpGrid = styled(Grid)(() => ({
  padding: "30px 0px 70px 0px",
}));
