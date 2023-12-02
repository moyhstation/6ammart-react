import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import TypeWiseStore from "../../../src/components/Store/TypeWiseStore";
import MainLayout from "../../../src/components/layout/MainLayout";
import { getServerSideProps } from "../../index";
import SEO from "../../../src/components/seo";
import { PageDetailsWrapper } from "../../../src/styled-components/CustomStyles.style";
import CustomContainer from "../../../src/components/container";

const Index = ({ configData, landingPageData }) => {
  const { t } = useTranslation();
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `${t("Popular store")}` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <PageDetailsWrapper>
          <CustomContainer>
            <TypeWiseStore
              configData={configData}
              t={t}
              storeType="popular"
              title="Popular Stores"
            />
          </CustomContainer>
        </PageDetailsWrapper>
      </MainLayout>
    </>
  );
};

export default Index;
export { getServerSideProps };
