import React from "react";
import { Stack, styled } from "@mui/system";
import CustomImageContainer from "../CustomImageContainer";
import { alpha } from "@mui/material";
import markerImage from "./asset/A.png";
const MarkerStack = styled(Stack)(({ theme }) => ({
  height: "60px",
  width: "60px",
  backgroundColor: alpha(theme.palette.primary.main, 0.2),
  padding: "10px",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
}));

const DeliveryManMapMarker = () => {
  return (
    <MarkerStack>
      <CustomImageContainer src={markerImage.src} height="30px" width="30px" />
    </MarkerStack>
  );
};

export default DeliveryManMapMarker;
