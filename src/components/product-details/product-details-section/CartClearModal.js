import {
  Button,
  Grid,
  Modal,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

import { styled, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import Image from "next/image";
import warningImage from "../../../../public/static/warning.png";
import {
  CustomColouredTypography,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import { setClearCart } from "../../../redux/slices/cart";
import {
  cart_clear_description,
  cart_clear_header,
  cart_clear_messages,
  cart_clear_success_message,
} from "../../../utils/toasterMessages";
import toast from "react-hot-toast";
import useDeleteAllCartItem from "../../../api-manage/hooks/react-query/add-cart/useDeleteAllCartItem";
import { onErrorResponse } from "../../../api-manage/api-error-response/ErrorResponses";
import { getToken } from "../../../helper-functions/getToken";

const CustomStyledBox = styled(Paper)(({ theme }) => ({
  padding: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    width: 280,
  },
}));

const CartClearModal = ({ handleClose, dispatchRedux }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const guestId = localStorage.getItem("guest_id");
  const { mutate } = useDeleteAllCartItem();
  const handleClearCart = () => {
    mutate(guestId, {
      //onSuccess: handleSuccess,
      onError: onErrorResponse,
    });
    dispatchRedux(setClearCart());
    toast.success(t(cart_clear_success_message), { duration: 5000 });
    handleClose?.("add-item");
  };

  return (
    <CustomStackFullWidth>
      <CustomStyledBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} align="center" mt=".5rem">
            <Image
              width={60}
              height={60}
              src={warningImage}
              alt={t("warning")}
            />
          </Grid>
          <Grid item xs={12} md={12} align="center">
            <CustomColouredTypography
              variant="h5"
              color={theme.palette.error.main}
            >
              {t(cart_clear_header)}
            </CustomColouredTypography>
          </Grid>
          <Grid item xs={12} md={12} align="center">
            <Typography fontWeight="bold">
              {t(cart_clear_description)}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} align="center">
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClose}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              {t("Cancel")}
            </Button>
          </Grid>
          <Grid item xs={6} md={6} align="center">
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleClearCart()}
            >
              {isXSmall ? t("Clear") : t("Clear Cart")}
            </Button>
          </Grid>
        </Grid>
      </CustomStyledBox>
    </CustomStackFullWidth>
  );
};

export default CartClearModal;
