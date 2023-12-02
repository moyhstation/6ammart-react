import { Avatar, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetModule from "../../../api-manage/hooks/react-query/useGetModule";
import { getLanguage } from "../../../helper-functions/getLanguage";
import { setModules } from "../../../redux/slices/configData";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import AddressReselect from "../top-navbar/address-reselect/AddressReselect";
import DrawerMenu from "../top-navbar/drawer-menu/DrawerMenu";
import MobileModuleSelection from "./mobile-module-select";

const ModuleWiseNav = (props) => {
  const { router, configData, token, setToggled, location } = props;
  const { modules } = useSelector((state) => state.configData);
  const { data, refetch } = useGetModule();
  const { profileInfo } = useSelector((state) => state.profileInfo);
  const profileImageUrl = `${configData?.base_urls?.customer_image_url}/${profileInfo?.image}`;
  const favIcon = `${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`;
  const lanDirection = getLanguage();
  const dispatch = useDispatch();
  useEffect(() => {
    if (modules?.length === 0) {
      refetch();
      //dispatch(setModules(data));
    }
  }, [modules]);
  useEffect(() => {
    if (data?.length > 0) {
      dispatch(setModules(data));
    }
  }, [data]);
  const handleProfileClick = () => {
    if (token) {
      router.push(
        { pathname: "/profile", query: { page: "profile-settings" } },
        undefined,
        { shallow: true }
      );
    } else {
      router.push("/auth/sign-in", undefined, { shallow: true });
    }
  };

  const handleFlexendSide = () => (
    <CustomStackFullWidth
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Avatar
        src={profileImageUrl}
        sx={{ width: 18, height: 18, cursor: "pointer" }}
        onClick={handleProfileClick}
      />
      <DrawerMenu setToggled={setToggled} />
    </CustomStackFullWidth>
  );
  const handleIconClick = () => {
    if (location) {
      router.push("/home");
    } else {
      router.push("/");
    }
  };
  const getIcon = () => (
    <Box
      onClick={handleIconClick}
      sx={{
        height: "40px",
        width: "40px",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <CustomImageContainer
        src={favIcon}
        alt="Background"
        height="100%"
        width="100%"
        objectFit="cover"
      />
    </Box>
  );
  return (
    <CustomStackFullWidth>
      {!!modules && (
        <Grid container alignItems="center">
          <Grid
            item
            xs={10}
            align={
              lanDirection
                ? lanDirection === "ltr"
                  ? "left"
                  : "right"
                : "left"
            }
            container
          >
            <CustomBoxFullWidth>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={1} sm={1} align="left">
                  {router.pathname === "/home" ? (
                    modules.length >= 2 ? (
                      <MobileModuleSelection />
                    ) : (
                      getIcon()
                    )
                  ) : (
                    getIcon()
                  )}
                </Grid>
                {location ? (
                  <Grid item xs={11} sm={11} align="left">
                    <AddressReselect location={location} />
                  </Grid>
                ) : (
                  <Grid item xs={10} sm={11}></Grid>
                )}
              </Grid>
            </CustomBoxFullWidth>
          </Grid>
          <Grid item xs={2} align="right">
            {handleFlexendSide()}
          </Grid>
        </Grid>
      )}
    </CustomStackFullWidth>
  );
};

ModuleWiseNav.propTypes = {};

export default React.memo(ModuleWiseNav);
