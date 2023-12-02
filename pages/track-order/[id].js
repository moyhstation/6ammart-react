import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import {getServerSideProps} from "../index";
import TrackOrder from "../../src/components/track-order";
import {NoSsr} from "@mui/material";
import SEO from "../../src/components/seo";

const index = ({ configData, landingPageData }) => {
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `Track your order` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData} landingPageData={landingPageData}>
          <NoSsr>
              <TrackOrder configData={configData}/>
          </NoSsr>
      </MainLayout>
    </>
  );
};

export default index;
export {getServerSideProps}
