import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../../src/components/layout/MainLayout";
import { useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
import { setConfigData } from "../../../src/redux/slices/configData";
import StoreDetails from "../../../src/components/store-details";
import {
  config_api,
  store_details_api,
} from "../../../src/api-manage/ApiRoutes";
import SEO from "../../../src/components/seo";

const Index = ({ configData, storeDetails, landingPageData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { distance } = router.query;
  const metaTitle = `${
    storeDetails?.meta_title ? storeDetails?.meta_title : storeDetails?.name
  } - ${configData?.business_name}`;
  const metaImage = `${configData?.base_urls?.store_image_url}/${
    storeDetails?.meta_image ?? storeDetails.cover_photo
  }`;
  const [isSSR, setIsSSR] = useState(true);

  const initialSet = () => {
    const stores = [];
    stores.push(storeDetails);
    localStorage.setItem("visitedStores", JSON.stringify(stores));
  };
  const manageVisitAgain = () => {
    if (localStorage.getItem("visitedStores")) {
      let visitedStores = JSON.parse(localStorage.getItem("visitedStores"));
      if (visitedStores?.length > 0) {
        if (!visitedStores.find((item) => item?.id === storeDetails?.id)) {
          visitedStores.push({ ...storeDetails, distance: distance });
        }
        localStorage.setItem("visitedStores", JSON.stringify(visitedStores));
      } else {
        initialSet();
      }
    } else {
      initialSet();
    }
  };

  useEffect(() => {
    //setIsSSR(false);
    if (storeDetails) {
      manageVisitAgain();
    }
    if (configData) {
      if (configData.length === 0) {
        Router.push("/404");
      } else if (configData?.maintenance_mode) {
        Router.push("/maintainance");
      } else {
        dispatch(setConfigData(configData));
      }
    } else {
    }
  }, [configData, storeDetails]);

  return (
    <>
      <>
        <CssBaseline />
        <SEO
          title={metaTitle ? metaTitle : "loading"}
          image={metaImage}
          businessName={configData?.business_name}
          description={storeDetails?.meta_description}
          configData={configData}
        />
        {/*<Head>*/}
        {/*  <meta name="description" content={storeDetails?.meta_description} />*/}
        {/*</Head>*/}
        <MainLayout configData={configData} landingPageData={landingPageData}>
          <StoreDetails storeDetails={storeDetails} configData={configData} />
        </MainLayout>
      </>
    </>
  );
};

export default Index;
export const getServerSideProps = async (context) => {
  const storeId = context.query.id;
  const moduleId = context.query.module_id;
  const { req } = context;
  const language = req.cookies.languageSetting;
  const lat = context.query.lat;
  const lng = context.query.lng;

  const configRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${config_api}`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
        origin: process.env.NEXT_CLIENT_HOST_URL,
        "X-localization": language,
        lat: lat,
        lng: lng,
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
        "X-localization": language,
      },
    }
  );
  const landingPageRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/react-landing-page`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
        origin: process.env.NEXT_CLIENT_HOST_URL,
        "X-localization": language,
      },
    }
  );
  const landingPageData = await landingPageRes.json();
  const config = await configRes.json();
  const storeDetails = await storeDetailsRes.json();
  return {
    props: {
      configData: config,
      storeDetails: storeDetails,
      landingPageData: landingPageData,
    },
  };
};
