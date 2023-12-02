import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../layout/MainLayout";
import StoresWithFilter from "../home/stores-with-filter";
import SEO from "../seo";

const AllStore = ({ configData }) => {
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `Store` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />

      <MainLayout configData={configData}>
        <StoresWithFilter />
      </MainLayout>
    </>
  );
};

export default AllStore;
