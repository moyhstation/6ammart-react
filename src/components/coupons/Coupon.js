import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  alpha,
  Button,
  Card,
  Grid,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import sideImage from "./assets/coupon.png";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import toast from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  CouponStyle,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import CustomCopyWithTooltip from "../custom-copy-with-tooltip";
import CustomImageContainer from "../CustomImageContainer";
import amountDiscount from "./assets/amountDiscount.png";
import freeDelivery from "./assets/freeDelivery.png";
import couponImagePercentage from "./assets/couponPer.png";
import CouponVector from "./CouponVector";
import CouponButtonComponent from "./CouponButtonComponent";
import moment from "moment/moment";

export const CouponButtonStyle = styled(Button)(({ theme }) => ({
  width: "111px",
  border: "1px  dotted",
  borderColor: theme.palette.primary.main,
  borderRadius: "5px",
  textAlign: "center",
  backgroundColor: alpha(theme.palette.primary.main, 0.2),
  padding: "5px 10px",
  fontSize: "12px",
  [theme.breakpoints.down("md")]: {
    fontSize: "11px",
    padding: "2px 5px",
  },
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  height: "100%",
  position: "relative",
  minHeight: "170px",
  [theme.breakpoints.down("sm")]: {
    height: "150px",
  },
}));

const Coupon = (props) => {
  const { coupon, isLoading, setCopy, copy } = props;

  const { t } = useTranslation();
  // const [copy, setCopy] = useState(null);
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const couponType = (coupon) => {
    if (coupon?.coupon_type === "store_wise") {
      return (
        <>
          {t("On")} {coupon?.data}
        </>
      );
    }
    if (coupon?.coupon_type === "zone_wise") {
      return (
        <>
          {t("Only for some specific zones")}{" "}
          {coupon?.store && `(${coupon?.store?.name})`}
        </>
      );
    }
    if (coupon?.coupon_type === "free_delivery") {
      return (
        <>
          {t("Free delivery")} {coupon?.store && `(${coupon?.store?.name})`}
        </>
      );
    }
    if (coupon?.coupon_type === "first_order") {
      return (
        <>
          {t("Only for First Order")}{" "}
          {coupon?.store && `(${coupon?.store?.name})`}
        </>
      );
    }
    if (coupon?.coupon_type === "default") {
      return (
        <>
          {coupon?.coupon_type} {coupon?.store && `(${coupon?.store?.name})`}
        </>
      );
    }
  };
  const imageHandler = () => {
    if (coupon?.coupon_type === "free_delivery") {
      return (
        <CustomImageContainer
          src={freeDelivery.src}
          width="30px"
          height="30px"
        />
      );
    } else {
      if (coupon?.discount_type === "percent") {
        return (
          <CustomImageContainer
            src={couponImagePercentage.src}
            width="30px"
            height="30px"
          />
        );
      } else {
        return (
          <CustomImageContainer
            src={amountDiscount.src}
            width="30px"
            height="30px"
          />
        );
      }
    }
  };

  return (
    <Card
      elevation={9}
      sx={{
        padding: ".5rem",
        boxShadow: `0px 2px 10px -3px ${(theme) =>
          alpha(theme.palette.primary.main, 0.1)}`,
        backgroundColor: theme.palette.neutral[100],
        backdropFilter: "blur(5px)",
      }}
    >
      <Stack alignItems="center" direction="row">
        <Stack alignItems="center" justifyContent="center" width="220px">
          {imageHandler()}
          <Typography
            fontWeight="bold"
            fontSize={{ xs: "14px", md: "18px" }}
            mt="8px"
          >
            {coupon?.coupon_type === "free_delivery"
              ? t("Free Delivery")
              : coupon?.discount_type === "percent"
              ? `${coupon?.discount} %`
              : getAmountWithSign(coupon?.discount)}
            {coupon?.coupon_type === "free_delivery" ? "" : t("Off")}
          </Typography>
          <Typography fontSize="10px" color={theme.palette.neutral[500]}>
            {couponType(coupon)}
          </Typography>
        </Stack>
        <CouponStyle>
          <CouponVector />
        </CouponStyle>
        <Stack
          spacing={0.5}
          padding="8px"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <CouponButtonComponent
            couponTitle={coupon.title}
            value={coupon?.code}
            setCopy={setCopy}
            copy={copy}
          />
          <Typography fontSize={{ xs: "10px", md: "12px" }} fontWeight="500">
            {moment(coupon?.start_date)?.format("DD MMM, YYYY")} {t("to")}{" "}
            {moment(coupon?.end_date)?.format("DD MMM, YYYY")}
          </Typography>
          {/*<Typography fontSize={{ xs: "8px", md: "10px" }}>*/}
          {/*  Available from 8:30 AM - 4:30 PM{" "}*/}
          {/*</Typography>*/}
        </Stack>
      </Stack>
    </Card>
  );
};

Coupon.propTypes = {};

export default Coupon;
