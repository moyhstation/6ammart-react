import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import ParcelHeroImage from "./ParcelHeroImage";

import { Typography, Stack, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const ParcelHero = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <CustomStackFullWidth sx={{ paddingBottom: "30px" }}>
      <CustomStackFullWidth
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <ParcelHeroImage />
        <Typography variant="h5" color={theme.palette.primary.main}>
          {t("Instant Same Day Delivery")}
        </Typography>
        <Typography>
          {t("Send your parcel anywhere in country instantly & Safely")}
        </Typography>
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default ParcelHero;
