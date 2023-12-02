import React from "react";

export const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  cssEase: "ease-in-out",
  autoplay: true,
  speed: 800,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 821,
      settings: {
        slidesToShow: 3.2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1.7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 360, // Add a new breakpoint for smaller devices
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1.5,
      },
    },
  ],
};
