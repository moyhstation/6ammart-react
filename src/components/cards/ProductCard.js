import DeleteIcon from "@mui/icons-material/Delete";
import {
  Card,
  CardMedia,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import {
  setCart,
  setDecrementToCartItem,
  setIncrementToCartItem,
  setRemoveItemFromCart,
} from "../../redux/slices/cart";
import { CustomButtonPrimary } from "../../styled-components/CustomButtons.style";
import {
  CustomBoxFullWidth,
  CustomSpan,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { textWithEllipsis } from "../../styled-components/TextWithEllipsis";
import CustomImageContainer from "../CustomImageContainer";
import FoodDetailModal from "../food-details/foodDetail-modal/FoodDetailModal";
import {
  ACTION,
  initialState,
  reducer,
} from "../product-details/product-details-section/states";
import CustomBadge from "./CustomBadge";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAddToWishlist } from "../../api-manage/hooks/react-query/wish-list/useAddWishList";
import { useWishListDelete } from "../../api-manage/hooks/react-query/wish-list/useWishListDelete";
import { getCartListModuleWise } from "../../helper-functions/getCartListModuleWise";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { getModuleId } from "../../helper-functions/getModuleId";
import { ModuleTypes } from "../../helper-functions/moduleTypes";
import { addWishList, removeWishListItem } from "../../redux/slices/wishList";
import { getConvertDiscount, getTotalVariationsPrice, isAvailable } from "../../utils/CustomFunctions";
import {
  cart_item_remove,
  not_logged_in_message,
  out_of_limits,
  out_of_stock,
} from "../../utils/toasterMessages";
import AmountWithDiscountedAmount from "../AmountWithDiscountedAmount";
import CustomMultipleRatings from "../CustomMultipleRatings";
import CustomDialogConfirm from "../custom-dialog/confirm/CustomDialogConfirm";
import { HeartWrapper } from "../home/stores-with-filter/cards-grid/StoresInfoCard";
import CustomModal from "../modal";
import CartClearModal from "../product-details/product-details-section/CartClearModal";
import Body2 from "../typographies/Body2";
import H3 from "../typographies/H3";
import AddWithIncrementDecrement from "./AddWithIncrementDecrement";
import { CustomOverLay } from "./Card.style";
import ModuleModal from "./ModuleModal";
import ProductsUnavailable from "./ProductsUnavailable";
import QuickView from "./QuickView";
import SpecialCard, { FoodVegNonVegFlag } from "./SpecialCard";
import MoreFromTheStoreCard from "./MoreFromTheStoreCard";
import { t } from "i18next";
import { getLanguage } from "../../helper-functions/getLanguage";
import CustomLinearProgressbar from "../linear-progressbar";
import useAddCartItem from "../../api-manage/hooks/react-query/add-cart/useAddCartItem";
import {
  getItemDataForAddToCart, getPriceAfterQuantityChange,
  handleValuesFromCartItems,
} from "../product-details/product-details-section/helperFunction";
import { onErrorResponse } from "../../api-manage/api-error-response/ErrorResponses";
import { getGuestId } from "../../helper-functions/getToken";
import useCartItemUpdate from "../../api-manage/hooks/react-query/add-cart/useCartItemUpdate";
import useDeleteCartItem from "../../api-manage/hooks/react-query/add-cart/useDeleteCartItem";

export const CardWrapper = styled(Card)(
  ({
    theme,
    cardheight,
    horizontalcard,
    wishlistcard,
    nomargin,
    cardType,
    cardFor,
    cardWidth,
  }) => ({
    cursor: "pointer",
    maxWidth:
      cardFor === "list-view"
        ? "100%"
        : horizontalcard === "true"
          ? "440px"
          : "320px",
    width:
      cardType === "vertical-type" || cardType === "list-view"
        ? "100%"
        : horizontalcard === "true" && "440px",
    margin:
      wishlistcard === "true"
        ? "0rem"
        : nomargin === "true"
          ? "0rem"
          : cardType === "vertical-type"
            ? "0rem"
            : ".7rem",
    borderRadius: "8px",
    height: cardheight ? cardheight : "220px",
    border:
      getCurrentModuleType() === ModuleTypes.FOOD &&
      `1px solid ${alpha(theme.palette.moduleTheme.food, 0.1)}`,

    "&:hover": {
      boxShadow: "5px 0px 20px rgba(0, 54, 85, 0.15)",
      img: {
        transform: "scale(1.1)",
      },
    },
    ".MuiTypography-subtitle1, .name": {
      transition: "all ease 0.5s",
    },
    "&:hover .MuiTypography-subtitle1, &:hover .name": {
      color: theme.palette.primary.main,
      letterSpacing: "0.02em",
    },
    [theme.breakpoints.down("sm")]: {
      height:
        horizontalcard !== "true" ? "320px" : cardheight ? "130px" : "150px",
      width:
        horizontalcard === "true"
          ? cardFor === "list-view"
            ? "100%"
            : cardWidth
              ? cardWidth
              : "300px"
          : "100%",
      margin:
        wishlistcard === "true"
          ? "0rem"
          : nomargin === "true"
            ? "0rem"
            : ".4rem",
    },
    [theme.breakpoints.up("sm")]: {
      height: cardheight ? cardheight : "330px",
      //paddingBottom: horizontalcard === "true" && "10px",
    },
    [theme.breakpoints.up("md")]: {
      height: cardheight ? cardheight : "350px",
    },
  })
);
const CustomCardMedia = styled(CardMedia)(
  ({ theme, horizontalcard, loveItem }) => ({
    position: "relative",
    //overflow: "hidden",
    padding: loveItem === "true" ? "2px" : "1rem",
    margin: "2px",
    //borderRadius: horizontalcard === "true" ? "0x 10px" : "10px 10px 0 0",
    height: horizontalcard === "true" ? "100%" : "212px",
    width: horizontalcard === "true" && "215px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "5px",
    ".MuiBox-root": {
      overflow: "hidden",
      borderRadius: "5px",
    },
    backgroundColor:
      horizontalcard === "true" ? theme.palette.neutral[100] : "none",

    [theme.breakpoints.down("sm")]: {
      width: horizontalcard === "true" ? "160px" : "100%",
      height: horizontalcard === "true" ? "135px" : "175px",
    },
  })
);
export const CustomCardButton = styled(CustomButtonPrimary)(
  ({ theme, disabled }) => ({
    background: disabled
      ? alpha(theme.palette.secondary.light, 0.3)
      : theme.palette.secondary.light,
  })
);

const ProductCard = (props) => {
  const {
    loveItem,
    item,
    cardheight,
    horizontalcard,
    changed_bg,
    wishlistcard,
    deleteWishlistItem,
    cardFor,
    noMargin,
    cardType,
    specialCard,
    fromStore,
    cardWidth,
    sold,
    stock,
  } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const [openModal, setOpenModal] = React.useState(false);
  const { selectedModule } = useSelector((state) => state.utilsData);
  const { configData } = useSelector((state) => state.configData);
  const [isHover, setIsHover] = useState(false);
  const imageBaseUrl = configData?.base_urls?.item_image_url;
  const router = useRouter();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const reduxDispatch = useDispatch();
  const { cartList: aliasCartList } = useSelector((state) => state.cart);
  const cartList = getCartListModuleWise(aliasCartList);
  const classes = textWithEllipsis();
  const { t } = useTranslation();
  const p_off = t("%");
  const off = t("Off");
  const { wishLists } = useSelector((state) => state.wishList);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { mutate: addFavoriteMutation } = useAddToWishlist();
  const { mutate } = useWishListDelete();
  const [isProductExist, setIsProductExist] = useState(false);
  const [count, setCount] = useState(0);
  const { mutate: addToMutate, isLoading } = useAddCartItem();
  const { mutate: updateMutate, isLoading: updateLoading } =
    useCartItemUpdate();
  const { mutate: cartItemRemoveMutate } = useDeleteCartItem();
  useEffect(() => {
    const isInCart = getItemFromCartlist();
    if (isInCart) {
      setIsProductExist(true);
      setCount(isInCart?.quantity);
    } else {
      setIsProductExist(false);
    }
  }, [aliasCartList]);

  const getItemFromCartlist = () => {
    const cartList = getCartListModuleWise(aliasCartList);
    return cartList?.find((things) => things.id === item?.id);
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

  useEffect(() => { }, [state.clearCartModal]);
  const handleClearCartModalOpen = () =>
    dispatch({ type: ACTION.setClearCartModal, payload: true });
  const handleCloseForClearCart = (value) => {
    if (value === "add-item") {
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
      dispatch({ type: ACTION.setClearCartModal, payload: false });
    }
  };
  const handleBadge = () => {
    if (Number.parseInt(item?.store_discount) === 0) {
      if (Number.parseInt(item?.discount) > 0) {
        if (item?.discount_type === "percent") {
          return <CustomBadge top={10} text={`${item?.discount}${p_off}`} />;
        } else {
          return (
            <CustomBadge
              top={10}
              text={`${getAmountWithSign(item?.discount)}`}
            />
          );
        }
      }
    } else {
      if (Number.parseInt(item?.store_discount) > 0) {
        return (
          <CustomBadge top={10} text={`${item?.store_discount}${p_off}`} />
        );
      }
    }
  };
  const handleClick = () => {
    if (item?.module_type === "ecommerce") {
      router.push({
        pathname: "/product/[id]",
        query: {
          id: `${item?.slug ? item?.slug : item?.id}`,
          module_id: `${getModuleId()}`,
        },
      });
    } else {
      dispatch({ type: ACTION.setOpenModal, payload: true });
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
  const isInCart = cartList?.find((things) => things.id === item?.id);
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
        if (!isInCart) {
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
      } else {
        if (cartList.length !== 0) {
          handleClearCartModalOpen();
        }
      }
    } else {
      if (!isInCart) {
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
          }
        );
      } else {
        e.stopPropagation();
        addToCartHandler();
      }
    } else {
      if (item?.module_type === "food") {
        if (item?.food_variations?.length > 0) {
          dispatch({ type: ACTION.setOpenModal, payload: true });
        } else {
          e.stopPropagation();
          addToCartHandler();
        }
      } else if (item?.variations?.length > 0) {
        dispatch({ type: ACTION.setOpenModal, payload: true });
      } else {
        e.stopPropagation();
        addToCartHandler();
      }
    }
  };

  const quickViewHandleClick = (e) => {
    e.stopPropagation();
    dispatch({ type: ACTION.setOpenModal, payload: true });
  };
  const handleDisableButton = () => {
    if (getCurrentModuleType() !== "food") {
      if (item?.stock === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        !isAvailable(item?.available_time_starts, item?.available_time_ends)
      ) {
        if (item?.schedule_order) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  };
  const cartUpdateHandleSuccess = (res) => {
    if (res) {
      res?.forEach((item) => {
        if (isInCart?.cartItemId === item?.id) {
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

          reduxDispatch(setIncrementToCartItem(product)); // Dispatch the single product
        }
      });
    }
  };
  const cartUpdateHandleSuccessDecrement = (res) => {
    if (res) {
      res?.forEach((item) => {
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
        reduxDispatch(setDecrementToCartItem(product));
      });
    }
  };
  const handleIncrement = () => {
    const isExisted = getItemFromCartlist();
    const updateQuantity = isInCart?.quantity + 1;
    const itemObject = getItemDataForAddToCart(isInCart, updateQuantity, getPriceAfterQuantityChange(isInCart, updateQuantity), getGuestId());
    if (isExisted) {
      if (getCurrentModuleType() === "food") {
        if (item?.maximum_cart_quantity) {
          if (item?.maximum_cart_quantity <= isExisted?.quantity) {
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
      } else {
        if (isExisted?.quantity + 1 <= item?.stock) {
          if (item?.maximum_cart_quantity) {
            if (item?.maximum_cart_quantity <= isExisted?.quantity) {
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
            reduxDispatch(setIncrementToCartItem(isInCart));
          }
        } else {
          toast.error(t(out_of_stock));
        }
      }
    }
  };
  const handleClose = () => {
    dispatch({ type: ACTION.setOpenModal, payload: false });
  };

  const handleSuccessRemoveItem = () => {
    reduxDispatch(setRemoveItemFromCart(isInCart));
    toast.success(t("Removed from cart."));
  };
  const handleDecrement = () => {
    const updateQuantity = isInCart?.quantity - 1;

    const isExisted = getItemFromCartlist();
    if (isExisted?.quantity === 1) {
      const cartIdAndGuestId = {
        cart_id: isInCart?.cartItemId,
        guestId: getGuestId(),
      };
      cartItemRemoveMutate(cartIdAndGuestId, {
        onSuccess: handleSuccessRemoveItem,
        onError: onErrorResponse,
      });
    } else {
      const itemObject = getItemDataForAddToCart(isInCart, updateQuantity, getPriceAfterQuantityChange(isInCart, updateQuantity), getGuestId());
      updateMutate(itemObject, {
        onSuccess: cartUpdateHandleSuccessDecrement,
        onError: onErrorResponse,
      });
    }
  };
  const lanDirection = getLanguage() ? getLanguage() : "ltr";
  const popularCardUi = () => {
    return (
      <CustomStackFullWidth
        justifyContent="center"
        alignItems="flex-start"
        sx={{ position: "relative", padding: "13px 10px 13px 13px" }}
      >
        {isWishlisted && (
          <Box
            sx={{
              color: "primary.main",
              position: "absolute",
              top: 20,
              right: 10,
            }}
          >
            <FavoriteIcon sx={{ fontSize: "15px" }} />
          </Box>
        )}

        <Typography
          variant={horizontalcard === "true" ? "subtitle2" : "h6"}
          marginBottom="4px"
          sx={{
            textAlign: lanDirection === "rtl" && "end",
            color: (theme) => theme.palette.text.custom,
            fontSize: { xs: "13px", sm: "inherit" },
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            height: "36px",
            mt: "5px",
            width: "210px",
            [theme.breakpoints.down("sm")]: {
              width: "146px",
            },
          }}
          className="name"
        >
          {item?.name}
        </Typography>
        <Stack mt="5px">
          <Typography variant={isSmall ? "body3" : "subtitle2"}>
            {t("start from")}
          </Typography>
          <Typography variant={isSmall ? "h7" : "h5"}>
            {getAmountWithSign(item?.price)}
          </Typography>
        </Stack>
        <CustomStackFullWidth
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={2}
          mb="3px"
        >
          <Typography
            mt="4px"
            color="text.secondary"
            variant={isSmall ? "body2" : "body1"}
          >
            {item?.unit_type}
          </Typography>
          <AddWithIncrementDecrement
            onHover={state.isTransformed}
            addToCartHandler={addToCart}
            isProductExist={isProductExist}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            count={count}
            isLoading={isLoading}
            updateLoading={updateLoading}
          />
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    );
  };

  const listViewCardUi = () => {
    return (
      <CustomStackFullWidth
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={1.5}
        p="1rem"
      >
        {isWishlisted && (
          <Box
            sx={{
              color: "primary.main",
              position: "absolute",
              top: 20,
              right: 10,
            }}
          >
            <FavoriteIcon sx={{ fontSize: "15px" }} />
          </Box>
        )}

        <CustomBoxFullWidth sx={{ mt: "15px" }}>
          <Body2 text={item?.store_name} />
        </CustomBoxFullWidth>
        <H3 text={item?.name} />
        {item?.unit_type ? (
          <Typography
            sx={{ color: (theme) => theme.palette.customColor.textGray }}
          >
            {item?.unit_type}
          </Typography>
        ) : (
          <Typography
            sx={{ color: (theme) => theme.palette.customColor.textGray }}
          >
            {t("No unit type")}
          </Typography>
        )}

        <CustomStackFullWidth
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={2}
          sx={{ pb: "15px" }}
        >
          <AmountWithDiscountedAmount item={item} />
          <AddWithIncrementDecrement
            onHover={state.isTransformed}
            addToCartHandler={addToCart}
            isProductExist={isProductExist}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            count={count}
            isLoading={isLoading}
            updateLoading={updateLoading}
          />
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    );
  };
  const foodHorizontalCardUi = () => {
    return (
      <CustomStackFullWidth
        justifyContent="center"
        alignItems="flex-start"
        sx={{ position: "relative", padding: "13px 10px 13px 13px" }}
      >
        {isWishlisted && (
          <Box
            sx={{
              color: "primary.main",
              position: "absolute",
              top: 20,
              right: 10,
            }}
          >
            <FavoriteIcon sx={{ fontSize: "15px" }} />
          </Box>
        )}
        {/* <CustomStackFullWidth> */}
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={0.8}
        >
          <Typography
            variant={horizontalcard === "true" ? "subtitle2" : "h6"}
            marginBottom="4px"
            sx={{
              color: (theme) => theme.palette.text.custom,
              fontSize: { xs: "13px", sm: "inherit" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              lineHeight: "1.2", // Adjust this value to control line height
              mt: "5px",
            }}
            className="name"
          >
            {item?.name}
          </Typography>
          <FoodVegNonVegFlag veg={item?.veg === 0 ? "false" : "true"} />
        </CustomStackFullWidth>
        <Typography
          // mt="10px"
          color="text.secondary"
          variant={isSmall ? "body2" : "body1"}
        >
          {item?.store_name}
        </Typography>
        {/* </CustomStackFullWidth> */}
        <CustomStackFullWidth
          direction="row"
          alignItems="flex-start"
          // justifyContent="space-between"
          spacing={13}
          mb="3px"
          mt="10px"
        >
          <AmountWithDiscountedAmount item={item} />
        </CustomStackFullWidth>
        <CustomStackFullWidth
          alignItems="flex-end"
          sx={{ paddingRight: "6px" }}
        >
          <Box>
            <AddWithIncrementDecrement
              onHover={state.isTransformed}
              addToCartHandler={addToCart}
              isProductExist={isProductExist}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              count={count}
              isLoading={isLoading}
              updateLoading={updateLoading}
            />
          </Box>
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    );
  };

  const verticalCardUi = () => {
    return (
      <CustomStackFullWidth
        justifyContent="center"
        alignItems="center"
        spacing={1.5}
        p="1rem"
      >
        <Body2 text={item?.store_name} />
        <H3 text={item?.name} />
        <CustomStackFullWidth
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
        >
          {cardType === "vertical-type" ? (
            <Typography>{item?.unit_type}</Typography>
          ) : (
            <CustomMultipleRatings rating={4.5} withCount />
          )}

          <AmountWithDiscountedAmount item={item} />
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    );
  };
  const verticalCardFlashUi = () => {
    return (
      <CustomStackFullWidth
        justifyContent="center"
        alignItems="center"
        spacing={1.5}
        p="1rem"
      >
        <Body2 text={item?.store_name} />
        <H3 text={item?.name} />
        <CustomStackFullWidth
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
        >
          {cardType === "vertical-type" ? (
            <Typography>{item?.unit_type}</Typography>
          ) : (
            <CustomMultipleRatings rating={4.5} withCount />
          )}

          {stock === 0 ? (
            <Typography
              variant="h5"
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              gap="5px"
              sx={{
                fontSize: { xs: "13px", sm: "18px" },
                color: alpha(theme.palette.error.deepLight, 0.7),
              }}
            >{t("Out of Stock")}</Typography>
          ) : (

            <AmountWithDiscountedAmount item={item} />
          )}
          <CustomStackFullWidth mt="100px" spacing={1}>
            <CustomLinearProgressbar value={(sold / stock) * 100} height={3} />
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontWeight="bold" lineHeight="28px" variant="body2">
                <CustomSpan>{t("Sold")}</CustomSpan> : {sold} {t("items")}
              </Typography>
              <Typography fontWeight="bold" lineHeight="28px" variant="body2">
                <CustomSpan>{t("Available")}</CustomSpan> : {stock} {t("items")}
              </Typography>
            </CustomStackFullWidth>
          </CustomStackFullWidth>
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    );
  };
  const verticalCardFlashSliderUi = () => {
    return (
      <CustomStackFullWidth
        justifyContent="center"
        alignItems="center"
        spacing={1.5}
        p="1rem"
      >
        <Body2 text={item?.store_name} />
        <H3 text={item?.name} />
        <CustomStackFullWidth
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
        >
          {cardType === "vertical-type" ? (
            <Typography>{item?.unit_type}</Typography>
          ) : (
            <CustomMultipleRatings rating={4.5} withCount />
          )}

          <AmountWithDiscountedAmount item={item} />
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    );
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
    e.stopPropagation();
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

  const handleHoverOnCartIcon = (value) => {
    dispatch({ type: ACTION.setIsTransformed, payload: value });
  };

  return (
    <Stack sx={{ position: "relative" }}>
      {state.openModal && getCurrentModuleType() === "food" ? (
        <FoodDetailModal
          product={item}
          imageBaseUrl={imageBaseUrl}
          open={state.openModal}
          handleModalClose={handleClose}
          setOpen={(value) =>
            dispatch({ type: ACTION.setOpenModal, payload: value })
          }
          addToWishlistHandler={addToWishlistHandler}
          removeFromWishlistHandler={removeFromWishlistHandler}
          isWishlisted={isWishlisted}
        />
      ) : (
        <>{cardFor === "flashSale" ? (
          <>{stock !== 0 &&
            <ModuleModal
              open={state.openModal}
              handleModalClose={handleClose}
              configData={configData}
              productDetailsData={item}
              addToWishlistHandler={addToWishlistHandler}
              removeFromWishlistHandler={removeFromWishlistHandler}
              isWishlisted={isWishlisted}
            />
          }</>
        ) : (
          <ModuleModal
            open={state.openModal}
            handleModalClose={handleClose}
            configData={configData}
            productDetailsData={item}
            addToWishlistHandler={addToWishlistHandler}
            removeFromWishlistHandler={removeFromWishlistHandler}
            isWishlisted={isWishlisted}
          />
        )

        }
        </>

      )}
      {wishlistcard === "true" && (
        <HeartWrapper onClick={() => setOpenModal(true)} top="5px" right="5px">
          <DeleteIcon style={{ color: theme.palette.error.light }} />
        </HeartWrapper>
      )}

      {specialCard === "true" ? (
        <SpecialCard
          item={item}
          imageBaseUrl={imageBaseUrl}
          quickViewHandleClick={quickViewHandleClick}
          addToCart={addToCart}
          handleBadge={handleBadge}
          addToCartHandler={addToCart}
          isProductExist={isProductExist}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          count={count}
          handleClick={handleClick}
          isLoading={isLoading}
          updateLoading={updateLoading}
        />
      ) : (
        <CardWrapper
          cardFor={cardFor}
          cardType={cardType}
          nomargin={noMargin ? "true" : "false"}
          cardheight={cardheight}
          horizontalcard={horizontalcard}
          wishlistcard={wishlistcard}
          cardWidth={cardWidth}
          onClick={() => handleClick()}
          onMouseEnter={() =>
            dispatch({ type: ACTION.setIsTransformed, payload: true })
          }
          onMouseDown={() =>
            dispatch({ type: ACTION.setIsTransformed, payload: true })
          }
          onMouseLeave={() =>
            dispatch({ type: ACTION.setIsTransformed, payload: false })
          }
        >
          <CustomStackFullWidth
            direction={{
              xs: horizontalcard === "true" ? "row" : "column",
              sm: horizontalcard === "true" ? "row" : "column",
            }}
            justifyContent="flex-start"
            height="100%"
            sx={{
              backgroundColor:
                horizontalcard === "true" &&
                changed_bg === "true" &&
                "primary.semiLight",
              position: "relative",
            }}
          >
            <CustomCardMedia
              horizontalcard={horizontalcard}
              loveItem={loveItem}
            >
              {handleBadge()}
              <CustomImageContainer
                src={`${imageBaseUrl}/${item?.image}`}
                alt={item?.title}
                height="100%"
                width="100%"
                objectfit="cover"
                borderRadius="3px"
              />
              {item?.module?.module_type === "food" && (
                <ProductsUnavailable product={item} />
              )}
              
              <CustomOverLay hover={state.isTransformed} border_radius="10px">
                <QuickView
                  quickViewHandleClick={quickViewHandleClick}
                  addToWishlistHandler={addToWishlistHandler}
                  removeFromWishlistHandler={removeFromWishlistHandler}
                  isWishlisted={isWishlisted}
                  isProductExist={isProductExist}
                  addToCartHandler={addToCart}
                  showAddtocart={cardFor === "vertical" && !isProductExist}
                  isLoading={isLoading}
                />
              </CustomOverLay>
              {cardFor === "vertical" && isProductExist && (
                <Box
                  sx={{
                    position: "absolute",
                    right: 10,
                    bottom: 0,
                    zIndex: 999,
                  }}
                >
                  <AddWithIncrementDecrement
                    verticalCard
                    onHover={state.isTransformed}
                    addToCartHandler={addToCart}
                    isProductExist={isProductExist}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    setIsHover={handleHoverOnCartIcon}
                    count={count}
                    updateLoading={updateLoading}
                  />
                </Box>
              )}
            </CustomCardMedia>
            <CustomStackFullWidth justifyContent="center">
              {cardFor === "popular items" && popularCardUi()}
              {cardFor === "vertical" && verticalCardUi()}
              {cardFor === "flashSale" && verticalCardFlashUi()}
              {cardFor === "flashSaleSlider" && verticalCardFlashSliderUi()}
              {cardFor === "food horizontal card" && foodHorizontalCardUi()}
              {cardFor === "list-view" && listViewCardUi()}
            </CustomStackFullWidth>
          </CustomStackFullWidth>
        </CardWrapper>
      )}

      <CustomModal openModal={state.clearCartModal} handleClose={handleClose}>
        <CartClearModal
          handleClose={handleCloseForClearCart}
          dispatchRedux={reduxDispatch}
          addToCard={addToCartHandler}
        />
      </CustomModal>
      <CustomDialogConfirm
        dialogTexts={t("Are you sure you want to  delete this item?")}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => deleteWishlistItem(item?.id)}
      />
    </Stack>
  );
};

ProductCard.propTypes = {};

export default ProductCard;
