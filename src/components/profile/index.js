import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import CustomShimmerForProfile from "./Shimmer";
import ProfileStatistics from "./ProfileStatistics";
import user from "../../../public/static/profile/profile.png";
import wallet from "../../../public/static/profile/wallet.png";
import loyalty from "../../../public/static/profile/loyality.png";
import order from "../../../public/static/profile/image 38 (2).png";
import useGetUserInfo from "../../api-manage/hooks/react-query/user/useGetUserInfo";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import BasicInformation from "./basic-information";
import { setWalletAmount } from "../../redux/slices/cart";
import { setUser } from "../../redux/slices/profileInfo";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const Profile = (props) => {
  const {
    configData,
    setEditProfile,
    editProfile,
    setAddAddress,
    addAddress,
    editAddress,
    addressRefetch,
    setEditAddress,
  } = props;
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSuccess = (res) => {
    localStorage.setItem("wallet_amount", res?.wallet_balance);
    dispatch(setWalletAmount(res?.wallet_balance));
    dispatch(setUser(res));
  };
  const { data, refetch } = useGetUserInfo(handleSuccess);
  // useEffect(() => {
  //   refetch();
  // }, []);
  return (
    <>
      <BasicInformation
        data={data}
        refetch={refetch}
        configData={configData}
        t={t}
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        addAddress={addAddress}
        setAddAddress={setAddAddress}
        editAddress={editAddress}
        addressRefetch={addressRefetch}
        setEditAddress={setEditAddress}
      />
    </>
  );
};

Profile.propTypes = {};

export default Profile;
