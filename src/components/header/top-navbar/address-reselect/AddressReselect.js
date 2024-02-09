import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RoomIcon from "@mui/icons-material/Room";
import { Grid, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import AddressReselectPopover from "./AddressReselectPopover";

const AddressReselect = ({ location, setOpenDrawer }) => {
  const theme = useTheme();
  const router = useRouter();
  const [openReselectModal, setOpenReselectModal] = useState(false);
  //const { configData, token } = useSelector((state) => state.configDataSettings);
  const [openPopover, setOpenPopover] = useState(false);
  const [address, setAddress] = useState(null);
  const { t } = useTranslation();
  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  useEffect(() => {
    let currentLatLng;
    if (typeof localStorage.getItem("currentLatLng") !== undefined) {
      currentLatLng = JSON.parse(localStorage.getItem("currentLatLng"));
      const location = localStorage.getItem("location");

      // setAddress({
      //   ...currentLatLng,
      //   latitude: currentLatLng?.lat,
      //   longitude: currentLatLng?.lng,
      //   address: location,
      //   address_type: "Selected Address1",
      // });
    }
  }, []);

  useEffect(() => {
    if (address) {
      localStorage.setItem("location", address?.address);
      const values = { lat: address?.lat, lng: address?.lng };
      localStorage.setItem("currentLatLng", JSON.stringify(values));
      if (address.zone_ids && address.zone_ids.length > 0) {
        const value = [address.zone_ids];

        localStorage.setItem("zoneid", JSON.stringify(address.zone_ids));
        toast.success(t("New delivery address selected."));
        handleClosePopover();
        // window.location.reload();
      }
    }
  }, [address]);
  const handleClickToLandingPage = () => {
    setOpenPopover(true);
    setOpenDrawer(false);
    // if (token) {
    // } else {
    //   toast.error(t("Login required."));
    // }
    //
    // setOpenReselectModal(true);
    // localStorage.removeItem("location");
    // localStorage.removeItem("zoneid");
    // router.push("/");
  };
  const handleModalClose = () => {
    setOpenReselectModal(false);
  };
  const anchorRef = useRef(null);
  const handleClosePopover = () => {
    setOpenPopover(false);
  };
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          color: (theme) => theme.palette.neutral[1000],
          maxWidth: { xs: "230px", sm: "280px" },
        }}
        ref={anchorRef}
        onClick={handleClickToLandingPage}
      >
        <Grid item xs={11} align="left">
          <CustomStackFullWidth direction="row" alignItems="center" spacing={1}>
            <RoomIcon
              sx={{
                fontSize: { xs: "16px", sm: "20px" },
              }}
              color="primary"
            />
            <Typography
              fontSize={{ xs: "12px", sm: "16px" }}
              align="center"
              color={theme.palette.neutral[1000]}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                textAlign: "left",
                transition: "all ease 0.5s",
                wordBreak: "break-all",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
                // width: "210px",
              }}
            >
              {location}
            </Typography>
          </CustomStackFullWidth>
        </Grid>
        <Grid item xs={1}>
          <CustomStackFullWidth>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: { xs: "16px", sm: "20px" },
              }}
            />
          </CustomStackFullWidth>
        </Grid>
      </Grid>
      <AddressReselectPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
        t={t}
        address={address}
        setAddress={setAddress}
        token={token}
      />
    </>
  );
};

AddressReselect.propTypes = {};

export default AddressReselect;
