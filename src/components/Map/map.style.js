import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";

export const WrapperCurrentLocationPick = styled(Stack)(({ theme }) => ({
  position: "absolute",
  right: 30,
  bottom: 40,
}));
export const CustomBoxWrapper = styled(Box)(({ theme, expand }) => ({
  outline: "none",
  position: "absolute",
  insetBlockStart: expand === "false" && "50%",
  left: expand === "false" && "50%",
  transform: expand === "false" && "translate(-50%, -50%)",
  bgColor: "background.paper",
  boxShadow: 24,
  padding: "10px",
  width:
      expand === "false"
          ? "90%"
          : "100%" /* Add a width that changes based on screen size */,
  height: expand === "true" && "100%",
  maxWidth: expand === "false" && "845px",
  minWidth: expand === "false" && "100px",
  background: theme.palette.background.paper,
  borderRadius: "5px",
  [theme.breakpoints.down("md")]: {
    maxWidth: expand === "false" && "500px",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: expand === "false" && "80%",
  },
}));
export const LocationView = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  flex: "1 0",
  maxWidth: "800px",
  width: "100%",
  background: theme.palette.neutral[100],
  color: theme.palette.neutral[1000],
  top: "15%",
  height: "48px",
  padding: "8px",
  position: "absolute",
  [theme.breakpoints.down("md")]: {
    top: "22%",
  },
  [theme.breakpoints.down("sm")]: {
    top: "32%",
  },
}));
export const PrimaryButton = styled(Button)(
  ({ theme, color, width, backgroundcolor }) => ({
    width: width ? width : "100%",
    color: theme.palette.whiteContainer.main,
    backgroundColor: backgroundcolor
      ? backgroundcolor
      : theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.neutral[100],
    },
  })
);
