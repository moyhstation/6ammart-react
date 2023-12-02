import React, { useEffect, useState } from "react";
import ComponentOne from "./ComponentOne";
import Registration from "./Registration";
import ComponentTwo from "./ComponentTwo";
import HeroSection from "./hero-section/HeroSection";
import dynamic from "next/dynamic";
import PushNotificationLayout from "../PushNotificationLayout";
import AppDownloadSection from "./app-download-section/index";
import { useGeolocated } from "react-geolocated";
import { useRouter } from "next/router";
import MapModal from "../Map/MapModal";
import Banners from "./Banners";
import { NoSsr, useMediaQuery, useTheme } from "@mui/material";
import DiscountBanner from "./DiscountBanner";
import CookiesConsent from "../CookiesConsent";
import useGetGuest from "../../api-manage/hooks/react-query/guest/useGetGuest";

const LandingPage = ({ configData, landingPageData }) => {
  const Testimonials = dynamic(() => import("./Testimonials"), {
    ssr: false,
  });
  const [location, setLocation] = useState(undefined);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    isGeolocationEnabled: true,
  });
  useEffect(() => {
    setLocation(JSON.stringify(localStorage.getItem("location")));
  }, []);
  const handleClose = () => {
    const location = localStorage.getItem("location");
    const isModuleExist = localStorage.getItem("module");
    if (location) {
      isModuleExist && setOpen(false);
    } else {
      setOpen(false);
    }
  };
  const router = useRouter();
  const handleOrderNow = () => {
    if (location) {
      if (location === "null") {
        setOpen(true);
      } else {
        router.push("/home", undefined, { shallow: true });
      }
    } else {
      setOpen(true);
    }
  };
  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const { data: guestData, refetch: guestRefetch, isLoading } = useGetGuest();
  useEffect(() => {
    if (!token) {
      guestRefetch();
    }
  }, []);
  localStorage.setItem("guest_id", guestData?.guest_id);

  return (
    <>
      <PushNotificationLayout>
        <HeroSection
          configData={configData}
          landingPageData={landingPageData}
          handleOrderNow={handleOrderNow}
        />
        <ComponentOne
          landingPageData={landingPageData}
          configData={configData}
          handleOrderNow={handleOrderNow}
        />
        {landingPageData?.promotion_banners?.length > 0 && (
          <Banners landingPageData={landingPageData} isSmall={isSmall} />
        )}
        <ComponentTwo
          configData={configData}
          landingPageData={landingPageData}
        />
        {(landingPageData?.earning_title ||
          landingPageData?.earning_sub_title ||
          landingPageData?.earning_seller_title ||
          landingPageData?.earning_seller_sub_title ||
          landingPageData?.earning_dm_title ||
          landingPageData?.earning_dm_sub_title) && (
          <Registration data={landingPageData} isSmall={isSmall} />
        )}
        {landingPageData?.fixed_promotional_banner && (
          <DiscountBanner
            bannerImage={`${landingPageData?.base_urls?.promotional_banner_url}/${landingPageData?.fixed_promotional_banner}`}
            isSmall={isSmall}
          />
        )}
        {(landingPageData?.business_title ||
          landingPageData?.business_sub_title ||
          landingPageData?.business_image) && (
          <AppDownloadSection
            configData={configData}
            landingPageData={landingPageData}
          />
        )}
        {landingPageData?.testimonial_list?.length > 0 && (
          <Testimonials landingPageData={landingPageData} isSmall={isSmall} />
        )}
        {open && (
          <MapModal
            open={open}
            handleClose={handleClose}
            coords={coords}
            disableAutoFocus
          />
        )}
        <NoSsr>
          <CookiesConsent text={configData?.cookies_text} />
        </NoSsr>
      </PushNotificationLayout>
    </>
  );
};

export default LandingPage;
