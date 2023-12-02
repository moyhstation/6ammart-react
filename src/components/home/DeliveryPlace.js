import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomStackForLoaction } from "../../styled-components/CustomStyles.style";
import RoomIcon from "@mui/icons-material/Room";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import AddressReselect from "../header/top-navbar/address-reselect/AddressReselect";

const DeliveryPlace = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  let zoneid = undefined;
  let location = undefined;

  if (typeof window !== "undefined") {
    zoneid = localStorage.getItem("zoneid");

    location = localStorage.getItem("location");
  }

  return (
    <Stack pb="10px">
      <Typography align="center" color={theme.palette.neutral[500]}>
        {t("Delivering to")}:{" "}
      </Typography>
      <CustomStackForLoaction direction="row" spacing={1}>
        {location && <AddressReselect location={location} />}
      </CustomStackForLoaction>
    </Stack>
  );
};
export default DeliveryPlace;
