import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { IsSmallScreen } from "../../../utils/CommonValues";
import CustomContainer from "../../container";
import Banners from "../banners";
import BestReviewedItems from "../best-reviewed-items";
import Coupons from "../coupons";
import FeaturedCategories from "../featured-categories";
import NewArrivalStores from "../new-arrival-stores";
import PopularItemsNearby from "../popular-items-nearby";
import RunningCampaigns from "../running-campaigns";
import SpecialFoodOffers from "../special-food-offers";
import Stores from "../stores";
import VisitAgain from "../visit-again";
import PromotionalBanner from "../PromotionalBanner";
import LoveItem from "../love-item";
import useGetOtherBanners from "../../../api-manage/hooks/react-query/useGetOtherBanners";
import PharmacyStaticBanners from "./pharmacy/pharmacy-banners/PharmacyStaticBanners";

const menus = ["All", "Beauty", "Bread & Juice", "Drinks", "Milks"];
const Grocery = (props) => {
  const { configData } = props;
  const { data, refetch, isLoading } = useGetOtherBanners();
  useEffect(() => {
    refetch();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ marginTop: { xs: "-10px", sm: "10px" } }}>
        <CustomContainer>
          <FeaturedCategories configData={configData} />
        </CustomContainer>
      </Grid>
      <Grid item xs={12} mb={3}>
        {IsSmallScreen() ? (
          <VisitAgain configData={configData} />
        ) : (
          <CustomContainer>
            <VisitAgain configData={configData} />
          </CustomContainer>
        )}
      </Grid>

      <Grid item xs={12}>
        <CustomContainer>
          <PopularItemsNearby
            title="Most Popular Items"
            subTitle="We provide best quality & fresh grocery items near your location"
          />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <PharmacyStaticBanners />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <SpecialFoodOffers />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <Banners />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <BestReviewedItems
            menus={menus}
            title="Best Reviewed Items"
            bannerIsLoading={isLoading}
            info={data}
          />
        </CustomContainer>
      </Grid>
      {/*<Grid item xs={12}>*/}
      {/*  <CustomContainer>*/}
      {/*    <DiscountedProductRedirectBanner />*/}
      {/*  </CustomContainer>*/}
      {/*</Grid>*/}
      <Grid item xs={12}>
        <CustomContainer>
          <RunningCampaigns />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <LoveItem />
        </CustomContainer>
      </Grid>
      <Grid item xs={12} mb={2}>
        {IsSmallScreen() ? (
          <Coupons />
        ) : (
          <CustomContainer>
            <Coupons />
          </CustomContainer>
        )}
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <NewArrivalStores />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <PromotionalBanner bannerData={data} />
      </Grid>

      <Grid item xs={12}>
        <CustomContainer>
          <Stores />
        </CustomContainer>
      </Grid>
    </Grid>
  );
};

Grocery.propTypes = {};

export default Grocery;
