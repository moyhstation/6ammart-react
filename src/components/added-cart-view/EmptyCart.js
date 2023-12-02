import React from "react";
import { Stack } from "@mui/system";
import CustomImageContainer from "../CustomImageContainer";
import emptycart from "./assets/emptycart.png";
import { CustomTypographyBold } from "../../styled-components/CustomStyles.style";
import { useTranslation } from "react-i18next";
import EmptyCartSvg from "../svg-components/EmptyCartSvg";
import CartIcon from "./assets/CartIcon";
import { EmptyCartBox } from "./Cart.style";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { getCartListModuleWise } from "../../helper-functions/getCartListModuleWise";
import CartActions from "./CartActions";

const EmptyCart = ({ setSideDrawerOpen, cartList }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Stack height="614px" width="100%">
      <Stack
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingBlockEnd: "2.3rem",
        }}
        container="true"
        spacing={2.5}
      >
        <EmptyCartBox>
          <CartIcon
            width="28px"
            height="30px"
            color={theme.palette.primary.main}
          />
        </EmptyCartBox>
        <CustomTypographyBold align="center">
          {t("Your cart is empty")}
        </CustomTypographyBold>
        <Typography fontSize="14px" width="300px" align="center">
          {t(
            "No items added in your cart. Please add product to your cart list."
          )}
        </Typography>
      </Stack>
      <CartActions setSideDrawerOpen={setSideDrawerOpen} cartList={cartList} />
    </Stack>
  );
};

export default EmptyCart;
