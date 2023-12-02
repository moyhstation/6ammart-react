import { OfferTypography } from "../../food-card/FoodCard.style";
// import { getAmount } from '../../../utils/customFunctions'
import React from "react";
import { getAmountWithSign } from "../../../../helper-functions/CardHelpers";

export const handleDiscountChip = (product, t) => {
  if (product?.restaurant_discount > 0) {
    if (product?.restaurant_discount === "percent") {
      return (
        <OfferTypography>
          {product?.restaurant_discount}% {t("OFF")}
        </OfferTypography>
      );
    } else {
      return (
        <OfferTypography>
          {getAmountWithSign(product?.restaurant_discount)}
        </OfferTypography>
      );
    }
  } else {
    if (product?.store_discount === 0) {
      if (product?.discount > 0) {
        if (product?.discount_type === "percent") {
          return (
            <OfferTypography>
              {product?.discount}% {t("OFF")}
            </OfferTypography>
          );
        } else {
          return (
            <OfferTypography>
              {getAmountWithSign(product?.discount)} {t("OFF")}
            </OfferTypography>
          );
        }
      }
    } else {
      return (
        <OfferTypography>
          {product?.store_discount}% {t("OFF")}
        </OfferTypography>
      );
    }
  }
};
