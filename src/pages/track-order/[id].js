import {getServerSideProps} from "../index";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import dynamic from "next/dynamic";
import SEO from "../../components/seo";
const index = ({ configData }) => {
  const TrackOrder = dynamic(() => import("../../src/components/track-order"), {
    ssr: false,
  });
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `Track your order` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData}>
        <TrackOrder configData={configData} />
      </MainLayout>
    </>
  );
};

export default index;
export {getServerSideProps}
