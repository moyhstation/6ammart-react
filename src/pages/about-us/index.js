import { useTranslation } from "react-i18next";
import useGetPolicyPage from "../../src/api-manage/hooks/react-query/useGetPolicyPage";
import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import PolicyPage from "../../src/components/policy-page";
import { CustomHeader } from "../../src/api-manage/Headers";
import {getServerSideProps} from "../index";
import SEO from "../../components/seo";

const Index = ({ configData }) => {
  const { t } = useTranslation();
  const { data, refetch, isFetching } = useGetPolicyPage("/about-us");
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `About Us` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData}>
        <PolicyPage
          data={{ ...data, value: data }}
          title={t("About us")}
          isFetching={isFetching}
        />
      </MainLayout>
    </>
  );
};

export default Index;
export {getServerSideProps}
