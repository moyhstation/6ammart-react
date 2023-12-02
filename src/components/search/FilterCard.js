import React, { useState } from "react";
import { Box, Stack } from "@mui/system";
import {
  CustomAppbarFilter,
  WrapperForSideDrawerFilter,
} from "../side-drawer/CustomSideDrawer.style";
import {
  ButtonGroup,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { CustomColouredTypography } from "../../styled-components/CustomStyles.style";
import { t } from "i18next";
import ButtonGroups from "./ButtonGroups";
import CustomGroupCheckbox from "./CustomGroupCheckbox";
import CustomSlider from "./CustomSlider";
import CustomRatings from "./CustomRatings";
import {
  CustomButtonGray,
  CustomButtonPrimary,
} from "../../styled-components/CustomButtons.style";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterbyByDispatch,
  setFilterDrawerOpenByDispatch,
  setPriceByDispatch,
  setRatingByDispatch,
  setSortbyByDispatch,
} from "../../redux/slices/searchFilter";
import CloseIcon from "@mui/icons-material/Close";

const FilterCard = ({
  handleFilter,
  setSideDrawerOpen,
  handleClearAll,
  handleDrawerClose,
  searchedDataMinMax,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { filterData } = useSelector((state) => state.searchFilterStore);
  const [stateData, setStateData] = useState({
    ...filterData,
  });

  const handleSortBy = (value) => {
    setStateData({
      ...stateData,
      sortBy: value,
    });
  };
  const handleFilterBy = (event) => {
    setStateData({
      ...stateData,
      filterBy: {
        ...stateData.filterBy,
        [event.target.name]: event.target.checked,
      },
    });
  };
  const handlePrice = (value) => {

    setStateData({
      ...stateData,
      price: value,
    });
  };
  const handleChangeRatings = (value) => {
    setStateData({
      ...stateData,
      rating: value,
    });
  };
  const handleFilterSubmit = () => {
    dispatch(setPriceByDispatch(stateData.price));
    dispatch(setRatingByDispatch(stateData.rating));
    dispatch(setFilterbyByDispatch(stateData.filterBy));
    dispatch(setSortbyByDispatch(stateData.sortBy));
    handleFilter();
    setSideDrawerOpen(false);
    dispatch(setFilterDrawerOpenByDispatch(false));
  };
  const handleFilterClear = () => {
    dispatch(setPriceByDispatch(""));
    dispatch(setRatingByDispatch(""));
    dispatch(setSortbyByDispatch(""));
    dispatch(
      setFilterbyByDispatch({
        veg: false,
        nonVeg: false,
        currentAvailableFoods: false,
        discountedFoods: false,
      })
    );
    dispatch(setFilterDrawerOpenByDispatch(false));
    setSideDrawerOpen(false);
    handleClearAll();
  };
  const closeColor = theme.palette.neutral[1000];
  const handleMinMaxPrice = ()=>{
    return {
      min_price:0,
      max_price:5
    }
  }
  return (
    <Box>
      <CustomAppbarFilter>
        <Toolbar
          sx={{
            height: "100%",
            paddingLeft: "32px",
            paddingRight: "32px",
            [theme.breakpoints.down("xs")]: {
              paddingLeft: "16px",
              paddingRight: "16px",
            },
          }}
          disableGutters="true"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography
              fontSize={{ xs: "14px", md: "22px" }}
              color={theme.palette.neutral[1000]}
              fontWeight="500"
            >
              {t("Filter Search Results")}
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon
                size="medium"
                style={{
                  color: closeColor,
                }}
              />
            </IconButton>
          </Stack>
        </Toolbar>
      </CustomAppbarFilter>
      <WrapperForSideDrawerFilter>
        <Stack
          sx={{ height: "100%" }}
          justifyContent="space-between"
          spacing={{ xs: 0.5, md: 1 }}
        >
          <Stack spacing={3}>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight="500">
                {t("Sort By")}
              </Typography>
              <ButtonGroups handleSortBy={handleSortBy} />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="h6">{t("Filter By")}</Typography>
              <CustomGroupCheckbox handleChangeFilter={handleFilterBy} />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h6">{t("Price")}</Typography>
              <CustomSlider
                handleChangePrice={handlePrice}
                priceFilterRange={searchedDataMinMax}
              />
            </Stack>
            <Stack spacing={1} justifyContent="center" alignItems="center">
              <Typography variant="h6">{t("Rating")}</Typography>
              <CustomRatings
                handleChangeRatings={handleChangeRatings}
                ratingValue={filterData.rating}
              />
            </Stack>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <CustomButtonGray
              onClick={handleFilterClear}
              sx={{
                color: (theme) => theme.palette.whiteContainer.main,
                backgroundColor: theme.palette.neutral[400],
                '&:hover': {
                  backgroundColor: theme.palette.neutral[300],
                },
                borderRadius: "5px",
              }}
            >
              <Typography fontSize="16px">{t("Clear All Filter")}</Typography>
            </CustomButtonGray>
            <CustomButtonPrimary
              fullWidth
              onClick={handleFilterSubmit}
              sx={{
                borderRadius: "5px",
              }}
            >
              {t("Filter")}
            </CustomButtonPrimary>
          </Stack>
        </Stack>
      </WrapperForSideDrawerFilter>
    </Box>
  );
};

export default FilterCard;
