import React from "react";

import { Stack } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";

import { t } from "i18next";
import { useMutation } from "react-query";

import { toast } from "react-hot-toast";

import { WrapperForCustomDialogConfirm } from "../../custom-dialog/confirm/CustomDialogConfirm.style";
import {
  CustomButtonCancel,
  CustomButtonSuccess,
} from "../../../styled-components/CustomButtons.style";
import { OrderApi } from "../../../api-manage/another-formated-api/orderApi";
import { onErrorResponse } from "../../../api-manage/api-error-response/ErrorResponses";

const DigitalPaymentManage = ({
  setModalOpenForPayment,
  refetchOrderDetails,
  refetchTrackData,
  id,
  setModalOpen,
}) => {
  const { mutate: paymentMethodUpdateMutation, isLoading: orderLoading } =
    useMutation(
      "order-payment-method-update",
      OrderApi.FailedPaymentMethodUpdate
    );

  const handleOnSuccess = () => {
    const handleSuccess = (response) => {
      toast.success(response.data.message);
      refetchOrderDetails();
      refetchTrackData();
      setModalOpenForPayment(false);
    };
    const formData = {
      order_id: id,
      _method: "put",
    };
    paymentMethodUpdateMutation(formData, {
      onSuccess: handleSuccess,
      onError: onErrorResponse,
    });
  };
  const handleClose = () => {
    setModalOpenForPayment(false);
    setModalOpen(true);
  };
  return (
    <>
      <WrapperForCustomDialogConfirm width="23rem">
        <DialogTitle id="alert-dialog-title" sx={{ padding: "10px 24px" }}>
          <Typography textAlign="center" variant="h6">
            {t("Switch Your payment method ")}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Stack
            alignItems="center"
            justifyContent="center"
            width="100%"
            spacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <CustomButtonSuccess
              loading={orderLoading}
              variant="contained"
              onClick={handleOnSuccess}
              width="14rem"
            >
              {t("Switch to Cash on Delivery")}
            </CustomButtonSuccess>
            <CustomButtonCancel
              width="14.5rem"
              variant="contained"
              onClick={handleClose}
            >
              {t("Cancel Order")}
            </CustomButtonCancel>
          </Stack>
        </DialogActions>
      </WrapperForCustomDialogConfirm>
    </>
  );
};

export default DigitalPaymentManage;
