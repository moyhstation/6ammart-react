import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import {
  getAmountWithSign,
  getDiscountedAmount,
} from "../../helper-functions/CardHelpers";
import { Box, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  cart,
  setCart,
  setDecrementToCartItem,
  setIncrementToCartItem,
  setRemoveItemFromCart,
} from "../../redux/slices/cart";
import FoodDetailModal from "../food-details/foodDetail-modal/FoodDetailModal";
import ProductDetailModal from "../product-detail.modal";
import VariationContent from "./VariationContent";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import {
  cart_item_remove,
  out_of_limits,
  out_of_stock,
} from "../../utils/toasterMessages";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import ModuleModal from "../cards/ModuleModal";
import { CartIncrementStack } from "./Cart.style";
import Divider from "@mui/material/Divider";
import CustomDivider from "../CustomDivider";
import { useTheme } from "@emotion/react";
import useDeleteCartItem from "../../api-manage/hooks/react-query/add-cart/useDeleteCartItem";
import { onErrorResponse } from "../../api-manage/api-error-response/ErrorResponses";
import { removeWishListStore } from "../../redux/slices/wishList";
import useCartItemUpdate from "../../api-manage/hooks/react-query/add-cart/useCartItemUpdate";
import {
  getItemDataForAddToCart,
  getVariationsForCartData,
  handleValuesFromCartItems,
} from "../product-details/product-details-section/helperFunction";
import Loading from "../custom-loading/Loading";
import {getConvertDiscount, getTotalVariationsPrice, handleTotalAmountWithAddons} from "../../utils/CustomFunctions";

