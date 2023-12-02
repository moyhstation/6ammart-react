import React, { useEffect, useState } from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";
//import DeliverymanForm from "./DeliverymanForm";
import useGetOrderDetails from "../../api-manage/hooks/react-query/order/useGetOrderDetails";
import GroupButtonsRateAndReview from "./GroupButtonsRateAndReview";
import ItemForm from "./ItemsFrom";
import Shimmer from "./Shimmer";
import DeliverymanForm from "./DeliverymanForm";
import useGetTrackOrderData from "../../api-manage/hooks/react-query/order/useGetTrackOrderData";
import { Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomEmptyResult from "../custom-empty-result";
import nodata from "../../../public/static/nodata.png";
import { Stack } from "@mui/system";

const RateAndReview = () => {
  const { deliveryManInfo } = useSelector((state) => state.searchFilterStore);
  const [type, setType] = useState("items");
  const router = useRouter();
  const { id } = router.query;
  const { refetch, data, isRefetching } = useGetOrderDetails(id);
  const {
    refetch: refetchTrackOrder,
    data: trackOrderData,
    isRefetching: refetchingTrackOrder,
  } = useGetTrackOrderData(id);

  useEffect(() => {
    id && refetch() && refetchTrackOrder();
  }, [id]);

  return (
    <CustomStackFullWidth
      alignItems="center"
      justifyContent="center"
      spacing={2}
      mt="1rem"
    >
      {isRefetching ? (
        <Skeleton variant="ractangle" width="100px" height="100%" />
      ) : (
        deliveryManInfo &&
        data?.module_type !== "parcel" && (
          <GroupButtonsRateAndReview
            setType={setType}
            type={type}
            moduleType={data?.module_type}
          />
        )
      )}
      <CustomStackFullWidth
        alignItems="center"
        justifyContent="center"
        spacing={3}
      >
        {type === "items" && data?.module_type !== "parcel" ? (
          data ? (
            data?.map((item, index) => {
              return (
                <CustomPaperBigCard key={index}>
                  <ItemForm data={item} />
                </CustomPaperBigCard>
              );
            })
          ) : (
            <Shimmer />
          )
        ) : (
          <CustomPaperBigCard>
            {trackOrderData?.delivery_man ? (
              <DeliverymanForm
                data={trackOrderData?.delivery_man}
                orderId={id}
              />
            ) : (
              <CustomStackFullWidth justifyContent="center" alignItems="center">
                <Stack
                  width="100%"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <CustomEmptyResult
                    label="No delivery man assigned for the delivery."
                    image={nodata}
                  />
                </Stack>
              </CustomStackFullWidth>
            )}
          </CustomPaperBigCard>
        )}
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default RateAndReview;
