import React from "react";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { getLanguage } from "../../../helper-functions/getLanguage";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NextFood, PrevFood } from "../best-reviewed-items/SliderSettings";

const IconWrapper = styled(Box)(({ theme, isdisabled, left }) => ({
  zIndex: 1,
  right: left !== "true" && 0,
  left: left == "true" && 0,
  background: "rgba(255, 255, 255, 0.6)",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  color: theme.palette.neutral[800],
  display: isdisabled ? "none" : "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    color: theme.palette.neutral[800],
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
export const Next = ({ onClick, className }) => {
  return (
    <IconWrapper
      className={`client-nav client-next ${className}`}
      onClick={onClick}
      isdisabled={className?.includes("slick-disabled")}
    >
      {getLanguage() === "rtl" ? (
        <ChevronLeftIcon />
      ) : (
        <KeyboardArrowRightIcon />
      )}
    </IconWrapper>
  );
};
export const Prev = ({ onClick, className }) => {
  return (
    <IconWrapper
      className={`client-nav client-prev ${className}`}
      onClick={onClick}
      isdisabled={className?.includes("slick-disabled")}
      left="true"
    >
      {getLanguage() === "rtl" ? (
        <KeyboardArrowRightIcon />
      ) : (
        <ChevronLeftIcon />
      )}
    </IconWrapper>
  );
};
