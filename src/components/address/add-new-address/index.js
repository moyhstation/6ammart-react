import React, { useEffect, useReducer, useState } from "react";
import { Box, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomModal from "../../modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  AddressTypeStack,
  CustomIconButton,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { ACTIONS, initialState, reducer } from "../states";
import { handleClick, handleCloseModal } from "../HelperFunctions";
import { useGeolocated } from "react-geolocated";
import useGetAutocompletePlace from "../../../api-manage/hooks/react-query/google-api/usePlaceAutoComplete";
import useGetGeoCode from "../../../api-manage/hooks/react-query/google-api/useGetGeoCode";
import useGetZoneId from "../../../api-manage/hooks/react-query/google-api/useGetZone";
import useGetPlaceDetails from "../../../api-manage/hooks/react-query/google-api/useGetPlaceDetails";
import GoogleMapComponent from "../../Map/GoogleMapComponent";
import AddressForm from "./AddressForm";
import useGetAddressList from "../../../api-manage/hooks/react-query/address/useGetAddressList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomImageContainer from "../../CustomImageContainer";
import home from "../../checkout/assets/image 1256.png";
import office from "../assets/office.png";
import plusIcon from "../assets/plus.png";
import { CustomButtonPrimary } from "../../../styled-components/CustomButtons.style";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAddressModal } from "../../../redux/slices/addAddress";
import { setGuestUserInfo } from "../../../redux/slices/guestUserInfo";

