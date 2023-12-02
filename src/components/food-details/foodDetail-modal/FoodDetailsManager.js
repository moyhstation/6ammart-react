import React from "react";
import { Grid, Stack, Typography } from "@mui/material";

import {
  CustomFavICon,
  FoodSubTitleTypography,
} from "../food-card/FoodCard.style";
// import { CustomTypographyTag } from "../../styled-components/CustomTypographies.style";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  CustomOverlayBox,
  CustomStackForFoodModal,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import { isAvailable } from "../../../utils/CustomFunctions";
import NotAvailableCard from "./NotAvailableCard";
import CustomRatingBox from "../../CustomRatingBox";
import { FoodVegNonVegFlag } from "../../cards/SpecialCard";

const FoodDetailsManager = (props) => {
  const {
    configData,
    handleDiscountChip,
    image,
    modalData,
    product,
    t,
    router,
    addToWishlistHandler,
    removeFromWishlistHandler,
    isWishlisted,
    theme,
    imageBaseUrl,
    handleRouteToStore,
  } = props;
  return (
    <Grid container direction="row">
      <Grid item xs={12} md={12} position="relative">
        {handleDiscountChip(product, t)}
        {modalData?.length > 0 &&
          !isAvailable(
            modalData[0]?.available_time_starts,
            modalData[0]?.available_time_ends
          ) && (
            <CustomOverlayBox height="40%" top="126px">
              <NotAvailableCard
                endTime={
                  modalData.length > 0 && modalData[0].available_time_ends
                }
                startTime={
                  modalData.length > 0 && modalData[0].available_time_starts
                }
              />
            </CustomOverlayBox>
          )}

        <CustomImageContainer
          src={`${imageBaseUrl}/${product?.image}`}
          borderRadius=".3rem"
          width="100%"
          height="200px"
          alt="The house from the offer."
          objectfit="cover"
        />
        <CustomStackForFoodModal width="100%" spacing={2}>
          <Stack spacing={1.4} alignItems="start">
            {!product?.available_date_ends && (
              <CustomRatingBox rating={product?.avg_rating} />
            )}
            {router.pathname !== `/store/[id]` ? (
              <Typography
                sx={{ cursor: "pointer" }}
                fontSize="14px"
                fontWeight="400"
                color={theme.palette.whiteContainer.main}
                onClick={handleRouteToStore}
              >
                {product?.store_name}
              </Typography>
            ) : (
              <Typography
                fontSize="14px"
                fontWeight="400"
                color={theme.palette.whiteContainer.main}
              >
                {product?.store_name}
              </Typography>
            )}
          </Stack>
          {!product?.available_date_ends && (
            <>
              {!isWishlisted ? (
                <CustomFavICon>
                  <IconButton onClick={addToWishlistHandler}>
                    <FavoriteBorderIcon color="primary" />
                  </IconButton>
                </CustomFavICon>
              ) : (
                <CustomFavICon>
                  <IconButton onClick={(e) => removeFromWishlistHandler(e)}>
                    <FavoriteIcon color="primary" />
                  </IconButton>
                </CustomFavICon>
              )}
            </>
          )}
        </CustomStackForFoodModal>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Stack paddingX="1rem" width="100%" spaicing={1} paddingTop="1rem">
          <CustomStackFullWidth>
            <CustomStackFullWidth
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              flexWrap="wrap"
              spacing={0.5}
            >
              <Typography fontSize="16px" fontWeight="500">
                {modalData.length > 0 && modalData[0].name}
              </Typography>
              {modalData.length > 0 &&
                modalData[0]?.module?.module_type === "food" && (
                  <FoodVegNonVegFlag
                    veg={modalData[0]?.veg === 0 ? "false" : "true"}
                  />
                )}
            </CustomStackFullWidth>
          </CustomStackFullWidth>
          <FoodSubTitleTypography
            color={theme.palette.neutral[400]}
            sx={{
              textAlign: "left",
              fontSize: "12px",
            }}
          >
            {modalData.length > 0 && modalData[0].description}
          </FoodSubTitleTypography>
        </Stack>
      </Grid>
    </Grid>
  );
};

FoodDetailsManager.propTypes = {};

export default FoodDetailsManager;
