import StarBorderSharpIcon from "@mui/icons-material/StarBorderSharp";
import {
  Button,
  Chip,
  Grid,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getAmountWithSign } from "../../../helper-functions/CardHelpers";
import { setDeliveryManInfoByDispatch } from "../../../redux/slices/searchFilter";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
  StoreImageBox,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import CustomFormatedDateTime from "../../date/CustomFormatedDateTime";
import TrackParcelOrderDrawer from "../../home/module-wise-components/parcel/TrackParcelOrderDrawer";
import trackOrderIcon1 from "../assets/Maskroup.svg";
import trackOrderIcon from "../assets/trackOrderIcon.png";
import { DateTypography, TrackOrderButton } from "../myorders.style";
export const CustomPaper = styled(CustomPaperBigCard)(({ theme }) => ({
  padding: "10px",
  backgroundColor: alpha(theme.palette.neutral[300], 0.4),
  boxShadow: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.neutral[100],
    boxShadow: " 0px 4px 12px rgba(88, 110, 125, 0.1)",
  },
  [theme.breakpoints.down("md")]: {
    backgroundColor: theme.palette.neutral[100],
    boxShadow: " 0px 4px 12px rgba(88, 110, 125, 0.1)",
  },
}));
const OrderStatusTypography = styled(Typography)(({ theme, color }) => ({
  color: color,
  fontWeight: 600,
  fontSize: "14px",
  textTransform: "capitalize",
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
  },
}));

