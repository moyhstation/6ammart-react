import React, { memo, useEffect } from "react";

import {
  CustomCardContent,
  CustomFavICon,
  CustomFoodCard,
  FoodSubTitleTypography,
  FoodTitleTypography,
  PricingCardActions,
  RatingStarIcon,
  RatingWrapTypography,
  StyledButton,
} from "./FoodCard.style";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FoodDetailModal from "../foodDetail-modal/FoodDetailModal";
import ProductCardMedia from "./ProductCardMedia";
import { getAmount, isAvailable } from "../../utils/customFunctions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment/moment";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CustomOverlayBox } from "../../styled-components/CustomStyles.style";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-hot-toast";
import StartPriceView from "../foodDetail-modal/StartPriceView";
import { useMutation } from "react-query";
import { ProductsApi } from "../../hooks/react-query/config/productsApi";
import { addWishList, removeWishListFood } from "../../redux/slices/wishList";
import { useWishListDelete } from "../../hooks/react-query/config/wish-list/useWishListDelete";
import { RTL } from "../RTL/RTL";

const FoodCard = ({ product, productImageUrl }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    name,
    image,
    restaurant_name,
    avg_rating,
    price,
    discount,
    discount_type,
    available_time_ends,
    available_time_starts,
    restaurant_discount,
  } = product;
  const [openModal, setOpenModal] = React.useState(false);
  const { t } = useTranslation();
  const imageUrl = `${productImageUrl}/${image}`;
  const { configData, token } = useSelector(
    (state) => state.configDataSettings
  );
  const { wishLists } = useSelector((state) => state.wishList);
  let currencySymbol;
  let currencySymbolDirection;
  let digitAfterDecimalPoint;

  if (configData) {
    currencySymbol = configData.currency_symbol;
    currencySymbolDirection = configData.currency_symbol_direction;
    digitAfterDecimalPoint = configData.digit_after_decimal_point;
  }
  const discountPrice =
    price - (discount_type === "percent" ? (price * discount) / 100 : discount);
  const handleFoodDetailModal = () => setOpenModal(true);
  const language_direction = localStorage.getItem("direction");
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const {
    mutate: addFavoriteMutation,
    isLoading,
    error,
    data,
  } = useMutation("add-favourite", () => ProductsApi.addFavorite(product.id), {
    onSuccess: (response) => {
      if (response?.data) {
        dispatch(addWishList(product));
        toast.success(response.data.message);
      }
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const addToFavorite = () => {
    if (token) {
      addFavoriteMutation();
      // notify(data.message)
    } else toast.error(t("You are not logged in"));
  };

  const onSuccessHandlerForDelete = (res) => {
    dispatch(removeWishListFood(product.id));
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
  // const addToFav = () => {
  //     toast.success('add')
  // }

  const isInList = (id) => {
    return !!wishLists?.food?.find((wishFood) => wishFood.id === id);
  };
  return (
    <>
      <CustomFoodCard elevation={0}>
        <ProductCardMedia
          discount={discount}
          discount_type={discount_type}
          restaurant_discount={restaurant_discount}
          image={`${imageUrl}`}
          height={170}
          alt={name}
          price={price}
          onClick={handleFoodDetailModal}
          available_time_ends={available_time_ends}
          available_time_starts={available_time_starts}
        />

        {!product?.available_date_ends && (
          <>
            {!isInList(product.id) ? (
              <CustomFavICon language_direction={language_direction}>
                <IconButton onClick={addToFavorite}>
                  <FavoriteBorderIcon color="primary" />
                </IconButton>
              </CustomFavICon>
            ) : (
              <CustomFavICon language_direction={language_direction}>
                <IconButton onClick={() => deleteWishlistItem(product.id)}>
                  <FavoriteIcon color="primary" />
                </IconButton>
              </CustomFavICon>
            )}
          </>
        )}

        <CustomCardContent onClick={handleFoodDetailModal}>
          <Box>
            <FoodTitleTypography
              gutterBottom
              variant={isXSmall ? "h6" : "h5"}
              className="food-card-title-text"
            >
              {name || name}
            </FoodTitleTypography>
          </Box>
          <FoodSubTitleTypography variant="subtitle1">
            {restaurant_name || restaurant_name}
          </FoodSubTitleTypography>
          <RatingWrapTypography variant="subtitle2">
            {avg_rating.toFixed(1)}
            <RatingStarIcon
              fontSize="small"
              sx={{
                ml: "3px",
                color: (theme) => theme.palette.primary.main,
              }}
            />
          </RatingWrapTypography>
          <PricingCardActions
            disableSpacing
            sx={{
              justifyContent:
                language_direction === "rtl"
                  ? product.discount > 0
                    ? "right"
                    : "center"
                  : product.discount > 0
                  ? "left"
                  : "center",
            }}
          >
            <StartPriceView
              data={product}
              currencySymbolDirection={currencySymbolDirection}
              currencySymbol={currencySymbol}
              digitAfterDecimalPoint={digitAfterDecimalPoint}
              hideStartFromText="true"
              fontSize="h5"
              marginFoodCard="7px"
            />
          </PricingCardActions>
        </CustomCardContent>
        <StyledButton
          aria-label="select"
          language_direction={language_direction}
          onClick={handleFoodDetailModal}
        >
          {language_direction === "rtl" ? (
            <ArrowBackIcon fontSize="small" />
          ) : (
            <ArrowForwardIcon fontSize="small" />
          )}
        </StyledButton>
      </CustomFoodCard>
      {/*{openModal && (*/}
      {/*    <RTL direction={language_direction}>*/}
      {/*        <FoodDetailModal*/}
      {/*            product={product}*/}
      {/*            image={imageUrl}*/}
      {/*            open={openModal}*/}
      {/*            handleModalClose={handleModalClose}*/}
      {/*            setOpen={setOpenModal}*/}
      {/*            currencySymbolDirection={currencySymbolDirection}*/}
      {/*            currencySymbol={currencySymbol}*/}
      {/*            digitAfterDecimalPoint={digitAfterDecimalPoint}*/}
      {/*        />*/}
      {/*    </RTL>*/}
      {/*)}*/}
    </>
  );
};

FoodCard.propTypes = {};

export default memo(FoodCard);
