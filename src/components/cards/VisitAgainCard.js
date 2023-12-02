import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaceIcon from "@mui/icons-material/Place";
import {
  Button,
  Card,
  Grid,
  Typography,
  alpha,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useAddStoreToWishlist } from "../../api-manage/hooks/react-query/wish-list/useAddStoreToWishLists";
import { useWishListStoreDelete } from "../../api-manage/hooks/react-query/wish-list/useWishListStoreDelete";
import { DistanceCalculate } from "../../helper-functions/DistanceCalculate";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../helper-functions/moduleTypes";
import {
  addWishListStore,
  removeWishListStore,
} from "../../redux/slices/wishList";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { textWithEllipsis } from "../../styled-components/TextWithEllipsis";
import { IsSmallScreen } from "../../utils/CommonValues";
import { not_logged_in_message } from "../../utils/toasterMessages";
import CustomImageContainer from "../CustomImageContainer";
import CustomRatingBox from "../CustomRatingBox";
import H4 from "../typographies/H4";
import { CustomOverLay } from "./Card.style";
import QuickView from "./QuickView";

const getModuleWiseData = () => {
  switch (getCurrentModuleType()) {
    case ModuleTypes.GROCERY:
      return {
        borderRadiusButton: "5px",
        borderRadiusSmallImage: "4px",
        smallImageGap: "8px",
        smallImageMarginLeft: "false",
        border: "false",
      };
    case ModuleTypes.PHARMACY:
      return {
        borderRadiusButton: "100px",
        borderRadiusSmallImage: "50%",
        smallImageGap: "0px",
        smallImageMarginLeft: "true",
        border: "true",
      };
    case ModuleTypes.ECOMMERCE:
      return {
        borderRadiusButton: "5px",
        borderRadiusSmallImage: "4px",
        smallImageGap: "8px",
        smallImageMarginLeft: "false",
        border: "false",
      };
    case ModuleTypes.FOOD:
      return {
        borderRadiusButton: "2px",
        borderRadiusSmallImage: "4px",
        smallImageGap: "8px",
        smallImageMarginLeft: "false",
        border: "false",
      };
  }
};
const ImageWrapper = styled(Box)(({ theme, margin_left, is_border }) => ({
  position: "relative",
  height: "30px",
  width: "30px",
  marginLeft: margin_left === "true" ? "-5px" : "0px",
  border:
    is_border === "true"
      ? `1px solid ${theme.palette.background.default}`
      : "none",
  [theme.breakpoints.down("sm")]: {
    height: "21px",
    width: "21px",
  },
}));
const KmShowing = ({ distance }) => {
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        background: "rgba(255, 255, 255, 0.8)",
        borderRadius: "0px 5px 5px 0px",
        p: "5px",
        color: "primary.main",
      }}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <PlaceIcon color="primary.main" sx={{ fontSize: "16px" }} />
      <Typography variant={IsSmallScreen() ? "body3" : "body1"}>
        <b>
          <DistanceCalculate distance={distance} />
        </b>{" "}
        {t("From You")}
      </Typography>
    </Stack>
  );
};

