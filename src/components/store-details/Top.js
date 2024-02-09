import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  alpha,
  Grid,
  Skeleton,
  styled,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Box, Stack } from "@mui/system";
import React, { useReducer } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useAddStoreToWishlist } from "../../api-manage/hooks/react-query/wish-list/useAddStoreToWishLists";
import { useWishListStoreDelete } from "../../api-manage/hooks/react-query/wish-list/useWishListStoreDelete";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
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
import { not_logged_in_message } from "../../utils/toasterMessages";
import ClosedNowScheduleWise from "../closed-now/ClosedNowScheduleWise";
import CustomImageContainer from "../CustomImageContainer";
import { StyledRating } from "../CustomMultipleRatings";
import LocationViewOnMap from "../Map/location-view/LocationViewOnMap";
import { RoundedIconButton } from "../product-details/product-details-section/ProductsThumbnailsSettings";
import H1 from "../typographies/H1";
import Link from "next/link";
import { useRouter } from "next/router";

const ContentWrapper = styled(CustomBoxFullWidth)(({ theme }) => ({
  position: "relative",
  height: "250px",
  width: "50%",
}));

const ImageWrapper = styled(Box)(({ theme, smallScreen }) => ({
  position: "relative",
  maxWidth: "100px",
  width: "100%",
  height: "100px",
  [theme.breakpoints.down("lg")]: {
    height: "100px",
    maxWidth: "110px",
  },
  [theme.breakpoints.down("md")]: {
    //height: "120px",
    maxWidth: "110px",
  },
  [theme.breakpoints.down("sm")]: {
    height: smallScreen === "true" ? "100px" : "65px",
    maxWidth: smallScreen !== "true" && "85px",
    width: smallScreen === "true" && "100px",
  },
}));
const PrimaryWrapper = styled(Box)(({ theme, borderradius }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.whiteContainer.main,
  padding: "8px",
  borderRadius: borderradius,
  cursor: "pointer",
}));
const ContentBox = styled(Box)(({ theme, borderradius }) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  color: theme.palette.whiteContainer.main,
  borderRadius: "5px",
}));

