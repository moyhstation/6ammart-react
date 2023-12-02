/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { AddCircle, CheckCircle, InfoOutlined } from "@mui/icons-material";
import { Button, OutlinedInput, Skeleton, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Box, Stack } from "@mui/system";
import { useFormik } from "formik";
import { t } from "i18next";
import Image from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { onErrorResponse } from "../../api-manage/api-error-response/ErrorResponses";
import { useAddFundToWallet } from "../../api-manage/hooks/react-query/payment-method/useAddFundToWallet";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import { CustomButtonSuccess } from "../../styled-components/CustomButtons.style";
import {
  CustomStackFullWidth,
  RoundedStack,
} from "../../styled-components/CustomStyles.style";
import CustomImageContainer from "../CustomImageContainer";
import CustomModal from "../modal";
import WalletBgSvg from "./WalletBgSvg";
import walletIcon from "./assets/wallet-icon.png";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getLanguage } from "../../helper-functions/getLanguage";

const validationSchema = Yup.object({
  amount: Yup.string().required("Please Enter amount"),
  payment_method: Yup.string().required("Payment method is required"),
});

const WalletBoxComponent = (props) => {
  const {
    title,
    balance,
    image,
    handleConvertCurrency,
    isSmall,
    userDataLoading,
  } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { configData } = useSelector((state) => state?.configData);
  const [value, setValue] = useState(
    configData?.active_payment_method_list[0]?.gateway
  );

  const base_url = configData?.base_urls?.gateway_image_url;

  const formik = useFormik({
    initialValues: {
      amount: "",
      payment_method: configData?.active_payment_method_list[0]?.gateway,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        formSubmitHandler(values);
      } catch (err) {}
    },
  });

  const { mutate } = useAddFundToWallet();

  const formSubmitHandler = (values) => {
    setLoading(true);
    const page = "wallet";
    const callbackUrl = `${window.location.origin}/profile?page=${page}`;
    const payloadData = {
      ...values,
      callback: callbackUrl,
      payment_platform: "web",
    };

    mutate(payloadData, {
      onSuccess: async (response) => {
        setLoading(false);
        const url = response?.redirect_link;
        Router.push(url);
      },
      onError: onErrorResponse,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (title === "Total points") {
    return (
      <>
        <Stack position="relative" width="100%" maxWidth="360px">
          <WalletBgSvg />
          <Stack justifyContent="flex-end" direction="row" alignItems="center">
            <Stack pl="20px" flexWrap="wrap" width="100%" position="relative">
              <Stack>
                <Typography
                  fontSize="16px"
                  color={theme.palette.neutral[100]}
                  component="div"
                  mb={1}
                >
                  {title}
                </Typography>
                <Typography
                  fontSize={{ xs: "20px", md: "24px" }}
                  fontWeight="700"
                  color={theme.palette.neutral[100]}
                  sx={{ wordBreak: "break-all", lineHeight: 1 }}
                >
                  {!userDataLoading ? (
                    balance && balance
                  ) : (
                    <Skeleton variant="text" width="100px" />
                  )}
                </Typography>
              </Stack>
              {!isSmall && (
                <Stack justifyContent="end" paddingTop="1rem">
                  <Typography
                    color={theme.palette.whiteContainer.main}
                    sx={{ textDecoration: "underline" }}
                    onClick={handleConvertCurrency}
                    fontSize="13px"
                    fontWeight="700"
                  >
                    {t("Convert to currency now")}
                  </Typography>
                </Stack>
              )}
            </Stack>
            <Stack right="-101%">
              <RoundedStack
                width="160px"
                height="160px"
                smwidth="139px"
                smheight="139px"
                background={theme.palette.roundStackTwo}
              >
                <RoundedStack
                  width="130px"
                  height="130px"
                  smwidth="107px"
                  smheight="107px"
                  background={theme.palette.roundStackOne}
                >
                  <CustomImageContainer
                    src={image.src}
                    width="86px"
                    height="86px"
                  />
                </RoundedStack>
              </RoundedStack>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  }

  return (
    <>
      <CustomWalletStack position="relative">
        <WalletBgSvg />
        <Stack
          justifyContent="flex-end"
          direction="row"
          alignItems="center"
          position="relative"
        >
          <Stack flexWrap="wrap" width="100%" position="relative">
            <Box
              sx={{
                marginLeft: "-24px",
                marginTop: "-35px",
              }}
            >
              <Image src={walletIcon.src} width="110" height="110" />
            </Box>
            <Stack>
              <Typography
                fontSize="13px"
                color={theme.palette.neutral[100]}
                component="div"
                mb={2}
                mt="-25px"
              >
                <Stack sx={{ alignItems: "center" }} direction="row" gap={1}>
                  <Box>{title}</Box>
                  <Box fontSize="18px" sx={{ cursor: "pointer" }}>
                    <Tooltip
                      title={t(
                        "If you want to add fund to your wallet then click add fund button"
                      )}
                      placement="top"
                      disableFocusListener
                    >
                      <InfoOutlined fontSize="20px" />
                    </Tooltip>
                  </Box>
                </Stack>
              </Typography>
              <Typography
                fontSize={{ xs: "20px", md: "32px" }}
                fontWeight="500"
                color={theme.palette.neutral[100]}
                sx={{ wordBreak: "break-all", lineHeight: 1 }}
              >
                <Stack direction="row">
                  {!userDataLoading ? (
                    balance ? (
                      getAmountWithSign(balance)
                    ) : (
                      getAmountWithSign(0)
                    )
                  ) : (
                    <Skeleton variant="text" width="100px" />
                  )}{" "}
                </Stack>
              </Typography>
            </Stack>
          </Stack>
          <Button
            sx={{
              position: "absolute",
              color: "#fff",
              cursor: "pointer",
              direction: "row",
              alignItems: "center",
              right: getLanguage() !== "rtl" && "-5px",
              top: "-15px",
              left: getLanguage() === "rtl" && "-5px",
              gap: 1,
              zIndex: "1",
              border: "1px solid transparent",
              "&:active": {
                borderColor: theme.palette.divider,
              },
            }}
            onClick={() => setOpen(!open)}
          >
            <Typography component="span" sx={{ fontSize: "13px" }}>
              {t("Add fund")}
            </Typography>
            <AddCircle />
          </Button>
        </Stack>
      </CustomWalletStack>
      <CustomModal openModal={open} handleClose={handleClose}>
        <Box sx={{ p: { xs: "24px" }, paddingBlock: { sm: "41px 27px" } }}>
          <CustomStackFullWidth
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ position: "relative" }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                zIndex: "99",
                position: "absolute",
                top: -40,
                right: -20,
                backgroundColor: (theme) => theme.palette.neutral[100],
                borderRadius: "50%",
                [theme.breakpoints.down("md")]: {
                  top: -25,
                  right: -20,
                },
              }}
            >
              <CloseIcon sx={{ fontSize: "12px", fontWeight: "500" }} />
            </IconButton>
          </CustomStackFullWidth>
          <Box textAlign="center" mb={4}>
            <Typography variant="h6" mb={2}>
              {t("Add Fund to Wallet")}
            </Typography>
            <Typography variant="body2">
              {t("Add fund by from secured digital payment gateways")}
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <CustomOutlinedInput
              variant="outlined"
              name="amount"
              id="amount"
              type="number"
              placeholder="Enter Amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helpertext={formik.touched.amount && formik.errors.amount}
            />
            <Box mt={3}>
              <Typography variant="body1" fontWeight="600" mb={2}>
                {t("Payment Methods")}
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontSize: "12px" }}
                >
                  ({t("Faster & secure way to pay bill")})
                </Typography>
              </Typography>
              {formik.values.amount > 0 && (
                <>
                  <Stack>
                    {configData?.active_payment_method_list?.map((item, i) => (
                      <CustomRadioBox key={item?.gateway}>
                        <label
                          className={value == item.gateway ? "active" : ""}
                        >
                          <input
                            type="radio"
                            name="payment_method"
                            value={item?.gateway}
                            onChange={(e) => {
                              setValue(e.target.value);
                              formik.handleChange(e);
                            }}
                            style={{ display: "none" }}
                          />
                          {value == item.gateway ? (
                            <CheckCircle />
                          ) : (
                            <Box
                              sx={{
                                width: "18px",
                                borderRadius: "50%",
                                aspectRatio: "1",
                                border: `1px solid ${theme.palette.divider}`,
                              }}
                            />
                          )}
                          <Stack
                            direction="row"
                            gap={1}
                            sx={{
                              img: {
                                height: "24px",
                                width: "unset",
                              },
                            }}
                          >
                            {item?.gateway_image && (
                              <CustomImageContainer
                                src={base_url + "/" + item?.gateway_image}
                                width="30px"
                                height="30px"
                                objectfit="contain"
                              />
                            )}
                            <Typography fontSize="14px">
                              {item?.gateway_title}
                            </Typography>
                          </Stack>
                        </label>
                      </CustomRadioBox>
                    ))}
                  </Stack>
                </>
              )}
            </Box>
            <Box mt={4}>
              <CustomButtonSuccess
                width="100%"
                height="50px"
                type="submit"
                loading={loading}
                disabled={formik.values.amount <= 0}
              >
                {t("Add fund")}
              </CustomButtonSuccess>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  );
};

