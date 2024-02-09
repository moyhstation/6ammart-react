import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import CustomContainer from "../../../container";
import Banners from "../../banners";
import BestReviewedItems from "../../best-reviewed-items";
import FeaturedCategories from "../../featured-categories";
import RunningCampaigns from "../../running-campaigns";
import Stores from "../../stores";
import VisitAgain from "../../visit-again";
import FeaturedStores from "./featured-stores";
import PharmacyStaticBanners from "./pharmacy-banners/PharmacyStaticBanners";
import CommonConditions from "./common-conditions";
import useGetOtherBanners from "../../../../api-manage/hooks/react-query/useGetOtherBanners";
import OrderDetailsModal from "../../../order-details-modal/OrderDetailsModal";
import { useSelector } from "react-redux";
import { getToken } from "../../../../helper-functions/getToken";
import { getCurrentModuleId } from "../../../../helper-functions/getCurrentModuleType";

const menus = ["All", "New", "Baby Care", "Womans Care", "Mens"];

const Pharmacy = ({ configData }) => {
  const token = getToken();
  const { orderDetailsModalOpen } = useSelector((state) => state.utilsData);
  const { data, refetch, isLoading } = useGetOtherBanners();
  useEffect(() => {
    refetch();
  }, []);
  const visitedStores = localStorage.getItem("visitedStores")
    ? JSON.parse(localStorage.getItem("visitedStores"))?.length > 0
      ? JSON.parse(localStorage.getItem("visitedStores"))?.filter(
          (item) => item?.module_id === getCurrentModuleId()
        )
      : []
    : [];
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ marginTop: "10px" }}>
        <CustomContainer>
          <FeaturedCategories configData={configData} />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <PharmacyStaticBanners />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <VisitAgain configData={configData} visitedStores={visitedStores} />
        </CustomContainer>
      </Grid>

      <Grid item xs={12}>
        <CustomContainer>
          <BestReviewedItems
            menus={menus}
            title="Basic Medicine Nearby"
            bannerIsLoading={isLoading}
            url={`${data?.promotional_banner_url}/${data?.basic_section_nearby}`}
          />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <Banners />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <FeaturedStores title="Featured Store" configData={configData} />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <RunningCampaigns />
        </CustomContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomContainer>
          <CommonConditions title="Common Conditions" />
        </CustomContainer>
      </Grid>
      {/*<Grid item xs={12}>*/}
      {/*  <CustomContainer>*/}
      {/*    <RedirectBanner />*/}
      {/*  </CustomContainer>*/}
      {/*</Grid>*/}
      <Grid
        item
        xs={12}
        sx={{
          position: "sticky",
          top: { xs: "47px", md: "92px" },
          zIndex: 999,
        }}
      >
        <CustomContainer>
          <Stores />
        </CustomContainer>
      </Grid>
      {orderDetailsModalOpen && !token && (
        <OrderDetailsModal orderDetailsModalOpen={orderDetailsModalOpen} />
      )}
    </Grid>
  );
};

Pharmacy.propTypes = {};

export default Pharmacy;
