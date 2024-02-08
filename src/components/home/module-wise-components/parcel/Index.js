import { Grid } from "@mui/material";
import React from "react";
import ParcelOnTime from "../../../parcel/ParcelOnTime";
import ParcelFeatures from "../../../parcel/ParcelFeatures";
import ParcelVideo from "../../../parcel/ParcelVideo";
import CustomContainer from "../../../container";
import ParcelCategory from "../../../parcel/parcel-category/ParcelCategory";
import { useSelector } from "react-redux";
import OrderDetailsModal from "../../../order-details-modal/OrderDetailsModal";
import { getToken } from "../../../../helper-functions/getToken";

const Parcel = ({ configData }) => {
  const { orderDetailsModalOpen } = useSelector((state) => state.utilsData);
  const token = getToken();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <CustomContainer>
          <ParcelCategory />
        </CustomContainer>
        <ParcelOnTime />
        <CustomContainer>
          <ParcelFeatures />
          <ParcelVideo />
        </CustomContainer>
      </Grid>
      {orderDetailsModalOpen && !token && (
        <OrderDetailsModal orderDetailsModalOpen={orderDetailsModalOpen} />
      )}
    </Grid>
  );
};

export default Parcel;