const CartContent = (props) => {
  const { cartItem, imageBaseUrl } = props;
  const { configData } = useSelector((state) => state.configData);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const guestId = localStorage.getItem("guest_id");
  const { mutate,isLoading:removeIsLoading } = useDeleteCartItem();
  const { mutate: updateMutate,isLoading } = useCartItemUpdate();

  const cartUpdateHandleSuccess = (res) => {
    if (res) {
      res?.forEach((item) => {
        if (cartItem?.cartItemId === item?.id) {
          const product = {
            ...item?.item,
            cartItemId: item?.id,
            totalPrice: item?.price,
            quantity: item?.quantity,
            food_variations: item?.item?.food_variations,
            selectedAddons: item?.item?.addons,
            itemBasePrice: item?.item?.price,
            selectedOption: item?.variation,
          };

          dispatch(setIncrementToCartItem(product)); // Dispatch the single product
        }
      });
    }
  };
  const cartUpdateHandleSuccessDecrement = (res) => {
    if (res) {
      res?.forEach((item) => {
        if (cartItem?.cartItemId === item?.id) {
          const product = {
            ...item?.item,
            cartItemId: item?.id,
            totalPrice: item?.price,
            quantity: item?.quantity,
            food_variations: item?.item?.food_variations,
            selectedAddons: item?.item?.addons,
            itemBasePrice: item?.item?.price,
            selectedOption: item?.variation,
          };
          dispatch(setDecrementToCartItem(product));
        }
      });
    }
  };
  const handleIncrement = (cartItem) => {
    const updateQuantity=cartItem?.quantity+1
    const price =
        cartItem?.price +
        getTotalVariationsPrice(cartItem?.food_variations);
    //here quantity is incremented with number 1
    const productPrice = price * updateQuantity;

    const discountedTotalPrice = getConvertDiscount(
        cartItem?.discount_type === "amount"
            ? cartItem?.discount * (updateQuantity)
            : cartItem?.discount,
        cartItem?.discount_type,
        productPrice,
        cartItem?.store_discount
    );
  const mainPrice=getCurrentModuleType() === "food" ? productPrice: (cartItem?.selectedOption?.length > 0
          ? cartItem?.selectedOption?.[0]?.price
          : cartItem?.price) * updateQuantity

    const itemObject = getItemDataForAddToCart(cartItem,updateQuantity,mainPrice, guestId);

    if (getCurrentModuleType() !== "food") {
      if (cartItem?.stock <= cartItem?.quantity) {
        toast.error(t(out_of_stock));
      } else {
        if (cartItem?.maximum_cart_quantity) {
          if (cartItem?.maximum_cart_quantity <= cartItem?.quantity) {
            toast.error(t(out_of_limits));
          } else {
            updateMutate(itemObject, {
              onSuccess: cartUpdateHandleSuccess,
              onError: onErrorResponse,
            });
          }
        } else {
          updateMutate(itemObject, {
            onSuccess: cartUpdateHandleSuccess,
            onError: onErrorResponse,
          });
        }
      }
    } else {
      if (cartItem?.maximum_cart_quantity) {
        if (cartItem?.maximum_cart_quantity <= cartItem?.quantity) {
          toast.error(t(out_of_limits));
        } else {
        }
      }
      updateMutate(itemObject, {
        onSuccess: cartUpdateHandleSuccess,
        onError: onErrorResponse,
      });
    }
  };

  const handleDecrement = () => {
    const updateQuantity=cartItem?.quantity - 1
    const price =
        cartItem?.price +
        getTotalVariationsPrice(cartItem?.food_variations);
    //here quantity is decremented with number 1
    const productPrice = price * (updateQuantity);
    const discountedTotalPrice = getConvertDiscount(
        cartItem?.discount_type === "amount"
            ? cartItem?.discount * (updateQuantity)
            : cartItem?.discount,
        cartItem?.discount_type,
        productPrice,
        cartItem?.store_discount
    );
    const mainPrice=getCurrentModuleType() === "food" ? productPrice: (cartItem?.selectedOption?.length > 0
            ? cartItem?.selectedOption?.[0]?.price
            : cartItem?.price) *
        (updateQuantity )
    const itemObject = getItemDataForAddToCart(cartItem,updateQuantity,mainPrice, guestId);
    updateMutate(itemObject, {
      onSuccess: cartUpdateHandleSuccessDecrement,
      onError: onErrorResponse,
    });
  };

  const handleSuccess = () => {
    dispatch(setRemoveItemFromCart(cartItem));
    toast.success(t(cart_item_remove));
  };
  const handleRemove = () => {
    const cartIdAndGuestId = {
      cart_id: cartItem?.cartItemId,
      guestId: guestId,
    };
    mutate(cartIdAndGuestId, {
      onSuccess: handleSuccess,
      onError: onErrorResponse,
    });
  };
  const handleUpdateModalOpen = () => {
    setUpdateModalOpen(true);
  };
  const handleFoodItemTotalPriceWithAddons = () => {
    if (cartItem?.selectedAddons?.length > 0) {
      const addOnsTotalPrice = cartItem?.selectedAddons?.reduce(
        (prev, addOn) => addOn?.price * addOn?.quantity + prev,
        0
      );
      return addOnsTotalPrice + cartItem?.totalPrice;
    } else {
      return cartItem?.totalPrice;
    }
  };

  return (
    <>
      <CustomStackFullWidth
        direction="row"
        sx={{
          padding: ".2rem 2rem .2rem 1.3rem",
          marginTop: { xs: ".5rem", sm: "1rem", md: "1rem" },
        }}
        gap="10px"
      >
        <Stack
          onClick={() => handleUpdateModalOpen()}
          sx={{ cursor: "pointer" }}
        >
          <CustomImageContainer
            height="80px"
            width="80px"
            smWidth="65px"
            smHeight="65px"
            src={`${imageBaseUrl}/${cartItem?.image}`}
            borderRadius=".7rem"
            objectfit="cover"
          />
        </Stack>
        <Stack width="0px" flexGrow="1" justifyContent="center" spacing={0.2}>
          <Typography fontWeight="500" fontSize={{ xs: "12px", md: "14px" }}>
            {cartItem?.name}
          </Typography>
          <VariationContent cartItem={cartItem} />
          <Typography fontWeight="500" fontSize={{ xs: "13px", md: "16px" }}>

            {
                getAmountWithSign(
                    handleTotalAmountWithAddons(
                        getDiscountedAmount(
                            cartItem?.totalPrice,
                            cartItem?.discount,
                            cartItem?.discount_type,
                            cartItem?.store_discount,
                            cartItem?.quantity
                        ),
                        cartItem?.selectedAddons
                    )
                )}
            {/*{getAmountWithSign(*/}
            {/*  getDiscountedAmount(*/}
            {/*    cartItem?.totalPrice,*/}
            {/*    cartItem?.discount,*/}
            {/*    cartItem?.discount_type,*/}
            {/*    cartItem?.store_discount,*/}
            {/*    cartItem?.quantity*/}
            {/*  )*/}
            {/*)}*/}
          </Typography>
        </Stack>
        <CartIncrementStack>
          {cartItem?.quantity === 1 ? (
            <IconButton
                disabled={removeIsLoading}
              aria-label="delete"
              size="small"
              color="error"
              sx={{ padding: "2px" }}
              onClick={() => handleRemove()}
            >
              <DeleteIcon sx={{ width: "16px" }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="delete"
              size="small"
              sx={{ padding: "2px" }}
              disabled={isLoading}
            >
              <RemoveIcon
                size="small"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  width: "16px",
                }}
                onClick={() => handleDecrement()}
              />
            </IconButton>
          )}
          {isLoading?(
              <Stack width="16px" height="18px">
            <Loading color={theme.palette.primary.main} />
          </Stack>):( <Typography fontSize="12px" fontWeight="500">
            {cartItem?.quantity}
          </Typography>)}

          <IconButton aria-label="delete" sx={{ padding: "2px" }} disabled={isLoading}>
            <AddIcon
              sx={{
                color: (theme) => theme.palette.primary.main,
                width: "16px",
              }}
              size="small"
              onClick={() => handleIncrement(cartItem)}
            />
          </IconButton>
        </CartIncrementStack>
      </CustomStackFullWidth>
      <Stack paddingLeft="1rem">
        <CustomDivider paddingTop={isSmall ? ".5rem" : "1rem"} border="2px" />
      </Stack>
      {updateModalOpen && cartItem?.module_type === "food" ? (
        <FoodDetailModal
          open={updateModalOpen}
          product={{
            ...cartItem,
            cart_id: cartItem?.cartItemId,
            add_ons: cartItem?.addons,
          }}
          handleModalClose={() => setUpdateModalOpen(false)}
          imageBaseUrl={imageBaseUrl}
          productUpdate
        />
      ) : (
        <ModuleModal
          open={updateModalOpen}
          handleModalClose={() => setUpdateModalOpen(false)}
          configData={configData}
          productDetailsData={{ ...cartItem,
            cart_id: cartItem?.cartItemId,}}
        />
      )}
    </>
  );
};

CartContent.propTypes = {};

export default CartContent;
