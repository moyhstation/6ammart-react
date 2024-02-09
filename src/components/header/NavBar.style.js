import {
  alpha,
  AppBar,
  BottomNavigationAction,
  Button,
  Drawer,
  Link as MenuLink,
  Menu,
  Stack,
  styled,
  Switch,
} from "@mui/material";
import bgImg from "../../../public/bgimge.jpg";

import React from "react";

export const AppBarStyle = styled(AppBar)(({ theme, scrolling, isSmall }) => ({
  // transition: "all ease-in-out 0.3s",
  top: !scrolling ? "0" : isSmall ? "0px" : "-30px",
  background: `${theme.palette.mode === "light" && "#fff !important"}`,
  WebkitAnimation: !isSmall && scrolling ? "fadeInUp 0.4s" : "fadeInDown 0.4s",
  animation: !isSmall && scrolling ? "fadeInUp 0.4s" : "fadeInDown 0.4s",
  "@keyframes fadeInUp": {
    "0%": {
      transform: "translateY(30px)",
    },
    "100%": {
      transform: "translateY(0)",
    },
  },
  "@keyframes fadeInDown": {
    "0%": {
      transform: "translateY(-30px)",
    },
    "100%": {
      transform: "translateY(0)",
    },
  },
}));

export const CustomBgImage = styled(Stack)(({ theme }) => ({
  backgroundImage: `url(${bgImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));
export const CustomStackForLoaction = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  cursor: "pointer",
  alignItems: "center",
}));
export const TopBarButton = styled(Button)(({ theme, formmobilemenu }) => ({
  padding: formmobilemenu === "true" ? "7px 5px" : "7px 12px",
  color: theme.palette.neutral[100],
}));
export const CustomSwitch = styled(Switch)(({ theme, noimage }) => ({
  width: 40,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(20px)rotate(360deg)",
      color: "#fff",
      "& .MuiSwitch-thumb:before": {
        backgroundImage:
          noimage === "true"
            ? null
            : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                theme.palette.primary.main
              )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.primary.light
            : theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: theme.palette.primary.light,
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#fff",
    width: 18,
    height: 18,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
export const NavLinkStyle = styled(Stack)(({ theme, language_direction }) => ({
  color: `${theme.palette.mode === "dark" ? "#fff" : "#000"}`,
  fontSize: "16px",

  // marginRight: language_direction === 'rtl' ? '16px' : '0px',
  underLine: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));
export const SignInButton = styled(Button)(({ theme }) => ({
  width: "100%",
  color: theme.palette.neutral[100],
  backgroundColor: theme.palette.primary.main,
  borderRadius: "32px",
}));
export const NavMenuLink = styled(MenuLink)(({ theme }) => ({
  color: theme.palette.neutral[1000],
  display: "flex",
  cursor: "pointer",
  fontSize: "16px",
  gap: "5px",
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
}));
export const ButtonContainer = styled("div")(({ theme }) => ({
  marginLeft: "15px",
  marginRight: "15px",
}));
export const CustomDrawer = styled(Drawer)(({ theme, router }) => ({
  "& .MuiDrawer-paper": {
    top: "56px",
    maxWidth: "320px",
    width: "96vw",
    height: "calc(100dvh-56px)",
    //bottom: "-56px",
    transition: "transform 0.3s ease-in-out",
    zIndex: "1200",

    // marginLeft: router.pathname === "/" && "24px",
    // marginRight: router.pathname === "/" && "24px",
    // [theme.breakpoints.down("sm")]: {
    //   marginLeft: router.pathname === "/" && "16px",
    //   marginRight: router.pathname === "/" && "16px",
    // },
  },
}));
export const CustomBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme }) => ({
    color: theme.palette.neutral[1000],
    minWidth: "60px",
    fontSize: "10px !important",
    padding: "0px 0px",
    "& .MuiBottomNavigationAction-label": {
      fontSize: "12px !important" /* Adjust the font size here */,
    },
    "&.Mui-selected": {
      color: theme.palette.primary.main,
    },
    "& .MuiSvgIcon-root": {
      width: "20px",
      fontSize: "1.2rem !important",
    },
    // "& .MuiBottomNavigationAction-label": {
    //   overflow: "hidden",
    //   textOverflow: "ellipsis",
    //   display: "-webkit-box",
    //   WebkitLineClamp: "1",
    //   WebkitBoxOrient: "vertical",
    // },
  })
);
