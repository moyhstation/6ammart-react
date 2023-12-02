import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { getLanguage } from "../../../helper-functions/getLanguage";
import { useMediaQuery, useTheme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const PrevWrapper = styled(Box)(
  ({ theme, isdisabled, left, width, height }) => ({
    zIndex: 1,
    top: "50%",
    left: left ? left : "0px",
    display: isdisabled ? "none" : "flex",
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "50%",
    height: width ? width : "38px",
    width: height ? height : "38px",
    alignItems: "center",
    justifyContent: "center",
  })
);
const NextWrapper = styled(Box)(({ theme, isdisabled, width, height }) => ({
  zIndex: 1,
  right: 0,
  display: isdisabled ? "none" : "flex",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "50%",
  height: height ? height : "38px",
  width: width ? width : "38px",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid",
}));
const ButtonContainer = styled(Box)(
  ({ theme, right, isdisabled, noboxshadow }) => ({
    top: 0,
    height: "100%",
    width: "73px",
    background: noboxshadow
      ? "inherit"
      : right === "true"
      ? "linear-gradient(270deg, rgba(75, 86, 107, 0.15) 0%, rgba(75, 86, 107, 0) 100%)"
      : "linear-gradient(to right, rgba(75, 86, 107, 0.15) 0%, rgba(75, 86, 107, 0) 100%)",

    zIndex: 1,
    right: right === "true" && 0,
    left: right !== "true" && 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    display: isdisabled ? "none" : "flex",
  })
);
export const WhiteNext = ({
  onClick,
  className,
  noboxshadow,
  displayNoneOnMobile,
  width,
  height,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const displayNone = isSmall ? (displayNoneOnMobile ? true : false) : false;
  return (
    <ButtonContainer
      isdisabled={displayNone || className?.includes("slick-disabled")}
      right="true"
      noboxshadow
    >
      <NextWrapper
        width={width}
        height={height}
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
export const WhitePrev = ({
  left,
  onClick,
  className,
  noboxshadow,
  displayNoneOnMobile,
  width,
  height,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const displayNone = isSmall ? (displayNoneOnMobile ? true : false) : false;
  return (
    <ButtonContainer
      isdisabled={displayNone || className?.includes("slick-disabled")}
      noboxshadow
    >
      <PrevWrapper
        width={width}
        height={height}
        left={left}
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
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <WhiteNext displayNoneOnMobile />,
  prevArrow: <WhitePrev displayNoneOnMobile />,

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
        slidesToShow: 2.5,
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
        slidesToShow: 1.8,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 420,
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
