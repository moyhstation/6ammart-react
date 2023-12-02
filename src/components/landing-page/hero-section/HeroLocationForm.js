import React, { useEffect, useId, useRef, useState } from "react";
import {
  alpha,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { StyledButton } from "./HeroSection.style";
import { useGeolocated } from "react-geolocated";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import useGetAutocompletePlace from "../../../api-manage/hooks/react-query/google-api/usePlaceAutoComplete";
import useGetGeoCode from "../../../api-manage/hooks/react-query/google-api/useGetGeoCode";
import useGetZoneId from "../../../api-manage/hooks/react-query/google-api/useGetZone";
import useGetPlaceDetails from "../../../api-manage/hooks/react-query/google-api/useGetPlaceDetails";
import AllowLocationDialog from "../../Map/AllowLocationDialog";
import CustomMapSearch from "../../Map/CustomMapSearch";
import MapModal from "../../Map/MapModal";
import { ModuleSelection } from "./module-selection";
import { useDispatch } from "react-redux";
import { module_select_success } from "../../../utils/toasterMessages";
import { setWishList } from "../../../redux/slices/wishList";
import { useWishListGet } from "../../../api-manage/hooks/react-query/wish-list/useWishListGet";
import { getToken } from "../../../helper-functions/getToken";
import { Box } from "@mui/system";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MapIcon from "@mui/icons-material/Map";
import { getLanguage } from "../../../helper-functions/getLanguage";

const HeroLocationForm = () => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(undefined);
  const [geoLocationEnable, setGeoLocationEnable] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(undefined);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [zoneIdEnabled, setZoneIdEnabled] = useState(false);
  const [placeId, setPlaceId] = useState("");
  const [placeDescription, setPlaceDescription] = useState(undefined);
  const [placeDetailsEnabled, setPlaceDetailsEnabled] = useState(false);
  const [openModuleSelection, setOpenModuleSelection] = useState(false);
  const [pickLocation, setPickLocation] = useState(false);
  const dispatch = useDispatch();
  const divId = useId();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => setOpen(true);

  // const dispatch = useDispatch();

  //****getting current location/***/
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      isGeolocationEnabled: true,
    });

  const handleCloseLocation = () => {
    setOpenLocation(false);
    setShowCurrentLocation(false);
    setGeoLocationEnable(false);
    setCurrentLocation(undefined);
  };
  const handleAgreeLocation = (e) => {
    e.stopPropagation();
    if (coords) {
      setLocation({ lat: coords?.latitude, lng: coords?.longitude });
      setOpenLocation(false);
      setShowCurrentLocation(true);
      setGeoLocationEnable(true);
      setZoneIdEnabled(true);
    } else {
      setOpenLocation(true);
    }
  };

  const HandleChangeForSearch = (event) => {
    setSearchKey(event.target.value);
    if (event.target.value) {
      setEnabled(true);
      setGeoLocationEnable(true);
      setCurrentLocation(event.target.value);
    } else {
      setEnabled(false);
      setCurrentLocation(undefined);
    }
  };
  const handleChange = (event, value) => {
    if (value) {
      setPlaceId(value?.place_id);
      setPlaceDescription(value?.description);
      setZoneIdEnabled(false);
      setGeoLocationEnable(true);
    }
    setPlaceDetailsEnabled(true);
  };
  const { data: places, isLoading } = useGetAutocompletePlace(
    searchKey,
    enabled
  );

  useEffect(() => {
    if (places) {
      setPredictions(places?.predictions);
    }
  }, [places]);

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
  //
  // //********************Pick Location */
  const { isLoading: isLoading2, data: placeDetails } = useGetPlaceDetails(
    placeId,
    placeDetailsEnabled
  );
  //
  useEffect(() => {
    if (placeDetails) {
      setLocation(placeDetails?.result?.geometry?.location);
    }
  }, [placeDetails]);

  // const orangeColor = theme.palette.primary.main;

  useEffect(() => {
    if (placeDescription) {
      setCurrentLocation(placeDescription);
    }
  }, [placeDescription]);

  // get module from localstorage
  let selectedModule = undefined;
  if (typeof window !== "undefined") {
    selectedModule = localStorage.getItem("module");
  }
  const onSuccessHandler = (response) => {
    dispatch(setWishList(response));
  };
  const { refetch: wishlistRefetch, isLoading: isLoadingWishlist } =
    useWishListGet(onSuccessHandler);
  const setLocationEnable = async () => {
    // if (!currentLocation) {
    //   toast.error(t("Location is required."), {
    //     id: "id",
    //   });
    // }
    setGeoLocationEnable(true);
    setZoneIdEnabled(true);
    if (currentLocation && location) {
      if (getToken()) {
        wishlistRefetch();
      }
      localStorage.setItem("location", currentLocation);
      localStorage.setItem("currentLatLng", JSON.stringify(location));
      //handleModalClose();

      toast.success(t("New location has been set."));
      setOpenModuleSelection(true);
      // if (!selectedModule) {
      //   setOpenModuleSelection(true);
      // } else {
      //   router.push("/home");
      // }
    } else {
      toast.error(t("Location is required."), {
        id: "id",
      });
    }
  };
  const handleCloseModuleModal = (item) => {
    if (item) {
      toast.success(t(module_select_success));
      router.push("/home", undefined, { shallow: true });
    }
    setOpenModuleSelection(false);
  };
  const excludedDivRef = useRef(null);

  useEffect(() => {
    // Handle clicks outside of excludedDivRef
    const handleClickOutside = (event) => {
      if (
        excludedDivRef.current &&
        !excludedDivRef.current.contains(event.target)
      ) {
        setPickLocation(false);
        // setClickedOutside(true);
      }
    };

    // Add event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [excludedDivRef]);

  const handlePickLocation = (e) => {
    setPickLocation((prev) => !prev);
  };
  const lanDirection = getLanguage() ? getLanguage() : "ltr";

  return (
    <>
      <CustomStackFullWidth
        backgroundColor={alpha(theme.palette.primary.main, 0.5)}
        padding={{ xs: ".7rem", md: "1.2rem" }}
        borderRadius="5px"
      >
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          sx={{ position: "relative", zIndex: 999 }}
        >
          <Grid container>
            <Grid item xs={5.8} sm={7}>
              <CustomMapSearch
                isLoading={isLoadingGeoCode}
                showCurrentLocation={showCurrentLocation}
                predictions={predictions}
                handleChange={handleChange}
                HandleChangeForSearch={HandleChangeForSearch}
                handleAgreeLocation={handleAgreeLocation}
                currentLocation={currentLocation}
                handleCloseLocation={handleCloseLocation}
                frommap="false"
                fromparcel="false"
              />
            </Grid>
            <Grid item xs={3.9} sm={2.9}>
              <Box ref={excludedDivRef}>
                <Box
                  onClick={handlePickLocation}
                  sx={{
                    backgroundColor: (theme) => theme.palette.neutral[100],
                    width: "100%",
                    height: "55px",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    padding: {
                      xs: "0rem",
                      sm: lanDirection === "rtl" ? "0rem" : "12px",
                    },
                    position: "relative",
                    cursor: "pointer",
                    boxShadow: pickLocation && "1px 0 5px 0 rgba(0, 0, 0, 0.5)",
                    borderRadius: {
                      xs: pickLocation ? "5px 5px 0 0" : "0px",
                      sm: "0px",
                    },
                  }}
                >
                  <CustomStackFullWidth
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row"
                    spacing={0.4}
                    sx={{
                      marginInlineEnd: "5px",
                      width: "170px",
                      color: !pickLocation && "primary.main",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    <GpsFixedIcon
                      onClick={handleAgreeLocation}
                      sx={{ fontSize: { xs: "14px", sm: "18px" } }}
                    />
                    <Typography
                      variant={isXSmall ? "body3" : "body1"}
                      onClick={handleAgreeLocation}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {t("Locate me")}
                    </Typography>
                    {pickLocation ? (
                      <KeyboardArrowUpIcon
                        id={`${divId}-Locate-me`}
                        sx={{ fontSize: { xs: "14px", sm: "18px" } }}
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        id={`${divId}-Locate-me`}
                        sx={{ fontSize: { xs: "14px", sm: "18px" } }}
                      />
                    )}
                  </CustomStackFullWidth>
                </Box>
                {pickLocation && (
                  <Box
                    onClick={handleOpen}
                    sx={{
                      backgroundColor: (theme) => theme.palette.neutral[100],
                      width: { xs: "125px", sm: "160px" },
                      height: "55px",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      p: "1rem",
                      position: "absolute",
                      zIndex: 999,
                      cursor: "pointer",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                      borderRadius: "0px 0px 5px 5px",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    <CustomStackFullWidth
                      alignItems="center"
                      direction="row"
                      spacing={1}
                      sx={{
                        width: "150px",
                      }}
                    >
                      <MapIcon sx={{ fontSize: "18px" }} />
                      <Typography
                        id={`${divId}-pick-from-map`}
                        variant={isXSmall ? "body3" : "body1"}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        {t("Pick from map")}
                      </Typography>
                    </CustomStackFullWidth>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={2.1} sm={2.1}>
              <StyledButton
                sx={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "0px 8px 8px 0px",
                }}
                onClick={() => setLocationEnable()}
                radiuschange={isXSmall ? "false" : "true"}
                disabled={!location?.lat || isLoadingGeoCode}
              >
                {/*<Typography*/}
                {/*  variant={isXSmall ? "body3" : "body1"}*/}
                {/*  color="whiteContainer.main"*/}
                {/*  fontWeight="bold"*/}
                {/*>*/}
                {t("Explore")}
                {/*</Typography>*/}
              </StyledButton>
            </Grid>
          </Grid>
        </CustomStackFullWidth>
        {open && (
          <MapModal
            open={open}
            handleClose={handleClose}
            coords={coords}
            disableAutoFocus
          />
        )}
        {openLocation && (
          <AllowLocationDialog
            handleCloseLocation={handleCloseLocation}
            openLocation={openLocation}
            isGeolocationEnabled={isGeolocationEnabled}
          />
        )}
      </CustomStackFullWidth>
      {zoneData && openModuleSelection && (
        <ModuleSelection
          location={currentLocation}
          closeModal={handleCloseModuleModal}
          setOpenModuleSelection={setOpenModuleSelection}
          disableAutoFocus
        />
      )}
    </>
  );
};
export default HeroLocationForm;
