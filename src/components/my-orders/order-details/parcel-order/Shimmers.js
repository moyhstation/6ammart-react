import CustomImageContainer from "../../../CustomImageContainer";
import { Stack } from "@mui/system";
import { Skeleton, Typography } from "@mui/material";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import React from "react";
import { OrderStatusGrid } from "../../myorders.style";

export const SummeryShimmer = () => {
  return (
    <CustomStackFullWidth direction="row" alignItems="center" spacing={2}>
      <Skeleton width="60px" height="60px" variant="rectangle" />

      <Stack alignItems="flex-start">
        <Skeleton width="100px" variant="text" />
        <Skeleton width="100px" variant="text" />
      </Stack>
    </CustomStackFullWidth>
  );
};
export const DetailsShimmer = ({ t }) => {
  return (
    <OrderStatusGrid>
      <Stack direction="row" alignItems="center" spacing={0.5} mb="1rem">
        <Typography sx={{ fontWeight: "600" }}>
          {t("Charge Pay By")} :
        </Typography>
        <Skeleton width="100px" variant="text" />
      </Stack>
      <Typography sx={{ fontWeight: "600" }} align="left">
        {t("Sender Details")}
      </Typography>
      <Skeleton width="100px" variant="text" />
      <Skeleton width="100px" variant="text" />
      <Skeleton width="100px" variant="text" />
      <Typography sx={{ fontWeight: "600" }} align="left" mt="0.5rem">
        {t("Receiver Details")}
      </Typography>
      <Skeleton width="100px" variant="text" />
      <Skeleton width="100px" variant="text" />
      <Skeleton width="100px" variant="text" />
    </OrderStatusGrid>
  );
};
