import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
// import {
//     CustomColouredTypography,
//     ImageContainer,
// } from '../../styled-components/CustomStyles.style'

export const CustomCardContent = styled(CardContent)(
  ({ theme, minHeight, minHeightForCustomCard }) => ({
    borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    textAlign: "center",
    padding: "10px",
  })
);

export const RestaurantDetailsNavButton = styled(Button)(
  ({
    theme,
    color,
    background,
    language_direction,
    borderRigthTop,
    borderRightBottom,
    borderLeftBottom,
    borderLeftTop,
  }) => ({
    backgroundColor: background ? theme.palette.primary.main : "inherit",
    color: background
      ? theme.palette.whiteContainer.main
      : theme.palette.neutral[1000],
    borderRadius: language_direction !== "rtl" ? "15px" : "0px",
    borderBottomLeftRadius: borderLeftBottom && borderLeftBottom,

    "&:hover": {
      backgroundColor: background && theme.palette.primary.dark,
    },
  })
);
export const FoodTitleTypography = styled(Typography)(
  ({ theme, textAlign, fontWeight }) => ({
    // eslint-disable-next-line no-mixed-operators
    fontSize: "16px",
    fontWeight: fontWeight ? fontWeight : "400",
    padding: 0,
    margin: 0,
    textAlign: textAlign ? textAlign : "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      marginBottom: "5px",
    },
  })
);
export const FoodTitleTypographyDetails = styled(Typography)(({ theme }) => ({
  // eslint-disable-next-line no-mixed-operators
  fontSize: "20px",
  padding: 0,
  margin: 0,
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
    padding: 0,
    margin: 0,
  },
}));

export const FoodSubTitleTypography = styled(Typography)(({ theme }) => ({
  // eslint-disable-next-line no-mixed-operators
  fontSize: "14px",
  padding: 0,
  lineHeight: 1.3,
  letterSpacing: "0.00938em",
  fontWeight: "400",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  color: theme.palette.neutral[500],
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
  },
}));

export const CustomFoodCard = styled(Card)(({ theme }) => ({
  // eslint-disable-next-line no-mixed-operators

  borderRadius: "10px",
  position: "relative",
  margin: "0 auto",
  marginBottom: "10px",
  overflow: "hidden",
  maxWidth: "230px",
  cursor: "pointer",
  //height:"100%",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "150px",
    // height:" 351px"
  },
}));

