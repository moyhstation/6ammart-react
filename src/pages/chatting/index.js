import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Chatting from "../../src/components/chat/Chatting";
import {getServerSideProps} from "../index";
import SEO from "../../components/seo";

const Index = ({ configData, landingPageData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `Chat` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <AuthGuard from={router.pathname.replace("/", "")}>
          <Chatting configData={configData} />
        </AuthGuard>
      </MainLayout>
    </>
  );
};

export default Index;
export {getServerSideProps}
