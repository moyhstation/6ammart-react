import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import CustomImageContainer from "../CustomImageContainer";
import { Stack } from "@mui/system";
import { Typography, useTheme } from "@mui/material";
import { t } from "i18next";
import distanceImage from "../../../public/static/distance.png";
import deliveryImage from "../../../public/static/fee.png";
import { element } from "prop-types";
import { Skeleton } from "@mui/material";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import { handleDistance } from "../../utils/CustomFunctions";
const DeliveryFree = ({
  data,
  parcelDeliveryFree,
  senderLocation,
  receiverLocation,
  configData,
  extraChargeLoading,
}) => {
  const theme = useTheme();
  return (
    <CustomStackFullWidth
      justifyContent="center"
      alignItems="center"
      direction="row"
      spacing={4}
    >
      <Stack direction="row" width="100%" spacing={1.5}>
        <CustomImageContainer
          src={distanceImage.src}
          width="37px"
          height="37px"
          objectfit="contain"
        />
        <Stack>
          <Typography color={theme.palette.neutral[1000]}>
            {t("Distance")}
          </Typography>
          {data ? (
            <Typography color={theme.palette.primary.main} fontWeight="600">
              {handleDistance(
                data?.rows[0]?.elements,
                senderLocation,
                receiverLocation
              )?.toFixed(configData?.digit_after_decimal_point)}{" "}
              km
            </Typography>
          ) : (
            <Skeleton width={50} height={20} variant="text" />
          )}
        </Stack>
      </Stack>
      <Stack direction="row" width="100%" spacing={1.5}>
        <CustomImageContainer
          src={deliveryImage.src}
          width="37px"
          height="37px"
          objectfit="contain"
        />
        <Stack flexWrap="wrap">
          <Typography>{t("Delivery Fee")}</Typography>
          {extraChargeLoading ? (
            <Skeleton width="30px" height="10px" variant="rectangular" />
          ) : (
            <Typography color={theme.palette.primary.main} fontWeight="600">
              {getAmountWithSign(parcelDeliveryFree())}
            </Typography>
          )}
        </Stack>
      </Stack>
    </CustomStackFullWidth>
  );
};

export default DeliveryFree;
