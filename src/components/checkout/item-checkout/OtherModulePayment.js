import React, { useState } from "react";
import {
  alpha,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";

import { t } from "i18next";

import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import PaymentMethodCard from "../PaymentMethodCard";
import InfoIcon from "@mui/icons-material/Info";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { DeliveryCaption } from "../CheckOut.style";
import { setOfflineMethod } from "../../../redux/slices/offlinePaymentData";
import { getToken } from "../../../helper-functions/getToken";
import wallet from "../assets/wallet.png";
import money from "../assets/money.png";
import OfflinePaymentIcon from "../assets/OfflinePaymentIcon";

const PayButton = styled(Button)(({ theme, value, paymentMethod }) => ({
  padding: "15px 15px",
  gap: "5px",
  border: "1px solid",
  borderColor: alpha(theme.palette.neutral[400], 0.4),
  color:
    value === paymentMethod
      ? theme.palette.neutral[100]
      : theme.palette.neutral[1000],
  background: value === paymentMethod && theme.palette.primary.main,
  "&:hover": {
    color: theme.palette.neutral[1000],
    background: value === paymentMethod && theme.palette.primary.main,
  },
}));

const OfflineButton = styled(Button)(({ theme, value, paymentMethod }) => ({
  padding: "15px 15px",
  border: "1px solid #E4F4FF",
  filter: `drop-shadow(-1px 1px 0px ${alpha(theme.palette.info.light, 0.2)})`,
  gap: "5px",
  color:
    value?.id === paymentMethod?.id
      ? theme.palette.whiteContainer.main
      : theme.palette.neutral[1000],
  background:
    value?.id === paymentMethod?.id
      ? theme.palette.primary.main
      : theme.palette.neutral[100],
  "&:hover": {
    color: theme.palette.whiteContainer.main,
    background: theme.palette.primary.main,
  },
}));

const OtherModulePayment = (props) => {
  const {
    paymentMethod,
    setPaymentMethod,
    paidBy,
    orderPlace,
    isLoading,
    zoneData,
    forprescription,
    configData,
    orderType,
    parcel,
    setOpenModel,
    usePartialPayment,
    offlinePaymentOptions,
    setPaymentMethodImage,
  } = props;

  const theme = useTheme();
  const dispatch = useDispatch();
  const token = getToken();
  const borderColor = theme.palette.neutral[400];
  const [openOfflineOptions, setOpenOfflineOptions] = useState(false);

  const { offlineMethod } = useSelector((state) => state.offlinePayment);
  const [isCheckedOffline, setIsCheckedOffline] = useState(
    offlineMethod === "" ? false : true
  );

  const handleClickOffline = () => {
    setOpenOfflineOptions(!openOfflineOptions);
  };
  const handleClick = (item) => {
    setPaymentMethod(item);
    dispatch(setOfflineMethod(""));
    setIsCheckedOffline(false);
  };
  const handleClickOfflineItem = (item) => {
    dispatch(setOfflineMethod(item));
    setIsCheckedOffline(true);
    setPaymentMethod(`offline_payment`);
  };
  const handleSubmit = () => {
    setOpenModel(false);
  };
  const handleCancel = () => {
    setOpenModel(false);
  };

  return (
    <CustomStackFullWidth spacing={1.5}>
      <CustomStackFullWidth gap="20px">
        <DeliveryCaption>{t("Payment Method")}</DeliveryCaption>
        <CustomStackFullWidth spacing={1}>
          <Stack>
            <Typography fontSize="12px" fontWeight="500">
              {t("Choose Payment Method")}
            </Typography>
            <Typography fontSize="10px">
              {t("(Choose Payment Method)")}
            </Typography>
          </Stack>
          <CustomStackFullWidth
            direction="row"
            spacing={{ xs: 0, md: 1.7 }}
            sx={{ flexWrap: "wrap", gap: "5px" }}
          >
            {zoneData?.data?.zone_data?.[0]?.cash_on_delivery &&
            (configData?.partial_payment_method === "both" ||
              configData?.partial_payment_method === "cod" ||
              configData?.partial_payment_method === null) ? (
              <PayButton
                value="cash_on_delivery"
                paymentMethod={paymentMethod}
                onClick={() => handleClick("cash_on_delivery")}
              >
                <CustomImageContainer
                  src={money.src}
                  width="20px"
                  height="20px"
                  alt="cod"
                />
                <Typography fontSize="12px">
                  {t("Pay after service")}
                </Typography>
              </PayButton>
            ) : null}
            {configData?.customer_wallet_status === 1 &&
              forprescription !== "true" &&
              token && (
                <PayButton
                  onClick={() => handleClick("wallet")}
                  value="wallet"
                  paymentMethod={paymentMethod}
                  disabled={usePartialPayment}
                >
                  <CustomImageContainer
                    src={wallet.src}
                    width="20px"
                    height="20px"
                    alt="cod"
                  />
                  <Typography fontSize="12px">{t("Pay via Wallet")}</Typography>
                </PayButton>
              )}

            {/*{zoneData?.data?.zone_data?.[0]?.digital_payment &&*/}
            {/*  forprescription !== "true" &&*/}
            {/*  configData?.digital_payment_info?.digital_payment &&*/}
            {/*  configData?.digital_payment_info?.default_payment_gateways &&*/}
            {/*  (configData?.partial_payment_method === "digital_payment" ||*/}
            {/*    configData?.partial_payment_method === "both") && (*/}
            {/*    <PayButton*/}
            {/*      value="digital_payment"*/}
            {/*      paymentMethod={paymentMethod}*/}
            {/*      onClick={() => handleClick("digital_payment")}*/}
            {/*    >*/}
            {/*      <CustomImageContainer*/}
            {/*        src={money.src}*/}
            {/*        width="20px"*/}
            {/*        height="20px"*/}
            {/*        alt="cod"*/}
            {/*      />*/}
            {/*      <Typography fontSize="12px">{t("Pay after service")}</Typography>*/}
            {/*    </PayButton>*/}
            {/*  )}*/}
          </CustomStackFullWidth>
          {zoneData?.data?.zone_data?.[0]?.digital_payment &&
            paidBy !== "receiver" &&
            forprescription !== "true" &&
            configData?.digital_payment_info?.digital_payment &&
            (configData?.partial_payment_method === "digital_payment" ||
              configData?.partial_payment_method === "both" ||
              configData?.partial_payment_method === null) && (
              <CustomStackFullWidth spacing={2.4}>
                <Typography fontSize="14px" fontWeight="500">
                  {t("Payment Methods")}
                  <Typography component="span" fontSize="10px" ml="5px">
                    {t("(Faster & secure way to pay bill)")}
                  </Typography>
                </Typography>
                <CustomStackFullWidth spacing={1}>
                  <Grid container spacing={3}>
                    {configData?.active_payment_method_list?.map(
                      (item, index) => {
                        return (
                          <Grid item xs={6} key={index}>
                            <PaymentMethodCard
                              parcel={parcel}
                              paymentType={item?.gateway_title}
                              image={item?.gateway_image}
                              paymentMethod={paymentMethod}
                              setPaymentMethod={setPaymentMethod}
                              setIsCheckedOffline={setIsCheckedOffline}
                              paidBy={paidBy}
                              type={item?.gateway}
                              imageUrl={
                                configData?.base_urls?.gateway_image_url
                              }
                              digitalPaymentMethodActive={
                                configData?.digital_payment_info
                                  ?.digital_payment
                              }
                              setPaymentMethodImage={setPaymentMethodImage}
                            />
                          </Grid>
                        );
                      }
                    )}
                  </Grid>
                </CustomStackFullWidth>
              </CustomStackFullWidth>
            )}
        </CustomStackFullWidth>
        <Stack onClick={handleClickOffline} sx={{ cursor: "pointer" }}>
          {configData?.offline_payment_status === 1 &&
          zoneData?.data?.zone_data?.[0]?.offline_payment &&
          forprescription !== "true" &&
          typeof offlinePaymentOptions !== "undefined" &&
          Object?.keys(offlinePaymentOptions)?.length !== 0 ? (
            <Stack
              padding="10px 10px 10px 25px"
              borderRadius="10px"
              backgroundColor={alpha(theme.palette.primary.main, 0.1)}
            >
              <CustomStackFullWidth gap="15px">
                <CustomStackFullWidth
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <FormControl
                    sx={{
                      marginRight: { xs: "0px" },
                      marginLeft: { xs: "5px" },
                    }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      fontWeight="600"
                    >
                      <FormControlLabel
                        value={t("Pay Offline")}
                        control={
                          <Radio
                            sx={{ padding: { xs: "2px", md: "10px" } }}
                            checked={isCheckedOffline}
                            onClick={handleClickOffline}
                          />
                        }
                        label={
                          <Stack
                            flexDirection="row"
                            gap="16px"
                            paddingLeft={{ xs: "5px", sm: "5px", md: "10px" }}
                          >
                            <OfflinePaymentIcon />
                            <Typography
                              fontSize="12px"
                              fontWeight="500"
                              // paddingLeft="10px"
                            >
                              {t("Pay Offline")}
                              <Typography
                                component="span"
                                fontSize="10px"
                                ml="5px"
                              >
                                ( {t("Select option from below")} )
                              </Typography>
                            </Typography>
                          </Stack>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                  <Tooltip
                    placement="left"
                    title={t(
                      "Offline Payment! Now, with just a click of a button, you can make secure transactions. It's simple, convenient, and reliable."
                    )}
                  >
                    <InfoIcon
                      fontSize="16px"
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </Tooltip>
                </CustomStackFullWidth>
                {openOfflineOptions && (
                  <CustomStackFullWidth>
                    <CustomStackFullWidth flexDirection="row" gap="20px">
                      {offlinePaymentOptions?.map((item, index) => {
                        return (
                          <OfflineButton
                            key={index}
                            value={item}
                            paymentMethod={offlineMethod}
                            onClick={() => handleClickOfflineItem(item)}
                          >
                            <Typography fontSize="12px">
                              {item.method_name}
                            </Typography>
                          </OfflineButton>
                        );
                      })}
                    </CustomStackFullWidth>
                  </CustomStackFullWidth>
                )}
              </CustomStackFullWidth>
            </Stack>
          ) : null}
        </Stack>
        <Stack
          direction="row"
          width="100%"
          spacing={1}
          justifyContent="flex-end"
          gap="20px"
        >
          <Button
            onClick={() => handleCancel()}
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: "5px",
              color: borderColor,
              padding: "8px 16px",
            }}
          >
            {t("Close")}
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSubmit()}
            disabled={paymentMethod || isCheckedOffline ? false : true}
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: "5px",
              padding: "8px 22px",
            }}
          >
            {t("Submit")}
          </Button>
        </Stack>
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default OtherModulePayment;
