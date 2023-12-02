import React from "react";
import TrackOrderInput from "../../src/components/track-order/TrackOrderInput";
import CssBaseline from "@mui/material/CssBaseline";
import SEO from "../../src/components/seo";
import MainLayout from "../../src/components/layout/MainLayout";
import { getServerSideProps } from "../index";
import PolicyPage from "../../src/components/policy-page";
import CustomContainer from "../../src/components/container";

const TrackOrder = ({ configData }) => {
  return (
    <div>
      <CssBaseline />
      <SEO
      // image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
      // businessName={configData?.business_name}
      />
      <MainLayout configData={configData}>
        <CustomContainer>
          <TrackOrderInput configData={configData} />
        </CustomContainer>
      </MainLayout>
    </div>
  );
};

export default TrackOrder;
export { getServerSideProps };
