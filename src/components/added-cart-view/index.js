import React, { useEffect } from "react";
import { Drawer, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import CartActions from "./CartActions";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import CartContents from "./CartContents";
import { getCartListModuleWise } from "../../helper-functions/getCartListModuleWise";
import { useRouter } from "next/router";
import { CartDrawer } from "./Cart.style";
import CustomSideDrawer from "../side-drawer/CustomSideDrawer";
import DrawerHeader from "./DrawerHeader";
import CartIcon from "./assets/CartIcon";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import Grocery from "../home/module-wise-components/Grocery";
import Pharmacy from "../home/module-wise-components/pharmacy/Pharmacy";
import FreeDeliveryProgressBar from "./FreeDeliveryProgressBar";
import CartTotalPrice from "./CartTotalPrice";
import { useTheme } from "@emotion/react";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import { cartItemsTotalAmount } from "../../utils/CustomFunctions";
import useGetAllCartList from "../../api-manage/hooks/react-query/add-cart/useGetAllCartList";
import { setCartList } from "../../redux/slices/cart";
import DotSpin from "../DotSpin";
import {Stack} from "@mui/system";

const CardView = (props) => {
  const theme = useTheme();
  const { sideDrawerOpen, setSideDrawerOpen, cartList, refetch, isLoading } =
    props;
  const { configData } = useSelector((state) => state.configData);
  const imageBaseUrl = configData?.base_urls?.item_image_url;
  const router = useRouter();
  const closeHandler = () => {
    setSideDrawerOpen(false);
  };

  const getModuleWiseCartContent = () => {
    return (
      <CartContents
        cartList={getCartListModuleWise(cartList)}
        imageBaseUrl={imageBaseUrl}
        refetch={refetch}
      />
    );
  };

  return (
    <CustomSideDrawer
      anchor="right"
      open={sideDrawerOpen}
      onClose={closeHandler}
      variant="temporary"
      maxWidth="420px"
      width="100%"
    >
      <CustomStackFullWidth
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100vh" }}
      >
        <DrawerHeader
          CartIcon={
            <CartIcon
              width="18px"
              height="18px"
              color={theme.palette.primary.dark}
            />
          }
          title="Shopping Cart"
          closeHandler={closeHandler}
        />
        {isLoading ? (

            <Stack height="214px" width="100%" justifyContent="center">
              <DotSpin />
            </Stack>
        ) : getCartListModuleWise(cartList)?.length === 0 ? (

            <EmptyCart
                cartList={getCartListModuleWise(cartList)}
                setSideDrawerOpen={setSideDrawerOpen}
            />
        ) : (
            getModuleWiseCartContent()
        )}

        {getCartListModuleWise(cartList).length > 0 &&
          configData?.free_delivery_over && (
            <>
              <FreeDeliveryProgressBar
                configData={configData}
                cartList={cartList}
              />
            </>
          )}
        {getCartListModuleWise(cartList).length > 0 && (
          <>
            <CartTotalPrice cartList={getCartListModuleWise(cartList)} />
            <CartActions
              setSideDrawerOpen={setSideDrawerOpen}
              cartList={getCartListModuleWise(cartList)}
            />
          </>
        )}
      </CustomStackFullWidth>
    </CustomSideDrawer>
  );
};

export default CardView;
