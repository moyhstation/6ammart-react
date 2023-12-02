import { Grid, useTheme } from "@mui/material";
import React from "react";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import loyaltyImage from "./asset/loyalty.png";
import wallet from "./asset/newWallet.png";
import orderImage from "./asset/order.png";

import ProfileStatistics from "../profile/ProfileStatistics";

const UserDashBoard = ({ data, configData, isLoading }) => {
  const theme = useTheme();
  return (
    <Grid
      container
      item
      md={8}
      alignItems="center"
      spacing={{ xs: 2, sm: 3, md: 5 }}
      paddingTop={{ xs: "10px", sm: "15px", md: "40px" }}
      xs={12}
      sm={12}
    >
      <Grid item xs={6} sm={6} md={3}>
        <ProfileStatistics
          isLoading={isLoading}
          value={data?.member_since_days}
          title="Days Since Joining"
          image={data?.image}
          pathname="profile-settings"
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <ProfileStatistics
          isLoading={isLoading}
          value={getAmountWithSign(data?.wallet_balance)}
          title="Amount in Wallet"
          image={wallet.src}
          pathname="wallet"
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <ProfileStatistics
          isLoading={isLoading}
          value={data?.order_count}
          title="Total Orders"
          image={orderImage.src}
          pathname="my-orders"
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <ProfileStatistics
          isLoading={isLoading}
          value={data?.loyalty_point}
          title="loyalty points"
          image={loyaltyImage.src}
          pathname="loyalty-points"
        />
      </Grid>
    </Grid>
  );
};

export default UserDashBoard;
