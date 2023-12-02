import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetItemCampaigns from "../../../api-manage/hooks/react-query/useGetItemCampaigns";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { getModuleId } from "../../../helper-functions/getModuleId";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";
import { setCampaignItem } from "../../../redux/slices/cart";
import { setRunningCampaigns } from "../../../redux/slices/storedData";
import FoodDetailModal from "../../food-details/foodDetail-modal/FoodDetailModal";
import H2 from "../../typographies/H2";
import { HomeComponentsWrapper } from "../HomePageComponents";
import SliderShimmer from "../SliderShimmer";
import Grocery from "./Grocery";
import Pharmacy from "./pharmacy";

const RunningCampaigns = () => {
  const { configData } = useSelector((state) => state.configData);
  const [openModal, setOpenModal] = useState(false);
  const [campaignsData, setCampaignsData] = useState({});
  const imageBaseUrl = configData?.base_urls?.campaign_image_url;
  const { data, refetch, isFetching, isLoading } = useGetItemCampaigns();
  const router = useRouter();
  const { runningCampaigns } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    dispatch(setRunningCampaigns(data));
  }, [data]);
  const handleClick = (product) => {
    if (getCurrentModuleType() === "ecommerce") {
      dispatch(setCampaignItem(product));
      router.push(
        {
          pathname: "/product/[id]",
          query: {
            id: `${product?.slug ? product?.slug : product?.id}`,
            module_id: `${getModuleId()}`,
            product_type: "campaign",
          },
        },
        undefined,
        { shallow: true }
      );
    } else {
      setCampaignsData(product);
      setOpenModal(true);
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const getModuleWiseView = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.GROCERY:
        return (
          <Grocery
            runningCampaigns={runningCampaigns}
            handleClick={handleClick}
            configData={configData}
            isFetching={isFetching}
          />
        );
      case ModuleTypes.PHARMACY:
        return (
          <Pharmacy
            runningCampaigns={runningCampaigns}
            handleClick={handleClick}
            configData={configData}
            isFetching={isFetching}
          />
        );
      case ModuleTypes.ECOMMERCE:
        return (
          <Grocery
            runningCampaigns={runningCampaigns}
            handleClick={handleClick}
            configData={configData}
            isFetching={isFetching}
          />
        );
      case ModuleTypes.FOOD:
        return (
          <Grocery
            runningCampaigns={runningCampaigns}
            handleClick={handleClick}
            configData={configData}
            isFetching={isFetching}
          />
        );
    }
  };
  return (
    <>
      {isLoading ? (
        <SliderShimmer />
      ) : (
        <>
          {runningCampaigns?.length > 0 ? (
            <HomeComponentsWrapper alignItems="flex-start" mt="30px">
              {runningCampaigns?.length > 0 && <H2 text="Just For You" />}
              <Box sx={{ width: "100%", mt: ".3rem" }}>
                {getModuleWiseView()}
              </Box>
            </HomeComponentsWrapper>
          ) : (
            ""
          )}
        </>
      )}
      {openModal && (
        <FoodDetailModal
          product={campaignsData}
          imageBaseUrl={imageBaseUrl}
          open={openModal}
          handleModalClose={handleClose}
        />
      )}
    </>
  );
};

export default RunningCampaigns;