const VisitAgainCard = (props) => {
  const { item, configData } = props;
  const classes = textWithEllipsis();
  const [isHover, setIsHover] = useState(false);
  const { t } = useTranslation();
  const { mutate: addFavoriteMutation } = useAddStoreToWishlist();
  const { mutate } = useWishListStoreDelete();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { wishLists } = useSelector((state) => state.wishList);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const visitedStoresProducts = JSON.parse(
    localStorage.getItem("visitedStoresProducts")
  );
  let visitedThisStoresProducts =
    visitedStoresProducts?.length > 0
      ? visitedStoresProducts?.filter(
        (childItem) => childItem?.store_id === item?.id
      )
      : [];
  useEffect(() => {
    wishlistItemExistHandler();
  }, [wishLists]);
  const handleClick = () => {
    router.push({
      pathname: `/store/[id]`,
      query: {
        id: `${item?.slug ? item?.slug : item?.id}`,
        module_id: `${item?.module_id}`,
      },
    });
  };
  const quickViewHandleClick = (e) => {
    handleClick()
  };
  const imageUrl = `${configData?.base_urls?.store_cover_photo_url}/${item?.cover_photo}`;

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
            dispatch(addWishListStore(item));
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
      dispatch(removeWishListStore(item?.id));
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
  const wishlistItemExistHandler = () => {
    if (wishLists?.store?.find((wishItem) => wishItem.id === item?.id)) {
      setIsWishlisted(true);
    } else {
      setIsWishlisted(false);
    }
  };

  return (
    <Card
      sx={{
        padding: "10px",
        width: { xs: "220px", md: "280px" },
        cursor: "pointer",
        "&:hover": {
          img: {
            transform: "scale(1.1)",
          },
        },
        ".MuiTypography-subtitle2": {
          transition: "all ease 0.5s",
        },
        "&:hover .MuiTypography-subtitle2": {
          color: theme.palette.primary.main,
          letterSpacing: "0.02em",
        },
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Box
        sx={{
          borderRadius: "10px",
          position: "relative",
          height: { xs: "100px", md: "132px" },
          width: "100%",
        }}
      >
        <CustomImageContainer
          src={imageUrl}
          alt={item?.name}
          height="100%"
          width="100%"
          obejctfit="contain"
          borderRadius="10px"
        />
        {getCurrentModuleType() !== ModuleTypes.FOOD && (
          <Box sx={{ position: "absolute", bottom: 12, left: 0 }}>
            <KmShowing distance={item?.distance} />
          </Box>
        )}

        {isWishlisted && (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: (theme) => theme.palette.neutral[100],
              height: "30px",
              width: "30px",
              borderRadius: "4px",
              color: "primary.main",
            }}
          >
            <FavoriteIcon fontSize="small" />
          </Stack>
        )}

        <CustomOverLay hover={isHover}>
          <QuickView
            quickViewHandleClick={quickViewHandleClick}
            isHover={isHover}
            addToWishlistHandler={addToWishlistHandler}
            removeFromWishlistHandler={removeFromWishlistHandler}
            isWishlisted={isWishlisted}
          />
        </CustomOverLay>
      </Box>
      <CustomBoxFullWidth sx={{ mt: "10px" }}>
        <Grid container spacing={1.5}>
          <Grid item xs={8.5} md={9}>
            <H4 text={item?.name} />
            <Typography
              color="text.secondary"
              className={classes.multiLineEllipsis}
              height="40px"
              fontSize="12px"
            >
              {item?.address}
            </Typography>
          </Grid>
          <Grid item xs={3.5} md={3}>
            <CustomRatingBox rating={item?.avg_rating} />
          </Grid>
        </Grid>
      </CustomBoxFullWidth>
      <CustomBoxFullWidth sx={{ mt: "15px" }}>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item xs={7}>
            {visitedThisStoresProducts?.length > 0 && (
              <CustomStackFullWidth
                direction="row"
                flexWrap="wrap"
                gap={getModuleWiseData?.()?.smallImageGap}
              >
                {visitedThisStoresProducts.map((item, index) => {
                  if (index < 3) {
                    return (
                      <ImageWrapper
                        key={index}
                        margin_left={
                          getModuleWiseData?.()?.smallImageMarginLeft === "true"
                            ? index !== 0
                              ? "true"
                              : "false"
                            : "false"
                        }
                        is_border={getModuleWiseData?.()?.border}
                      >
                        <CustomImageContainer
                          src={`${configData?.base_urls?.item_image_url}/${item?.image}`}
                          alt={item?.name}
                          height="100%"
                          width="100%"
                          obejctfit="contained"
                          borderRadius={
                            getModuleWiseData?.()?.borderRadiusSmallImage
                          }
                        />
                      </ImageWrapper>
                    );
                  }
                })}
                {visitedThisStoresProducts?.length > 4 && (
                  <Box
                    sx={{
                      marginLeft:
                        getModuleWiseData?.()?.smallImageMarginLeft === "true"
                          ? "-5px"
                          : "0px",
                      height: { xs: "21px", sm: "30px" },
                      width: { xs: "21px", sm: "30px" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius:
                        getModuleWiseData?.()?.borderRadiusSmallImage,
                      fontSize: "10px",
                      fontWeight: "700",
                      // paddingLeft: "3px",
                      color: "whiteContainer.main",
                      backgroundColor: (theme) =>
                        alpha(theme.palette.neutral[600], 0.4),
                    }}
                  >
                    2+
                  </Box>
                )}
              </CustomStackFullWidth>
            )}
          </Grid>
          <Grid item xs={5} align="right">
            <Button
              variant="contained"
              sx={{
                fontSize: "10px",
                borderRadius: getModuleWiseData?.()?.borderRadiusButton,
                padding: { xs: "4px 10px", sm: "8px 16px" },
                backgroundColor: (theme) =>
                  getCurrentModuleType() === ModuleTypes.FOOD
                    ? theme.palette.moduleTheme.food
                    : theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: (theme) =>
                    getCurrentModuleType() === ModuleTypes.FOOD &&
                    alpha(theme.palette.moduleTheme.food, 0.7),
                },
              }}
              onClick={handleClick}
            >
              {t("Visit Again")}
            </Button>
          </Grid>
        </Grid>
      </CustomBoxFullWidth>
    </Card>
  );
};

VisitAgainCard.propTypes = {};

export default VisitAgainCard;
