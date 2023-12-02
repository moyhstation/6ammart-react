import React from "react";
import { FoodTitleTypography } from "../food-card/FoodCard.style";
import { Box, Stack } from "@mui/material";
import {
  getAmountWithSign,
  getDiscountedAmount,
} from "../../../helper-functions/CardHelpers";
import { handleTotalAmountWithAddons } from "../../../utils/CustomFunctions";
import { CustomTypographyGray } from "../../../styled-components/CustomStyles.style";
// import {
//     getAmount,
//     getConvertDiscount,
//     handleTotalAmountWithAddons,
// } from '../../utils/customFunctions'
// import { CustomTypographyGray } from '../error/Errors.style'

const TotalAmountVisibility = (props) => {
  const {
    modalData,
    totalPrice,
    t,
    productDiscount,
    productDiscountType,
    productRestaurantDiscount,
    productQuantity,
    selectedAddOns,
  } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <FoodTitleTypography
        gutterBottom
        component="h6"
        sx={{
          margin: "0",
          alignItems: "end",
          justifyContent: "flex-start",
          padding: "0",
          textAlign: "left",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        {t("Total Amount")} :
        <Box
          component="span"
          sx={{
            color: (theme) => theme.palette.primary.main,
          }}
        >
          {modalData.length > 0 &&
            getAmountWithSign(
              handleTotalAmountWithAddons(
                getDiscountedAmount(
                  totalPrice,
                  productDiscount,
                  productDiscountType,
                  productRestaurantDiscount,
                  productQuantity
                ),
                selectedAddOns
              )
            )}
        </Box>
      </FoodTitleTypography>

      {modalData.length > 0 &&
      (productDiscount || productRestaurantDiscount === 1) ? (
        <CustomTypographyGray
          nodefaultfont="true"
          textdecoration="line-through"
        >
          (
          {getAmountWithSign(
            handleTotalAmountWithAddons(totalPrice, selectedAddOns)
          )}
          )
        </CustomTypographyGray>
      ) : null}
    </Stack>
  );
};

TotalAmountVisibility.propTypes = {};

export default TotalAmountVisibility;