const AddNewAddress = (props) => {
  const {
    configData,
    refetch,
    t,
    parcel,
    align,
    fromModal,
    open,
    openAddressModal,
    editAddress,
    setEditAddress,
  } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { profileInfo } = useSelector((state) => state.profileInfo);
  const { guestUserInfo } = useSelector((state) => state.guestUserInfo);
  const [editAddressLocation, setEditAddressLocation] = useState({
    lat: editAddress?.latitude,
    lng: editAddress?.longitude,
  })
  const token = localStorage.getItem('token')
  const reduxDispatch = useDispatch();
  const [addressType, setAddressType] = useState(guestUserInfo ? guestUserInfo?.address_type : "");
  const personName = `${profileInfo?.f_name} ${profileInfo?.l_name}`;

  //useEffect calls for getting data
  //****getting current location/***/
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      isGeolocationEnabled: true,
    });
  //
  // const editLocation = {
  //   lat: editAddress?.latitude,
  //   lng: editAddress?.longitude,
  // };

  useEffect(() => {
    setEditAddressLocation(state?.location)
  }, [state?.location]);

  useEffect(() => {
    dispatch({
      type: ACTIONS.setLocation,
      payload: configData?.default_location,
    });
  }, []);

  // useEffect(() => {
  //   dispatch({
  //     type: ACTIONS.setLocation,
  //     payload: editLocation,
  //   });
  // }, [editAddress]);
  const { data: places, isLoading } = useGetAutocompletePlace(
    state.searchKey,
    state.enabled
  );
  useEffect(() => {
    if (places) {
      dispatch({ type: ACTIONS.setPredictions, payload: places?.predictions });
    }
  }, [places]);
  const { data: geoCodeResults, isFetching: isFetchingGeoCode } = useGetGeoCode(
    state.location,
    state.geoLocationEnable
  );
  useEffect(() => {
    if (geoCodeResults?.results) {
      dispatch({
        type: ACTIONS.setCurrentLocation,
        payload: geoCodeResults?.results[0]?.formatted_address,
      });
    }
  }, [geoCodeResults, state.location]);
  const { data: zoneData } = useGetZoneId(state.location, state.zoneIdEnabled);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (zoneData) {
        // dispatch(setZoneData(zoneData?.data?.zone_data));
        localStorage.setItem("zoneid", zoneData?.zone_id);
      }
    }
  }, [zoneData]);
  // //********************Pick Location */
  const { isLoading: isLoading2, data: placeDetails } = useGetPlaceDetails(
    state.placeId,
    state.placeDetailsEnabled
  );
  //
  useEffect(() => {
    if (placeDetails) {
      dispatch({
        type: ACTIONS.setLocation,
        payload: placeDetails?.result?.geometry?.location,
      });
    }
  }, [placeDetails]);

  // const orangeColor = theme.palette.primary.main;
  let data = {};

  useEffect(() => {
    if (state.placeDescription) {
      dispatch({
        type: ACTIONS.setCurrentLocation,
        payload: state.placeDescription,
      });
    }
  }, [state.placeDescription]);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = (name) => {
    setAddressType(name);
    if (editAddress) {
      setEditAddress({ ...editAddress, address_type: name });
    }
  };
  const closePopover = () => {
    reduxDispatch(setOpenAddressModal(false));
  };
  return (
    <Box>
      {openAddressModal && (
        <CustomModal
          openModal={openAddressModal}
          handleClose={() => reduxDispatch(setOpenAddressModal(false))}
        >
          <Paper
            sx={{
              position: "relative",
              width: { xs: "300px", sm: "450px", md: "550px", lg: "730px" },
              p: "1.4rem",
            }}
          >
            <IconButton
              onClick={() => reduxDispatch(setOpenAddressModal(false))}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <CloseIcon sx={{ fontSize: "16px" }} />
            </IconButton>

            <CustomStackFullWidth
              alignItems="center"
              justifyContent="center"
              sx={{ marginBottom: "1rem" }}
            >
              {/*<SimpleBar style={{ maxHeight: "60vh" }}></SimpleBar>*/}
            </CustomStackFullWidth>
            <GoogleMapComponent
              height="236px"
              key={state.rerenderMap}
              setLocation={(values) => {
                dispatch({
                  type: ACTIONS.setLocation,
                  payload: values,
                });
              }}
              // setCurrentLocation={setCurrentLocation}
              // locationLoading={locationLoading}
              location={editAddress ? editAddressLocation : state.location ? state.location : { lat: configData?.default_location?.lat, lng: configData?.default_location?.lng }}
              setPlaceDetailsEnabled={(value) =>
                dispatch({
                  type: ACTIONS.setPlaceDetailsEnabled,
                  payload: value,
                })
              }
              placeDetailsEnabled={state.placeDetailsEnabled}
              locationEnabled={state.locationEnabled}
            />

            <CustomStackFullWidth pt="20px">
              <Typography>{t("Label As")}</Typography>
              <Stack direction="row" spacing={2.5} pt="10px">
                <AddressTypeStack
                  value="home"
                  addressType={guestUserInfo ? addressType :
                    editAddress?.address_type
                      ? editAddress?.address_type
                      : addressType
                  }
                  onClick={() => handleClick("home")}
                >
                  <CustomImageContainer
                    src={home.src}
                    width="24px"
                    height="24px"
                  />
                </AddressTypeStack>
                <AddressTypeStack
                  value="office"
                  addressType={
                    editAddress?.address_type
                      ? editAddress?.address_type
                      : addressType
                  }
                  onClick={() => handleClick("office")}
                >
                  <CustomImageContainer
                    src={office.src}
                    width="24px"
                    height="24px"
                  />
                </AddressTypeStack>
                <AddressTypeStack
                  value="other"
                  addressType={
                    editAddress?.address_type
                      ? editAddress?.address_type
                      : addressType
                  }
                  onClick={() => handleClick("other")}
                >
                  <CustomImageContainer
                    src={plusIcon.src}
                    width="24px"
                    height="24px"
                  />
                </AddressTypeStack>
              </Stack>
            </CustomStackFullWidth>
            <CustomStackFullWidth mt="1.3rem">
              <AddressForm
                atModal="true"
                setAddressType={setAddressType}
                addressType={
                  editAddress?.address_type
                    ? editAddress?.address_type
                    : addressType
                }
                configData={configData}
                deliveryAddress={
                  geoCodeResults?.results[0]?.formatted_address
                }
                personName={
                  editAddress ? editAddress?.contact_person_name : personName
                }
                phone={
                  editAddress
                    ? editAddress?.contact_person_number
                    : profileInfo?.phone
                }
                lat={editAddress ? editAddress?.lat : state.location?.lat}
                lng={editAddress ? editAddress?.lng : state.location?.lng}
                popoverClose={closePopover}
                refetch={refetch}
                isRefetcing={isFetchingGeoCode}
                editAddress={editAddress}
              />
            </CustomStackFullWidth>
          </Paper>
        </CustomModal>
      )}
    </Box>
  );
};

AddNewAddress.propTypes = {};

export default AddNewAddress;
