import React, { useEffect, useReducer, useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Skeleton, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import VariationsManager from "./VariationsManager";
import IncrementDecrementManager from "./IncrementDecrementManager";
import ProductInformationBottomSection from "./ProductInformationBottomSection";

import { ACTION, initialState, reducer } from "./states";
import { setCart, setCartList, setUpdateItemToCart } from "../../../redux/slices/cart";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../modal";
import CartClearModal from "./CartClearModal";
import {
  handleInitialTotalPriceVarPriceQuantitySet,
  handleValuesFromCartItems,
} from "./helperFunction";
import {
  not_logged_in_message,
  out_of_limits,
  out_of_stock,
  product_update_to_cart_message,
  update_error_text,
} from "../../../utils/toasterMessages";
import { useAddToWishlist } from "../../../api-manage/hooks/react-query/wish-list/useAddWishList";
import { addWishList } from "../../../redux/slices/wishList";
import CustomRatings from "../../search/CustomRatings";
import { getCartListModuleWise } from "../../../helper-functions/getCartListModuleWise";
import Link from "next/link";
import { getModuleId } from "../../../helper-functions/getModuleId";
import PricePreviewWithStock from "./PricePreviewWithStock";
import CustomImageContainer from "../../CustomImageContainer";
import { handleDiscountChip } from "./ProductDetailsSection";
import { useTranslation } from "react-i18next";
import OrganicTag from "../../organic-tag";
import InStockTag from "../InStockTag";
import CategoryInformation from "../CategoryInformation";
import { ReadMore } from "../../ReadMore";
import useAddCartItem from "../../../api-manage/hooks/react-query/add-cart/useAddCartItem";
import { getGuestId } from "../../../helper-functions/getToken";
import { onErrorResponse } from "../../../api-manage/api-error-response/ErrorResponses";
import useCartItemUpdate from "../../../api-manage/hooks/react-query/add-cart/useCartItemUpdate";
export const getItemObject = (productData) => {
  return {
    guest_id: getGuestId(),
    model: productData?.available_date_starts ? "ItemCampaign" : "Item",
    add_on_ids: [],
    add_on_qtys: [],
    item_id: productData?.id,
    price: productData?.totalPrice,
    quantity: productData?.quantity,
    variation: productData?.selectedOption,
  };
};
const ProductInformation = ({
  productDetailsData,
  productUpdate,
  handleModalClose,
  modalmanage,
  imageSrcUrl,
  isSmall,
}) => {
  const theme = useTheme();
  const [wishListCount, setWishListCount] = useState(
    productDetailsData?.whislists_count
  );
  const currentLocation = JSON.parse(localStorage.getItem("currentLatLng"));
  const [clearCartModal, setClearCartModal] = React.useState(false);
  const { cartList: aliasCartList } = useSelector((state) => state.cart);
  //this aliasCartList has been added so that we can use cartList as per module wise.
  const cartList = getCartListModuleWise(aliasCartList);
  const dispatchRedux = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { t } = useTranslation();
  const { mutate, isLoading } = useAddCartItem();
  const { mutate: updateMutate, isLoading: updateIsLoading } = useCartItemUpdate();
  const handleClearCartModalOpen = () => setClearCartModal(true);

  const handleClose = (value) => {
    if (value === "add-item") {
      const itemObject = getItemObject(state?.modalData[0]);
      mutate(itemObject, {
        onSuccess: handleSuccess,
        onError: onErrorResponse,
      });
    } else {
      setClearCartModal(false);
    }
  };

  useEffect(() => {
    handleInitialTotalPriceVarPriceQuantitySet(
      productDetailsData,
      dispatch,
      cartList,
      handleChoices,
      state.selectedOptions,
      state.modalData
    );
  }, [productDetailsData]);

  const handleChoices = (option, choice) => {
    if (cartList.length > 0) {
      const itemIsInCart = cartList.find(
        (item) =>
          item?.id === productDetailsData?.id &&
          JSON.stringify(item?.selectedOption?.[0]) === JSON.stringify(option)
      );
      if (itemIsInCart) {
        dispatch({
          type: ACTION.setModalData,
          payload: {
            ...itemIsInCart,
          },
        });
      } else {
        dispatch({
          type: ACTION.setModalData,
          payload: {
            ...productDetailsData,
            selectedOption: [option],
            quantity: 1,
            price: option.price,
            totalPrice: option.price,
          },
        });
      }
    } else {
      dispatch({
        type: ACTION.setModalData,
        payload: {
          ...state.modalData[0],
          selectedOption: [option],
          price: option?.price,
          totalPrice: option?.price,
          quantity: 1,
        },
      });
    }
  };
  const decrementQuantity = () => {
    dispatch({ type: ACTION.decrementQuantity });
  };

  const incrementQuantity = () => {
    if (state.modalData[0]?.stock > state.modalData[0]?.quantity) {
      if (productDetailsData?.maximum_cart_quantity) {
        if (
          productDetailsData?.maximum_cart_quantity >
          state.modalData[0]?.quantity
        ) {
          dispatch({ type: ACTION.incrementQuantity });
        } else {
          toast.error(t(out_of_limits));
        }
      } else {
        dispatch({ type: ACTION.incrementQuantity });
      }
    } else {
      toast.error(t(out_of_stock));
    }
  };
  const handleSuccess = (res) => {
    if (res) {
      let product = {};
      res?.forEach((item) => {
        product = {
          ...item?.item,
          cartItemId: item?.id,
          quantity: item?.quantity,
          totalPrice: item?.price,
          selectedOption: item?.variation,
        };
      });
      dispatchRedux(
        setCart({
          ...product,
        })
      );
      toast.success(t("Item added to cart"));
      handleModalClose?.();
      setClearCartModal(false);
    }
  };
  const handleAddToCartOnDispatch = () => {
    const itemObject = getItemObject(state?.modalData[0]);
    mutate(itemObject, {
      onSuccess: handleSuccess,
      onError: onErrorResponse,
    });
  };

  const addToCard = () => {
    //handleAddToCartOnDispatch();
    if (cartList?.length > 0) {
      const isStoreExist = cartList.find(
        (item) => item?.store_id === productDetailsData?.store_id
      );
      if (isStoreExist) {
        handleAddToCartOnDispatch();
      } else {
        if (cartList.length !== 0) {
          handleClearCartModalOpen();
        }
      }
    } else {
      handleAddToCartOnDispatch();
    }
  };

  const updateCartSuccessHandler = (res) => {
    if (res) {

      const pp = res?.map((item) => {
        const newItem = {
          ...item?.item,
          cartItemId: item?.id,
          quantity: item?.quantity,
          totalPrice: item?.price,
          selectedOption: item?.variation,
        };

        return newItem;
      });
      //
      // let product = {};
      // res?.forEach((item) => {
      //   product = {
      //     ...item?.item,
      //     cartItemId: item?.id,
      //     quantity: item?.quantity,
      //     totalPrice: item?.price,
      //     selectedOption: item?.variation,
      //   };
      // });
      dispatchRedux(setCartList(pp));
      toast.success(t(product_update_to_cart_message));
      handleModalClose?.();
    }
  }

  const handleUpdateToCart = (cartItem) => {
    if (
      JSON.stringify(productDetailsData) === JSON.stringify(state.modalData[0])
    ) {
      toast(t(update_error_text), {
        icon: "⚠️",
      });
    } else {
      const itemIsInCart = cartList.find(
        (item) =>
          item?.id === productDetailsData?.id &&
          JSON.stringify(item?.selectedOption?.[0]) === JSON.stringify(state.modalData[0]?.selectedOption?.[0])
      );
      const cartItemObject = {
        cart_id: itemIsInCart?.cartItemId,
        guest_id: getGuestId(),
        model: state.modalData[0]?.available_date_starts ? "ItemCampaign" : "Item",
        add_on_ids: [],
        add_on_qtys: [],
        item_id: state.modalData[0]?.id,
        price: state.modalData[0]?.totalPrice,
        quantity: state.modalData[0]?.quantity,
        variation: state.modalData[0]?.selectedOption,
      }
      updateMutate(cartItemObject, {
        onSuccess: updateCartSuccessHandler,
        onError: onErrorResponse,
      });
      if (productUpdate) {
        handleModalClose?.();
      }
    }
  };

  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const { mutate: addFavoriteMutation } = useAddToWishlist();
  const addToFavorite = () => {
    if (token) {
      addFavoriteMutation(productDetailsData?.id, {
        onSuccess: (response) => {
          if (response) {
            dispatchRedux(addWishList(productDetailsData));
            toast.success(response?.message);
            setWishListCount(wishListCount + 1);
          }
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      });
    } else toast.error(t(not_logged_in_message));
  };
  const topInformation = () => {
    return (
      <CustomStackFullWidth
        spacing={0.5}
        padding={{
          xs: "0px 20px 0px 20px",
          sm: "10px 20px 10px 20px",
          md: "0px",
        }}
      >
        {state.modalData[0]?.store_name ? (
          <Link
            href={{
              pathname: "/store/[id]",
              query: {
                id: `${state.modalData[0]?.store_id}`,
                module_id: `${getModuleId()}`,
                lat: currentLocation?.lat,
                lng: currentLocation?.lng,
              },
            }}
          >
            {" "}
            <Typography
              variant="body1"
              fontWeight="400"
              lineHeight="normal"
              color="customColor.textGray"
            >
              {state.modalData[0]?.store_name}
            </Typography>
          </Link>
        ) : (
          <Skeleton width={100} variant="text" />
        )}
        {state.modalData[0]?.name ? (
          <CustomStackFullWidth
            direction="row"
            alignItems="center"
            spacing={1.5}
          >
            <Typography
              fontSize={{ xs: "14px", sm: "18px" }}
              fontWeight="600"
              marginTop={{ xs: "25px", sm: "0px" }}
            >
              {state.modalData[0]?.name}
            </Typography>
            {state.modalData[0]?.stock > 0 && <InStockTag />}
          </CustomStackFullWidth>
        ) : (
          <Skeleton width={100} variant="text" />
        )}
        {state.modalData[0]?.isCampaignItem ? null : (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Stack direction="row" alignItems="base-line" spacing={0.5}>
              <CustomRatings
                ratingValue={state.modalData[0]?.avg_rating}
                readOnly
                color={theme.palette.warning.main}
              />
              <Typography fontWeight="700" fontSize="12px">
                ({state.modalData[0]?.avg_rating})
              </Typography>
            </Stack>
            <Typography color="customColor.textGray">|</Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.3}
              sx={{ borderBottom: "1px solid" }}
            >
              <Typography
                variant="body1"
                // color="customColor.textGray"
                sx={{ fontWeight: "700" }}
              >
                {state.modalData[0]?.rating_count}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "400" }}>
                {t("Reviews")}
              </Typography>
            </Stack>
          </Stack>
        )}
        <PricePreviewWithStock
          state={state}
          theme={theme}
          productDetailsData={productDetailsData}
        />

        {modalmanage === "true" ? (
          <ReadMore limits="130" color={theme.palette.neutral[400]}>
            {state?.modalData.length > 0 && state.modalData[0]?.description}
          </ReadMore>
        ) : null}
      </CustomStackFullWidth>
    );
  };

  return (
    <>
      {state.modalData.length > 0 && (
        <CustomStackFullWidth spacing={2}>
          {topInformation()}
          <Stack padding={{ xs: "10px 20px 10px 20px", sm: "20px", md: "0px" }}>
            {state.modalData[0]?.variations?.length > 0 && (
              <VariationsManager
                productDetailsData={state.modalData[0]}
                handleChoices={handleChoices}
              />
            )}
            {/*<SizeVariation productDetailsData={productDetailsData} />*/}
            {state.modalData.length > 0 && (
              <IncrementDecrementManager
                decrementQuantity={decrementQuantity}
                incrementQuantity={incrementQuantity}
                modalData={state?.modalData[0]}
                productUpdate={productUpdate}
              />
            )}
            {isSmall && (
              <CustomStackFullWidth sx={{ mt: ".5rem" }}>
                <CategoryInformation
                  tags={state?.modalData?.[0]?.tags}
                  categories={state?.modalData?.[0]?.category_ids}
                />
              </CustomStackFullWidth>
            )}
          </Stack>
          <ProductInformationBottomSection
            addToCard={addToCard}
            handleUpdateToCart={handleUpdateToCart}
            productDetailsData={state.modalData[0]}
            selectedOptions={state?.selectedOptions}
            dispatchRedux={dispatchRedux}
            addToFavorite={addToFavorite}
            wishListCount={wishListCount}
            setWishListCount={setWishListCount}
            cartItemQuantity={state?.modalData[0]?.quantity}
            t={t}
            handleModalClose={handleModalClose}
            isLoading={isLoading}
            addToCartMutate={mutate}
            updateIsLoading={updateIsLoading}
          />
          {!isSmall && (
            <CustomStackFullWidth sx={{ mt: ".5rem" }}>
              <CategoryInformation
                tags={state?.modalData?.[0]?.tags}
                categories={state?.modalData?.[0]?.category_ids}
              />
            </CustomStackFullWidth>
          )}

          <CustomModal openModal={clearCartModal} handleClose={handleClose}>
            <CartClearModal
              handleClose={handleClose}
              dispatchRedux={dispatchRedux}
            />
          </CustomModal>
        </CustomStackFullWidth>
      )}
    </>
  );
};

export default ProductInformation;
