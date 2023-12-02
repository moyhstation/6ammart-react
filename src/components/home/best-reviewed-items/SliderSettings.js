import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { getLanguage } from "../../../helper-functions/getLanguage";
import { RTL } from "../../rtl";

const ButtonContainer = styled(Box)(
  ({ theme, right, isdisabled, noBackground, isRtl, rightSpace }) => ({
    top: 0,
    height: "100%",
    width: "42px",
    transition: "background-image 0.3s ease-in-out, transform 0.3s ease-in-out", // Adding transitions for smooth background image and transform changes
    transform: "translateX(0)", // Initial transform,
    background:
      noBackground === "true"
        ? null
        : right === "true"
        ? `linear-gradient(270deg, ${
            isRtl === "rtl"
              ? "rgba(255, 255, 255, 0)"
              : theme.palette.neutral[100]
          } 0%, ${
            isRtl === "rtl"
              ? theme.palette.neutral[100]
              : "rgba(75, 86, 107, 0.05) -28.57%, rgba(255, 255, 255, 0) 122.62%"
          } 100%)`
        : `linear-gradient(${isRtl === "rtl" ? "to left" : "to right"},  ${
            isRtl === "rtl"
              ? "rgba(255, 255, 255, 0)"
              : "rgba(75, 86, 107, 0.05) -28.57%, rgba(255, 255, 255, 0) 122.62%"
          } 0%, ${
            isRtl === "rtl"
              ? theme.palette.neutral[100]
              : "rgba(255, 255, 255, 0)"
          }  100%)`,

    zIndex: 1,
    right: right === "true" && "-8px",
    left: right !== "true" && 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    display: isdisabled ? "none" : "flex",
    borderTopRightRadius: "12px",
    borderBottomRightRadius: "12px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  })
);
const PrevWrapper = styled(Box)(({ theme, isdisabled }) => ({
  zIndex: 1,
  top: "50%",
  left: 0,
  display: isdisabled ? "none" : "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  height: "35px",
  width: "35px",
  borderRadius: "50%",
}));
const NextWrapper = styled(Box)(({ theme, isdisabled }) => ({
  top: "50%",
  zIndex: 1,
  right: 8,
  display: isdisabled ? "none" : "flex",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "50%",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  alignItems: "center",
  justifyContent: "center",
  height: "35px",
  width: "35px",
}));
export const NextFood = ({
  onClick,
  className,
  displayNoneOnMobile,
  noBackground,
  rightSpace,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const displayNone = isSmall ? (displayNoneOnMobile ? true : false) : false;
  return (
    <ButtonContainer
      isdisabled={displayNone || className?.includes("slick-disabled")}
      right="true"
      noBackground={noBackground ? "true" : "false"}
      isRtl={getLanguage()}
      rightSpace={rightSpace}
    >
      <NextWrapper
        className={`client-nav client-next ${className}`}
        onClick={onClick}
        isdisabled={className?.includes("slick-disabled")}
      >
        {getLanguage() === "rtl" ? (
          <ChevronLeftIcon
            sx={{
              fontSize: "30px",
              color: (theme) => theme.palette.neutral[600],
            }}
          />
        ) : (
          <ChevronRightIcon
            sx={{
              fontSize: "30px",
              color: (theme) => theme.palette.neutral[600],
            }}
          />
        )}
      </NextWrapper>
    </ButtonContainer>
  );
};
export const PrevFood = ({
  onClick,
  className,
  displayNoneOnMobile,
  noBackground,
  lanDirection,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const displayNone = isSmall ? (displayNoneOnMobile ? true : false) : false;
  const rtl = getLanguage();

  return (
    <ButtonContainer
      isdisabled={displayNone || className?.includes("slick-disabled")}
      noBackground={noBackground ? "true" : "false"}
      isRtl={rtl}
    >
      <PrevWrapper
        className={`client-nav client-prev ${className}`}
        onClick={onClick}
        isdisabled={className?.includes("slick-disabled")}
      >
        {getLanguage() === "rtl" ? (
          <ChevronRightIcon
            sx={{
              fontSize: "30px",
              color: (theme) => theme.palette.neutral[600],
            }}
          />
        ) : (
          <ChevronLeftIcon
            sx={{
              fontSize: "30px",
              color: (theme) => theme.palette.neutral[600],
            }}
          />
        )}
      </PrevWrapper>
    </ButtonContainer>
  );
};

