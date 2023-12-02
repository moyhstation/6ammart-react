import React from "react";
import { Grid } from "@mui/material";
import {
  OrderFoodAmount,
  OrderFoodName,
  OrderFoodSubtitle,
} from "../CheckOut.style";
import CustomImageContainer from "../../CustomImageContainer";
import { getAmountWithSign } from "../../../helper-functions/CardHelpers";

const CampaignOrders = ({ configData, campaignItemList, t }) => {
  const productBaseUrl = configData?.base_urls?.campaign_image_url;

  return (
    <>
      {campaignItemList.map((item) => (
        <Grid key={item?.id} container md={12} xs={12} spacing={{ xs: 1 }}>
          <Grid item md={4} xs={4}>
            <CustomImageContainer
              height="90px"
              width="90px"
              src={`${productBaseUrl}/${item?.image}`}
              loading="lazy"
              borderRadius="10px"
            />
          </Grid>
          <Grid item md={8} xs={8}>
            <OrderFoodName>{item?.name}</OrderFoodName>
            <OrderFoodSubtitle>
              {t("Qty")} : {item?.quantity}
            </OrderFoodSubtitle>
            <OrderFoodAmount>{getAmountWithSign(item?.price)}</OrderFoodAmount>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

CampaignOrders.propTypes = {};

export default CampaignOrders;
