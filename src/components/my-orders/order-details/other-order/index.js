import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { onErrorResponse } from "../../../../api-manage/api-error-response/ErrorResponses";
import useGetTrackOrderData from "../../../../api-manage/hooks/react-query/order/useGetTrackOrderData";
import { useStoreRefundRequest } from "../../../../api-manage/hooks/react-query/refund-request/useStoreRefundRequest";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../../../styled-components/CustomStyles.style";
import CustomDivider from "../../../CustomDivider";
import NoDeliveryManImage from "../../../NoDeliveryManImage";
import TrackParcelOrderDrawer from "../../../home/module-wise-components/parcel/TrackParcelOrderDrawer";
import TrackOrder from "../../../track-order";
import ProfileTab from "../../../user-information/ProfileTab";
import TopDetails from "../TopDetails";
import {
  orderDetailsMenuData,
  orderDetailsMenuDataForParcel,
} from "../orderDetailsMenuData";
import DeliveryManInfo from "./DeliveryManInfo";
import OrderSummery from "./OrderSummery";
import RefundModal from "./RefundModal";
import StoreDetails from "./StoreDetails";
import {useSelector} from "react-redux";
import {getGuestId} from "../../../../helper-functions/getToken";

const OtherOrder = (props) => {
  const { configData, data, refetch, id, dataIsLoading } = props;
  const [openModal, setOpenModal] = useState(false);
  const [currentTab, setCurrentTab] = useState(orderDetailsMenuData[0]?.name);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const router = useRouter();
  const { tab } = router.query;
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const guestId = getGuestId();
  const { guestUserInfo } = useSelector((state) => state.guestUserInfo);
  const phone=guestUserInfo?.contact_person_number
  const {
    refetch: refetchTrackOrder,
    data: trackOrderData,
    isLoading: trackDataIsLoading,
    isFetching: trackDataIsFetching,
  } =  useGetTrackOrderData(id, phone,guestId);
  useEffect(() => {
    refetchTrackOrder();
  }, []);

  const { mutate, isLoading: refundIsLoading } = useStoreRefundRequest();
  const formSubmitHandler = (values) => {
    const tempValue = { ...values, id };
    const onSuccessHandler = async (resData) => {
      if (resData) {
        await refetchTrackOrder();
        toast.success(resData.message);
        setOpenModal(false);
      }

      // router.push('/')
    };
    mutate(tempValue, {
      onSuccess: onSuccessHandler,
      onError: onErrorResponse,
    });
  };
  const handleTab = (item) => {
    if (item.name === "track-order") {
      if (trackOrderData?.module_type === "parcel") {
        setSideDrawerOpen(true);
      } else {
        setCurrentTab(item?.name);
      }
    } else {
      setCurrentTab(item?.name);
    }
  };
  useEffect(() => {
    if (tab) {
      setCurrentTab(tab);
    }
  }, [tab]);
  const activeTabPanel = () => {
    switch (currentTab) {
      case "order-summary":
        return (
          <OrderSummery
            trackOrderData={trackOrderData}
            refetchTrackOrder={refetchTrackOrder}
            configData={configData}
            t={t}
            data={data}
            isLoading={trackDataIsLoading}
            dataIsLoading={dataIsLoading}
          />
        );
        break;
      case "seller-info":
        return (
          <>
            {data && data.module_type !== "parcel" && (
              <StoreDetails
                storeData={trackOrderData?.store}
                configData={configData}
                t={t}
              />
            )}
          </>
        );
        break;
      case "delivery-man-info":
        return (
          <>
            {trackOrderData?.delivery_man ? (
              <DeliveryManInfo
                deliveryManData={trackOrderData?.delivery_man}
                configData={configData}
                t={t}
              />
            ) : (
              <CustomStackFullWidth
                minHeight="20vh"
                justifyContent="center"
                alignItems="center"
              >
                <NoDeliveryManImage />
                <Typography> No delivery man assigned </Typography>
              </CustomStackFullWidth>
            )}
          </>
        );
        break;
      case "track-order":
        return (
          <TrackOrder
            trackOrderData={trackOrderData}
            configData={configData}
            t={t}
          />
        );
        break;
      default:
        break;
    }
  };

  return (
    <CustomStackFullWidth alignItems="center" justifyContent="center" mb="2rem">
      {isSmall ? (
        <CustomPaperBigCard padding="14px">
          <TopDetails
            data={data}
            trackData={trackOrderData}
            trackDataIsLoading={trackDataIsLoading}
            trackDataIsFetching={trackDataIsFetching}
            currentTab={currentTab}
            configData={configData}
            id={id}
            openModal={openModal}
            setOpenModal={setOpenModal}
            refetchOrderDetails={refetch}
            refetchTrackData={refetchTrackOrder}
            dataIsLoading={dataIsLoading}
          />
          <CustomDivider border="1px" />
          <ProfileTab
            menuData={
              data && data.module_type === "parcel"
                ? orderDetailsMenuDataForParcel
                : orderDetailsMenuData
            }
            marginright="20px"
            fontSize="14px"
            padding="15px 15px 15px 25px"
            borderRadius="5px"
            page={currentTab}
            handlePage={handleTab}
          />
          {trackOrderData && activeTabPanel()}
        </CustomPaperBigCard>
      ) : (
        <>
          <TopDetails
            data={data}
            trackData={trackOrderData}
            trackDataIsLoading={trackDataIsLoading}
            trackDataIsFetching={trackDataIsFetching}
            currentTab={currentTab}
            configData={configData}
            id={id}
            openModal={openModal}
            setOpenModal={setOpenModal}
            refetchOrderDetails={refetch}
            refetchTrackData={refetchTrackOrder}
            dataIsLoading={dataIsLoading}
          />
          <CustomDivider />
          <ProfileTab
            menuData={
              data && data.module_type === "parcel"
                ? orderDetailsMenuDataForParcel
                : orderDetailsMenuData
            }
            marginright="20px"
            fontSize="14px"
            padding="15px 15px 15px 25px"
            borderRadius="5px"
            page={currentTab}
            handlePage={handleTab}
          />
          {trackOrderData && activeTabPanel()}
        </>
      )}
      <RefundModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        // reasons={reasonsData?.refund_reasons}
        formSubmit={formSubmitHandler}
        // refundIsLoading={refundIsLoading}
      />
      {sideDrawerOpen && trackOrderData && (
        <TrackParcelOrderDrawer
          orderId={trackOrderData?.id}
          sideDrawerOpen={sideDrawerOpen}
          setSideDrawerOpen={setSideDrawerOpen}
          closeHandler={() => setSideDrawerOpen(false)}
        />
      )}
    </CustomStackFullWidth>
  );
};

OtherOrder.propTypes = {};

export default OtherOrder;
