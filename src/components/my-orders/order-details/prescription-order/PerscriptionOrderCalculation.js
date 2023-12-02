import React from "react";
import { OrderSummaryCalculationCard } from "../other-order/OrderCalculation";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { getAmountWithSign } from "../../../../helper-functions/CardHelpers";

const PrescriptionOrderCalculation = ({ t, data, trackOrderData }) => {
  return (
    <OrderSummaryCalculationCard spacing={1.5}>
      <Typography fontWeight="500">{t("Summary")}</Typography>
      <Stack width="100%" marginTop="auto" spacing={1.5}>
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography>{t("Item Price")}</Typography>
          <Typography>
            {trackOrderData &&
              getAmountWithSign(
                trackOrderData?.order_amount +
                  trackOrderData?.store_discount_amount -
                  trackOrderData?.coupon_discount_amount -
                  trackOrderData?.total_tax_amount -
                  trackOrderData?.dm_tips -
                  trackOrderData?.delivery_charge
              )}
          </Typography>
        </CustomStackFullWidth>
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography>{t("Discount")}</Typography>
          <Typography>
            (-){" "}
            {trackOrderData &&
              getAmountWithSign(trackOrderData?.store_discount_amount)}
          </Typography>
        </CustomStackFullWidth>
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography>{t("Coupon discount")}</Typography>
          <Typography>
            (+){" "}
            {trackOrderData &&
              getAmountWithSign(trackOrderData?.coupon_discount_amount)}
          </Typography>
        </CustomStackFullWidth>
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography>
            {t("Vat/Tax")}
            {trackOrderData?.tax_status === "included" ? "(included)" : ""}
          </Typography>
          <Typography>
            {trackOrderData?.tax_status !== "included" && " (+) "}
            {trackOrderData &&
              getAmountWithSign(trackOrderData?.total_tax_amount)}
          </Typography>
        </CustomStackFullWidth>
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography>{t("Deliveryman tips")}</Typography>
          <Typography>
            (+) {trackOrderData && getAmountWithSign(trackOrderData?.dm_tips)}
          </Typography>
        </CustomStackFullWidth>
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography>{t("Delivery fee")}</Typography>
          <Typography>
            (+){" "}
            {trackOrderData &&
              getAmountWithSign(trackOrderData?.delivery_charge)}
          </Typography>
        </CustomStackFullWidth>
        <Stack
          width="100%"
          sx={{
            mt: "20px",
            mb: "10px",
            borderBottom: (theme) => `2px solid ${theme.palette.neutral[300]}`,
          }}
        ></Stack>
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography fontWeight="bold" color="primary.main">
            {t("Total")}
          </Typography>
          <Typography fontWeight="bold">
            {trackOrderData && getAmountWithSign(trackOrderData?.order_amount)}
          </Typography>
        </CustomStackFullWidth>
      </Stack>
    </OrderSummaryCalculationCard>
  );
};

export default PrescriptionOrderCalculation;
