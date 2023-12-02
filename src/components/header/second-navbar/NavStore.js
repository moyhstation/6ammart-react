import React from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "@mui/material/styles";

import { useRouter } from "next/router";

import { useTranslation } from "react-i18next";
import { NavMenuLink } from "../NavBar.style";
import NavPopover from "./NavPopover";
import { getStoresOrRestaurants } from "../../../helper-functions/getStoresOrRestaurants";

const NavRestaurant = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <NavMenuLink underline="none" sx={{ textTransform: "capitalize" }}>
        {t(getStoresOrRestaurants())} <KeyboardArrowDownIcon />
      </NavMenuLink>
      <NavPopover popoverFor="store" open={open} anchorEl={anchorEl} />
    </div>
  );
};

export default NavRestaurant;
