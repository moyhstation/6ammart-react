import React, { useEffect, useReducer, useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { BackIconButton } from "../../profile/basic-information/BasicInformationForm";
import { t } from "i18next";
import { ACTIONS, initialState, reducer } from "../states";
import { useDispatch, useSelector } from "react-redux";
import { useGeolocated } from "react-geolocated";
import useGetAutocompletePlace from "../../../api-manage/hooks/react-query/google-api/usePlaceAutoComplete";
import useGetGeoCode from "../../../api-manage/hooks/react-query/google-api/useGetGeoCode";
import useGetZoneId from "../../../api-manage/hooks/react-query/google-api/useGetZone";
import useGetPlaceDetails from "../../../api-manage/hooks/react-query/google-api/useGetPlaceDetails";
import GoogleMapComponent from "../../Map/GoogleMapComponent";
import CustomMapSearch from "../../Map/CustomMapSearch";
import { Box } from "@mui/system";
import {
  handleAgreeLocation,
  handleChange,
  handleChangeForSearch,
  handleCloseLocation,
} from "../HelperFunctions";
import {
  AddressTypeStack,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import home from "../../checkout/assets/image 1256.png";
import office from "../assets/office.png";
import plusIcon from "../assets/plus.png";
import AddressForm from "./AddressForm";
import { styled } from "@mui/material/styles";
export const AddAddressSearchBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  zIndex: "999",
  width: "85%",
  top: "10%",
  marginLeft: "20px",
  [theme.breakpoints.down("md")]: {
    marginLeft: "13px",
  },
}));
const AddAddressComponent = ({
  setAddAddress,
  configData,
  editAddress,
  userData,
  addressRefetch,
  setEditAddress,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [addressType, setAddressType] = useState(
    editAddress ? editAddress?.address_type : ""
  );
  const [defaultLocation, setDefaultLocation] = useState({});
  const [isDisablePickButton, setDisablePickButton] = useState(false)
  const [locationEnabled, setLocationEnabled] = useState(false)
  const [location, setLocation] = useState(configData?.default_location)
  const [searchKey, setSearchKey] = useState("")
  const [enabled, setEnabled] = useState(false)
  //const [currentLocation, setCurrentLocation] = useState(locations)
  // const [locationLoading, setLocationLoading] = useState(false)
  const [placeDetailsEnabled, setPlaceDetailsEnabled] = useState(true)
  const [placeDescription, setPlaceDescription] = useState(undefined)
  const [zoneId, setZoneId] = useState(undefined)
  const [mounted, setMounted] = useState(true)
  const [predictions, setPredictions] = useState([])
  const [placeId, setPlaceId] = useState('')

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

  const { data: places, isLoading } = useGetAutocompletePlace(
      searchKey,
      enabled
  );

  useEffect(() => {
    if (places) {
      setPredictions(places?.predictions)
    }
  }, [places])
  const zoneIdEnabled=locationEnabled
  const { data: zoneData } = useGetZoneId(location,zoneIdEnabled);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (zoneData) {
        // dispatch(setZoneData(zoneData?.data?.zone_data));
        localStorage.setItem("zoneid", zoneData?.zone_id);
      }
    }
  }, [zoneData]);
  const { isLoading: isLoading2, data: placeDetails } = useGetPlaceDetails(
    placeId,
    placeDetailsEnabled
  );
  //

  useEffect(() => {
    if (placeDetails) {
      setLocation(placeDetails?.result?.geometry?.location)
      setLocationEnabled(true)
    }
  }, [placeDetails])
  const { data: geoCodeResults, isFetching: isFetchingGeoCode } = useGetGeoCode(
      location
  );

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = (name) => {
    setAddressType(name);
    setEditAddress({ ...editAddress, address_type: null });
  };
  const editLocation = {
    lat: editAddress?.latitude,
    lng: editAddress?.longitude,
  };

  const handleChangeForSearchs=(event)=>{
    if(event.target.value){
      setSearchKey(
         event.target.value
      )
      setEnabled(true)
      setPlaceDetailsEnabled(true)
    }

  }
  const handleChangeS=(event, value)=>{
    if(value){
      setPlaceId(value?.place_id)
    }
    setPlaceDetailsEnabled(true)
  }
  return (
    <>
      <Grid item md={12} xs={12} alignSelf="center">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2" fontWeight="700">
            {t("Add Address")}
          </Typography>
          <BackIconButton onClick={() => setAddAddress(false)}>
            <ArrowBackIosNewIcon
              sx={{
                fontSize: "10px",
                color: (theme) => theme.palette.primary.main,
                fontWeight: "700",
                marginRight: "3px",
              }}
            />
            {t("Go Back")}
          </BackIconButton>
        </Stack>
      </Grid>
      <Grid item xs={12} md={5} position="relative" align="center">
        <AddAddressSearchBox>
          <CustomMapSearch
            // showCurrentLocation={state.showCurrentLocation}
            predictions={predictions}
            handleChange={(event, value) =>
              handleChangeS(event, value, dispatch)
            }
            HandleChangeForSearch={(event) =>
                handleChangeForSearchs(event, dispatch)
            }
            handleAgreeLocation={() => handleAgreeLocation(coords, dispatch)}
            currentLocation={state.currentLocation}
            handleCloseLocation={() => handleCloseLocation(dispatch)}
            // frommap="true"
            // isLoading={isFetchingGeoCode}
          />
        </AddAddressSearchBox>
        <GoogleMapComponent
            setLocation={setLocation}
            location={location}
            setPlaceDetailsEnabled={
              setPlaceDetailsEnabled
            }
            placeDetailsEnabled={
              placeDetailsEnabled
            }
            locationEnabled={locationEnabled}
            setPlaceDescription={
              setPlaceDescription
            }
            setLocationEnabled={setLocationEnabled}
            setDisablePickButton={
              setDisablePickButton
            }
            height="350px"
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <CustomStackFullWidth mb="20px">
          <Typography>{t("Label As")}</Typography>
          <Stack direction="row" spacing={2.5} pt="10px">
            <AddressTypeStack
              value="home"
              addressType={
                editAddress?.address_type
                  ? editAddress?.address_type
                  : addressType
              }
              onClick={() => handleClick("home")}
            >
              <CustomImageContainer src={home.src} width="24px" height="24px" />
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
        <AddressForm
          deliveryAddress={
           geoCodeResults?.results[0]?.formatted_address
          }
          atModal="false"
          addressType={addressType}
          configData={configData}
          phone={userData?.phone}
          lat={ location?.lat || ""}
          lng={location?.lng || ""}
          personName={
            editAddress
              ? editAddress?.contact_person_name
              : `${userData?.f_name} ${userData?.l_name}`
          }
          editAddress={editAddress}
          setAddAddress={setAddAddress}
          refetch={addressRefetch}
        />
      </Grid>
    </>
  );
};

export default AddAddressComponent;
