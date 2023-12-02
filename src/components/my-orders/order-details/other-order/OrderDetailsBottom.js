import React, { useEffect, useState } from "react";

import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Router from "next/router";

import { toast } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";
import { CustomPaperBigCard } from "../../../../styled-components/CustomStyles.style";
import usePostOrderCancel from "../../../../api-manage/hooks/react-query/order/usePostOrderCancel";
import { onErrorResponse } from "../../../../api-manage/api-error-response/ErrorResponses";
import CustomModal from "../../../modal";
import DigitalPaymentManage from "../DigitalPaymentManage";
import CancelOrder from "../CenacelOrder";
import { useGetOrderCancelReason } from "../../../../api-manage/hooks/react-query/order/useGetOrderCancelReason";
import { useQuery } from "react-query";
import { GoogleApi } from "../../../../api-manage/hooks/react-query/googleApi";

const OrderDetailsBottom = ({
  id,
  refetchOrderDetails,
  refetchTrackData,
  trackData,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalForPayment, setModalOpenForPayment] = useState();
  const [cancelReason, setCancelReason] = useState(null);
  const { t } = useTranslation();
  const theme = useTheme();
  const currentLatLng = JSON.parse(
    window.localStorage.getItem("currentLatLng")
  );
  const { data: zoneData } = useQuery(
    ["zoneId", location],
    async () => GoogleApi.getZoneId(currentLatLng),
    {
      retry: 1,
    }
  );

  const { data: cancelReasonsData, refetch } = useGetOrderCancelReason();
  useEffect(() => {
    refetch().then();
  }, []);

  const { mutate: orderCancelMutation, isLoading: orderLoading } =
    usePostOrderCancel();
  const handleTrackOrderClick = () => {
    Router.push(`/track-order/${id}`, undefined, { shallow: true });
  };
  const handleOnSuccess = () => {
    if (!cancelReason) {
      toast.error("Please select a cancellation reason");
    } else {
      const handleSuccess = (response) => {
        refetchOrderDetails();
        refetchTrackData();
        setOpenModal(false);
        toast.success(response.message);
      };
      const formData = {
        order_id: id,
        reason: cancelReason,
        _method: "put",
      };
      orderCancelMutation(formData, {
        onSuccess: handleSuccess,
        onError: onErrorResponse,
      });
    }
  };

  return (
    <>
      <CustomPaperBigCard>
        <Grid container spacing={2}>
          {trackData &&
            (trackData?.order_status === "pending" ||
              trackData?.order_status === "confirmed" ||
              trackData?.order_status === "processing" ||
              trackData?.order_status === "accepted" ||
              trackData?.order_status === "picked_up" ||
              trackData?.order_status === "handover") && (
              <Grid
                item
                xs={12}
                md={
                  trackData?.order_status === "confirmed" ||
                  trackData?.order_status !== "pending"
                    ? 12
                    : 6
                }
              >
                <Button
                  variant="contained"
                  onClick={handleTrackOrderClick}
                  fullWidth
                >
                  <Typography variant="h6">{t("Track Order")}</Typography>
                </Button>
              </Grid>
            )}
          {trackData &&
          trackData?.payment_method === "digital_payment" &&
          trackData?.payment_status === "unpaid" &&
          zoneData?.data?.zone_data?.[0]?.cash_on_delivery ? (
            <Grid item xs={12} sm={6} md={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setModalOpenForPayment(true)}
              >
                <Typography variant="h6">
                  {t("Switch to Cash on Delivery")}
                </Typography>
              </Button>
            </Grid>
          ) : (
            trackData?.order_status === "pending" && (
              <Grid item xs={12} sm={6} md={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setOpenModal(true)}
                >
                  <Typography variant="h6">{t("Cancel Order")}</Typography>
                </Button>
              </Grid>
            )
          )}
        </Grid>
      </CustomPaperBigCard>
      <CustomModal
        openModal={openModal}
        setModalOpen={setOpenModal}
        handleClose={() => setOpenModal(false)}
      >
        <CancelOrder
          cancelReason={cancelReason}
          setCancelReason={setCancelReason}
          cancelReasonsData={cancelReasonsData}
          setModalOpen={setOpenModal}
          handleOnSuccess={handleOnSuccess}
          orderLoading={orderLoading}
        />
      </CustomModal>

      <CustomModal
        openModal={openModalForPayment}
        setModalOpen={setModalOpenForPayment}
        handleClose={() => setModalOpenForPayment(false)}
      >
        <DigitalPaymentManage
          setModalOpenForPayment={setModalOpenForPayment}
          setModalOpen={setOpenModal}
          refetchOrderDetails={refetchOrderDetails}
          refetchTrackData={refetchTrackData}
          id={trackData?.id}
        />
      </CustomModal>
    </>
  );
};

export default OrderDetailsBottom;
