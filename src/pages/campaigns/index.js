import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import CampaignsPage from "../../src/components/Campaigns";
import SEO from "../../components/seo";

const Index = ({ configData, campaignsDetails }) => {
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `Campaigns` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData}>
        <CampaignsPage />
      </MainLayout>
    </>
  );
};

export default Index;
export const getServerSideProps = async () => {
  const configRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
        origin: process.env.NEXT_CLIENT_HOST_URL,
      },
    }
  );

  const config = await configRes.json();

  return {
    props: {
      configData: config,
    },
  };
};
