import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { alpha, Checkbox, Drawer } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { Stack } from "@mui/system";

export const CustomDrawerForSideDrawer = styled(Drawer)(({ theme }) => ({
  display: "flex",
}));

export const SideDrawerWrapper = styled(Box)(({ theme, maxWidth }) => ({
  backgroundColor: theme.palette.neutral[100],
  width: "maxWidth",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
export const CustomAppbarFilter = styled(MuiAppBar)(({ theme, loyalty }) => ({
  height: "4.75rem",
  width: "26rem",
  padding: "0px 0px 0px 0px",

  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  [theme.breakpoints.up("xs")]: {
    width: "17rem",
  },
  [theme.breakpoints.up("sm")]: {
    width: "17rem",
  },
  [theme.breakpoints.up("md")]: {
    width: "26rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "17rem",
  },
}));
export const WrapperForSideDrawerFilter = styled(Box)(({ theme }) => ({
  marginTop: "5rem",
  padding: "2rem",
  width: "100%",
  height: "90vh",

  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    height: "40vh",
    padding: "1rem",
  },
}));
export const checkBoxStyles = styled(Stack)(({}) => ({
  width: "24px",
  height: "24px",
  border: "3px solid green",
  borderRadius: "4px",
  justifyContent: "center",
  alignItems: "center",
}));
