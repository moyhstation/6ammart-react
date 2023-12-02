import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import { cartItemsTotalAmount } from "../../utils/CustomFunctions";

const CartTotalPrice = ({ cartList }) => {
  return (
    <>
      <CustomStackFullWidth
        justifyContent="space-between"
        direction="row"
        sx={{ padding: "1.4rem" }}
      >
        <Typography fontSize="14px" fontWeight="500">
          {t("Subtotal")}
        </Typography>
        <Typography fontSize="15px" fontWeight="700">
          {getAmountWithSign(cartItemsTotalAmount(cartList))}
        </Typography>
      </CustomStackFullWidth>
    </>
  );
};

export default CartTotalPrice;
