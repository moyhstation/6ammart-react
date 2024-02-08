import React from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { t } from "i18next";

const StoreFeature = ({ count, title }) => {
  return (
    <Stack spacing={1}>
      <Typography fontSize={{ xs: "18px", md: "20px" }} fontWeight="800">
        {count}
      </Typography>
      <Typography fontSize={{ xs: "12px", md: "16px" }}>{t(title)}</Typography>
    </Stack>
  );
};

export default StoreFeature;
