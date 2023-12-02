import NextIcon from "../icons/NextIcon";
import PrevIcon from "../icons/PrevIcon";
import React from "react";
import {
  IconButtonGray,
  LeftArrowStyle,
  RightArrowStyle,
} from "../home/best-reviewed-items/brt.style";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useTheme } from "@mui/material";

const Next = ({ onClick, className }) => {
  const theme = useTheme();
  return (
    <div className={`client-nav client-next ${className}`} onClick={onClick}>
      <LeftArrowStyle left="1%">
        <IconButtonGray
          color={theme.palette.neutral[1000]}
          borderraduis=".5rem"
          // onClick={() => SliderRef.current.slickPrev()}
        >
          <ArrowRightIcon color={theme.palette.neutral[100]} />
        </IconButtonGray>
      </LeftArrowStyle>
    </div>
  );
};
const Prev = ({ onClick, className }) => {
  const theme = useTheme();
  return (
    <div className={`client-nav client-prev ${className}`} onClick={onClick}>
      <RightArrowStyle right="1%">
        <IconButtonGray
          color={theme.palette.neutral[1000]}
          borderraduis=".5rem"
          // onClick={() => SliderRef.current.slickNext()}
        >
          <ArrowLeftIcon />
        </IconButtonGray>
      </RightArrowStyle>
    </div>
  );
};

export const ProductsReviewSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 3.5,
      },
    },
  ],
  prevArrow: <Prev />,
  nextArrow: <Next />,
};
