import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import TypeWiseStore from "../../../src/components/Store/TypeWiseStore";
import MainLayout from "../../../src/components/layout/MainLayout";
import { getServerSideProps } from "../../index";
import SEO from "../../../src/components/seo";
import CustomContainer from "../../../src/components/container";
import { CustomStackFullWidth } from "../../../src/styled-components/CustomStyles.style";

const Index = ({ configData, landingPageData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const newText = t("New On");
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `${newText}` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <CustomContainer>
          <CustomStackFullWidth mt="1rem">
            <TypeWiseStore
              configData={configData}
              t={t}
              storeType="latest"
              title={`${newText} ${configData?.business_name} `}
            />
          </CustomStackFullWidth>
        </CustomContainer>
      </MainLayout>
    </>
  );
};

export default Index;
export { getServerSideProps };