export const CustomRadioBox = styled(Box)(({ theme, type }) => ({
  label: {
    display: "flex",
    alignItems: "center",
    gap: "21px",
    cursor: "pointer",
    ".MuiSvgIcon-root": {
      width: "18px",
      height: "18px",
      color: theme.palette.primary.main,
    },
    ">.MuiStack-root": {
      width: "0",
      flexGrow: "1",
    },
    padding: "8px 30px",
    borderRadius: "10px",
    "&.active": {
      background: theme.palette.background.custom3,
    },
  },
}));

export const CustomOutlinedInput = styled(OutlinedInput)(({ theme, type }) => ({
  borderRadius: "7px",
  height: "48px",
  width: "100%",
  maxWidth: "457px",
  outline: "none !important",
  border: "none !important",
  boxShadow: "none !important",
  background: theme.palette.background.paper,
  paddingInline: "35px",
  fontSize: "20px",
  input: {
    textAlign: "center",
    fontWeight: "400",
  },
  "input::-webkit-inner-spin-button": {
    display: "none",
  },
  "input::-webkit-iuter-spin-button": {
    display: "none",
  },
}));

const CustomWalletStack = styled(Stack)(
  ({ theme, minHeight, minHeightForCustomCard }) => ({
    borderRadius: "10px",
    padding: "36px 15px 30px 23px",
    position: "relative",
    overflow: "hidden",
  })
);
const CustomWalletButton = styled(Button)(
  ({ theme, minHeight, minHeightForCustomCard }) => ({
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    whiteSpace: "nowrap",
    color: theme.palette.primary.main,
    borderRadius: "6px",
    fontSize: "12px",
    padding: "9px 15px",
    "&:hover": {
      backgroundColor: "#fff",
    },
  })
);

export default WalletBoxComponent;
