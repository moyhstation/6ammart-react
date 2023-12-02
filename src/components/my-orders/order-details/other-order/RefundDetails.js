import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Refund from "./Refund";

const RefundDetails = ({ trackOrderData, configData, t }) => {
  return (
    <div>
      {trackOrderData?.refund &&
      trackOrderData?.order_status === "refund_request_canceled" ? (
        <Grid item xs={12} align="left">
          <Refund
            t={t}
            title="Refund cancellation note:"
            note={trackOrderData.refund?.admin_note}
            configData={configData}
          />
        </Grid>
      ) : (
        trackOrderData?.order_status === "refund_requested" && (
          <Grid item xs={12} align="left">
            <Refund
              t={t}
              title="Refund request note:"
              note={trackOrderData?.refund?.customer_note}
              reason={trackOrderData?.refund?.customer_reason}
              image={trackOrderData?.refund?.image}
              configData={configData}
            />
          </Grid>
        )
      )}
    </div>
  );
};

RefundDetails.propTypes = {};

export default RefundDetails;
