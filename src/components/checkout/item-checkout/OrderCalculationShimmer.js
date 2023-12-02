import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Skeleton } from "@mui/material";

const OrderCalculationShimmer = () => {
  return (
    <CustomStackFullWidth spacing={1}>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Skeleton variant="text" width="50px" />
        <Skeleton variant="text" width="50px" />
      </CustomStackFullWidth>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Skeleton variant="text" width="50px" />
        <Skeleton variant="text" width="50px" />
      </CustomStackFullWidth>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Skeleton variant="text" width="50px" />
        <Skeleton variant="text" width="50px" />
      </CustomStackFullWidth>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Skeleton variant="text" width="50px" />
        <Skeleton variant="text" width="50px" />
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default OrderCalculationShimmer;
