import { LandingLayout } from "../src/components/layout/LandingLayout";
import LandingPage from "../src/components/landing-page";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConfigData } from "../src/redux/slices/configData";
import Router from "next/router";
import MetaData from "./meta-data";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/seo";

const Root = (props) => {
  const { configData, landingPageData } = props;
  const dispatch = useDispatch();
  useEffect(() => {
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
  }, [configData]);
  useEffect(() => {
    dispatch(setConfigData(configData));
  }, [configData]);

  return (
    <>
      <CssBaseline />
      <SEO
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <LandingLayout configData={configData}>
        <LandingPage
          configData={configData}
          landingPageData={landingPageData}
        />
      </LandingLayout>
    </>
  );
};
export default Root;
const { getCache, setCache } = require("../cache");
export const getServerSideProps = async () => {
  const cacheKey = "serverSidePropsData"; // Cache key for server-side props data
  let cachedData = getCache(cacheKey);

  if (!cachedData) {
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

    const landingPageRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/react-landing-page`,
      {
        method: "GET",
        headers: {
          "X-software-id": 33571750,
          "X-server": "server",
          origin: process.env.NEXT_CLIENT_HOST_URL,
        },
      }
    );
    const landingPageData = await landingPageRes.json();

    // Cache the fetched data
    setCache(cacheKey, {
      configData: config,
      landingPageData: landingPageData,
    });

    cachedData = {
      configData: config,
      landingPageData: landingPageData,
    };
  }

  return {
    props: cachedData,
  };
};
