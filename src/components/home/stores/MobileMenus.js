import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, FormControlLabel, Paper, styled } from "@mui/material";
import CustomPopover from "../../CustomPopover";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import { useTranslation } from "react-i18next";
import RadioGroup from "@mui/material/RadioGroup";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";

const getModuleWiseData = (theme) => {
  switch (getCurrentModuleType()) {
    case ModuleTypes.GROCERY:
      return theme.palette.primary.main;
    case ModuleTypes.PHARMACY:
      return theme.palette.primary.main;
    case ModuleTypes.ECOMMERCE:
      return theme.palette.primary.main;
    case ModuleTypes.FOOD:
      return theme.palette.moduleTheme.food;
  }
};

const CustomButtonWrapper = styled(Button)(({ theme }) => ({
  height: "30px",
  minWidth: "0px",
  width: "30px",
  border: `1px solid ${getModuleWiseData(theme)}`,
  color: getModuleWiseData(theme),
}));

export const CustomRadioGroup = ({
  label,
  data,
  selectedValue,
  handleOnChange,
}) => {
  const handleChange = (event) => {
    event.stopPropagation();
    handleOnChange?.(event.target.value);
    // setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup value={selectedValue} onChange={handleChange}>
        {data?.length > 0 &&
          data?.map((item, index) => {
            return (
              <FormControlLabel
                key={index}
                value={item?.value}
                control={
                  <Radio
                    sx={{
                      "&, &.Mui-checked": {
                        color: (theme) => getModuleWiseData(theme),
                      },
                      "&.active": {
                        color: (theme) => getModuleWiseData(theme),
                      },
                    }}
                  />
                }
                label={item?.label}
              />
            );
          })}
      </RadioGroup>
    </FormControl>
  );
};
const MobileMenus = (props) => {
  const {
    selectedMenuIndex,
    setSelectedMenuIndex,
    menus,
    selectedFilterValue,
    setSelectedFilterValue,
  } = props;
  const [openPopover, setOpenPopover] = useState({
    open: false,
    anchorEl: null,
  });
  const { t } = useTranslation();
  const deliveryTypes = [
    { label: "All", value: "all" },
    { label: "Delivery", value: "home" },
    {
      label: "Takeaway",
      value: "takeaway",
    },
  ];
  const categories = [
    { label: "All", value: "all" },
    { label: "Newly Joined", value: "newly_joined" },
    {
      label: "Popular",
      value: "popular",
    },
    {
      label: "Top Rated",
      value: "top_rated",
    },
  ];

  const handleButtonClick = (e) => {
    setOpenPopover({
      open: true,
      anchorEl: e.currentTarget,
    });
  };
  const handlePopoverClose = () => {
    setOpenPopover({
      open: false,
      anchorEl: null,
    });
  };
  const handleDeliveryTypeOnChange = (value) => {
    setSelectedFilterValue(value);
  };
  const handleCategoriesChange = (value) => {
    let index = categories.findIndex((item, index) => item?.value === value);
    setSelectedMenuIndex(index);
  };
  const selectedValueForCategoreis = () => {
    return categories.find((item, index) => index === selectedMenuIndex)?.value;
  };

  return (
    <div>
      <CustomButtonWrapper onClick={handleButtonClick} variant="outlined">
        <FilterListIcon fontSize="small" />
      </CustomButtonWrapper>
      {openPopover?.open && (
        <CustomPopover
          openPopover={openPopover?.open}
          anchorEl={openPopover?.anchorEl}
          placement="bottom"
          handleClose={handlePopoverClose}
        >
          <Paper
            sx={{
              top: "100px",
              p: "20px",
              width: "220px",
            }}
          >
            <CustomStackFullWidth spacing={1}>
              <CustomRadioGroup
                label={t("Delivery Type")}
                data={deliveryTypes}
                selectedValue={selectedFilterValue}
                handleOnChange={handleDeliveryTypeOnChange}
              />
              <CustomRadioGroup
                label={t("Categories")}
                data={categories}
                selectedValue={selectedValueForCategoreis()}
                handleOnChange={handleCategoriesChange}
              />
            </CustomStackFullWidth>
          </Paper>
        </CustomPopover>
      )}
    </div>
  );
};

MobileMenus.propTypes = {};

export default MobileMenus;
