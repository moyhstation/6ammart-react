import React from "react";
import { Stack } from "@mui/system";
import Wallet from "../wallet";
import Profile from "../profile";

import MyOrders from "../my-orders";
import OrderDetails from "../my-orders/order-details";
import LoyaltyPoints from "../loyalty-points";
import ReferralCode from "../referral-code";
import Coupons from "../coupons";
import Chatting from "../chat/Chatting";
import Settings from "../settings";

const ProfileBody = ({
  page,
  configData,
  orderId,
  setEditProfile,
  editProfile,
  addAddress,
  setAddAddress,
  editAddress,
  refetch,
  setEditAddress,
}) => {
  const activeComponent = () => {
    if (page === "profile-settings") {
      return (
        <Profile
          configData={configData}
          editProfile={editProfile}
          setEditProfile={setEditProfile}
          addAddress={addAddress}
          setAddAddress={setAddAddress}
          editAddress={editAddress}
          addressRefetch={refetch}
          setEditAddress={setEditAddress}
        />
      );
    }
    if (page === "my-orders" && !orderId) {
      return <MyOrders configData={configData} />;
    }
    if (
      (page === "my-orders?flag=success" ||
        page === "my-orders" ||
        page === "my-orders?flag=cancel") &&
      orderId
    ) {
      return <OrderDetails configData={configData} id={orderId} />;
    }
    if (
      page === "wallet" ||
      page === "wallet?flag=success" ||
      page === "wallet?flag=cancel"
    ) {
      return <Wallet configData={configData} />;
    }
    if (page === "loyalty-points") {
      return <LoyaltyPoints configData={configData} />;
    }
    if (page === "referral-code") {
      return <ReferralCode configData={configData} />;
    }
    if (page === "coupons") {
      return <Coupons configData={configData} />;
    }
    if (page === "inbox") {
      return <Chatting configData={configData} />;
    }

    if (page === "settings") {
      return <Settings configData={configData} />;
    }
  };
  return <Stack>{activeComponent()}</Stack>;
};

export default ProfileBody;
