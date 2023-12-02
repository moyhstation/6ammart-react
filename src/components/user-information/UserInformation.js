import React from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  CustomStackFullWidth,
  UserInfoGrid,
} from "../../styled-components/CustomStyles.style";
import UserDashBoard from "./UserDashBoard";
import { Stack } from "@mui/system";
import UserDetails from "./UserDetails";
import BodySection from "./BodySection";
import { setWalletAmount } from "../../redux/slices/cart";
import { setUser } from "../../redux/slices/profileInfo";
import useGetUserInfo from "../../api-manage/hooks/react-query/user/useGetUserInfo";
import { useDispatch } from "react-redux";
import CustomContainer from "../container";
import { getToken } from "../../helper-functions/getToken";
import { t } from "i18next";
import { toast } from "react-hot-toast";
import { useDeleteProfile } from "../../api-manage/hooks/react-query/profile/useDeleteProfile";
import { useRouter } from "next/router";

const UserInformation = ({ page, configData, orderId }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSuccess = (res) => {
    localStorage.setItem("wallet_amount", res?.wallet_balance);
    dispatch(setWalletAmount(res?.wallet_balance));
    dispatch(setUser(res));
  };
  const userToken = getToken();
  const { data, refetch, isLoading } = useGetUserInfo(handleSuccess);
  const onSuccessHandlerForUserDelete = (res) => {
    if (res?.errors) {
      toast.error(res?.errors?.[0]?.message);
    } else {
      localStorage.removeItem("token");
      toast.success(t("Account has been deleted"));
      dispatch(setUser(null));
      router.push("/", undefined, { shallow: true });
    }
  };
  const { mutate, isLoading: isLoadingDelete } = useDeleteProfile(
    onSuccessHandlerForUserDelete
  );
  const deleteUserHandler = () => {
    mutate();
  };

  return (
    <CustomStackFullWidth>
      <Grid container gap="10px">
        <UserInfoGrid
          userToken={userToken}
          container
          item
          xs={12}
          sm={12}
          md={12}
          page={page}
        >
          {!userToken && (
            <Grid item md={12} justifyContent="center" alignSelf="center">
              <Typography fontSize="16px" textAlign="center">
                {t("Order Details")}
              </Typography>
            </Grid>
          )}
          <CustomContainer>
            <Stack
              direction={{ xs: "column", sm: "column", md: "row" }}
              gap="1rem"
            >
              {userToken && (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  marginTop={{
                    xs: page ? "21px" : "28px",
                    sm: "28px",
                    md: "18px",
                  }}
                  paddingBottom={{ xs: page === "inbox" ? "10px" : "0px" }}
                >
                  <UserDetails
                    data={data}
                    page={page}
                    deleteUserHandler={deleteUserHandler}
                  />
                </Grid>
              )}

              {isSmall ? (
                page === "profile-settings" &&
                userToken && <UserDashBoard data={data} isLoading={isLoading} />
              ) : (
                <>
                  {userToken && (
                    <UserDashBoard data={data} isLoading={isLoading} />
                  )}
                </>
              )}
            </Stack>
          </CustomContainer>
        </UserInfoGrid>
        <Grid item xs={12} sm={12} md={12}>
          <CustomContainer>
            <BodySection
              page={page}
              configData={configData}
              orderId={orderId}
              userToken={userToken}
              deleteUserHandler={deleteUserHandler}
            />
          </CustomContainer>
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

export default UserInformation;
