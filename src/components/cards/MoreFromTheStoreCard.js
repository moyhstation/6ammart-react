import React from "react";
import { Box, Stack, styled } from "@mui/system";
import { Paper, Typography } from "@mui/material";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import men from "./assets/men.png";
import CustomImageContainer from "../CustomImageContainer";
import CustomRatings from "../search/CustomRatings";
import { useTheme } from "@emotion/react";
import { textWithEllipsis } from "../../styled-components/TextWithEllipsis";
import AmountWithDiscountedAmount from "../AmountWithDiscountedAmount";
import { RoundedIconButton } from "../product-details/product-details-section/ProductsThumbnailsSettings";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { useWishListStoreDelete } from "../../api-manage/hooks/react-query/wish-list/useWishListStoreDelete";
import { useAddStoreToWishlist } from "../../api-manage/hooks/react-query/wish-list/useAddStoreToWishLists";
import {
  addWishListStore,
  removeWishListStore,
} from "../../redux/slices/wishList";
import toast from "react-hot-toast";
import { not_logged_in_message } from "../../utils/toasterMessages";
import { t } from "i18next";

const CustomWrapper = styled(Paper)(({ theme }) => ({
  borderRadius: "10px",
  border: `1px solid ${theme.palette.neutral[200]}`,
  background: theme.palette.background.paper,
  padding: "3px",
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  width: "110px",
  height: "108px",
  flexShrink: "0",
}));
const MoreFromTheStoreCard = (props) => {
  const {
    item,
    imageBaseUrl,
    quickViewHandleClick,
    addToCart,
    handleBadge,
    isProductExist,
    handleIncrement,
    handleDecrement,
    count,
    showAddtocart,
    handleClick,
  } = props;
  const classes = textWithEllipsis();
  const theme = useTheme();
  const dispatchRedux = useDispatch();
  const { wishLists } = useSelector((state) => state.wishList);
  const { mutate } = useWishListStoreDelete();
  const { mutate: addFavoriteMutation } = useAddStoreToWishlist();
  const { configData } = useSelector((state) => state.configData);
  const base_url = configData?.base_urls?.item_image_url;
  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const onSuccessHandlerForDelete = (res) => {
    dispatchRedux(removeWishListStore(id));
    toast.success(res.message, {
      id: "wishlist",
    });
  };

  const addToFavorite = () => {
    if (token) {
      addFavoriteMutation(id, {
        onSuccess: (response) => {
          if (response) {
            dispatchRedux(addWishListStore(storeDetails));
            toast.success(response?.message);
          }
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      });
    } else toast.error(t(not_logged_in_message));
  };
  const isInWishList = (id) => {
    return !!wishLists?.store?.find((wishStore) => wishStore.id === id);
  };
  const deleteWishlistStore = (id) => {
    mutate(id, {
      onSuccess: onSuccessHandlerForDelete,
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  };
  return (
    <CustomWrapper onClick={handleClick}>
      <CustomStackFullWidth
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
        >
          <ImageWrapper>
            <CustomImageContainer
              width="100%"
              height="100%"
              objectfit="contain"
              src={`${base_url}/${item?.image}`}
              borderRadius="10px"
            />
          </ImageWrapper>
          <Stack spacing={0.5}>
            <Typography variant="body1" className={classes.multiLineEllipsis}>
              {item?.name}
            </Typography>
            <CustomStackFullWidth direction="row" alignItems="center">
              <CustomRatings
                ratingValue={item?.avg_rating}
                color={theme.palette.warning.main}
                readOnly
              />
              <Typography fontSize="12px" color="customColor.textGray">
                ({item?.rating_count})
              </Typography>
            </CustomStackFullWidth>
            <Typography fontSize="14px">
              <AmountWithDiscountedAmount item={props} noPrimaryColor />
            </Typography>
          </Stack>
        </CustomStackFullWidth>
        <Box sx={{ padding: "8px" }}>
          {!isInWishList(item?.id) && (
            <RoundedIconButton onClick={addToFavorite}>
              <FavoriteBorderIcon color="primary" size="small" />
            </RoundedIconButton>
          )}
          {isInWishList(item?.id) && (
            <RoundedIconButton onClick={() => deleteWishlistStore(id)}>
              <FavoriteIcon color="primary" size="small" />
            </RoundedIconButton>
          )}
        </Box>
      </CustomStackFullWidth>
    </CustomWrapper>
  );
};

MoreFromTheStoreCard.propTypes = {};

export default MoreFromTheStoreCard;
