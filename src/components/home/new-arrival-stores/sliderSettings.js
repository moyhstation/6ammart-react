import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { getLanguage } from "../../../helper-functions/getLanguage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const PrevWrapper = styled(Box)(({ theme, isdisabled }) => ({
  zIndex: 1,
  top: "50%",
  left: 0,
  display: isdisabled ? "none" : "flex !important",
  backgroundColor: `${theme.palette.primary.main} !important`, // Add !important here
  color: `${theme.palette.neutral[100]} !important`, // Add !important here
  borderRadius: "50%",
  height: "38px !important",
  width: "38px !important",
  alignItems: "center !important",
  justifyContent: "center !important",
  "&:hover": {
    backgroundColor: `${theme.palette.primary.dark} !important`, // Add !important here
    color: `${theme.palette.neutral[100]} !important`, // Add !important here
  },
}));
const NextWrapper = styled(Box)(({ theme, isdisabled }) => ({
  zIndex: 1,
  right: 0,
  display: isdisabled ? "none " : "flex !important",
  backgroundColor: `${theme.palette.primary.main} !important`, // Add !important here
  color: `${theme.palette.neutral[100]} !important`, // Add !important here
  borderRadius: "50%",
  height: "38px !important",
  width: "38px !important",
  alignItems: "center !important",
  justifyContent: "center !important",
  "&:hover": {
    backgroundColor: `${theme.palette.primary.dark} !important`, // Add !important here
    color: `${theme.palette.neutral[100]} !important`, // Add !important here
  },
}));
const ButtonContainer = styled(Box)(({ theme, right, isdisabled }) => ({
  top: 0,
  height: "100%",
  width: "73px",
  background:
    right === "true"
      ? `linear-gradient(${
          lanDirection === "rtl" ? "470deg" : "270deg"
        }, rgba(75, 86, 107, 0.15) 0%, rgba(75, 86, 107, 0) 100%)`
      : "linear-gradient(to right, rgba(75, 86, 107, 0.15) 0%, rgba(75, 86, 107, 0) 100%)",

  zIndex: 1,
  right: right === "true" && 0,
  left: right !== "true" && 0,
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  display: isdisabled ? "none" : "flex",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const lanDirection = getLanguage() ? getLanguage() : "ltr";

const Next = ({ onClick, className }) => {
  return (
    <ButtonContainer
      isdisabled={className?.includes("slick-disabled")}
      right="true"
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
            }}
          />
        ) : (
          <ChevronRightIcon
            sx={{
              fontSize: "30px",
            }}
          />
        )}
      </NextWrapper>
    </ButtonContainer>
  );
};
const Prev = ({ onClick, className }) => {
  return (
    <ButtonContainer isdisabled={className?.includes("slick-disabled")}>
      <PrevWrapper
        className={`client-nav client-prev ${className}`}
        onClick={onClick}
        isdisabled={className?.includes("slick-disabled")}
      >
        {getLanguage() === "rtl" ? (
          <ChevronRightIcon
            sx={{
              fontSize: "30px",
            }}
          />
        ) : (
          <ChevronLeftIcon
            sx={{
              fontSize: "30px",
            }}
          />
        )}
      </PrevWrapper>
    </ButtonContainer>
  );
};

export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,

  slidesToScroll: 1,
  nextArrow: <Next />,
  prevArrow: <Prev />,
  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 760,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 695,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.4,
        slidesToScroll: 1,
        initialSlide: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 340,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 1,
        initialSlide: 1,
        infinite: true,
      },
    },
  ],
};

export const foodNewArrivalsettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 840,
      settings: {
        slidesToShow: 6.5,
        slidesToScroll: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 760,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 695,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5.2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4.2,
        slidesToScroll: 1,
        autoplay: true,
      },
    },
    {
      breakpoint: 340,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
      },
    },
  ],
};
