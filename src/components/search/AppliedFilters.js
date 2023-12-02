import React from "react";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { alpha, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const FilterItem = ({ item, handleSelection }) => {
  return (
    <Box
      sx={{
        padding: "5px",
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
        borderRadius: "5px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "5px",
      }}
    >
      <Typography variant="body2">{item?.label}</Typography>
      <IconButton
        sx={{ borderRadius: "50%", padding: "3px" }}
        onClick={() => handleSelection(item)}
      >
        <CloseIcon sx={{ fontSize: "15px" }} />
      </IconButton>
    </Box>
  );
};

const AppliedFilters = (props) => {
  const { filterData, setFilterData } = props;
  const { t } = useTranslation();

  const checkedSelection = () => {
    const isSelectedAny = filterData
      ?.filter((item) => item?.value !== "price" && item?.value!=="test")
      ?.some((item) => item?.checked);
    return !!isSelectedAny;
  };
  const handleSelection = (selectedItem) => {
    const newFilter = filterData?.map((item) =>
      item?.value === selectedItem?.value ? { ...item, checked: false } : item
    );
    setFilterData(newFilter);
  };
  return (
    <CustomBoxFullWidth>
      {filterData?.length > 0 && checkedSelection() && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
          gap="10px"
        >
          <Typography
            fontWeight="bold"
            fontSize="12px"
            sx={{
              color: (theme) => alpha(theme.palette.customColor.textGray, 0.8),
              marginRight: "10px",
            }}
          >
            {t("Applied filters:")}
          </Typography>
          {filterData?.map((item, index) => {
            if (item?.checked && item?.value !== "price" && item?.value !== "test") {
              return (
                <FilterItem
                  item={item}
                  key={index}
                  handleSelection={handleSelection}
                />
              );
            }
          })}
        </CustomStackFullWidth>
      )}
    </CustomBoxFullWidth>
  );
};

AppliedFilters.propTypes = {};

export default AppliedFilters;
