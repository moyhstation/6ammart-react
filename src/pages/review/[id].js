import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import { useRouter } from "next/router";
import ReviewPage from "../../src/components/review";
import SEO from "../../components/seo";

import {getServerSideProps} from "../index";
const Index = ({ configData, landingPageData }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <SEO
        title={configData ? `Review` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <CssBaseline />
      <AuthGuard from={router.pathname.replace("/", "")}>
        <MainLayout configData={configData} landingPageData={landingPageData}>
          <ReviewPage id={id} />
        </MainLayout>
      </AuthGuard>
    </>
  );
};

export default Index;
export {getServerSideProps}
