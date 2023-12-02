import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../../src/components/layout/MainLayout";
import ModuleWiseLayout from "../../../src/components/module-wise-layout";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { setConfigData } from "../../../src/redux/slices/configData";
import StoreDetails from "../../../src/components/store-details";
import {
  config_api,
  store_details_api,
} from "../../../src/api-manage/ApiRoutes";
import MetaData from "../../meta-data";
import SEO from "../../../components/seo";

const Index = ({ configData, storeDetails }) => {
  const dispatch = useDispatch();
  const metaTitle = `${storeDetails?.name} - ${configData?.business_name}`;
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
    if (configData) {
      if (configData.length === 0) {
        Router.push("/404");
      }
      else if(configData?.maintenance_mode){
        Router.push("/maintainance");
      }
      else {
        dispatch(setConfigData(configData));
      }
    } else {
    }
  }, [configData]);

  return (
    <>
      {!isSSR && (
        <>
          <CssBaseline />
          <SEO
            image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
            businessName={configData?.business_name}
          />
          <MainLayout configData={configData}>
            <StoreDetails storeDetails={storeDetails} configData={configData} />
          </MainLayout>
        </>
      )}
    </>
  );
};

export default Index;
export const getServerSideProps = async (context) => {
  const storeId = context.query.id;
  const moduleId = context.query.module_id;

  const configRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${config_api}`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
        origin: process.env.NEXT_CLIENT_HOST_URL,
      },
    }
  );
  const storeDetailsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${store_details_api}/${storeId}`,
    {
      method: "GET",
      headers: {
        moduleId: moduleId,
        "X-software-id": 33571750,
        "X-server": "server",
        origin: process.env.NEXT_CLIENT_HOST_URL,
      },
    }
  );
  const config = await configRes.json();
  const storeDetails = await storeDetailsRes.json();
  return {
    props: {
      configData: config,
      storeDetails: storeDetails,
    },
  };
};
