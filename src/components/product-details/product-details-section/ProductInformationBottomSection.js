import React, { useEffect } from "react";
import { Stack, styled } from "@mui/system";
import { PrimaryButton } from "../../Map/map.style";
import {
  alpha,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useSelector } from "react-redux";

import { useRouter } from "next/router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  setBuyNowItemList,
  setCampaignItemList,
  setCart,
  setUpdateItemToCart,
} from "../../../redux/slices/cart";
import toast from "react-hot-toast";
import { useWishListDelete } from "../../../api-manage/hooks/react-query/wish-list/useWishListDelete";
import { removeWishListItem } from "../../../redux/slices/wishList";
import { isAvailable } from "../../../utils/CustomFunctions";
import NotAvailableCard from "./NotAvailableCard";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import Loading from "../../custom-loading/Loading";
import {onErrorResponse} from "../../../api-manage/api-error-response/ErrorResponses";
import {getItemObject} from "./ProductInformation";
export const BottomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    boxShadow: "0px -4px 4px 0px rgba(0, 0, 0, 0.05)",
    borderRadius: "0px 0px 10px 10px",
    padding: "14px",
  },
}));

const ProductInformationBottomSection = ({
  addToCard,
  productDetailsData,
  selectedOptions,
  handleUpdateToCart,
  dispatchRedux,
  addToFavorite,
  wishListCount,
  setWishListCount,
  cartItemQuantity,
  handleModalClose,
  isLoading,
  t,addToCartMutate,updateIsLoading

}) => {

  const theme = useTheme();
  const { cartList } = useSelector((state) => state.cart);
  const { wishLists } = useSelector((state) => state.wishList);
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const variationErrorToast = () =>
    toast.error(
      t(
        "This variation is out of stock. Choose another variation to proceed further."
      )
    );

  const isInCart = (id) => {
    if (cartList?.length > 0) {
      const isInCart = cartList?.find(
        (item) =>
          item?.id === id &&
          JSON.stringify(item?.selectedOption) ===
            JSON.stringify(productDetailsData?.selectedOption)
      );
      if (isInCart) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const router = useRouter();


  const handleRedirect = () => {
    if (productDetailsData?.isCampaignItem) {
      dispatchRedux(setCampaignItemList(productDetailsData));
      router.push("/checkout?page=campaign", undefined, { shallow: true });
    } else {
      dispatchRedux(setBuyNowItemList(productDetailsData));

      // const isExist = isInCart(productDetailsData?.id);
      // if (isExist) {
      //   dispatchRedux(setUpdateItemToCart(productDetailsData));
      // } else {
      //   dispatchRedux(setCart(productDetailsData));
      // }
      router.push(
          {
            pathname: "/checkout",
            query: {
              page: "buy_now",
              // id: productDetailsData?.id,
            },
          },
          undefined,
          { shallow: true }
      );
    }
  };
  const isVariationAvailable = () => {
    if (productDetailsData?.selectedOption?.length > 0) {
      if (productDetailsData?.selectedOption?.[0]?.stock === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const handleRedirectToCheckoutClick = () => {
    if (productDetailsData?.selectedOption?.length > 0) {
      if (productDetailsData?.selectedOption?.[0]?.stock === 0) {
        variationErrorToast();
      } else {
        handleRedirect();
        handleModalClose();
      }
    } else {
      handleRedirect();

    }
  };
  const isInWishList = (id) => {
    return !!wishLists?.item?.find((wishItem) => wishItem.id === id);
  };

  const onSuccessHandlerForDelete = (res) => {
    dispatchRedux(removeWishListItem(productDetailsData?.id));
    setWishListCount(wishListCount - 1);
    toast.success(res.message, {
      id: "wishlist",
    });
  };
  const { mutate } = useWishListDelete();
  const deleteWishlistItem = (id) => {
    mutate(id, {
      onSuccess: onSuccessHandlerForDelete,
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  };
  useEffect(() => {}, [wishListCount]);

  const handleVariationAvailability = (checkFor,cartItem) => {
    if (productDetailsData?.selectedOption?.length > 0) {
      if (productDetailsData?.selectedOption?.[0]?.stock === 0) {
        variationErrorToast();
      } else {
        checkFor === "add" ? addToCard() : handleUpdateToCart(cartItem);
      }
    } else {
      checkFor === "add" ? addToCard() : handleUpdateToCart(cartItem);
    }
  };

  const handleWishlist = () => (
    <>
      {isInWishList(productDetailsData?.id) && (
        <Button
          variant="outlined"
          onClick={() => deleteWishlistItem(productDetailsData?.id)}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <FavoriteIcon />
            <Typography>{wishListCount}</Typography>
          </Stack>
        </Button>
      )}
      {!isInWishList(productDetailsData?.id) && (
        <Button variant="outlined" onClick={addToFavorite}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FavoriteBorderOutlinedIcon />
            <Typography>{wishListCount}</Typography>
          </Stack>
        </Button>
      )}
    </>
  );

  const actionsHandler = () => (
    <BottomStack direction="row" width="100%" gap={2.5}>
      {productDetailsData?.stock > 0 && isVariationAvailable() ? (
        <PrimaryButton
          onClick={() => handleRedirectToCheckoutClick()}
          sx={{
            backgroundColor: theme.palette.customColor.buyButton,
            color: "black",
            width: {
              xs: "100%",
              sm: productDetailsData?.isCampaignItem ? "100%" : 200,
            },
            "&:hover": {
              color: "black",
              backgroundColor: alpha(theme.palette.customColor.buyButton, 0.8),
            },
          }}
        >
          {productDetailsData?.isCampaignItem ? t("Order Now") : t("Buy Now")}
        </PrimaryButton>
      ) : (
        <PrimaryButton
          onClick={() => handleRedirectToCheckoutClick()}
          sx={{
            backgroundColor: theme.palette.customColor.buyButton,
            color: "black",
            width: "100%",
          }}
          disabled={productDetailsData?.stock === 0 || !isVariationAvailable()}
        >
          <Typography
            color={alpha(theme.palette.neutral[100], 0.7)}
            variant="h6"
          >
            {t("Out of Stock")}
          </Typography>
        </PrimaryButton>
      )}
      {!productDetailsData?.isCampaignItem && (
        <>
          {!isInCart(productDetailsData?.id) &&
            productDetailsData?.stock > 0 &&
            isVariationAvailable() && (
              <PrimaryButton
                onClick={() => handleVariationAvailability("add")}
                sx={{ width: 200, fontSize: { xs: "12px", md: "14px" } }}
                disabled={productDetailsData?.stock === 0}
              >
                {isLoading ? <Loading /> : t("Add to Cart")}
              </PrimaryButton>
            )}
          {isInCart(productDetailsData?.id) && (
            <PrimaryButton
              onClick={() => handleVariationAvailability("update",isInCart(productDetailsData?.id))}
              sx={{ width: 200, fontSize: { xs: "12px", md: "14px" } }}
            >
              {updateIsLoading ? <Loading/> : t("Update To Cart")}

            </PrimaryButton>
          )}
        </>
      )}
    </BottomStack>
  );
  const handleUnavailability = () => (
    <Stack spacing={2}>
      {getCurrentModuleType() !== "ecommerce" && (
        <NotAvailableCard
          endTime={productDetailsData?.available_time_ends}
          startTime={productDetailsData?.available_time_starts}
          moduleType={productDetailsData?.module?.module_type}
        />
      )}
      {productDetailsData?.schedule_order && <>{actionsHandler()}</>}
    </Stack>
  );

  // here unavailability checking is not necessary for modules except food , food modules also don't have details page

  return <>{actionsHandler()}</>;
};

export default ProductInformationBottomSection;
