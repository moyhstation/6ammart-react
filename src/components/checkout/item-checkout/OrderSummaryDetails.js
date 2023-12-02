import React from "react";
import PropTypes from "prop-types";
import { OrderSummary } from "../CheckOut.style";
import { Grid, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import RegularOrders from "./RegularOrders";
import CampaignOrders from "./CampaignOrders";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
const OrderSummaryDetails = (props) => {
  const { page, configData, cartList, t, campaignItemList, isSmall } = props;

  return (
    <>
      <Grid item md={12} xs={12} container spacing={1} mt="20px" pl="10px">
        {(page === "cart" || page === "buy_now") && (
          <RegularOrders
            configData={configData}
            cartList={cartList}
            t={t}
            isSmall={isSmall}
          />
        )}
        {page === "campaign" && (
          <CampaignOrders
            configData={configData}
            campaignItemList={campaignItemList}
            t={t}
          />
        )}
      </Grid>
    </>
  );
};

OrderSummaryDetails.propTypes = {};

export default OrderSummaryDetails;
