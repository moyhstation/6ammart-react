import NextIcon from "../icons/NextIcon";
import PrevIcon from "../icons/PrevIcon";
import React from "react";

const Next = ({ onClick, className }) => {
  return (
    <div className={`client-nav client-next ${className}`} onClick={onClick}>
      <NextIcon />
    </div>
  );
};
const Prev = ({ onClick, className }) => {
  return (
    <div className={`client-nav client-prev ${className}`} onClick={onClick}>
      <PrevIcon />
    </div>
  );
};

export const SimilarProductSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3.5,
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
      breakpoint: 1000,
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
        slidesToShow: 3,
      },
    },
  ],
  prevArrow: <Prev />,
  nextArrow: <Next />,
};
