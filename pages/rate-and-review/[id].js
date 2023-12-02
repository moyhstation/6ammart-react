import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import { useRouter } from "next/router";
import { getServerSideProps } from "../index";
import RateAndReview from "../../src/components/review/RateAndReview";
import SEO from "../../src/components/seo";
import CustomContainer from "../../src/components/container";

const Index = ({ configData, landingPageData }) => {
  const router = useRouter();

  return (
    <>
      <SEO
        title={configData ? `Rate and Review` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <CssBaseline />
      <AuthGuard from={router.pathname.replace("/", "")}>
        <MainLayout configData={configData}>
          <CustomContainer>
            <RateAndReview />
          </CustomContainer>
        </MainLayout>
      </AuthGuard>
    </>
  );
  return (
    <>
      <CssBaseline />
      <SEO
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <AuthGuard from={router.pathname.replace("/", "")}>
        <MainLayout configData={configData} landingPageData={landingPageData}>
          <RateAndReview />
        </MainLayout>
      </AuthGuard>
    </>
  );
};

export default Index;
export { getServerSideProps };
