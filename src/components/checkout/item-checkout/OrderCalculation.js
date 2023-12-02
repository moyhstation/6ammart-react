import React, { useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { CalculationGrid, TotalGrid } from "../CheckOut.style";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import CustomDivider from "../../CustomDivider";
import {
  getCalculatedTotal,
  getCouponDiscount,
  getDeliveryFees,
  getProductDiscount,
  getSubTotalPrice,
  getTaxableTotalPrice,
} from "../../../utils/CustomFunctions";
import { getAmountWithSign } from "../../../helper-functions/CardHelpers";
import { setTotalAmount } from "../../../redux/slices/cart";

const OrderCalculation = (props) => {
  const {
    cartList,
    storeData,
    couponDiscount,
    taxAmount,
    distanceData,
    total_order_amount,
    configData,
    orderType,
    couponInfo,
    deliveryTip,
    origin,
    destination,
    zoneData,
    setDeliveryFee,
    extraCharge,
    extraChargeLoading,
    usePartialPayment,
    walletBalance,
    setPayableAmount,
    additionalCharge,
    payableAmount,
  } = props;
  const { t } = useTranslation();
  const [freeDelivery, setFreeDelivery] = useState("false");

  const theme = useTheme();
  let couponType = "coupon";
  const handleDeliveryFee = () => {
    let price = getDeliveryFees(
      storeData,
      configData,
      cartList,
      distanceData?.data,
      couponDiscount,
      couponType,
      orderType,
      zoneData,
      origin,
      destination,
      extraCharge
    );

    setDeliveryFee(orderType === "delivery" ? 0 : price);
    if (price === 0) {
      return <Typography>{t("Free")}</Typography>;
    } else {
      return (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={0.5}
          width="100%"
        >
          <Typography>{"(+)"}</Typography>
          <Typography>{storeData && getAmountWithSign(price)}</Typography>
        </Stack>
      );
    }
  };
  const handleCouponDiscount = () => {
    let couponDiscountValue = getCouponDiscount(
      couponDiscount,
      storeData,
      cartList
    );

    if (couponDiscount && couponDiscount.coupon_type === "free_delivery") {
      setFreeDelivery("true");
      return 0;
    } else {
      return getAmountWithSign(couponDiscountValue);
    }
  };
  const dispatch = useDispatch();
  const handleOrderAmount = () => {
    let totalAmount = getCalculatedTotal(
      cartList,
      couponDiscount,
      storeData,
      configData,
      distanceData,
      couponType,
      orderType,
      freeDelivery,
      Number(deliveryTip),
      zoneData,
      origin,
      destination,
      extraCharge,
      additionalCharge
    );

    setPayableAmount(totalAmount);
    dispatch(setTotalAmount(totalAmount));
    return totalAmount;
  };
  const discountedPrice = getProductDiscount(cartList, storeData);
  const totalAmountAfterPartial = handleOrderAmount() - walletBalance;

  return (
    <>
      <CalculationGrid container item md={12} xs={12} spacing={1} mt="1rem">
        <Grid item md={8} xs={8}>
          {cartList.length > 1 ? t("Items Price") : t("Item Price")}
        </Grid>
        <Grid item md={4} xs={4} align="right">
          <Typography textTransform="capitalize" align="right">
            {getAmountWithSign(getSubTotalPrice(cartList))}
          </Typography>
        </Grid>
        <Grid item md={8} xs={8}>
          {t("Discount")}
        </Grid>
        <Grid item md={4} xs={4} align="right">
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={0.5}
          >
            <Typography>{"(-)"}</Typography>
            <Typography>
              {storeData ? getAmountWithSign(discountedPrice) : null}
            </Typography>
          </Stack>
        </Grid>
        {couponDiscount ? (
          <>
            <Grid item md={8} xs={8}>
              {t("Coupon Discount")}
            </Grid>
            <Grid item md={4} xs={4} align="right">
              {couponDiscount.coupon_type === "free_delivery" ? (
                <Typography textTransform="capitalize">
                  {t("Free Delivery")}
                </Typography>
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={0.5}
                >
                  <Typography>{"(-)"}</Typography>
                  <Typography>
                    {storeData && cartList && handleCouponDiscount()}
                  </Typography>
                </Stack>
              )}
            </Grid>
          </>
        ) : null}
        {storeData ? (
          storeData?.tax ? (
            <>
              <Grid item md={8} xs={8}>
                {t("TAX")} ({storeData?.tax}%{" "}
                {configData?.tax_included === 1 && t("Included")})
              </Grid>
              <Grid item md={4} xs={4} align="right">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={0.5}
                >
                  {configData?.tax_included === 0 && (
                    <Typography>{"(+)"}</Typography>
                  )}
                  <Typography>
                    {storeData &&
                      getAmountWithSign(
                        getTaxableTotalPrice(
                          cartList,
                          couponDiscount,
                          storeData,
                          configData?.tax_included
                        )
                      )}
                  </Typography>
                </Stack>
              </Grid>
            </>
          ) : null
        ) : null}
        {orderType === "delivery" || orderType === "schedule_order" ? (
          Number.parseInt(configData?.dm_tips_status) === 1 ? (
            <>
              <Grid item md={8} xs={8} sx={{ textTransform: "capitalize" }}>
                {t("Deliveryman tips")}
              </Grid>
              <Grid item md={4} xs={4} align="right">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={0.5}
                >
                  <Typography>{"(+)"}</Typography>
                  <Typography>{getAmountWithSign(deliveryTip)}</Typography>
                </Stack>
              </Grid>
            </>
          ) : null
        ) : null}

        {configData?.additional_charge_status === 1 ? (
          <>
            <Grid item md={8} xs={8} sx={{ textTransform: "capitalize" }}>
              {configData?.additional_charge_name}
            </Grid>
            <Grid item md={4} xs={4} align="right">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.5}
              >
                <Typography>{"(+)"}</Typography>
                <Typography>
                  {getAmountWithSign(configData?.additional_charge)}
                </Typography>
              </Stack>
            </Grid>
          </>
        ) : null}
        {orderType === "delivery" || orderType === "schedule_order" ? (
          <>
            <Grid item md={8} xs={8} sx={{ textTransform: "capitalize" }}>
              {t("Delivery fee")}
            </Grid>
            <Grid item md={4} xs={4} align="right">
              {couponDiscount ? (
                couponDiscount?.coupon_type === "free_delivery" ? (
                  <Typography>{t("Free")}</Typography>
                ) : (
                  storeData && handleDeliveryFee()
                )
              ) : (
                storeData && handleDeliveryFee()
              )}
            </Grid>
          </>
        ) : null}
        <CustomDivider border="1px" />
        <TotalGrid container md={12} xs={12} mt="1rem">
          <Grid item md={8} xs={8} pl=".5rem">
            <Typography fontWeight="bold" color={theme.palette.primary.main}>
              {t("Total")}
            </Typography>
          </Grid>
          <Grid item md={4} xs={4} align="right">
            <Typography color={theme.palette.primary.main} align="right">
              {storeData && cartList && getAmountWithSign(handleOrderAmount())}
            </Typography>
          </Grid>
        </TotalGrid>
        {usePartialPayment && payableAmount > walletBalance ? (
          <>
            <Grid item md={8} xs={8} sx={{ textTransform: "capitalize" }}>
              {t("Paid by wallet")}
            </Grid>
            <Grid item md={4} xs={4} align="right">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.5}
              >
                <Typography>{"(-)"}</Typography>
                <Typography>{getAmountWithSign(walletBalance)}</Typography>
              </Stack>
            </Grid>
          </>
        ) : null}
        {usePartialPayment && payableAmount > walletBalance ? (
          <>
            <Grid item md={8} xs={8}>
              {t("Due Payment")}
            </Grid>
            <Grid item md={4} xs={4} align="right">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.5}
              >
                <Typography>
                  {getAmountWithSign(totalAmountAfterPartial)}
                </Typography>
              </Stack>
            </Grid>
          </>
        ) : null}
      </CalculationGrid>
    </>
  );
};

OrderCalculation.propTypes = {};

export default OrderCalculation;
