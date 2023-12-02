import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../../meta-data";
import MainLayout from "../../../src/components/layout/MainLayout";
import CampaignsDetails from "../../../src/components/campaigns-details";
import {
  basic_campaigns_details_api,
  store_details_api,
} from "../../../src/api-manage/ApiRoutes";
import { useRouter } from "next/router";
import useGetBasicCampaignsDetails from "../../../src/api-manage/hooks/react-query/useGetBasicCampaignsDetails";
import SEO from "../../../components/seo";

const Index = ({ configData, campaignsDetails }) => {
  const router = useRouter();
  const id = router.query.id;
  const { data, refetch, isLoading, isRefetching } =
    useGetBasicCampaignsDetails({ id });
  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `${data?.title}` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData}>
        <CampaignsDetails
          campaignsDetails={data}
          configData={configData}
          isLoading={isLoading}
          isRefetching={isRefetching}
        />
      </MainLayout>
    </>
  );
};

export default Index;
export const getServerSideProps = async (context) => {
  const campaignsId = context.params.id.split("-")[0];
  const moduleId = context.params.id.split("-")[1];
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
  // const campaignsDetailsRes = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}${basic_campaigns_details_api}?basic_campaign_id=4`,
  //   {
  //     method: "GET",
  //     headers: {
  //       moduleId: moduleId,
  //       "X-software-id": 33571750,
  //       "X-server": "server",
  //       origin: process.env.NEXT_CLIENT_HOST_URL,
  //       zoneid: [1],
  //     },
  //   }
  // );
  const config = await configRes.json();
  //const campaignsDetails = await campaignsDetailsRes.json();
  return {
    props: {
      configData: config,
      // campaignsDetails: campaignsDetails,
    },
  };
};
