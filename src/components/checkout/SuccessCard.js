import React, { useEffect, useState } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import giftbox from "./assets/giftbox.gif";

import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import {
  CustomColouredTypography,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";

import { CustomTypography } from "../landing-page/hero-section/HeroSection.style";
import { getNumberWithConvertedDecimalPoint } from "../../utils/CustomFunctions";
import {
  setCampaignItemList,
  setClearCart,
  setRemoveItemFromCart,
} from "../../redux/slices/cart";
import CustomImageContainer from "../CustomImageContainer";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { useTheme } from "@emotion/react";
const SuccessCard = ({ configData, total, order_id }) => {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setClearCart());
    dispatch(setCampaignItemList());
    if (total) {
      setTotalAmount(total);
    } else {
      if (localStorage.getItem("totalAmount")) {
        setTotalAmount(localStorage.getItem("totalAmount"));
      }
    }
  }, []);
  const handlePoints = () => {
    if (totalAmount && configData?.loyalty_point_status === 1) {
      return getNumberWithConvertedDecimalPoint(
        (totalAmount / 100) * configData?.loyalty_point_item_purchase_point,
        configData?.digit_after_decimal_point
      );
    }
  };
  const handleText = () => {
    if (getCurrentModuleType() === "food") {
      return "food";
    } else if (getCurrentModuleType() === "parcel") {
      return "parcel";
    } else {
      return "order";
    }
  };
  const colorId = () => {
    return <Typography color={theme.palette.primary.main}>234248</Typography>;
  };
  return (
    <CustomStackFullWidth
      height="100%"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <CustomStackFullWidth
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Typography
          align="center"
          sx={{ fontSize: 24 }}
          color="text.secondary"
          gutterBottom
        >
          {t("You place the order successfully.")}
        </Typography>
        <Typography align="center" sx={{ mb: 1.5 }} color="text.secondary">
          {t(
            `Your order is placed Successfully. We start our delivery process and you will receive your ${handleText()} soon.`
          )}
        </Typography>
        <Typography align="center" sx={{ mb: 1.5 }}>
          {t(`Your order is`)}
          <span
            style={{ color: theme.palette.primary.main, marginLeft: "3px" }}
          >
            {order_id}
          </span>
          {t(`. You can use this ID to track your order later`)}
        </Typography>
        {configData?.loyalty_point_status === 1 && (
          <CustomStackFullWidth
            alignItems="center"
            // justifyContent="center"
          >
            <CustomImageContainer
              src={giftbox.src}
              width="140px"
              borderRadius=".6rem"
              objectfit="contain"
            />
            <CustomColouredTypography color="primary" variant="h3">
              {t("Congratulations!")}
            </CustomColouredTypography>
            {/*<Stack*/}
            {/*  width="100%"*/}
            {/*  alignItems="center"*/}
            {/*  justifyContent="center"*/}
            {/*  direction="row"*/}
            {/*  spacing={0.5}*/}
            {/*  flexWrap="wrap"*/}
            {/*>*/}
            {/*  <Typography align="center" variant="body2">*/}
            {/*    {t("You have earned")}*/}
            {/*  </Typography>*/}
            {/*  <CustomTypography align="center" variant="body2">*/}
            {/*    {handlePoints()}*/}
            {/*    /!*{()=>  localStorage.removeItem('totalAmount')}*!/*/}
            {/*  </CustomTypography>*/}
            {/*  <Typography align="center" variant="body2">*/}
            {/*    {t("point.")}*/}
            {/*  </Typography>*/}
            {/*  <Typography align="center" variant="body2">*/}
            {/*    {t("It will add to your balance when the order is delivered.")}*/}
            {/*  </Typography>*/}
            {/*</Stack>*/}
          </CustomStackFullWidth>
        )}
        <Stack pt="2rem" spacing={1}>
          <Button
            onClick={() =>
              router.push("/track-order", undefined, { shallow: true })
            }
            variant="contained"
          >
            {t("Track your order")}
          </Button>
          <Typography
            onClick={() => router.push("/home", undefined, { shallow: true })}
            variant="contained"
            sx={{
              textDecoration: "underLine",
              cursor: "pointer",
              textAlign: "center",
              color: (theme) => theme.palette.primary.main,
            }}
          >
            {t("Continue shopping ")}
          </Typography>
        </Stack>
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};
export default SuccessCard;
