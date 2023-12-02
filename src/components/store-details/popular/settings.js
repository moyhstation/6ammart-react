import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { getLanguage } from "../../../helper-functions/getLanguage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const PrevWrapper = styled(Box)(({ theme, isdisabled }) => ({
  zIndex: 1,
  top: "50%",
  left: 0,
  display: isdisabled ? "none" : "flex",
  background: "rgba(255, 255, 255, 0.8)",
  borderRadius: "50%",
  height: "38px",
  width: "38px",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const NextWrapper = styled(Box)(({ theme, isdisabled }) => ({
  zIndex: 1,
  right: 0,
  display: isdisabled ? "none" : "flex",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "50%",
  height: "38px",
  width: "38px",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const ButtonContainer = styled(Box)(({ theme, right, isdisabled }) => ({
  top: 0,
  height: "100%",
  width: "73px",
  background:
    right === "true"
      ? "linear-gradient(270deg, rgba(75, 86, 107, 0.15) 0%, rgba(75, 86, 107, 0) 100%)"
      : "linear-gradient(to right, rgba(75, 86, 107, 0.15) 0%, rgba(75, 86, 107, 0) 100%)",

  zIndex: 1,
  right: right === "true" && 0,
  left: right !== "true" && 0,
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  display: isdisabled ? "none" : "flex",
}));
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

export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <Next />,
  prevArrow: <Prev />,

  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: false,
      },
    },
    // {
    //   breakpoint: 1000,
    //   settings: {
    //     slidesToShow: 4,
    //     slidesToScroll: 2,
    //     infinite: false,
    //   },
    // },

    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    // {
    //   breakpoint: 600,
    //   settings: {
    //     slidesToShow: 4.2,
    //     slidesToScroll: 2,
    //     initialSlide: 2,
    //   },
    // },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 479,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesToShow: 1.8,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 270,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
