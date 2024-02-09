import React, { useEffect, useState } from "react";
import CustomModal from "../modal";
import {
  alpha,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { setOrderDetailsModalOpen } from "../../redux/slices/utils";
import { getGuestId } from "../../helper-functions/getToken";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { ItemWrapper, ModalCustomTypography } from "./OrderDetailsModal.style";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import jwt from "base-64";
import CheckoutFailed from "../checkout/CheckoutFailed";

const OrderDetailsModal = ({ orderDetailsModalOpen }) => {
  const dispatch = useDispatch();
  const { configData } = useSelector((state) => state.configData);
  const theme = useTheme();
  const guestId = getGuestId();
  const router = useRouter();
  const { status, totalAmount, order_id, token, flag } = router.query;
  const { t } = useTranslation();
  const { total } = router.query;
  const [attributeId, setAttributeId] = useState("");
  const { guestUserOrderId, guestUserInfo } = useSelector(
    (state) => state.guestUserInfo
  );
  const { orderInformation } = useSelector((state) => state.utilsData);
  const { offlinePaymentInfo } = useSelector((state) => state.offlinePayment);
  const handleOrderDetailsClose = () => {
    dispatch(setOrderDetailsModalOpen(false));
  };

  const handleClickToRoute = (href) => {
    dispatch(setOrderDetailsModalOpen(false));
    router.push(href, undefined, { shallow: true });
  };

  useEffect(() => {
    if (token) {
      try {
        // Attempt to decode the Base64 token
        const decodedToken = jwt.decode(token);

        // Check if decodedToken is a valid string
        if (typeof decodedToken === "string") {
          // Assuming decodedToken is in the format: "key1=value1&&key2=value2&&..."
          const keyValuePairs = decodedToken.split("&&");

          // Loop through the key-value pairs to find the one with attribute_id
          for (const pair of keyValuePairs) {
            const [key, value] = pair.split("=");
            if (key === "attribute_id") {
              setAttributeId(value);
              return; // Exit the loop when attribute_id is found
            }
          }
        } else {
          console.error("Decoded token is not a string:", decodedToken);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.error("Token is missing.");
    }
  }, [token]);
  return (
    <CustomModal
      openModal={orderDetailsModalOpen}
      handleClose={() => handleOrderDetailsClose()}
    >
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ position: "relative" }}
      >
        <IconButton
          onClick={() => handleOrderDetailsClose()}
          sx={{
            zIndex: "99",
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: (theme) => theme.palette.neutral[100],
            borderRadius: "50%",
            [theme.breakpoints.down("md")]: {
              top: 10,
              right: 5,
            },
          }}
        >
          <CloseIcon sx={{ fontSize: "24px", fontWeight: "500" }} />
        </IconButton>
      </CustomStackFullWidth>
      {(flag && flag === "fail") || flag === "cancel" ? (
        <CheckoutFailed
          id={order_id ? order_id : attributeId}
          configData={configData}
          handleOrderDetailsClose={handleOrderDetailsClose}
        />
      ) : (
        <CustomStackFullWidth
          padding={{ xs: "40px 15px", md: "45px 45px 40px" }}
          alignItems="center"
          gap="20px"
        >
          <CheckCircleOutlineOutlinedIcon
            sx={{
              height: "46px",
              width: "46px",
              color: alpha(theme.palette.primary.main, 0.7),
            }}
          />
          <Typography fontSize="16px" fontWeight="700">
            {`${t("Order Placed Successfully")} !`}
          </Typography>
          <CustomStackFullWidth
            padding={{ xs: "0px 20px", md: "0px 38px" }}
            textAlign="center"
          >
            <Typography fontWeight="400">
              {`${t("Make sure to remember your ")}`}
              <Typography component="span" fontWeight={500}>{`${t(
                "order ID and phone number"
              )}`}</Typography>
              <Typography component="span">
                {`${t(
                  " that is used in this order as you have ordered as guest user. Other wise you won’t be able to track your order in future."
                )}`}
              </Typography>
            </Typography>
          </CustomStackFullWidth>
          <CustomStackFullWidth
            padding="20px 10px 20px 10px"
            backgroundColor={alpha(theme.palette.neutral[400], 0.09)}
            alignItems="center"
            gap="20px"
            borderRadius="10px"
          >
            <Typography fontWeight={700}>{t("Order Information :")}</Typography>
            <Stack textAlign="center">
              <Stack width="max-content">
                <ItemWrapper container>
                  <ModalCustomTypography>
                    {`${t("Order")} #`}
                  </ModalCustomTypography>
                  <Typography sx={{ wordWrap: "break-word" }}>
                    :&nbsp;&nbsp;{guestUserOrderId}
                  </Typography>
                </ItemWrapper>
                <ItemWrapper>
                  <ModalCustomTypography>
                    {`${t("Order Time")}`}
                  </ModalCustomTypography>
                  <Typography sx={{ wordWrap: "break-word" }}>
                    :&nbsp;&nbsp;{orderInformation?.created_at}
                  </Typography>
                </ItemWrapper>
                <ItemWrapper>
                  <ModalCustomTypography>
                    {`${t("Order Status")}`}
                  </ModalCustomTypography>
                  <Typography sx={{ wordWrap: "break-word" }}>
                    :&nbsp;&nbsp;{orderInformation?.status}
                  </Typography>
                </ItemWrapper>
                {/*{orderInformation?.offline_payment && (*/}
                {/*  <>*/}
                {/*    {orderInformation?.offline_payment?.input?.map(*/}
                {/*      (item, index) => {*/}
                {/*        return (*/}
                {/*          <ItemWrapper key={index}>*/}
                {/*            <ModalCustomTypography*/}
                {/*              sx={{ textTransform: "capitalize" }}*/}
                {/*            >*/}
                {/*              {item?.user_input.replaceAll("_", " ")}*/}
                {/*            </ModalCustomTypography>*/}
                {/*            <Typography sx={{ wordWrap: "break-word" }}>*/}
                {/*              :&nbsp;&nbsp;{item?.user_data.replaceAll("_", " ")}*/}
                {/*            </Typography>*/}
                {/*          </ItemWrapper>*/}
                {/*        );*/}
                {/*      }*/}
                {/*    )}*/}
                {/*    <ItemWrapper>*/}
                {/*      {data?.offline_payment?.data?.customer_note && (*/}
                {/*        <>*/}
                {/*          <ModalCustomTypography>{"Note"}</ModalCustomTypography>*/}
                {/*          <Typography sx={{ wordWrap: "break-word" }}>*/}
                {/*            :&nbsp;&nbsp;*/}
                {/*            {*/}
                {/*              orderInformation?.offline_payment?.data*/}
                {/*                ?.customer_note*/}
                {/*            }*/}
                {/*          </Typography>*/}
                {/*        </>*/}
                {/*      )}*/}
                {/*    </ItemWrapper>*/}
                {/*  </>*/}
                {/*)}*/}
              </Stack>
            </Stack>
          </CustomStackFullWidth>
          <Button
            onClick={() => handleClickToRoute("/track-order")}
            variant="contained"
            // maxWidth="150px"
            // fullWidth
          >
            {t("Track Order")}
          </Button>
        </CustomStackFullWidth>
      )}
    </CustomModal>
  );
};

export default OrderDetailsModal;
