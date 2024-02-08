import React, { useEffect, useState } from "react";
import { Popover, Stack, Typography, useTheme } from "@mui/material";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import CustomAlert from "../../../alert/CustomAlert";
import MapModal from "../../../Map/MapModal";
import { CustomButtonPrimary } from "../../../../styled-components/CustomButtons.style";
import DeliveryAddress from "../../../checkout/delivery-address";
import { useGeolocated } from "react-geolocated";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import useGetGeoCode from "../../../../api-manage/hooks/react-query/google-api/useGetGeoCode";
import useGetZoneId from "../../../../api-manage/hooks/react-query/google-api/useGetZone";

const AddressReselectPopover = (props) => {
  const { anchorEl, onClose, open, t, address, setAddress, token, ...other } =
    props;
  const theme = useTheme();
  const [openMapModal, setOpenMapModal] = useState(false);
  const [location, setLocation] = useState(undefined);
  const [currentLocation, setCurrentLocation] = useState(undefined);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [geoLocationEnable, setGeoLocationEnable] = useState(false);
  const [zoneIdEnabled, setZoneIdEnabled] = useState(false);
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    isGeolocationEnabled: true,
  });
  const handleAgreeLocation = () => {
    // e.stopPropagation();
    if (coords) {
      setLocation({ lat: coords?.latitude, lng: coords?.longitude });
      setShowCurrentLocation(true);
      setGeoLocationEnable(true);
      setZoneIdEnabled(true);
    }
    setGeoLocationEnable(true);
    setZoneIdEnabled(true);
    if (currentLocation && location) {
      localStorage.setItem("location", currentLocation);
      localStorage.setItem("currentLatLng", JSON.stringify(location));
      window.location.reload();
      // toast.success(t("New location has been set."));
    }
  };
  const { data: geoCodeResults, isLoading: isLoadingGeoCode } = useGetGeoCode(
    location,
    geoLocationEnable
  );

  useEffect(() => {
    if (geoCodeResults?.results && showCurrentLocation) {
      setCurrentLocation(geoCodeResults?.results[0]?.formatted_address);
    }
  }, [geoCodeResults, location]);

  const { data: zoneData } = useGetZoneId(location, zoneIdEnabled);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (zoneData) {
        // dispatch(setZoneData(zoneData?.data?.zone_data));
        localStorage.setItem("zoneid", zoneData?.zone_id);
      }
    }
  }, [zoneData]);
  const handleCloseMapModal = () => {
    setOpenMapModal(false);
    onClose();
  };
  const popOverHeightHandler = () => {
    if (token) {
      return "475px";
    } else {
      return "150px";
    }
  };
  return (
    <>
      <Popover
        disableScrollLock={true}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: { width: { xs: 300, sm: 320, md: 350 }, p: "1rem" },
        }}
        transitionDuration={2}
        {...other}
      >
        <Stack justifyContent="center" textAlign="center" spacing={2}>
          <SimpleBar
            className="custom-scrollbar"
            style={{
              maxHeight: popOverHeightHandler(),
              paddingRight: "5px"
            }}
          >
            <Stack width="100%" alignItems="center">
              {token ? (
                open && (
                  <Stack pt="15px" gap={{ xs: "0px", sm: "15px" }} paddingRight="5px">
                    <Typography fontSize="16px" fontWeight={500} textAlign="left">
                      {t("Select from saved addresses or pick from map")}
                    </Typography>
                    <DeliveryAddress
                      setAddress={setAddress}
                      address={address}
                      hideAddressSelectionField="true"
                      renderOnNavbar="true"
                    />
                  </Stack>
                )
              ) : (
                <CustomAlert
                  type="info"
                  text={t(
                    "To select from saved addresses, you need to sign in."
                  )}
                />
              )}
            </Stack>
          </SimpleBar>
          <Stack
            onClick={handleAgreeLocation}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap="10px"
            sx={{ cursor: "pointer" }}
          >
            <ControlPointOutlinedIcon
              sx={{ color: theme.palette.primary.main }}
            />
            <Typography fontWeight={600} color={theme.palette.primary.main}>
              {t("Use Current Location")}
            </Typography>
          </Stack>
          <Stack width="100%" justifyContent="center" alignItems="center">
            <CustomButtonPrimary onClick={() => setOpenMapModal(true)}>
              {t("Pick from map")}
            </CustomButtonPrimary>
          </Stack>
        </Stack>
      </Popover>
      {openMapModal && (
        <MapModal open={openMapModal} handleClose={handleCloseMapModal} />
      )}
    </>
  );
};

AddressReselectPopover.propTypes = {};

export default AddressReselectPopover;