const initialState = {
  viewMap: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setViewMap":
      return {
        ...state,
        viewMap: action.payload,
      };
    default:
      return state;
  }
};
const Top = (props) => {
  const {
    bannerCover,
    storeDetails,
    configData,
    logo,
    storeShare,
    bannersData,
    isLoading,
  } = props;

  // const {configData} = useSelector(state=> state.configData)
  const [state, dispatch] = useReducer(reducer, initialState);
  const theme = useTheme();
  const dispatchRedux = useDispatch();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const matches = useMediaQuery("(max-width:1460px)");
  const router = useRouter();
  const ACTION = {
    setViewMap: "setViewMap",
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const openMapHandler = () => {
    dispatch({ type: ACTION.setViewMap, payload: true });
  };
  const { wishLists } = useSelector((state) => state.wishList);

  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const { mutate: addFavoriteMutation } = useAddStoreToWishlist();
  const addToFavorite = () => {
    if (token) {
      addFavoriteMutation(storeDetails?.id, {
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
    return !!wishLists?.store?.find(
      (wishStore) => wishStore.id === storeDetails?.id
    );
  };
  const onSuccessHandlerForDelete = (res) => {
    dispatchRedux(removeWishListStore(storeDetails?.id));
    toast.success(res.message, {
      id: "wishlist",
    });
  };
  const { mutate } = useWishListStoreDelete();
  const deleteWishlistStore = (id) => {
    mutate(id, {
      onSuccess: onSuccessHandlerForDelete,
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  };
  const getModuleWiseBG = () => {
    if (getCurrentModuleType()) {
      switch (getCurrentModuleType()) {
        case ModuleTypes.GROCERY:
          return {
            bgColor: theme.palette.primary.main,
          };
        case ModuleTypes.PHARMACY:
          return {
            bgColor: theme.palette.info.custom1,
          };
        case ModuleTypes.ECOMMERCE:
          return {
            bgColor: theme.palette.info.blue,
          };
        case ModuleTypes.FOOD:
          return {
            bgColor: theme.palette.moduleTheme.food,
          };
      }
    } else {
      switch (storeShare?.moduleType) {
        case ModuleTypes.GROCERY:
          return {
            bgColor: theme.palette.primary.main,
          };
        case ModuleTypes.PHARMACY:
          return {
            bgColor: theme.palette.info.custom1,
          };
        case ModuleTypes.ECOMMERCE:
          return {
            bgColor: theme.palette.info.blue,
          };
        case ModuleTypes.FOOD:
          return {
            bgColor: theme.palette.moduleTheme.food,
          };
      }
    }
  };
  const handleBannerClick = (link) => {
    if (link) {
      router.push(link);
    }
  };

  const content = () => {
    if (isSmall) {
      return (
        <CustomStackFullWidth>
          <CustomBoxFullWidth
            sx={{
              position: "relative",
              height: "122px",
            }}
          >
            {bannersData?.length ? (
              <Slider {...settings}>
                {bannersData?.map((banner) => {
                  return (
                    <Stack
                      key={banner?.id}
                      onClick={() => handleBannerClick(banner?.default_link)}
                      sx={{ cursor: "pointer" }}
                    >
                      <CustomImageContainer
                        src={`${configData?.base_urls?.banner_image_url}/${banner?.image}`}
                        width="100%"
                        height="122px"
                        objectFit="cover"
                        borderRadius="10px"
                      />
                    </Stack>
                  );
                })}
              </Slider>
            ) : (
              <CustomImageContainer
                src={bannerCover}
                width="100%"
                height="100%"
                objectFit="cover"
                borderRadius="10px"
              />
            )}{" "}
          </CustomBoxFullWidth>
          <CustomStackFullWidth>
            <CustomBoxFullWidth
              sx={{
                backdropFilter: "blur(10px)",
                zIndex: 0,
              }}
            >
              <CustomBoxFullWidth
                sx={{
                  backgroundColor: getModuleWiseBG()?.bgColor,
                  zIndex: 999,
                  position: "relative",
                }}
              >
                <CustomBoxFullWidth
                  sx={{
                    background: " rgba(255, 255, 255, 0.1)",
                    boxShadow: "0px 2px 30px 2px rgba(0, 0, 0, 0.08)",
                    padding: "15px 20px",
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid
                      item
                      xs={4}
                      sm={2}
                      sx={{
                        mt: "22px",
                        mb: "30px",
                        position: "relative",
                      }}
                    >
                      <CustomBoxFullWidth
                        sx={{ position: "absolute", top: -52 }}
                      >
                        <ImageWrapper smallScreen="true">
                          <CustomImageContainer
                            src={logo}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            borderRadius="50%"
                          />
                          <ClosedNowScheduleWise
                            active={storeDetails?.active}
                            schedules={storeDetails?.schedules}
                            borderRadius="50%"
                          />
                        </ImageWrapper>
                      </CustomBoxFullWidth>
                    </Grid>
                    <Grid item xs={8} sm={10}>
                      <CustomStackFullWidth
                        sx={{ color: "whiteContainer.main" }}
                        spacing={1}
                      >
                        <H1 text={storeDetails?.name} textAlign="flex-start" />
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={0.4}
                          >
                            <StyledRating
                              name="read-only"
                              value={
                                storeDetails?.avg_rating
                                  ? storeDetails.avg_rating
                                  : 5
                              }
                              readOnly
                              size="small"
                              hasRating="true"
                            />
                            {storeDetails?.rating_count !== 0 ? (
                              <Typography>{`(${storeDetails?.rating_count})`}</Typography>
                            ) : null}
                          </Stack>
                          <Typography
                            sx={{
                              color: (theme) => theme.palette.neutral[600],
                            }}
                          >
                            |
                          </Typography>
                          {storeDetails?.rating_count !== 0 ? (
                            <Typography
                              textDecoration="underline"
                              fontWeight="700"
                              lineHeight="16.15px"
                              sx={{
                                fontSize: {
                                  xs: "10px",
                                  sm: "14px",
                                },
                              }}
                            >
                              {storeDetails?.rating_count} {t("Reviews")}
                            </Typography>
                          ) : (
                            <Typography
                              fontSize={{ xs: "11px", md: "13.5px" }}
                              sx={{ textDecoration: "underLine" }}
                            >
                              {t("No reviews yet")}
                            </Typography>
                          )}
                        </Stack>
                        <Typography
                          textDecoration="underline"
                          fontWeight="400"
                          lineHeight="16.15px"
                          sx={{
                            fontSize: { xs: "12px", sm: "14px" },
                          }}
                        >
                          {storeDetails?.address}
                        </Typography>
                      </CustomStackFullWidth>
                    </Grid>
                  </Grid>
                </CustomBoxFullWidth>
              </CustomBoxFullWidth>
            </CustomBoxFullWidth>

            <CustomBoxFullWidth
              sx={{
                // backdropFilter: "blur(10px)",
                backgroundColor: getModuleWiseBG()?.bgColor,
                opacity: "0.9",
                padding: "13.5px 25px",
                color: "whiteContainer.main",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={{ xs: 4, sm: 3, md: 5 }}
              >
                <Stack alignItems="flex-start">
                  <Typography
                    textAlign="center"
                    variant="h5"
                    sx={{
                      fontSize: {
                        xs: "14px",
                        sm: "22px",
                        md: "22px",
                      },
                    }}
                  >
                    {storeDetails?.positive_rating.toFixed(
                      configData?.digit_after_decimal_point
                    )}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.3}>
                    <Typography
                      noWrap
                      sx={{
                        fontSize: { xs: "10px", sm: "inherit" },
                      }}
                    >
                      {t("Positive Review")}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack alignItems="flex-start">
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: {
                        xs: "16px",
                        sm: "22px",
                        md: "22px",
                      },
                    }}
                  >
                    {getAmountWithSign(storeDetails?.minimum_order)}
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: { xs: "10px", sm: "inherit" },
                    }}
                  >
                    {t("Minimum Order Value")}
                  </Typography>
                </Stack>
                <Stack alignItems="flex-start">
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: {
                        xs: "16px",
                        sm: "22px",
                        md: "22px",
                      },
                    }}
                  >
                    {storeDetails?.delivery_time}
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: { xs: "10px", sm: "inherit" },
                    }}
                  >
                    {t("Delivery Time")}
                  </Typography>
                </Stack>
              </Stack>
            </CustomBoxFullWidth>
          </CustomStackFullWidth>
        </CustomStackFullWidth>
      );
    } else {
      return (
        <CustomStackFullWidth direction="row">
          <ContentWrapper>
            <CustomImageContainer
              src={bannerCover}
              width="100%"
              height="100%"
              objectFit="cover"
              borderRadius="10px"
            />
            <ContentBox>
              <CustomBoxFullWidth
                sx={{
                  borderTopLeftRadius: "10px",
                  backgroundColor: getModuleWiseBG()?.bgColor,
                }}
              >
                <CustomBoxFullWidth
                  sx={{
                    borderTopRightRadius: "10px",
                    borderTopLeftRadius: "10px",
                    background: " rgba(255, 255, 255, 0.1)",
                    boxShadow: "0px 2px 30px 2px rgba(0, 0, 0, 0.08)",
                    padding: "10px 25px",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={3} md={2.5} sx={{ mt: "22px", mb: "30px" }}>
                      <ImageWrapper>
                        <CustomImageContainer
                          src={logo}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          borderRadius="10px"
                        />
                        <ClosedNowScheduleWise
                          active={storeDetails?.active}
                          schedules={storeDetails?.schedules}
                          borderRadius="50%"
                        />
                      </ImageWrapper>
                    </Grid>
                    <Grid item xs={7} md={7.5} alignSelf="center">
                      <CustomStackFullWidth spacing={1}>
                        <H1 text={storeDetails?.name} textAlign="flex-start" />
                        <Link
                          href={`/review/${storeDetails?.id
                            ? storeDetails?.id
                            : storeDetails?.slug
                            }`}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                              spacing={0.4}
                            >
                              <StyledRating
                                sx={{
                                  color:
                                    storeDetails?.avg_rating === 0
                                      ? alpha(
                                        theme.palette.whiteContainer.main,
                                        0.6
                                      )
                                      : "warning.dark",
                                }}
                                name="read-only"
                                value={
                                  storeDetails?.avg_rating
                                    ? storeDetails?.avg_rating
                                    : 5
                                }
                                readOnly
                                size="small"
                                hasRating={
                                  storeDetails?.avg_rating === 0 ? true : false
                                }
                              />
                              {storeDetails?.rating_count !== 0 ? (
                                <Typography>{`(${storeDetails?.rating_count})`}</Typography>
                              ) : null}
                            </Stack>
                            <Typography
                              sx={{
                                color: (theme) => theme.palette.neutral[600],
                              }}
                            >
                              |
                            </Typography>
                            {storeDetails?.rating_count !== 0 ? (
                              <Typography
                                fontSize="14px"
                                sx={{ textDecoration: "underLine" }}
                                fontWeight="700"
                                lineHeight="16.15px"
                                component="span"
                              >
                                {storeDetails?.rating_count}
                                <Typography
                                  component="span"
                                  fontSize="13px"
                                  fontWeight="400"
                                >
                                  {t(" Reviews")}
                                </Typography>
                              </Typography>
                            ) : (
                              <Typography fontSize="13.5px">
                                {t("No reviews yet")}
                              </Typography>
                            )}
                          </Stack>
                        </Link>
                        <Typography
                          fontSize="14px"
                          textDecoration="underline"
                          fontWeight="400"
                          lineHeight="16.15px"
                        >
                          {storeDetails?.address}
                        </Typography>
                      </CustomStackFullWidth>
                    </Grid>
                    <Grid item xs={2} align="right">
                      {!isInWishList(storeDetails?.id) && (
                        <Tooltip
                          title={"Add to wishlist"}
                          arrow
                          placement={"bottom"}
                        >
                          <RoundedIconButton onClick={addToFavorite}>
                            <FavoriteBorderIcon color="primary" />
                          </RoundedIconButton>
                        </Tooltip>
                      )}
                      {isInWishList(storeDetails?.id) && (
                        <Tooltip
                          title={"Remove from wishlist"}
                          arrow
                          placement={"bottom"}
                        >
                          <RoundedIconButton
                            onClick={() => deleteWishlistStore(storeDetails?.id)}
                          >
                            <FavoriteIcon color="primary" />
                          </RoundedIconButton>
                        </Tooltip>
                      )}
                    </Grid>
                  </Grid>
                </CustomBoxFullWidth>
              </CustomBoxFullWidth>
              <CustomBoxFullWidth
                sx={{
                  // backdropFilter: "blur(10px)",
                  backgroundColor: getModuleWiseBG()?.bgColor,
                  opacity: "0.9",
                  padding: "13.5px 25px",

                  borderBottomLeftRadius: "10px",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ xs: 2, sm: 3, md: 5 }}
                >
                  <Stack alignItems="flex-start">
                    <Typography
                      textAlign="center"
                      variant="h5"
                      sx={{
                        fontSize: {
                          xs: "14px",
                          sm: "22px",
                          md: "22px",
                        },
                      }}
                    >
                      {storeDetails?.positive_rating.toFixed(0)}%
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.3}>
                      <Typography>{t("Positive Review")}</Typography>
                    </Stack>
                  </Stack>
                  <Stack alignItems="flex-start">
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: {
                          xs: "16px",
                          sm: "22px",
                          md: "22px",
                        },
                      }}
                    >
                      {getAmountWithSign(storeDetails?.minimum_order)}
                    </Typography>
                    <Typography>{t("Minimum Order Value")}</Typography>
                  </Stack>
                  <Stack alignItems="flex-start">
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: {
                          xs: "16px",
                          sm: "22px",
                          md: "22px",
                        },
                      }}
                    >
                      {storeDetails?.delivery_time}
                    </Typography>
                    <Typography>{t("Delivery Time")}</Typography>
                  </Stack>
                </Stack>
              </CustomBoxFullWidth>
            </ContentBox>
          </ContentWrapper>
          <Stack width="50%">
            {!isLoading ? (
              <>
                {bannersData?.length ? (
                  <Slider {...settings}>
                    {bannersData?.map((banner) => {
                      return (
                        <Stack
                          key={banner?.id}
                          onClick={() =>
                            handleBannerClick(banner?.default_link)
                          }
                          sx={{
                            cursor: "pointer",
                            width: "100%",
                            borderRadius: "10px",
                          }}
                        >
                          <CustomImageContainer
                            src={`${configData?.base_urls?.banner_image_url}/${banner?.image}`}
                            width="100%"
                            height="251px"
                            objectFit="cover"
                          />
                        </Stack>
                      );
                    })}
                  </Slider>
                ) : (
                  <CustomImageContainer
                    src={bannerCover}
                    width="100%"
                    height="250px"
                    objectFit="cover"
                  />
                )}
              </>
            ) : (
              <Skeleton width="100%" height="100%" variant="rectangular" />
            )}
          </Stack>
        </CustomStackFullWidth>
      );
    }
  };
  return (
    <>
      {content()}
      {state.viewMap && (
        <LocationViewOnMap
          open={state.viewMap}
          handleClose={() =>
            dispatch({ type: ACTION.setViewMap, payload: false })
          }
          latitude={storeDetails?.latitude}
          longitude={storeDetails?.longitude}
          address={storeDetails?.address}
        />
      )}
    </>
  );
};

Top.propTypes = {};

export default Top;
