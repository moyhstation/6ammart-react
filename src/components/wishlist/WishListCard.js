import React, { useEffect, useReducer, useState } from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import CustomImageContainer from "../CustomImageContainer";
import { Stack } from "@mui/system";
import { IconButton, Typography } from "@mui/material";
import deleteIcon from "../../assets/delete.png";
import {
  getAmountWithSign,
  getDiscountedAmount,
} from "../../helper-functions/CardHelpers";
import CartIcon from "../added-cart-view/assets/CartIcon";
import { useTheme } from "@emotion/react";
import { CustomIconButton } from "../../styled-components/CustomButtons.style";
import CustomDivider from "../CustomDivider";
import { useDispatch, useSelector } from "react-redux";
import { getCartListModuleWise } from "../../helper-functions/getCartListModuleWise";
import { setCart } from "../../redux/slices/cart";
import toast from "react-hot-toast";
import {
  ACTION,
  initialState,
  reducer,
} from "../product-details/product-details-section/states";
import { getModuleId } from "../../helper-functions/getModuleId";
import { useRouter } from "next/router";
import { t } from "i18next";
import CustomDialogConfirm from "../custom-dialog/confirm/CustomDialogConfirm";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import FoodDetailModal from "../food-details/foodDetail-modal/FoodDetailModal";
import ModuleModal from "../cards/ModuleModal";
import { addWishList, removeWishListItem } from "../../redux/slices/wishList";
import { not_logged_in_message } from "../../utils/toasterMessages";
import { useAddToWishlist } from "../../api-manage/hooks/react-query/wish-list/useAddWishList";
import { useWishListDelete } from "../../api-manage/hooks/react-query/wish-list/useWishListDelete";
import AmountWithDiscountedAmount from "../AmountWithDiscountedAmount";
import CartClearModal from "../product-details/product-details-section/CartClearModal";
import CustomModal from "../modal";
import {getGuestId} from "../../helper-functions/getToken";
import {onErrorResponse} from "../../api-manage/api-error-response/ErrorResponses";
import useAddCartItem from "../../api-manage/hooks/react-query/add-cart/useAddCartItem";
import Loading from "../custom-loading/Loading";

