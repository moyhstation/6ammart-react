import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import Typography from "@mui/material/Typography";
import { onErrorResponse } from "../../../../api-manage/api-error-response/ErrorResponses";
import { CustomPaperBigCard } from "../../../../styled-components/CustomStyles.style";
import { useUpdatePaymentMethod } from "../../../../api-manage/hooks/react-query/payment-method/useUpdatePaymentMethod";
import { CustomButton } from "../../../landing-page/ComponentOne";
import CustomDialogConfirm from "../../../custom-dialog/confirm/CustomDialogConfirm";
import { Button } from "@mui/material";
import { OrderStatusButton } from "../../myorders.style";
import { useTheme } from "@emotion/react";

const PaymentUpdate = ({
  id,
  refetchOrderDetails,
  refetchTrackData,
  trackData,
  isSmall,
}) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const { mutate: paymentMethodUpdateMutation, isLoading: orderLoading } =
    useUpdatePaymentMethod();

  const handleOnSuccess = () => {
    const handleSuccess = (response) => {
      toast.success(response.message);
      refetchOrderDetails();
      refetchTrackData();
    };
    const formData = {
      order_id: id,
      _method: "put",
    };
    paymentMethodUpdateMutation(formData, {
      onSuccess: handleSuccess,
      onError: onErrorResponse,
    });
    setOpenModal(false);
  };
  return (
    <>
      <OrderStatusButton
        background={theme.palette.primary.main}
        onClick={() => setOpenModal(true)}
        back
      >
        {isSmall ? t("Switch to COD") : t("Switch to cash on delivery")}
      </OrderStatusButton>

      <CustomDialogConfirm
        dialogTexts="Are you sure you want to switch this order to Cash On Delivery?"
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleOnSuccess}
      />
    </>
  );
};

export default PaymentUpdate;
