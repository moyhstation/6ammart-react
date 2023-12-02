import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import CustomContainer from "../../../container";
import pharmacyReviewedImage from "../../assets/grocery_reviewed_image.png";
import Banners from "../../banners";
import BestReviewedItems from "../../best-reviewed-items";
import FeaturedCategories from "../../featured-categories";
import PopularItemsNearby from "../../popular-items-nearby";
import RunningCampaigns from "../../running-campaigns";
import SpecialFoodOffers from "../../special-food-offers";
import Stores from "../../stores";
import FeaturedStores from "../pharmacy/featured-stores";
import CampaignBanners from "./CampaignBanners";
import FeaturedCategoriesWithFilter from "./FeaturedCategoriesWithFilter";
import NewArrivals from "./NewArrivals";
import { IsSmallScreen } from "../../../../utils/CommonValues";
import VisitAgain from "../../visit-again";
import DiscountedProductRedirectBanner from "../../DiscountedProductRedirectBanner";
import LoveItem from "../../love-item";
import SinglePoster from "./SinglePoster";
import useGetOtherBanners from "../../../../api-manage/hooks/react-query/useGetOtherBanners";
import PharmacyStaticBanners from "../pharmacy/pharmacy-banners/PharmacyStaticBanners";

const Shop = (props) => {
  const { configData } = props;
  const menus = ["All", "Beauty", "Bread & Juice", "Drinks", "Milks"];
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
      <Grid item xs={12}>
        <CustomContainer>
          {/*<Banners />*/}
          <PharmacyStaticBanners />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
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
            title="Most Popular Products"
            subTitle="We provide best quality & valuable products around the world"
          />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <CampaignBanners />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <SpecialFoodOffers />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <FeaturedStores title="Popular Store" configData={configData} />
        </CustomContainer>
      </Grid>{" "}
      <Grid item xs={12}>
        <CustomContainer>
          <BestReviewedItems
            menus={menus}
            title="Best Reviewed Items"
            bannerIsLoading={isLoading}
            url={`${data?.promotional_banner_url}/${data?.best_reviewed_section_banner}`}
          />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <NewArrivals bannerData={data} />
        </CustomContainer>
      </Grid>
      {/* <Grid item xs={12}>
        <CustomContainer>
          <DiscountedProductRedirectBanner />
        </CustomContainer>
      </Grid> */}
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
      <Grid item xs={12}>
        <CustomContainer>
          <FeaturedCategoriesWithFilter title="Featured Categories" />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <SinglePoster bannerData={data} />
        </CustomContainer>
      </Grid>
      {/*<Grid item xs={12}>*/}
      {/*  <CustomContainer>*/}
      {/*    <NewArrivalStores />*/}
      {/*  </CustomContainer>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={12}>*/}
      {/*    <CustomContainer>*/}
      {/*        <Banners />*/}
      {/*    </CustomContainer>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={12}>*/}
      {/*    <CustomContainer>*/}
      {/*        <Coupons />*/}
      {/*    </CustomContainer>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={12}>*/}
      {/*    <PromotionalBanner />*/}
      {/*</Grid>*/}
      <Grid item xs={12}>
        <CustomContainer>
          <Stores />
        </CustomContainer>
      </Grid>
    </Grid>
  );
};

Shop.propTypes = {};

export default Shop;
