import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import CustomContainer from "../../../container";
import FeaturedCategories from "../../featured-categories";
import Banners from "../../banners";
import { IsSmallScreen } from "../../../../utils/CommonValues";
import VisitAgain from "../../visit-again";
import SpecialFoodOffers from "../../special-food-offers";
import BestReviewedItems from "../../best-reviewed-items";
import Stores from "../../stores";
import bestFoodReviewImage from "../../assets/food_best_review.png";
import NewArrivalStores from "../../new-arrival-stores";
import DiscountedProductRedirectBanner from "../../DiscountedProductRedirectBanner";
import RunningCampaigns from "../../running-campaigns";
import FeaturedCategoriesWithFilter from "../ecommerce/FeaturedCategoriesWithFilter";
import SinglePoster from "../ecommerce/SinglePoster";
import LoveItem from "../../love-item";
import useGetOtherBanners from "../../../../api-manage/hooks/react-query/useGetOtherBanners";

const FoodModule = (props) => {
  const { configData } = props;
  const { data,refetch,isLoading } = useGetOtherBanners();
  useEffect(() => {
    refetch();
  }, [])

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ marginTop: { xs: "-10px", sm: "10px" } }}>
        <CustomContainer>
          <FeaturedCategories configData={configData} />
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
          <SpecialFoodOffers title="Special Food Offers" />
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
            title="Best Reviewed Items"
            info={data}
          />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <LoveItem />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <NewArrivalStores />
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
         <FeaturedCategoriesWithFilter title="Featured Categories" />
       </CustomContainer>
      </Grid>
        <Grid item xs={12}>
            <CustomContainer>
                <Stores />
            </CustomContainer>
        </Grid>
      {/* <Grid item xs={12}>
       <CustomContainer>
         <SinglePoster />
       </CustomContainer>
      </Grid> */}
    </Grid>
  );
};

FoodModule.propTypes = {};

export default FoodModule;
