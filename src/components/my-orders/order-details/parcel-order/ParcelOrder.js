import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../../../styled-components/CustomStyles.style";
import {
  HeadingBox,
  OrderStatusBox,
  OrderStatusGrid,
} from "../../myorders.style";
import { alpha, Divider, Grid, Skeleton, Typography } from "@mui/material";
import { CustomTypography } from "../../../landing-page/hero-section/HeroSection.style";
import CustomFormatedDateTime from "../../../date/CustomFormatedDateTime";
import { useTranslation } from "react-i18next";
import ParcelOrderTopDetails from "./ParcelOrderTopDetails";
import { Box, Stack } from "@mui/system";
import { getAmountWithSign } from "../../../../helper-functions/CardHelpers";
import RefundDetails from "../other-order/RefundDetails";
import StoreDetails from "../other-order/StoreDetails";
import OrderSummery from "../other-order/OrderSummery";
import { useTheme } from "@emotion/react";
import CustomImageContainer from "../../../CustomImageContainer";
import useGetTrackOrderData from "../../../../api-manage/hooks/react-query/order/useGetTrackOrderData";
import OrderDetailsBottom from "../other-order/OrderDetailsBottom";
import PaymentUpdate from "../other-order/PaymentUpdate";
import RefundModal from "../other-order/RefundModal";
import { DetailsShimmer, SummeryShimmer } from "./Shimmers";

