import React, { useState } from "react";
import { PrimaryButton } from "../Map/map.style";
import { Stack } from "@mui/system";
import FilterListIcon from "@mui/icons-material/FilterList";
import { CustomTypography } from "../landing-page/hero-section/HeroSection.style";
import { t } from "i18next";
import CustomSideDrawer from "../side-drawer/CustomSideDrawer";
import FilterCard from "./FilterCard";
import { setFilterDrawerOpenByDispatch } from "../../redux/slices/searchFilter";
import { useDispatch } from "react-redux";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

const FilterWithSideDrawer = ({ handleFilter, handleClearAll, pageData }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const prices = pageData ? pageData?.products?.length>0 && pageData?.products.map((product) => product.price) :[] ;
  const minPrice = prices?.length>0 ? Math.min(...prices) : 0;
  const maxPrice = prices?.length>0 ? Math.max(...prices) : 0;
  const searchedDataMinMax = {
    min_price: minPrice,
    max_price: maxPrice,
  };

  const handleDrawerOpen = () => {
    setSideDrawerOpen(true);
    dispatch(setFilterDrawerOpenByDispatch(true));
  };
  const handleDrawerClose = () => {
    setSideDrawerOpen(false);
    dispatch(setFilterDrawerOpenByDispatch(false));
  };

  return (
    <>
      <PrimaryButton
        variant="outlined"
        width="auto"
        backgroundcolor="none"
        onClick={() => handleDrawerOpen()}
        sx={{ color: (theme) => theme.palette.neutral[1000] }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <FilterListIcon color="primary" />
          {!isSmall && <Typography variant="h7"> {t("Filter")}</Typography>}
        </Stack>
      </PrimaryButton>
      <CustomSideDrawer
        open={sideDrawerOpen}
        onClose={() => handleDrawerClose()}
        anchor="right"
      >
        <FilterCard
          setSideDrawerOpen={setSideDrawerOpen}
          handleFilter={handleFilter}
          handleClearAll={handleClearAll}
          handleDrawerClose={handleDrawerClose}
          searchedDataMinMax={searchedDataMinMax}
        />
      </CustomSideDrawer>
    </>
  );
};

export default FilterWithSideDrawer;