const Order = (props) => {
  const theme = useTheme();
  const { order, t, configData, dispatch, index } = props;

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const storeImage =
    order?.module_type === "parcel"
      ? configData?.base_urls?.parcel_category_image_url
      : configData?.base_urls?.store_image_url;
  const router = useRouter();

  const handleClick = (e) => {
    if (order?.delivery_man) {
      dispatch(setDeliveryManInfoByDispatch(order?.delivery_man));
    }
    if (order?.module_type === "parcel") {
      if (sideDrawerOpen) {
      } else {
        router.push({
          pathname: "profile",
          query: {
            orderId: order?.id,
            page: "my-orders",
          },
        });
      }
    } else {
      router.push({
        pathname: "profile",
        query: {
          orderId: order?.id,
          page: "my-orders",
        },
      });
    }
  };
  const handleRateButtonClick = (e) => {
    e.stopPropagation();
    router.push(`/rate-and-review/${order?.id}`, undefined, {
      shallow: true,
    });
  };
  const handleClickTrackOrder = (e) => {
    e.stopPropagation();
    if (order?.delivery_man) {
      e.stopPropagation();
      dispatch(setDeliveryManInfoByDispatch(order?.delivery_man));
    }
    if (order?.module_type === "parcel") {
      e.stopPropagation();
      setSideDrawerOpen(true);
    } else {
      router.push(
        {
          pathname: "profile",
          query: {
            page: "my-orders",
            orderId: order?.id,
            tab: "track-order",
          },
        },
        undefined,
        { shallow: true }
      );
    }
  };
  const color = () => {
    if (
      order?.order_status === "pending" ||
      order?.order_status === "failed" ||
      order?.order_status === "canceled"
    ) {
      return alpha(theme.palette.error.main, 0.8);
    }
    if (
      order?.order_status === "confirmed" ||
      order?.order_status === "picked_up" ||
      order?.order_status === "delivered"
    ) {
      return theme.palette.primary.main;
    }
  };

  const deliveredInformation = () => (
    <>
      <Button
        onClick={(e) => handleRateButtonClick(e)}
        variant="outlined"
        startIcon={
          <StarBorderSharpIcon
            sx={{
              width: { xs: "19px", sm: "19px", md: "20px" },
              height: "23px",
              paddingBottom: "3px",
            }}
          />
        }
        sx={{
          p: {
            xs: "5px 10px 5px 10px",
            sm: "8px 15px 8px 15px",
            md: "7px 15px 7px 15px",
          },
          fontSize: {
            xs: "12px",
            sm: "12px",
            md: "14px",
          },
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.dark,
            color: (theme) => theme.palette.whiteContainer.main,
          },
        }}
      >
        {t("Review")}
      </Button>
    </>
  );

  const notDeliveredInformation = () => (
    <>
      {order?.order_status !== "delivered" &&
        order?.order_status !== "failed" &&
        order?.order_status !== "canceled" &&
        order?.order_status !== "refund_requested" &&
        order?.order_status !== "refund_request_canceled" &&
        order?.order_status !== "refunded" && (
          <Stack
            flexWrap="wrap"
            paddingRight={{ xs: "0px", md: "20px" }}
            alignItems="center"
          >
            <TrackOrderButton
              variant="outlined"
              size="small"
              onClick={(e) => handleClickTrackOrder(e)}
              endIcon={
                <CustomImageContainer
                  src={isXSmall ? trackOrderIcon1.src : trackOrderIcon.src}
                  width="20px"
                  height="20px"
                  smWidth="15px"
                  smHeight="15px"
                  alt="icon"
                />
              }
            >
              {t("Track Order")}
            </TrackOrderButton>
          </Stack>
        )}
    </>
  );
  return (
    <CustomPaper onClick={(e) => handleClick(e)}>
      <Grid container item spacing={1}>
        <Grid item xs={3} md={1}>
          <StoreImageBox
            borderraduis="10px"
            padding="2px"
            border={`1px solid ${alpha(theme.palette.neutral[400], 0.2)}`}
          >
            {order?.module_type === "parcel" && (
              <Stack
                sx={{
                  position: "absolute",
                  top: "5px",
                  zIndex: 2,
                  left: "1%",
                }}
              >
                <Chip
                  label={order?.module_type}
                  color="primary"
                  style={{
                    borderRadius: "2px",
                    textTransform: "capitalize",
                  }}
                />
              </Stack>
            )}

            <CustomImageContainer
              src={`${storeImage}/${order?.module_type === "parcel"
                  ? order?.parcel_category?.image
                  : order?.store?.logo
                }`}
              width="70px"
              height="70px"
              smWidth="43px"
              smHeight="43px"
              objectfit="cover"
            />
          </StoreImageBox>
        </Grid>
        <Grid item xs={9} sm={3} md={11} alignSelf="center">
          <CustomStackFullWidth
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 0, md: 2 }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            paddingLeft={{ xs: "10px", md: "0px" }}
          >
            <Stack justifyContent="flex-start">
              <Typography
                fontWeight="600"
                fontSize={{ xs: "12px", md: "14px" }}
              >
                {t("Order")}
                <Typography
                  fontWeight="600"
                  component="span"
                  marginLeft="5px"
                  fontSize={{ xs: "12px", md: "14px" }}
                >
                  {"#"}
                  {order?.id}
                </Typography>
                <Typography component="span" marginLeft="5px" fontSize="12px">
                   { order?.order_type !== "parcel" &&  `( ${order?.details_count} ${t("Items")} )` }
                </Typography>
              </Typography>
              {order?.order_status == "delivered" ? (
                <OrderStatusTypography color={color}>
                  {t("Delivered")}
                </OrderStatusTypography>
              ) : (
                <OrderStatusTypography color={color}>
                  {order?.order_status === "failed"
                    ? t("Payment Failed")
                    : t(order?.order_status).replaceAll("_", " ")}
                </OrderStatusTypography>
              )}
              <DateTypography>
                {order?.order_status == "delivered" ? (
                  <CustomFormatedDateTime date={order?.delivered} />
                ) : (
                  <CustomFormatedDateTime date={order?.created_at} />
                )}
              </DateTypography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap="30px"
              alignItems="center"
              width={{ xs: "100%", md: "auto" }}
            >
              <Typography
                fontSize="16px"
                fontWeight="500"
                textAlign={isXSmall ? "left" : "center"}
              >
                {getAmountWithSign(order?.order_amount)}
              </Typography>
              {order?.order_status == "delivered"
                ? deliveredInformation()
                : notDeliveredInformation()}
            </Stack>
          </CustomStackFullWidth>
        </Grid>
      </Grid>
      {sideDrawerOpen && (
        <TrackParcelOrderDrawer
          orderId={order?.id}
          sideDrawerOpen={sideDrawerOpen}
          setSideDrawerOpen={setSideDrawerOpen}
          closeHandler={() => setSideDrawerOpen(false)}
        />
      )}
    </CustomPaper>
  );
};
Order.propTypes = {};

export default Order;