const ParcelOrder = (props) => {
  const { configData, data, trackOrderData, id, refetchTrackOrder, refetch } =
    props;
  const { t } = useTranslation();
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  return (
    <CustomStackFullWidth
      alignItems="center"
      justifyContent="center"
      mb="2rem"
      spacing={2}
    >
      <ParcelOrderTopDetails data={data} t={t} />
      <CustomPaperBigCard>
        <Grid container item md={12} lg={12} xs={12} spacing={3}>
          <Grid item md={7}>
            <OrderStatusBox>
              <OrderStatusGrid container md={12} xs={12}>
                <Grid item md={5} xs={12}>
                  <Typography sx={{ fontWeight: "600" }} align="left">
                    {t("Payment method")}
                  </Typography>
                  {data ? (
                    <Typography
                      sx={{
                        fontWeight: "700",
                        color: (theme) => theme.palette.primary.main,
                        textTransform: "capitalize",
                      }}
                      align="left"
                    >
                      {data && data?.payment_method.replaceAll("_", " ")}
                    </Typography>
                  ) : (
                    <Skeleton width="100px" variant="text" />
                  )}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ fontWeight: "500" }} align="left">
                      {t("Amount")}:
                    </Typography>
                    {data ? (
                      <Typography sx={{ fontWeight: "500" }} align="left">
                        {data && getAmountWithSign(data?.order_amount)}
                      </Typography>
                    ) : (
                      <Skeleton width="100px" variant="text" />
                    )}
                  </Stack>
                </Grid>
                <Grid item md={7} xs={12}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ fontWeight: "500" }} align="left">
                      {t("Order Status")} :
                    </Typography>
                    {data ? (
                      <Typography
                        component="span"
                        textTransform="capitalize"
                        color={theme.palette.info.dark}
                        align="left"
                      >
                        {data && (data?.order_status).replaceAll("_", " ")}
                      </Typography>
                    ) : (
                      <Skeleton width="100px" variant="text" />
                    )}
                  </Stack>
                  <Typography sx={{ fontWeight: "500" }} align="left">
                    {t("Payment Status")} :{" "}
                    {data && data?.payment_status === "paid" ? (
                      <span
                        style={{
                          color: theme.palette.primary.main,
                        }}
                      >
                        {t("Paid")}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {t("Unpaid")}
                      </span>
                    )}
                  </Typography>
                </Grid>
                <RefundDetails
                  trackOrderData={trackOrderData}
                  configData={configData}
                  t={t}
                />
              </OrderStatusGrid>
            </OrderStatusBox>
            {data ? (
              <OrderStatusGrid>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  mb="1rem"
                >
                  <Typography sx={{ fontWeight: "600" }}>
                    {t("Charge Pay By")} :
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "600" }}
                    color="primary.main"
                    textTransform="capitalize"
                  >
                    {data?.charge_payer}
                  </Typography>
                </Stack>
                <Typography sx={{ fontWeight: "600" }} align="left">
                  {t("Sender Details")}
                </Typography>
                <Typography
                  sx={{ fontWeight: "600" }}
                  color="primary.main"
                  textTransform="capitalize"
                >
                  {data?.delivery_address?.contact_person_name}
                </Typography>
                <Typography>{data?.delivery_address?.address}</Typography>
                <Typography>
                  {data?.delivery_address?.contact_person_number}
                </Typography>
                <Typography sx={{ fontWeight: "600" }} align="left" mt="0.5rem">
                  {t("Receiver Details")}
                </Typography>
                <Typography
                  sx={{ fontWeight: "600" }}
                  color="primary.main"
                  textTransform="capitalize"
                >
                  {data?.receiver_details?.contact_person_name || "-"}
                </Typography>
                <Typography>
                  {data?.receiver_details?.address || "-"}
                </Typography>
                <Typography>
                  {data?.receiver_details?.contact_person_number || "-"}
                </Typography>
              </OrderStatusGrid>
            ) : (
              <DetailsShimmer t={t} />
            )}
          </Grid>
          <Grid item md={5} xs={12} align="center">
            <Typography fontWeight="bold">
              {t("Parcel Order Summery")}
            </Typography>
            <CustomStackFullWidth alignItems="flex-start">
              <Typography fontWeight="bold">{t("Parcel Category")}</Typography>
              {data ? (
                <CustomStackFullWidth
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  <CustomImageContainer
                    width="60px"
                    height="60px"
                    src={`${configData?.base_urls?.parcel_category_image_url}/${data?.parcel_category?.image}`}
                    alt={data?.parcel_category?.name}
                  />
                  <Stack alignItems="flex-start">
                    <Typography>{data?.parcel_category?.name}</Typography>
                    <Typography>
                      {data?.parcel_category?.description}
                    </Typography>
                  </Stack>
                </CustomStackFullWidth>
              ) : (
                <SummeryShimmer />
              )}

              <Stack
                width="100%"
                sx={{
                  mt: "10px",
                  borderBottom: (theme) =>
                    `2px solid ${theme.palette.neutral[300]}`,
                }}
              ></Stack>
              <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Typography fontWeight="bold" color="primary.main">
                  {t("Total Amount")}
                </Typography>
                {data ? (
                  <Typography fontWeight="bold">
                    {data && getAmountWithSign(data?.order_amount)}
                  </Typography>
                ) : (
                  <Skeleton width="100px" variant="text" />
                )}
              </CustomStackFullWidth>
            </CustomStackFullWidth>
          </Grid>
        </Grid>
      </CustomPaperBigCard>
      {trackOrderData &&
        (trackOrderData?.order_status === "confirmed" ||
          trackOrderData?.order_status === "pending") && (
          <Box sx={{ marginTop: "1rem" }} width="100%">
            <OrderDetailsBottom
              id={id}
              refetchOrderDetails={refetch}
              refetchTrackData={refetchTrackOrder}
              trackData={trackOrderData}
            />
          </Box>
        )}
      {trackOrderData && trackOrderData?.order_status === "failed" && (
        <PaymentUpdate
          id={id}
          refetchOrderDetails={refetch}
          refetchTrackData={refetchTrackOrder}
          trackData={trackOrderData}
        />
      )}
      <RefundModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        // reasons={reasonsData?.refund_reasons}
        // formSubmit={formSubmitHandler}
        // refundIsLoading={refundIsLoading}
      />
    </CustomStackFullWidth>
  );
};

ParcelOrder.propTypes = {};

export default ParcelOrder;