const WishListCard = ({ item }) => {
  const theme = useTheme();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const reduxDispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { configData } = useSelector((state) => state.configData);
  const imageBaseUrl = configData?.base_urls?.item_image_url;
  const { cartList: aliasCartList } = useSelector((state) => state.cart);
  const cartList = getCartListModuleWise(aliasCartList);
  const { mutate: addFavoriteMutation } = useAddToWishlist();
  const { wishLists } = useSelector((state) => state.wishList);
  const { mutate } = useWishListDelete();
  const router = useRouter();
  const isInCart = cartList?.find((things) => things.id === item?.id);
  const { mutate: addToMutate, isLoading } = useAddCartItem();
  const handleClose = () => {
    setOpenItemModal(false);
  };
  const handleCloseCart = () => {
    dispatch({ type: ACTION.setOpenModal, payload: false });
  };

  const handleClearCartModalOpen = () =>
    dispatch({ type: ACTION.setClearCartModal, payload: true });
  const handleCloseForClearCart = (value) => {
    if (value === "add-item") {
      reduxDispatch(
        setCart({
          ...state.modalData[0],
          selectedOption: [],
        })
      );
      dispatch({ type: ACTION.setClearCartModal, payload: false });
    } else {
      dispatch({ type: ACTION.setClearCartModal, payload: false });
    }
  };
  useEffect(() => {
    if (item) {
      dispatch({
        type: ACTION.setModalData,
        payload: {
          ...item,
          quantity: 1,
          price: item?.price,
          totalPrice: item?.price,
        },
      });
    }
  }, [item]);
  const handleSuccess = (res) => {
    if (res) {
      let product = {};
      res?.forEach((item) => {
        product = {
          ...item?.item,
          cartItemId: item?.id,
          quantity: item?.quantity,
          totalPrice: item?.price,
          selectedOption: [],
        };
      });
      reduxDispatch(setCart(product));
      toast.success(t("Item added to cart"));
      dispatch({ type: ACTION.setClearCartModal, payload: false });
    }
  };
  const addToCartHandler = () => {
    if (cartList.length > 0) {
      const isStoreExist = cartList.find(
          (item) => item?.store_id === state?.modalData[0]?.store_id
      );

      // getDiscountedAmount(
      //     state?.modalData[0]?.price,
      //     state?.modalData[0]?.discount,
      //     state?.modalData[0]?.discount_type,
      //     state?.modalData[0]?.store_discount,
      //     state?.modalData[0]?.quantity
      // )
      if (isStoreExist) {
        const itemObject = {
          guest_id: getGuestId(),
          model: state.modalData[0]?.available_date_starts
              ? "ItemCampaign"
              : "Item",
          add_on_ids: [],
          add_on_qtys: [],
          item_id: state.modalData[0]?.id,
          price: state?.modalData[0]?.price,
          quantity: state?.modalData[0]?.quantity,
          variation: [],
        };
        addToMutate(itemObject, {
          onSuccess: handleSuccess,
          onError: onErrorResponse,
        });
      } else {
        if (cartList.length !== 0) {
          handleClearCartModalOpen();
        }
      }
    } else {
      const itemObject = {
        guest_id: getGuestId(),
        model: state.modalData[0]?.available_date_starts
            ? "ItemCampaign"
            : "Item",
        add_on_ids: [],
        add_on_qtys: [],
        item_id: state.modalData[0]?.id,
        price: state?.modalData[0]?.price,
        quantity: state?.modalData[0]?.quantity,
        variation: [],
      };
      addToMutate(itemObject, {
        onSuccess: handleSuccess,
        onError: onErrorResponse,
      });
    }
  };
  const addToCart = (e) => {
    if (item?.module_type === "ecommerce") {
      if (item?.variations.length > 0) {
        router.push(
          {
            pathname: "/product/[id]",
            query: {
              id: `${item?.slug ? item?.slug : item?.id}`,
              module_id: `${getModuleId()}`,
            },
          },
          undefined,
          { shallow: true }
        );
      } else {
        e.stopPropagation();
        addToCartHandler();
      }
    } else {
      if (item?.food_variations.length > 0 || item?.variations.length > 0) {
        setOpenItemModal(true);
      } else {
        e.stopPropagation();
        addToCartHandler();
      }
    }
  };
  const handleClick = () => {
    if (item?.module_type === "ecommerce") {
      router.push(
        {
          pathname: "/product/[id]",
          query: {
            id: `${item?.slug ? item?.slug : item?.id}`,
            module_id: `${getModuleId()}`,
          },
        },
        undefined,
        { shallow: true }
      );
    } else {
      setOpenItemModal(true);
    }
  };

  const addToWishlistHandler = (e) => {
    e.stopPropagation();
    let token = undefined;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    if (token) {
      addFavoriteMutation(item?.id, {
        onSuccess: (response) => {
          if (response) {
            reduxDispatch(addWishList(item));
            setIsWishlisted(true);
            toast.success(response?.message);
          }
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      });
    } else toast.error(t(not_logged_in_message));
  };
  const removeFromWishlistHandler = (e) => {
    const onSuccessHandlerForDelete = (res) => {
      reduxDispatch(removeWishListItem(item?.id));
      setIsWishlisted(false);
      toast.success(res.message, {
        id: "wishlist",
      });
    };
    mutate(item?.id, {
      onSuccess: onSuccessHandlerForDelete,
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  };
  useEffect(() => {
    wishlistItemExistHandler();
  }, [wishLists]);
  const wishlistItemExistHandler = () => {
    if (wishLists?.item?.find((wishItem) => wishItem.id === item?.id)) {
      setIsWishlisted(true);
    } else {
      setIsWishlisted(false);
    }
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    setOpenModal(true);
  };
  return (
    <>
      <CustomStackFullWidth
        direction="row"
        sx={{ marginTop: "1rem", cursor: "pointer" }}
        gap="10px"
        onClick={handleClick}
      >
        <CustomImageContainer
          src={`${imageBaseUrl}/${item?.image}`}
          width="60px"
          height="60px"
          borderRadius="5px"
        />
        <Stack width="0px" flexGrow="1" justifyContent="center" spacing={0.5}>
          <Typography fontWeight="500" fontSize="14px">
            {item?.name}
          </Typography>
          <AmountWithDiscountedAmount item={item} />
          <Typography fontWeight="500" fontSize="16px"></Typography>
        </Stack>
        <Stack direction="row" gap="20px" alignSelf="center">
          <CustomIconButton onClick={(e) => addToCart(e)}>
            {isLoading?<Loading/>: <CartIcon
                width="18px"
                height="18px"
                color={theme.palette.primary.dark}
            />}

          </CustomIconButton>
          <IconButton onClick={(e) => handleDelete(e)}>
            <CustomImageContainer
              src={deleteIcon.src}
              width="18px"
              height="18px"
            />
          </IconButton>
        </Stack>
      </CustomStackFullWidth>
      <CustomDivider paddingTop="1rem" width="100%" />
      {openItemModal && getCurrentModuleType() === "food" ? (
        <FoodDetailModal
          product={item}
          imageBaseUrl={imageBaseUrl}
          open={openItemModal}
          handleModalClose={handleClose}
          //setOpen={openItemModal}
          addToWishlistHandler={addToWishlistHandler}
          removeFromWishlistHandler={removeFromWishlistHandler}
          isWishlisted={isWishlisted}
        />
      ) : (
        <ModuleModal
          open={openItemModal}
          handleModalClose={handleClose}
          configData={configData}
          productDetailsData={item}
          addToWishlistHandler={addToWishlistHandler}
          removeFromWishlistHandler={removeFromWishlistHandler}
          isWishlisted={isWishlisted}
        />
      )}
      <CustomDialogConfirm
        dialogTexts={t("Are you sure you want to  delete this item?")}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={removeFromWishlistHandler}
      />
      <CustomModal
        openModal={state.clearCartModal}
        handleClose={handleCloseCart}
      >
        <CartClearModal
          dispatchRedux={reduxDispatch}
          handleClose={handleCloseForClearCart}
          addToCard={addToCartHandler}
        />
      </CustomModal>
    </>
  );
};

export default WishListCard;