import { IconButton, styled } from "@mui/material";
import { Box } from "@mui/system";

export const LeftArrowStyle = styled(Box)(
  ({ theme, language_direction, left, top }) => ({
    zIndex: "1",
    top: top ? top : "26%",
    position: "absolute",
    background: theme.palette.neutral[100],
    borderRadius: "50%",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    right: language_direction === "rtl" && "0px",
    left: `${language_direction === "rtl" ? "unset" : left}`,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  })
);
export const RightArrowStyle = styled(Box)(
  ({ theme, language_direction, right, top }) => ({
    zIndex: "1",
    position: "absolute",
    top: top ? top : "26%",
    background: theme.palette.neutral[100],
    borderRadius: "50%",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    right: `${language_direction === "rtl" ? "unset" : right}`,
    left: language_direction === "rtl" ? "0px" : "unset",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  })
);
export const IconButtonGray = styled(IconButton)(
  ({ theme, color, borderraduis }) => ({
    borderRadius: "50%",
  })
);
