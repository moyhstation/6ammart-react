import React, { useEffect, useState } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setClearCart } from "../../redux/slices/cart";
import { useMutation, useQuery } from "react-query";

import { toast } from "react-hot-toast";

import { OrderApi } from "../../api-manage/another-formated-api/orderApi";
import { CustomPaperCard } from "../../styled-components/CustomCards.style";
import { onErrorResponse } from "../../api-manage/api-error-response/ErrorResponses";
import LoadingButton from "@mui/lab/LoadingButton";
import SwitchAccessShortcutIcon from "@mui/icons-material/SwitchAccessShortcut";
import CustomModal from "../modal";
import CancelOrder from "../my-orders/order-details/CenacelOrder";
import { useGetOrderCancelReason } from "../../api-manage/hooks/react-query/order/useGetOrderCancelReason";
import { GoogleApi } from "../../api-manage/hooks/react-query/googleApi";
import { getGuestId } from "../../helper-functions/getToken";

const CheckoutFailedCard = ({ id, handleOrderDetailsClose }) => {
  const [openModal, setOpenModal] = useState(false);
  const [cancelReason, setCancelReason] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: cancelReasonsData, refetch } = useGetOrderCancelReason();
  const { guestUserInfo } = useSelector((state) => state.guestUserInfo);
  useEffect(() => {
    refetch().then();
  }, []);
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
  const formData = {
    order_id: id,
    _method: "put",
    guest_id: getGuestId(),
  };
  const { mutate: paymentMethodUpdateMutation, isLoading: orderLoading } =
    useMutation(
      "order-payment-method-update",
      OrderApi.FailedPaymentMethodUpdate
    );
  const { mutate: cancelMutate, isLoading: cancelLoading } = useMutation(
    "order-payment-method-update",
    OrderApi.FailedPaymentMethodCancel
  );
  const handleSuccess = (response) => {
    toast.success(response.data.message);
    dispatch(setClearCart());
    setOpenModal(false);
    Router.push("/home", undefined, { shallow: true });
  };

  const handleCancelSuccess = () => {
    dispatch(setClearCart());
    handleOrderDetailsClose();
    cancelMutate(
      { ...formData, reason: "Order payment canceled" },
      {
        onSuccess: handleSuccess,
        onError: onErrorResponse,
      }
    );
    Router.push("/home", undefined, { shallow: true });
  };
  const handleOrderFail = () => {
    handleCancelSuccess();
    //setOpenModal(true);
  };

  const handleOnSuccess = () => {
    handleOrderDetailsClose();
    paymentMethodUpdateMutation(formData, {
      onSuccess: handleSuccess,
      onError: onErrorResponse,
    });
  };

  return (
    <CustomPaperCard>
      <Stack
        width="100%"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        p="1rem"
      >
        <SwitchAccessShortcutIcon
          sx={{
            fontSize: "50px",
            mb: "10px",
            color: (theme) => theme.palette.primary.main,
          }}
        />
        <Typography>{t("Are you agree with this order fail?")}</Typography>
        {zoneData ? (
          <Stack spacing={2}>
            {zoneData?.data?.zone_data?.[0]?.cash_on_delivery && (
              <LoadingButton
                loading={orderLoading}
                variant="contained"
                fullWidth
                onClick={handleOnSuccess}
              >
                {t("Switch to Cash On Delivery")}
              </LoadingButton>
            )}
            <LoadingButton
              sx={{
                backgroundColor: (theme) => theme.palette.error.main,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.error.dark,
                },
              }}
              variant="contained"
              fullWidth
              onClick={() => handleOrderFail()}
              loading={cancelLoading}
            >
              {t("Cancel Order")}
            </LoadingButton>
          </Stack>
        ) : (
          <Skeleton variant="ractangle" width="200px" height="20px" />
        )}
      </Stack>
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
          handleOnSuccess={handleCancelSuccess}
          orderLoading={orderLoading}
        />
      </CustomModal>
    </CustomPaperCard>
  );
};

CheckoutFailedCard.propTypes = {};

export default CheckoutFailedCard;
