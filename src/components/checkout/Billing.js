import React from "react";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { t } from "i18next";
import DeliveryFree from "./DeliveryFree";
import DeliveryManTip from "./DeliveryManTip";
import ChangePayBy from "./ChangePayBy";

const Billing = ({
  deliveryTip,
  setDeliveryTip,
  paidBy,
  setPaidBy,
  data,
  parcelDeliveryFree,
  zoneData,
  senderLocation,
  receiverLocation,
  configData,
  extraChargeLoading,
}) => {
  return (
    <CustomPaperBigCard>
      <CustomStackFullWidth spacing={4}>
        <Stack align="center">
          <Typography variant="h6">{t("Billing")}</Typography>
        </Stack>
        <DeliveryFree
          data={data}
          parcelDeliveryFree={parcelDeliveryFree}
          senderLocation={senderLocation}
          receiverLocation={receiverLocation}
          configData={configData}
          extraChargeLoading={extraChargeLoading}
        />
        <DeliveryManTip
          parcel="true"
          deliveryTip={deliveryTip}
          setDeliveryTip={setDeliveryTip}
        />
        <ChangePayBy
          paidBy={paidBy}
          setPaidBy={setPaidBy}
          zoneData={zoneData}
        />
      </CustomStackFullWidth>
    </CustomPaperBigCard>
  );
};

export default Billing;
