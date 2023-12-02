import React, { useState } from "react";
import { Button, ButtonGroup, Grid, useMediaQuery, Tabs } from "@mui/material";

import { useTranslation } from "react-i18next";

import { Box } from "@mui/system";
import { CustomTabs } from "../../styled-components/CustomStyles.style";
import { RestaurantDetailsNavButton } from "../food-details/food-card/FoodCard.style";

const ItemNavigation = ({
  categoryMenus,
  setCategoryId,
  category_id,
  page_limit,
  setPageLimit,
  id,
  usein,
}) => {
  const { t } = useTranslation();
  const matches = useMediaQuery("(min-width:600px)");
  const [gridItem, setGridItem] = useState(10);
  const handleCategoryId = (catId) => {
    setCategoryId(catId);
  };

  return (
    <>
      <CustomTabs
        orientation="horizontal"
        // variant="contained"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Box>
          <RestaurantDetailsNavButton
            sx={{
              color:
                category_id === 0 || category_id === id
                  ? "whiteContainer.main"
                  : "whiteContainer",
              backgroundColor: (theme) =>
                category_id === id ? theme.palette.primary.main : "inherit",
              "&:hover": {
                backgroundColor: (theme) =>
                  category_id === id ? theme.palette.primary.main : "inherit",
              },
            }}
            onClick={() => handleCategoryId(id)}
          >
            {t("All")}
          </RestaurantDetailsNavButton>

          {categoryMenus?.length > 0 &&
            categoryMenus?.map((menu) => {
              return (
                <RestaurantDetailsNavButton
                  sx={{
                    color: (theme) =>
                      category_id === menu.id && "whiteContainer.main",
                    backgroundColor: (theme) =>
                      category_id === menu.id
                        ? theme.palette.primary.main
                        : "inherit",
                    "&:hover": {
                      backgroundColor: (theme) =>
                        category_id === menu.id
                          ? theme.palette.primary.main
                          : "inherit",
                    },
                  }}
                  key={menu.id}
                  onClick={() => handleCategoryId(menu.id)}
                >
                  {menu.name}
                </RestaurantDetailsNavButton>
              );
            })}
        </Box>
      </CustomTabs>
    </>
  );
};

export default ItemNavigation;
