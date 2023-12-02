import React, { useEffect, useState } from "react";
import {
  CustomFormControlLabel,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import PaymentMethodCard from "../PaymentMethodCard";
import { t } from "i18next";
import cashOnDelivery from "../assets/cod.png";
import wallet from "../assets/paymentWallet.png";
import digitalPayment from "../assets/payment.png";
import LoadingButton from "@mui/lab/LoadingButton";
import { DeliveryCaption } from "../CheckOut.style";
import SimpleBar from "simplebar-react";
import { getToken } from "../../../helper-functions/getToken";
import { alpha } from "@mui/system";
import {
  Button,
  FormControl,
  Radio,
  RadioGroup,
  Typography,
  styled,
  useTheme,
  Tooltip,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import {
  setOfflineInfoStep,
  setOfflineMethod,
} from "../../../redux/slices/offlinePaymentData";
import { useRouter } from "next/router";
import OfflinePaymentIcon from "../assets/OfflinePaymentIcon";

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
const ParcelPaymentMethod = (props) => {
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
    offlinePaymentOptions,
    setPaymentMethodImage,
  } = props;
  const token = getToken();
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { offlineMethod, offlineInfoStep } = useSelector(
    (state) => state.offlinePayment
  );
  const [isCheckedOffline, setIsCheckedOffline] = useState(
    offlineMethod !== "" ? true : false
  );
  const [openOfflineOptions, setOpenOfflineOptions] = useState(false);

  const handleClickOffline = () => {
    setOpenOfflineOptions(!openOfflineOptions);
  };
  const handleClickOfflineItem = (item) => {
    dispatch(setOfflineMethod(item));
    dispatch(setOfflineInfoStep(1));
    setIsCheckedOffline(true);
    setPaymentMethod(`offline_payment`);
  };

  const handleOffline = (e) => {
    // dispatch(setOfflineInfoStep(2));
    //  router.push("/checkout?page=offline", undefined, { shallow: true });
    router.push(
      { pathname: "/checkout", query: { page: "parcel", method: "offline" } },
      undefined,
      { shallow: true }
    );
  };

  return (
    <CustomStackFullWidth
      sx={{ height: { md: paidBy === "receiver" ? "0px" : "410px" } }}
      justifyContent="space-between"
      spacing={1}
    >
      <DeliveryCaption parcel={parcel}>{t("Payment Method")}</DeliveryCaption>
      <SimpleBar style={{ maxHeight: "270px" }}>
        <CustomStackFullWidth
          direction={parcel === "true" ? "column" : "row"}
          sx={{
            flexWrap: "wrap",
            gap: {
              xs: parcel === "true" ? "16px" : "0px",
              sm: parcel === "true" ? "16px" : "0px",
              md: "16px",
            },
          }}
        >
          <>
            {" "}
            {zoneData?.data?.zone_data?.[0]?.cash_on_delivery && (
              <PaymentMethodCard
                parcel={parcel}
                paymentType={t("Cash on delivery")}
                image={cashOnDelivery}
                type="cash_on_delivery"
                description={t("Faster and safer way to send money")}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                setIsCheckedOffline={setIsCheckedOffline}
                paidBy={paidBy}
              />
            )}
            {configData?.customer_wallet_status === 1 &&
              paidBy !== "receiver" &&
              forprescription !== "true" && (
                <PaymentMethodCard
                  parcel={parcel}
                  paymentType={t("Wallet Payment")}
                  image={wallet}
                  type="wallet"
                  description={t("Faster and safer way to send money")}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  setIsCheckedOffline={setIsCheckedOffline}
                  paidBy={paidBy}
                />
              )}
            {zoneData?.data?.zone_data?.[0]?.digital_payment &&
              paidBy !== "receiver" &&
              forprescription !== "true" &&
              configData?.digital_payment_info?.digital_payment && (
                <>
                  {configData?.active_payment_method_list?.map(
                    (item, index) => {
                      return (
                        <PaymentMethodCard
                          key={index}
                          parcel={parcel}
                          paymentType={item?.gateway_title}
                          image={item?.gateway_image}
                          paymentMethod={paymentMethod}
                          setPaymentMethod={setPaymentMethod}
                          setIsCheckedOffline={setIsCheckedOffline}
                          paidBy={paidBy}
                          type={item?.gateway}
                          digitalPaymentMethodActive={
                            configData?.digital_payment_info?.digital_payment
                          }
                          imageUrl={configData?.base_urls?.gateway_image_url}
                        />
                      );
                    }
                  )}
                </>
              )}
          </>
          {zoneData?.data?.zone_data?.[0]?.offline_payment &&
          typeof offlinePaymentOptions !== "undefined" &&
          Object?.keys(offlinePaymentOptions)?.length !== 0 &&
          configData?.offline_payment_status === 1 &&
          paidBy !== "receiver" ? (
            <CustomStackFullWidth
              padding="10px"
              borderRadius="10px"
              backgroundColor={alpha(theme.palette.primary.main, 0.1)}
              onClick={handleClickOffline}
              sx={{ cursor: "pointer" }}
            >
              <CustomStackFullWidth gap="10px">
                <CustomStackFullWidth
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <FormControl
                    sx={{
                      marginRight: { xs: "0px" },
                      // marginLeft: { xs: "5px" },
                    }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      fontWeight="600"
                    >
                      <CustomFormControlLabel
                        value="Pay Offline"
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
                            <Typography fontSize="14px" fontWeight="500">
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
                    title="Offline Payment! Now, with just a click of a button, you can make secure transactions. It's simple, convenient, and reliable."
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
            </CustomStackFullWidth>
          ) : null}
        </CustomStackFullWidth>
      </SimpleBar>
      {paidBy && offlineInfoStep === 0 ? (
        <CustomStackFullWidth>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            onClick={orderPlace}
            loading={isLoading}
          >
            {t("Confirm Parcel Request")}
          </LoadingButton>
        </CustomStackFullWidth>
      ) : (
        <CustomStackFullWidth>
          <LoadingButton
            // type="submit"
            fullWidth
            variant="contained"
            onClick={handleOffline}
          >
            {t("Confirm Order")}
          </LoadingButton>
        </CustomStackFullWidth>
      )}
    </CustomStackFullWidth>
  );
};

export default ParcelPaymentMethod;
