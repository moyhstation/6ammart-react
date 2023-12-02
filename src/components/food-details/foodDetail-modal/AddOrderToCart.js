import React, { useEffect, useState } from "react";
import {
  alpha,
  Button,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { PrimaryButton } from "../../Map/map.style";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useAddToWishlist } from "../../../api-manage/hooks/react-query/wish-list/useAddWishList";
import {
  addWishList,
  removeWishListItem,
} from "../../../redux/slices/wishList";
import toast from "react-hot-toast";
import { not_logged_in_message } from "../../../utils/toasterMessages";
import { useWishListDelete } from "../../../api-manage/hooks/react-query/wish-list/useWishListDelete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import Loading from "../../custom-loading/Loading";

const AddOrderToCart = (props) => {
  const {
    isInCart,
    product,
    t,
    addToCard,
    orderNow,
    router,
    isScheduled,
    isLoading,
    updateIsLoading
  } = props;
  const [wishListCount, setWishListCount] = useState(
    product?.wishlist_count || 0
  );
  const theme = useTheme();
  const handleBuyNowClick = () => {
    addToCard?.("buy_now");
  };

  const { wishLists } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();
  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const isInWishList = (id) => {
    return !!wishLists?.item?.find((wishItem) => wishItem.id === id);
  };

  const { mutate: addFavoriteMutation } = useAddToWishlist();
  const addToFavorite = (e) => {
    if (token) {
      addFavoriteMutation(product?.id, {
        onSuccess: (response) => {
          if (response) {
            dispatch(addWishList(product));
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

  const onSuccessHandlerForDelete = (res) => {
    dispatch(removeWishListItem(product?.id));
    toast.success(res.message, {
      id: "wishlist",
    });
    setWishListCount(wishListCount - 1);
  };
  const { mutate } = useWishListDelete();
  const deleteWishlistItem = () => {
    mutate(product?.id, {
      onSuccess: onSuccessHandlerForDelete,
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  };
  useEffect(() => {}, [wishListCount]);
  return (
    <>
      {isScheduled ? (
        isScheduled === "true" ? (
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6}>
              <PrimaryButton
                fullWidth
                onClick={() => handleBuyNowClick()}
                sx={{
                  backgroundColor: theme.palette.customColor.buyButton,
                  color: "black",
                }}
              >
                {t("Buy Now")}
              </PrimaryButton>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              {isInCart(product?.id) && (
                <PrimaryButton onClick={() => addToCard()} >
                  {updateIsLoading ?<Stack height="25px" alignItems="center" justifyContent="center"> <Loading /></Stack> : t("Update to cart")}
                </PrimaryButton>
              )}
              {!isInCart(product?.id) && (
                <PrimaryButton onClick={() => addToCard()} loading={isLoading}>
                  {t("Add to Cart")}
                </PrimaryButton>
              )}
            </Grid>
            {/*<Grid item xs={2} sm={2}>*/}
            {/*  {!isInWishList(product?.id) && (*/}
            {/*    <Button variant="outlined" onClick={addToFavorite}>*/}
            {/*      <Stack direction="row" spacing={1} alignItems="center">*/}
            {/*        <FavoriteBorderOutlinedIcon />*/}
            {/*        <Typography>{wishListCount}</Typography>*/}
            {/*      </Stack>*/}
            {/*    </Button>*/}
            {/*  )}*/}
            {/*  {isInWishList(product?.id) && (*/}
            {/*    <Button*/}
            {/*      variant="outlined"*/}
            {/*      fullWidth*/}
            {/*      onClick={deleteWishlistItem}*/}
            {/*    >*/}
            {/*      <Stack direction="row" spacing={1} alignItems="center">*/}
            {/*        <FavoriteIcon color="primary" />*/}
            {/*        <Typography>{wishListCount}</Typography>*/}
            {/*      </Stack>*/}
            {/*    </Button>*/}
            {/*  )}*/}
            {/*</Grid>*/}
          </Grid>
        ) : (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={12} md={12}>
              <Stack
                spacing={0.5}
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                  borderRadius: "8px",
                  paddingY: { xs: "5px", sm: ".5rem" },
                  paddingX: { xs: "5px", sm: ".5rem" },
                }}
              >
                <Typography variant="h6">{t("Not Available now")}</Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                  flexWrap="wrap"
                  gap="5px"
                >
                  <Typography>{t("Available will be")}</Typography>
                  <Typography>{`${moment(product.available_time_starts, [
                    "HH:mm",
                  ]).format("hh:mm a")} - ${moment(
                    product.available_time_ends,
                    ["HH:mm"]
                  ).format("hh:mm a")}`}</Typography>
                </Stack>
              </Stack>
            </Grid>
            {/*<Grid item xs={4} sm={2} justifySelf="center">*/}
            {/*  {!isInWishList(product?.id) && (*/}
            {/*    <Button variant="outlined" fullWidth onClick={addToFavorite}>*/}
            {/*      <Stack direction="row" spacing={1} alignItems="center">*/}
            {/*        <FavoriteBorderOutlinedIcon />*/}
            {/*        /!*<Typography>{wishListCount}</Typography>*!/*/}
            {/*      </Stack>*/}
            {/*    </Button>*/}
            {/*  )}*/}
            {/*  {isInWishList(product?.id) && (*/}
            {/*    <Button*/}
            {/*      variant="outlined"*/}
            {/*      fullWidth*/}
            {/*      onClick={deleteWishlistItem}*/}
            {/*    >*/}
            {/*      <Stack direction="row" spacing={1} alignItems="center">*/}
            {/*        <FavoriteIcon color="primary" />*/}
            {/*        /!*<Typography>{wishListCount}</Typography>*!/*/}
            {/*      </Stack>*/}
            {/*    </Button>*/}
            {/*  )}*/}
            {/*</Grid>*/}
          </Grid>
        )
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6}>
            <PrimaryButton
              fullWidth
              onClick={() => handleBuyNowClick()}
              sx={{
                color: "black",
                backgroundColor: theme.palette.customColor.buyButton,
              }}
            >
              {t("Buy Now")}
            </PrimaryButton>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            {isInCart(product?.id) && (
              <PrimaryButton onClick={() => addToCard()} sx={{ width: 200, fontSize: { xs: "12px", md: "14px" } }}>
                {updateIsLoading ?<Stack height="25px" alignItems="center" justifyContent="center"> <Loading /></Stack> : t("Update to cart")}
              </PrimaryButton>
            )}
            {!isInCart(product?.id) && (
              <PrimaryButton onClick={() => addToCard()} loading={isLoading} sx={{ width: 200, fontSize: { xs: "12px", md: "14px" } }}>
                {isLoading ?<Stack height="25px" alignItems="center" justifyContent="center"> <Loading /></Stack> : t("Add to Cart")}
              </PrimaryButton>
            )}
          </Grid>
          {/*<Grid item xs={2} sm={2}>*/}
          {/*  {!isInWishList(product?.id) && (*/}
          {/*    <Button variant="outlined" fullWidth onClick={addToFavorite}>*/}
          {/*      <Stack direction="row" spacing={1} alignItems="center">*/}
          {/*        <FavoriteBorderOutlinedIcon />*/}
          {/*        /!*<Typography>{wishListCount}</Typography>*!/*/}
          {/*      </Stack>*/}
          {/*    </Button>*/}
          {/*  )}*/}
          {/*  {isInWishList(product?.id) && (*/}
          {/*    <Button variant="outlined" fullWidth onClick={deleteWishlistItem}>*/}
          {/*      <Stack direction="row" spacing={1} alignItems="center">*/}
          {/*        <FavoriteIcon color="primary" />*/}
          {/*        /!*<Typography>{wishListCount}</Typography>*!/*/}
          {/*      </Stack>*/}
          {/*    </Button>*/}
          {/*  )}*/}
          {/*</Grid>*/}
        </Grid>
      )}
    </>
  );
};
export default AddOrderToCart;
