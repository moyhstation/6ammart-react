import React from "react";
import {
  LeftArrowStyle,
  RightArrowStyle,
} from "../../home/best-reviewed-items/brt.style";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { alpha, IconButton, styled } from "@mui/material";

export const RoundedIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.neutral[100],
  ":hover": {
    backgroundColor: theme.palette.neutral[300],
  },
}));
const PrevArrow = ({ onClick, className }) => {
  const language_direction = JSON.parse(localStorage.getItem("settings"));

  return (
    <LeftArrowStyle
      language_direction={language_direction?.direction}
      onClick={onClick}
      sx={{ display: className?.includes("slick-disabled") && "none" }}
    >
      <RoundedIconButton>
        <ArrowBackIosNewIcon
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      </RoundedIconButton>
    </LeftArrowStyle>
  );
};
const NextArrow = ({ onClick, className }) => {
  const language_direction = JSON.parse(localStorage.getItem("settings"));
  return (
    <RightArrowStyle
      language_direction={language_direction?.direction}
      onClick={onClick}
      right="0px"
      sx={{
        display: className?.includes("slick-disabled") && "none",
      }}
    >
      <RoundedIconButton>
        <ArrowForwardIosIcon
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      </RoundedIconButton>
    </RightArrowStyle>
  );
};

export const ProductsThumbnailsSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,

  responsive: [
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 3.5,
      },
    },

    {
      breakpoint: 650,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 5.3,
      },
    },
  ],
};
