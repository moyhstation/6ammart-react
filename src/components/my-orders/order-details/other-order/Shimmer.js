import React from "react";
import { Divider, Grid, Skeleton, Typography } from "@mui/material";
import SimpleBar from "simplebar-react";
import CustomImageContainer from "../../../CustomImageContainer";
import { getAmountWithSign } from "../../../../helper-functions/CardHelpers";
import { Stack } from "@mui/system";
import OrderCalculation, {
  OrderSummaryCalculationCard,
} from "./OrderCalculation";
import { useTranslation } from "react-i18next";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";

const Shimmer = () => {
  const { t } = useTranslation();
  return (
    <Grid container mt="1rem" paddingLeft="20px" paddingRight="40px">
      <Grid item xs={12} md={12} align="left">
        <Typography>{t("Order Summery")}</Typography>
      </Grid>
      <Grid item xs={12} md={8} align="center" mt="1rem">
        <SimpleBar style={{ maxHeight: "300px" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            md={12}
            xs={12}
            spacing={{ xs: 1 }}
            mb="1rem"
          >
            <Grid item md={3} xs={4} sm={2}>
              <Skeleton width="80%" height="130px" variant="text" />
            </Grid>
            <Grid item md={9} xs={8} sm={8} align="left">
              <Skeleton width="100px" variant="text" />
              <Skeleton width="100px" variant="text" />
              <Skeleton width="100px" variant="text" />
            </Grid>
          </Grid>
        </SimpleBar>
      </Grid>
      <Grid item xs={12} md={4}>
        <OrderSummaryCalculationCard spacing={1.5}>
          <CustomStackFullWidth spacing={1}>
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography>{t("Items Price")}</Typography>
              <Skeleton variant="text" width="100px" />
            </CustomStackFullWidth>
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography> {t("Addons Price")}</Typography>
              <Skeleton variant="text" width="100px" />
            </CustomStackFullWidth>
            <Divider />
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography> {t("Subtotal")}</Typography>
              <Skeleton variant="text" width="100px" />
            </CustomStackFullWidth>
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography> {t("Discount")}</Typography>
              <Skeleton variant="text" width="100px" />
            </CustomStackFullWidth>
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography> {t("Coupon Discount")}</Typography>
              <Skeleton variant="text" width="100px" />
            </CustomStackFullWidth>
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography>{t("VAT")}</Typography>
              <Skeleton variant="text" width="100px" />
            </CustomStackFullWidth>
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography>{t("Delivery man tips")}</Typography>
              <Skeleton variant="text" width="100px" />
            </CustomStackFullWidth>
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography>{t("Delivery fee")}</Typography>
              <Skeleton variant="text" width="100px" />
            </CustomStackFullWidth>
            <Stack
              width="100%"
              sx={{
                mt: "20px",
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
              <Typography color="primary.main">{t("Total")}</Typography>
              <Skeleton variant="text" width="100px" />
            </CustomStackFullWidth>
          </CustomStackFullWidth>
        </OrderSummaryCalculationCard>
      </Grid>
    </Grid>
  );
};

export default Shimmer;
