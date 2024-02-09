import React, { useEffect, useState } from "react";

import { useMediaQuery, useTheme } from "@mui/material";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import Prescription from "../Prescription";
import CustomContainer from "../container";
import Top from "./Top";
import MiddleSection from "./middle-section";
import PopularInTheStore from "./popular";
import { useRouter } from "next/router";
import useGetStoreBanners from "../../api-manage/hooks/react-query/store/useGetStoreBanners";
import StoreCustomMessage from "./StoreCustomMessage";
import useGetModule from "../../api-manage/hooks/react-query/useGetModule";
import { useDispatch } from "react-redux";
import { setSelectedModule } from "../../redux/slices/utils";

const StoreDetails = ({ storeDetails, configData }) => {
  const dispatch = useDispatch();
  const imageBaseUrl = configData?.base_urls?.store_cover_photo_url;
  const bannerCover = `${imageBaseUrl}/${storeDetails?.cover_photo}`;
  const ownCategories = storeDetails?.category_ids;
  const logo = `${configData?.base_urls?.store_image_url}/${storeDetails?.logo}`;
  const [rerender, setRerender] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  let moduleDataInLocalStorage = null;
  const storeShare = {
    moduleId: router.query.module_id,
    moduleType: router.query.module_type,
    storeZoneId: [parseInt(router.query.store_zone_id)],
  };
  const {
    data: bannersData,
    refetch,
    isLoading,
  } = useGetStoreBanners(storeDetails?.id);
  const {
    data: moduleDataFromApi,
    refetch: refetchModule,
    isRefetching,
  } = useGetModule();

  useEffect(() => {
    refetchModule();
  }, []);

  useEffect(() => {
    if (moduleDataFromApi) {
      moduleDataFromApi?.filter((item) => {
        if (storeShare.moduleId == item.id) {
          localStorage.setItem("module", JSON.stringify(item));
          dispatch(setSelectedModule(item));
        }
      });
    }
  }, [moduleDataFromApi]);

  let zoneid = undefined;
  if (typeof window !== "undefined") {
    zoneid = localStorage.getItem("zoneid");
    if (!zoneid) {
      localStorage.setItem("zoneid", `[${storeShare?.storeZoneId}]`);
    }
  }

  const layoutHandler = () => {
    if (isSmall) {
      return (
        <CustomStackFullWidth spacing={3}>
          {storeDetails?.announcement === 1 && (
            <StoreCustomMessage
              storeAnnouncement={storeDetails?.announcement_message}
            />
          )}
          <Top
            bannerCover={bannerCover}
            storeDetails={storeDetails}
            configData={configData}
            logo={logo}
            isSmall={isSmall}
            storeShare={storeShare}
            bannersData={bannersData}
            isLoading={isLoading}
          />
          <PopularInTheStore id={storeDetails?.id} storeShare={storeShare} />
          <CustomContainer>
            <CustomStackFullWidth spacing={3}>
              <MiddleSection
                ownCategories={ownCategories}
                storeDetails={storeDetails}
                isSmall={isSmall}
                storeShare={storeShare}
              />
              {configData?.prescription_order_status &&
                storeDetails?.prescription_order &&
                getCurrentModuleType() === "pharmacy" && (
                  <Prescription storeId={storeDetails?.id} />
                )}
            </CustomStackFullWidth>
          </CustomContainer>
        </CustomStackFullWidth>
      );
    } else {
      return (
        <CustomContainer>
          <CustomStackFullWidth spacing={3}>
            {storeDetails?.announcement === 1 && (
              <StoreCustomMessage
                storeAnnouncement={storeDetails?.announcement_message}
              />
            )}
            <Top
              bannerCover={bannerCover}
              storeDetails={storeDetails}
              configData={configData}
              logo={logo}
              isSmall={isSmall}
              storeShare={storeShare}
              bannersData={bannersData}
            />
            <PopularInTheStore id={storeDetails?.id} storeShare={storeShare} />
            <MiddleSection
              ownCategories={ownCategories}
              storeDetails={storeDetails}
              isSmall={isSmall}
              storeShare={storeShare}
            />
            {configData?.prescription_order_status &&
              storeDetails?.prescription_order &&
              getCurrentModuleType() === "pharmacy" && (
                <Prescription storeId={storeDetails?.id} />
              )}
          </CustomStackFullWidth>
        </CustomContainer>
      );
    }
  };
  return (
    <CustomStackFullWidth
      key={rerender}
      sx={{ minHeight: "100vh" }}
      spacing={3}
    >
      {layoutHandler()}
      {/*<RecommendItems store_id={storeDetails?.id} />*/}
    </CustomStackFullWidth>
  );
};

export default StoreDetails;
