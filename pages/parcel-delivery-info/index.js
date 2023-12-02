import React from "react";
import MainLayout from "../../src/components/layout/MainLayout";
import PercelDelivery from "../../src/components/parcel/parcel-delivery-info-component/ParcelDelivary";
import CssBaseline from "@mui/material/CssBaseline";
import { NoSsr } from "@mui/material";
import { getServerSideProps } from "../index";
import SEO from "../../src/components/seo";
import CustomContainer from "../../src/components/container";
import AuthGuard from "../../src/components/route-guard/AuthGuard";

const Index = ({ configData, landingPageData }) => {
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `Parcel Deliver information` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <NoSsr>
          <CustomContainer>
            <PercelDelivery configData={configData} />
          </CustomContainer>
        </NoSsr>
      </MainLayout>
    </>
  );
};

export default Index;
export { getServerSideProps };
