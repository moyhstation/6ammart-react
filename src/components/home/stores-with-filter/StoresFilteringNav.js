import React from "react";
import PropTypes from "prop-types";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import H2 from "../../typographies/H2";
import FilterSelect from "./FilterSelect";
import { t } from "i18next";
import { getStoresOrRestaurants } from "../../../helper-functions/getStoresOrRestaurants";

const TitleWrapper = styled(Box)(({ theme, isactive }) => ({
  padding: "0px 10px",
  cursor: "pointer",
  borderBottom: "3px solid",
  borderBottomColor:
    isactive === "true" ? theme.palette.primary.main : "transparent",
}));

const StoresFilteringNav = (props) => {
  const { storesType, setStoresType, setType } = props;
  const all = t("All");
  const popular = t("Popular");
  const all_stores = `${all} ${getStoresOrRestaurants()}`;
  const popular_stores = `${popular} ${getStoresOrRestaurants()}`;
  let MenuInfo = [
    {
      title: t(all_stores),
      value: "all",
    },
    {
      title: t(popular_stores),
      value: "popular",
    },
  ];
  return (
    <CustomStackFullWidth
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={2}
      >
        {MenuInfo?.map((item, index) => {
          return (
            <TitleWrapper
              key={index}
              isactive={storesType === item?.value ? "true" : "false"}
              onClick={() => setStoresType(item.value)}
            >
              <H2 text={item?.title} />
            </TitleWrapper>
          );
        })}
      </CustomStackFullWidth>
      <FilterSelect setType={setType} key={storesType} />
    </CustomStackFullWidth>
  );
};

// StoresFilteringNav.propTypes = {
//   storesType: PropTypes.string.isRequired,
//   setStoresType: PropTypes.func.isRequired,
//   setFilterBy: PropTypes.func.isRequired,
// };

export default StoresFilteringNav;
