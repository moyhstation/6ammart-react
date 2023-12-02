import React from "react";
import PropTypes from "prop-types";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { alpha, Divider, styled, Typography } from "@mui/material";
import { getAmountWithSign } from "../../../../helper-functions/CardHelpers";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
export const OrderSummaryCalculationCard = styled(CustomStackFullWidth)(
  ({ theme }) => ({
    paddingInline: "20px",
    paddingBlock: "25px",
    backgroundColor: theme.palette.background.custom6,
    borderRadius: "10px",
  })
);
const getItemsPrice = (items) => {
  const productPrice = items?.reduce(
    (total, product) => product?.price * product?.quantity + total,
    0
  );
  return productPrice;
};
const getAddOnsPrice = (items) => {
  let productAddonsPrice = items.reduce(
    (total, product) =>
      (product?.add_ons?.length > 0
        ? product?.add_ons?.reduce(
            (cTotal, cProduct) => cProduct?.price * cProduct?.quantity + cTotal,
            0
          )
        : 0) + total,
    0
  );
  return productAddonsPrice;
};
const getSubTotalPrice = (dataList) => {
  return getItemsPrice(dataList) + getAddOnsPrice(dataList);
};
function getRestaurantValue(data, key) {
  return data?.[0]?.item_details?.[key];
}

const OrderCalculation = ({ data, t, trackOrderData }) => {
  const { configData } = useSelector((state) => state.configData);
  const handleExcludedVatTotalAmount = () => {
    return getAmountWithSign(
      trackOrderData?.order_amount - trackOrderData?.total_tax_amount
    );
  };

  const due_amount =
    trackOrderData?.order_amount - trackOrderData?.partially_paid_amount;
  return (
    <OrderSummaryCalculationCard spacing={1.5}>
      <Typography fontWeight="500">{t("Summary")}</Typography>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography fontSize="14px">{t("Items Price")}</Typography>
        <Typography fontSize="14px">
          {data && data?.length > 0 && getAmountWithSign(getItemsPrice(data))}
        </Typography>
      </CustomStackFullWidth>
      {trackOrderData?.module?.module_type === "food" && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography fontSize="14px"> {t("Addons Price")}</Typography>
          <Typography fontSize="14px">
            {data &&
              data?.length > 0 &&
              getAmountWithSign(getAddOnsPrice(data))}
          </Typography>
        </CustomStackFullWidth>
      )}

      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography fontSize="14px"> {t("Subtotal")}</Typography>
        <Typography fontSize="14px">
          {data &&
            data?.length > 0 &&
            getAmountWithSign(getSubTotalPrice(data))}
        </Typography>
      </CustomStackFullWidth>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography fontSize="14px"> {t("Discount")}</Typography>
        <Typography fontSize="14px">
          -
          {trackOrderData &&

          getAmountWithSign(trackOrderData?.store_discount_amount)
            ? getAmountWithSign(trackOrderData?.store_discount_amount+trackOrderData?.flash_admin_discount_amount+trackOrderData?.flash_store_discount_amount)
            : 0}
        </Typography>
      </CustomStackFullWidth>
      {Number.parseInt(trackOrderData?.coupon_discount_amount) !== 0 && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography fontSize="14px"> {t("Coupon Discount")}</Typography>
          <Typography fontSize="14px">
            -
            {trackOrderData &&
              getAmountWithSign(trackOrderData?.coupon_discount_amount)}
          </Typography>
        </CustomStackFullWidth>
      )}
      {configData?.tax_included === 0 && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography fontSize="14px">
            {" "}
            {t("VAT")}({getRestaurantValue(data, "tax")}
            %)
          </Typography>
          <Typography fontSize="14px">
            {trackOrderData &&
              getAmountWithSign(trackOrderData?.total_tax_amount)}
          </Typography>
        </CustomStackFullWidth>
      )}

      {Number.parseInt(trackOrderData?.dm_tips) !== 0 && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography fontSize="14px">{t("Delivery Man Tips")}</Typography>
          <Typography fontSize="14px">
            {trackOrderData && getAmountWithSign(trackOrderData?.dm_tips)}
          </Typography>
        </CustomStackFullWidth>
      )}
      {configData?.add_fund_status === 1 ? (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography fontSize="14px">
            {configData?.additional_charge_name}
          </Typography>
          <Typography fontSize="14px">
            {trackOrderData && getAmountWithSign(configData?.additional_charge)}
          </Typography>
        </CustomStackFullWidth>
      ) : null}

      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography fontSize="14px">{t("Delivery fee")}</Typography>
        <Typography fontSize="14px">
          {trackOrderData && getAmountWithSign(trackOrderData?.delivery_charge)}
        </Typography>
      </CustomStackFullWidth>
      <Stack
        width="100%"
        sx={{
          mt: "20px",
          borderBottom: (theme) => `1px dotted ${theme.palette.neutral[400]}`,
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
          {getAmountWithSign(trackOrderData?.order_amount)}
        </Typography>
      </CustomStackFullWidth>
      {trackOrderData?.partially_paid_amount && trackOrderData?.order_status!=="canceled"  ? (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography fontSize="14px" textTransform="capitalize">
            {t("Paid by wallet")}
          </Typography>
          <Typography fontSize="14px">
            {trackOrderData &&
              getAmountWithSign(trackOrderData?.partially_paid_amount)}
          </Typography>
        </CustomStackFullWidth>
      ) : null}

        {trackOrderData?.payment_method ===
            'partial_payment'? (<>
            { trackOrderData?.payments[1]?.payment_status === 'unpaid'?(
                <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
            >
           <Typography
            fontSize="14px"
            textTransform="capitalize"
            fontWeight="bold"
            >
               {t('Due Payment')} (
               {trackOrderData &&
                   t(
                       trackOrderData
                           ?.payments[1]
                           ?.payment_method
                   ).replaceAll('_', ' ')}
               )
        </Typography>
        <Typography fontSize="14px" fontWeight="bold">
            {trackOrderData && getAmountWithSign(due_amount)}
        </Typography>
        </CustomStackFullWidth>):(  <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
            >
                <Typography
                    fontSize="14px"
                    textTransform="capitalize"
                    fontWeight="bold"
                >
                    {t('Paid By')} (
                    {trackOrderData &&
                        t(
                            trackOrderData
                                ?.payments[1]
                                ?.payment_method
                        ).replaceAll('_', ' ')}
                    )
                </Typography>
                <Typography fontSize="14px" fontWeight="bold">
                    {trackOrderData && getAmountWithSign(due_amount)}
                </Typography>
            </CustomStackFullWidth>)}
        </>):null }
      {/*{trackOrderData?.partially_paid_amount ? (*/}
      {/*  <CustomStackFullWidth*/}
      {/*    direction="row"*/}
      {/*    alignItems="center"*/}
      {/*    justifyContent="space-between"*/}
      {/*    spacing={2}*/}
      {/*  >*/}
      {/*    <Typography*/}
      {/*      fontSize="14px"*/}
      {/*      textTransform="capitalize"*/}
      {/*      fontWeight="bold"*/}
      {/*    >*/}
      {/*      {t("due amount")}*/}
      {/*    </Typography>*/}
      {/*    <Typography fontSize="14px" fontWeight="bold">*/}
      {/*      {trackOrderData && getAmountWithSign(due_amount)}*/}
      {/*    </Typography>*/}
      {/*  </CustomStackFullWidth>*/}
      {/*) : null}*/}
    </OrderSummaryCalculationCard>
  );
};

OrderCalculation.propTypes = {};

export default OrderCalculation;