export const CustomMoreButtonContainer = styled(Card)(({ theme }) => ({
  maxWidth: "237px",
  borderRadius: "10px",
  position: "relative",
  height: "306px",
  textAlign: "center",
  backgroundColor: alpha(theme.palette.primary.main, 0.4),
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "150px",
    height: " 226px",
  },
}));
export const CustomCardMedia = styled(CardMedia)(({ theme, height }) => ({
  height: height,
  [theme.breakpoints.down("sm")]: {
    height: "100px",
  },
}));
export const CustomMoreButton = styled(Card)(({ theme }) => ({
  position: "absolute",
  color: theme.palette.primary.main,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "transparent",
  boxShadow: "none",
}));
export const StyledButton = styled(Button)(({ theme, language_direction }) => ({
  color: theme.palette.primary.main,
  // borderRadius: '30px 0 0 0 ',
  borderTopLeftRadius: `${language_direction === "rtl" ? "0" : "30px"}`,
  borderTopRightRadius: `${language_direction === "rtl" ? "30px" : "0"}`,
  borderBottomLeftRadius: `${language_direction === "rtl" ? "12px" : "0"}`,
  borderBottomRightRadius: `${language_direction === "rtl" ? "0" : "12px"}`,
  // borderTopLeftRadius: '30px',
  // borderTopRightRadius: '0',
  // borderBottomLeftRadius: '0',
  // borderBottomRightRadius: '12px',
  border: `1px solid ${theme.palette.primary.main}`,
  position: "absolute",
  width: 40,
  height: 40,
  zIndex: 9,
  right: `${language_direction === "rtl" ? "" : 0}`,
  left: `${language_direction === "rtl" ? 0 : ""}`,
  bottom: 0,
  // backgroundColor: '#fff',
  "&:hover": {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
export const RatingWrapTypography = styled(Typography)(({ theme }) => ({
  // eslint-disable-next-line no-mixed-operators
  fontSize: "16px",
  display: "inline-flex",
  alignItems: "center",
  fontWeight: 600,
  lineHeight: "normal",
  // color: 'rgba(0, 0, 0, 0.87)',
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));
export const RatingStarIcon = styled(StarIcon)((color) => ({
  // eslint-disable-next-line no-mixed-operators
  fontSize: "16px",
  // color: color ? color : '',
}));

export const PricingCardActions = styled(CardActions)(
  ({ language_direction, theme, discount }) => ({
    padding: "8px",
    alignItems: "flex-end",
    paddingTop: "10px",
    paddingBottom: 0,
    justifyContent: "center",
    "& .MuiCardActions-root": {
      padding: "0px",
      paddingTop: "12px",
    },
    // justifyContent: language_direction === 'rtl' ? 'right' : 'left',
    [theme.breakpoints.down("sm")]: {
      padding: "0px",

      alignItems: "center",
    },
  })
);

export const OfferTypography = styled(Typography)(
  ({ theme, language_direction }) => ({
    cursor: "pointer",
    position: "absolute",
    right: language_direction === "rtl" ? "0px" : null,
    background: theme.palette.primary.main,
    color: theme.palette.whiteContainer.main,
    zIndex: 9,
    padding:
      language_direction === "rtl"
        ? "10px 15px 10px 22px"
        : "10px 30px 10px 15px ",
    // borderRadius: '10px 0px 50px',
    borderRadius: `${
      language_direction === "rtl" ? "0px 10px 0px 50px" : "10px 0px 50px"
    }`,
    // borderRadius: '0px 10px 0px 50px',
    fontWeight: 500,
    // justifyContent: `${language_direction === 'rtl' ? 'right' : 'left'}`,
    [theme.breakpoints.down("sm")]: {
      padding: "5px 15px 5px 10px !important",
      fontWeight: 400,
      fontSize: "13px",
    },
  })
);
export const NewTypography = styled(Typography)(
  ({ theme, language_direction }) => ({
    position: "absolute",
    background: theme.palette.primary.main,
    color: theme.palette.whiteContainer.main,
    zIndex: 9,
    padding:
      language_direction === "rtl" ? "5px 5px 5px 14px" : "5px 10px 5px 5px",
    borderRadius:
      language_direction === "rtl" ? "0px 0px 0px 19px" : "0px  0px 12px  0px",
    fontWeight: 500,
    fontSize: "14px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  })
);
export const TypographyText = styled(Typography)(({ theme }) => ({
  color: `${theme.palette.mode === "dark" && "#fff"}`,
}));
export const StyleThemBox = styled(Box)(({ theme }) => ({
  color: `${theme.palette.mode === "dark" && "#9b9b9b"}`,
}));

export const CatMessageStyle = styled(Box)(({ theme }) => ({
  color: `${theme.palette.mode === "dark" && "#fff"}`,
  margin: "20px 0",
}));

// export const CustomInnerPaper = styled(Paper)(({ theme, background }) => ({
//     position: 'absolute',
//     height: '100%',
//     width: '70%',
//     top: 0,
//     left: 0,
//     borderRadius: '10px 600px 10px 10px',
//     opacity: 0.1,
//     background: background
//         ? background
//         : `linear-gradient(0deg,${theme.palette.neutral[100]}  0%, ${theme.palette.primary.main} 100%)`,
// }))
// export const CustomInnerStack = styled(Stack)(({ theme }) => ({
//     position: 'absolute',
//     height: '100%',
//     width: '100%',
//     top: 0,
//     left: 0,
//     background: 'transparent',
//     zIndex: 999,
//     textAlign: 'center',
//     padding: '0.938rem',
// }))
// export const CustomTypographyCard = styled(Typography)(
//     ({ theme, marginBottom, fontSize, color }) => ({
//         fontSize: fontSize ? `${fontSize}rem` : 'inherit',
//         color: color ? theme.palette.primary.main : 'inherit',
//         fontWeight: 'bold',
//         marginBottom: marginBottom && '1.563rem',
//     })
// )

// export const NormalPaper = styled(Paper)(({ theme }) => ({
//     padding: '1.875rem',
//     background: theme.palette.background.paper,
//     border: '1px solid rgba(65, 83, 179, 0.05)',
//     boxSizing: 'border-box',
//     boxShadow:
//         '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.1)',
//     borderRadius: '10px',
// }))

// export const CustomColouredTypographyForCustomInfoCard = styled(
//     CustomColouredTypography
// )(({ theme }) => ({
//     marginBottom: '1.563rem',
// }))
// export const CustomTypographyForCustomInfoCard = styled(Typography)(
//     ({ theme }) => ({
//         fontSize: '1.125rem',
//         fontWeight: 'bold',
//     })
// )
// export const CustomIconContainerForCustomInfoCard = styled(ImageContainer)(
//     ({ theme }) => ({
//         width: 'auto',
//         height: '1.25rem',
//     })
// )
// export const CustomImageContainerForCustomInfoCard = styled(ImageContainer)(
//     ({ theme }) => ({
//         width: 'auto',
//         height: '9rem',
//     })
// )

export const CustomFavButton = styled(Button)(({ theme }) => ({
  background: theme.palette.neutral[300],
  padding: "0px 0px",

  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
  },
}));
export const CustomFavICon = styled(Box)(({ theme, language_direction }) => ({
  position: "absolute",
  top: "20px",
  right: language_direction === "rtl" ? null : "20px",
  left: language_direction === "rtl" ? "20px" : null,
  width: "34px",
  height: "34px",
  background: theme.palette.neutral[100],
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",

  color: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    top: "10px",
    right: "10px",
  },
}));
