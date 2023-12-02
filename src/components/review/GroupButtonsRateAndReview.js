import React from "react";
import { ButtonGroup, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RestaurantDetailsNavButton } from "../food-details/food-card/FoodCard.style";
const GroupButtonsRateAndReview = ({ setType, type, moduleType }) => {
  const { t } = useTranslation();
  return (
    <Tabs
      orientation="horizontal"
      // variant="contained"
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      <ButtonGroup>
        {moduleType !== "parcel" && (
          <RestaurantDetailsNavButton
            background={type === "items"}
            onClick={() => setType("items")}
            sx={{ width: { xs: "80px", md: "100px" } }}
          >
            {t("Items")}
          </RestaurantDetailsNavButton>
        )}
        <RestaurantDetailsNavButton
          // color={
          //     type === 'veg' ? 'primary' : 'whiteContainer'
          // }
          background={type === "delivery_man"}
          onClick={() => setType("delivery_man")}
          sx={{ width: "100px" }}
        >
          {t("Delivery man")}
        </RestaurantDetailsNavButton>
      </ButtonGroup>
    </Tabs>
  );
};

GroupButtonsRateAndReview.propTypes = {};

export default GroupButtonsRateAndReview;
