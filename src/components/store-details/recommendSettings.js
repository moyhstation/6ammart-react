import { alpha, IconButton, styled } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import {
  LeftArrowStyle,
  RightArrowStyle,
} from "../home/best-reviewed-items/brt.style";

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "50%",

  backgroundColor: alpha(theme.palette.primary.main, 0.9),
  color: theme.palette.neutral[100],
  width: "45px",
  height: "45px",
  ":hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.5),
  },
}));
const PrevArrow = ({ onClick, className }) => {
  return (
    <LeftArrowStyle
      onClick={onClick}
      sx={{
        display: className?.includes("slick-disabled") && "none",
        top: "25%",
      }}
    >
      <CustomIconButton>
        <ArrowBackIosNewIcon
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      </CustomIconButton>
    </LeftArrowStyle>
  );
};
const NextArrow = ({ onClick, className }) => {
  return (
    <RightArrowStyle
      onClick={onClick}
      sx={{
        top: "25%",
        right: 1,
        display: className?.includes("slick-disabled") && "none",
      }}
    >
      <CustomIconButton>
        <ArrowForwardIosIcon
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      </CustomIconButton>
    </RightArrowStyle>
  );
};

export const recommendSettings = {
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,

  responsive: [
    {
      breakpoint: 3600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        // dots: true
      },
    },
    {
      breakpoint: 3200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        // dots: true
      },
    },
    {
      breakpoint: 2800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        // dots: true
      },
    },
    {
      breakpoint: 2400,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite: false,
        // dots: true
      },
    },
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite: false,
        // dots: true
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite: false,
        // dots: true
      },
    },
    {
      breakpoint: 1340,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite: false,
        // dots: true
      },
    },
    {
      breakpoint: 1075,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        // dots: true
      },
    },
    {
      breakpoint: 999,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        // dots: true
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        // initialSlide: 2
        infinite: false,
      },
    },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        // dots: true
      },
    },
  ],
};
