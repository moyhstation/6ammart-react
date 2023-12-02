import React, { useState } from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import ProfileTab from "./ProfileTab";
import Divider from "@mui/material/Divider";
import ProfileBody from "./ProfileBody";
import Address from "../address";
import { menuData } from "../header/second-navbar/account-popover/menuData";
import Router from "next/router";
import { useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import useGetAddressList from "../../api-manage/hooks/react-query/address/useGetAddressList";

const ProfileCard = styled(CustomPaperBigCard)(({ theme }) => ({}));

const BodySection = ({
  page,
  configData,
  orderId,
  userToken,
  deleteUserHandler,
}) => {
  const [editProfile, setEditProfile] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const { data, isLoading, refetch } = useGetAddressList();
  const handleActivePage = (item) => {
    Router.push(
      {
        pathname: "/profile",
        query: { page: item?.name },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <CustomStackFullWidth spacing={4}>
      <CustomPaperBigCard
        padding={page === "my-orders" || page === "inbox" ? "0px" : "10px"}
        noboxshadow={
          isSmall
            ? page === "my-orders" || page === "inbox"
              ? "true"
              : ""
            : "true"
        }
        backgroundcolor={
          isSmall &&
          (page === "my-orders" || page === "inbox") &&
          theme.palette.background.default
        }
      >
        {!isSmall && userToken && (
          <ProfileTab
            deleteUserHandler={deleteUserHandler}
            page={page}
            menuData={menuData}
            handlePage={handleActivePage}
          />
        )}
        {!isSmall && <Divider />}

        <ProfileBody
          page={page}
          configData={configData}
          orderId={orderId}
          editProfile={editProfile}
          setEditProfile={setEditProfile}
          addAddress={addAddress}
          setAddAddress={setAddAddress}
          editAddress={editAddress}
          refetch={refetch}
          setEditAddress={setEditAddress}
        />
      </CustomPaperBigCard>

      {page === "profile-settings" && !editProfile && !addAddress && (
        <CustomPaperBigCard padding="10px" noboxshadow={isSmall ? "" : "true"}>
          <Address
            configData={configData}
            addAddress={addAddress}
            setAddAddress={setAddAddress}
            setEditAddress={setEditAddress}
            data={data}
            refetch={refetch}
            isLoading={isLoading}
          />
        </CustomPaperBigCard>
      )}
    </CustomStackFullWidth>
  );
};

export default BodySection;
