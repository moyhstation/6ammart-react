import React, { memo } from "react";
import { Stack } from "@mui/material";
import GoogleLoginComp from "./GoogleLoginComp";
// import FbLoginComp from "./FbLoginComp";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { setUser } from "../../../../redux/slices/profileInfo";
import useGetProfile from "../../../../api-manage/hooks/react-query/profile/useGetProfile";
import { setWishList } from "../../../../redux/slices/wishList";
import { useWishListGet } from "../../../../api-manage/hooks/react-query/wish-list/useWishListGet";
import { loginSuccessFull } from "../../../../utils/toasterMessages";
import FbLoginComp from "./FbLoginComp";

import { useRouter } from "next/router";
import AppleLoginComp from "./AppleLoginComp";

const SocialLogins = (props) => {
  const router = useRouter();
  const { socialLogin } = props;
  const { configData } = useSelector((state) => state.configData);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userOnSuccessHandler = (res) => {
    dispatch(setUser(res));
  };
  const { refetch: profileRefetch } = useGetProfile(userOnSuccessHandler);

  const onSuccessHandler = (response) => {
    dispatch(setWishList(response));
  };
  const { refetch } = useWishListGet(onSuccessHandler);
  const handleSuccess = async (value) => {
    localStorage.setItem("token", value);
    toast.success(t(loginSuccessFull));
    await refetch();
    await profileRefetch();
    router.push("/home", undefined, { shallow: true });
  };

  return (
    <Stack alignItems="center" justifyContent="center" spacing={1}>
      {socialLogin?.map((item, index) => {
        if (item?.login_medium === "google" && item.status === true) {
          return (
            <GoogleLoginComp
              key={index}
              handleSuccess={handleSuccess}
              configData={configData}
            />
          );
        } else if (item?.login_medium === "facebook" && item.status === true) {
          return (
            <FbLoginComp
              key={index}
              handleSuccess={handleSuccess}
              //handleParentModalClose={handleParentModalClose}
              configData={configData}
            />
          );
        }
      })}
      {/*<AppleLoginComp/>*/}
    </Stack>
  );
};

SocialLogins.propTypes = {};

export default memo(SocialLogins);
