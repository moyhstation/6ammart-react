import React from "react";
import { OrderSummaryCalculationCard } from "./other-order/OrderCalculation";
import { Stack } from "@mui/system";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import { Typography } from "@mui/material";

const SellerInfo = ({ trackOrderData }) => {
  return (
    <CustomStackFullWidth pl="24px">
      <OrderSummaryCalculationCard
        direction="row"
        justifyContent="space-between"
      >
        <Stack>
          <CustomImageContainer />
          <Stack>
            <Typography>Organic Farm</Typography>
            <Typography>24th Street, avenue -2, Manhaten New York</Typography>
          </Stack>
        </Stack>
        <Stack>Chat with Seller</Stack>
      </OrderSummaryCalculationCard>
    </CustomStackFullWidth>
  );
};

export default SellerInfo;
