import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IsSmallScreen } from "../../../utils/CommonValues";
import CustomPopover from "../../CustomPopover";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import CustomSlider from "../../search/CustomSlider";
import CustomRatings from "../../search/CustomRatings";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const Filter = (props) => {
  const { border, priceRange, filterDataAndFunctions } = props;
  const {
    filterData,
    setFilterData,
    handleCheckbox,
    handleChangeRatings,
    getRatingValue,
    currentTab,
  } = filterDataAndFunctions;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [minMax, setMinMax] = useState([0, 0]);
  const { t } = useTranslation();

  useEffect(() => {
    setMinMax([priceRange?.[0]?.min_price, priceRange?.[0]?.max_price]);
  }, [priceRange]);

  const handleMinMax = (value) => {
    if (value[0] === 0) {
      value[0] = priceRange?.[0]?.min_price;
    }
    let newData = filterData.map((item, index) =>
      index === filterData.length - 2
        ? { ...item, price: value, checked:false }
        : item
    );
    setMinMax(value);
    setFilterData(newData);
    // handleDataByFilter?.(newData);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    setAnchorEl(null);
    // setSelectedFilterValue(value);
  };

  // Split the array into two halves.
  const dataWithoutPrice = filterData?.filter(
    (item) => item?.value !== "price" && item?.value !== "ratings"
  );
  const midpoint = Math.ceil(dataWithoutPrice.length / 2);
  const firstHalf = dataWithoutPrice.slice(0, midpoint);
  const secondHalf = dataWithoutPrice.slice(midpoint);
  return (
    <div>
      <Button
        onClick={handleClick}
        variant={border ? "outlined" : "text"}
        sx={{
          color: (theme) => theme.palette.customColor.textGray,
          borderColor: (theme) => theme.palette.customColor.textGray,
        }}
      >
        <FilterAltOutlinedIcon fontSize="small" />
        {IsSmallScreen() ? null : (
          <>
            <Typography>{t("Filter")}</Typography>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </>
        )}
      </Button>
      {open && (
        <CustomPopover
          openPopover={open}
          anchorEl={anchorEl}
          placement="bottom"
          handleClose={() => setAnchorEl(null)}
          top="10px"
          left="-230px"
        >
          <Paper
            sx={{
              p: "25px",
              width: "355px",
            }}
          >
            <CustomBoxFullWidth>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography fontWeight="bold">{t("Filter By")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  {filterData?.length > 0 &&
                    firstHalf?.map((item, index) => {
                      return (
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "13px",
                              fontWeight: item?.checked && "450",
                            },
                          }}
                          key={index}
                          control={
                            <Checkbox
                              checked={item?.checked}
                              onChange={(e) => handleCheckbox(item, e)}
                              name={item?.label}
                            />
                          }
                          label={item?.label}
                        />
                      );
                    })}
                </Grid>
                <Grid item xs={6}>
                  {filterData?.length > 0 &&
                    secondHalf?.map((item, index) => {
                      if(item?.value==="test"){
                        return  null
                      }else {
                        return (
                            <FormControlLabel
                                sx={{
                                  "& .MuiFormControlLabel-label": {
                                    fontSize: "13px",
                                    fontWeight: item?.checked && "420",
                                  },
                                }}
                                key={index}
                                control={
                                  <Checkbox
                                      checked={item?.checked}
                                      onChange={(e) => handleCheckbox(item, e)}
                                      name={item?.label}
                                  />
                                }
                                label={item?.label}
                            />
                        );
                      }
                    })}
                </Grid>
                {currentTab === 0 ? (
                  <Grid item xs={12}>
                    <CustomStackFullWidth spacing={1}>
                      <Typography fontWeight="bold">{t("Price")}</Typography>
                      <CustomSlider
                        handleChangePrice={handleMinMax}
                        minMax={minMax}
                        priceFilterRange={
                          priceRange?.length > 0 && priceRange[0]
                        }
                      />
                    </CustomStackFullWidth>
                  </Grid>
                ) : null}

                <Grid item xs={12}>
                  <CustomStackFullWidth
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography fontWeight="bold">{t("Ratings")}</Typography>
                    <CustomRatings
                      ratingValue={getRatingValue()}
                      fontSize="20px"
                      handleChangeRatings={handleChangeRatings}
                      // readOnly
                    />
                  </CustomStackFullWidth>
                </Grid>
              </Grid>
            </CustomBoxFullWidth>
          </Paper>
        </CustomPopover>
      )}
    </div>
  );
};

Filter.propTypes = {};

export default Filter;
