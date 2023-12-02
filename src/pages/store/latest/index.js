import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import TypeWiseStore from "../../../src/components/Store/TypeWiseStore";
import MainLayout from "../../../src/components/layout/MainLayout";
import { getServerSideProps } from "../../index";
import SEO from "../../../components/seo";
import CustomContainer from "../../../components/container";

const Index = ({ configData, landingPageData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const newText = t("New On");
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `Home` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <CustomContainer>
          <TypeWiseStore
            configData={configData}
            t={t}
            storeType="latest"
            title={`${newText} ${configData?.business_name} `}
          />
        </CustomContainer>
      </MainLayout>
    </>
  );
};

export default Index;
export { getServerSideProps };
