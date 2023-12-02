import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import ModuleWiseLayout from "../../src/components/module-wise-layout";
import MyOrders from "../../src/components/my-orders";
import MetaData from "../meta-data";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import { useRouter } from "next/router";
import {getServerSideProps} from "../index";
import RateAndReview from "../../src/components/review/RateAndReview";
import SEO from "../../components/seo";

const Index = ({ configData }) => {
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
          <RateAndReview />
        </MainLayout>
      </AuthGuard>
    </>
  );
};

export default Index;
export {getServerSideProps}
