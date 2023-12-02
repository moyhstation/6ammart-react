import React from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

const StoreFeature = ({ count, title }) => {
  return (
    <Stack spacing={1}>
      <Typography fontSize={{ xs: "18px", md: "20px" }} fontWeight="800">
        {count}
      </Typography>
      <Typography fontSize={{ xs: "12px", md: "16px" }}>{title}</Typography>
    </Stack>
  );
};

export default StoreFeature;
