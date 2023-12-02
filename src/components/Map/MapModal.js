import React, {memo, useEffect, useState} from "react";
import {Autocomplete, Backdrop, Button, IconButton, Modal, Skeleton, Typography} from "@mui/material";
import {CustomBoxWrapper, LocationView, PrimaryButton, WrapperCurrentLocationPick} from "./map.style";
import {SearchLocationTextField} from "../landing-page/hero-section/HeroSection.style";
import UseCurrentLocation from "./UseCurrentLocation";
import CloseIcon from "@mui/icons-material/Close";
import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
    CustomTypographyGray,
} from "../../styled-components/CustomStyles.style";
import RoomIcon from "@mui/icons-material/Room";
import {useTranslation} from "react-i18next";
import useGetAutocompletePlace from "../../api-manage/hooks/react-query/google-api/usePlaceAutoComplete";
import useGetGeoCode from "../../api-manage/hooks/react-query/google-api/useGetGeoCode";
import useGetZoneId from "../../api-manage/hooks/react-query/google-api/useGetZone";
import useGetPlaceDetails from "../../api-manage/hooks/react-query/google-api/useGetPlaceDetails";
import {useDispatch, useSelector} from "react-redux";
import GoogleMapComponent from "./GoogleMapComponent";
import toast from "react-hot-toast";

import {useRouter} from "next/router";
import {ModuleSelection} from "../landing-page/hero-section/module-selection";
import {useGeolocated} from "react-geolocated";
import {module_select_success} from "../../utils/toasterMessages";
import {FacebookCircularProgress} from "../loading-spinners/FacebookLoading";
import {setWishList} from "../../redux/slices/wishList";
import {useWishListGet} from "../../api-manage/hooks/react-query/wish-list/useWishListGet";
import {getToken} from "../../helper-functions/getToken";
import ModalExtendShrink from "./ModalExtendShrink";

const MapModal = ({
                      open,
                      handleClose,
                      locationLoading,
                      toparcel,
                      handleLocation,
                      disableAutoFocus,fromReceiver
                  }) => {
    const router = useRouter();
    const {configData} = useSelector((state) => state.configData);
    const {t} = useTranslation();
    const [searchKey, setSearchKey] = useState("");
    const [enabled, setEnabled] = useState(false);
    const [geoLocationEnable, setGeoLocationEnable] = useState(true);
    const [predictions, setPredictions] = useState([]);
    const [placeDetailsEnabled, setPlaceDetailsEnabled] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [placeId, setPlaceId] = useState("");
    const [placeDescription, setPlaceDescription] = useState(undefined);
    const [location, setLocation] = useState(configData?.default_location);
    const [zoneId, setZoneId] = useState(undefined);
    const [isLoadingCurrentLocation, setLoadingCurrentLocation] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({});
    const [rerenderMap, setRerenderMap] = useState(false);
    const [zoneIdEnabled, setZoneIdEnabled] = useState(true);
    const [loadingAuto, setLoadingAuto] = useState(false);
    const [isDisablePickButton, setDisablePickButton] = useState(false);
    const [isModalExpand, setIsModalExpand] = useState(false);
    const [currentLocationValue, setCurrentLactionValue] = useState({
        description: null,
    });
    const [openModuleSelection, setOpenModuleSelection] = useState(false);
    const {data: places, isLoading: placesIsLoading} = useGetAutocompletePlace(
        searchKey,
        enabled
    );
    const dispatch = useDispatch();
    const {coords, isGeolocationAvailable, isGeolocationEnabled, getPosition} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
            isGeolocationEnabled: true,
        });
    useEffect(() => {
        if (places) {
            setPredictions(places?.predictions);
        }
    }, [places]);
    const {data: geoCodeResults, refetch: refetchCurrentLocation} =
        useGetGeoCode(location, geoLocationEnable);
    useEffect(() => {
        if (geoCodeResults) {
            setCurrentLactionValue({
                description: geoCodeResults?.results[0]?.formatted_address,
            });
        } else {
            setCurrentLactionValue({
                description: "",
            });
        }
    }, [geoCodeResults]);
    const {
        data: zoneData,
        error: errorLocation,
        isLoading,
    } = useGetZoneId(location, zoneIdEnabled);
    useEffect(() => {
        if (typeof window !== "undefined") {

            if (zoneData) {
                setZoneId(zoneData?.zone_id);
                if(fromReceiver !== "1"){
                    localStorage.setItem("zoneid", zoneData?.zone_id);
                }
                // dispatch(setZoneData(zoneData?.data?.zone_data));
            }
            if (!zoneData) {
                setZoneId(undefined);
            }
        }
    }, [zoneData]);
    const successHandler = () => {
        setLoadingAuto(false);
    };

    const {isLoading: isLoading2, data: placeDetails} = useGetPlaceDetails(
        placeId,
        placeDetailsEnabled,
        successHandler
    );
    //
    useEffect(() => {
        if (placeDetails) {
            setLocation(placeDetails?.result?.geometry?.location);
        }
    }, [placeDetails]);
    useEffect(() => {
        if (placeDescription) {
            setCurrentLocation(placeDescription);
        }
    }, [placeDescription]);
    useEffect(() => {
        if (coords) {
            setCurrentLocation({
                lat: coords.latitude,
                lng: coords.longitude,
            });
        }
    }, []);

    const handleLocationSelection = (value) => {
        setPlaceId(value?.place_id);
        setPlaceDescription(value?.description);
        //setLoadingAuto(false);
    };
    const handleLocationSet = (values) => {
        setLocation(values);
        //localStorage.setItem('currentLatLng', JSON.stringify(values))
    };

    // get module from localstorage
    let selectedModule = undefined;
    if (typeof window !== "undefined") {
        selectedModule = localStorage.getItem("module");
    }
    const onSuccessHandler = (response) => {
        dispatch(setWishList(response));
    };
    const {refetch: wishlistRefetch, isLoading: isLoadingWishlist} =
        useWishListGet(onSuccessHandler);

    const handlePickLocationOnClick = () => {

        if (zoneId && geoCodeResults && location) {
            if (getToken()) {
                wishlistRefetch();
            }
            if(fromReceiver !== "1"){
                localStorage.setItem("zoneid", zoneId);
            }

            if(fromReceiver!== "1"){
                localStorage.setItem(
                    "location",
                    geoCodeResults?.results[0]?.formatted_address
                );
                localStorage.setItem("currentLatLng", JSON.stringify(location));
            }else {

                toast.success(t("New location has been set."));
            }

            if (toparcel === "1") {
                handleLocation(location, geoCodeResults?.results[0]?.formatted_address);
                handleClose();
            } else {
                setOpenModuleSelection(true);
                // if (!selectedModule) {
                //   setOpenModuleSelection(true);
                // } else {
                //   router.push("/home");
                // }
            }
        }
    };

    const handleCloseModuleModal = (item) => {
        if (item) {
            toast.success(t(module_select_success));
            router.push("/home", undefined, {shallow: true});
        }
        setOpenModuleSelection(false);
        handleClose?.();
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <CustomBoxWrapper
                    expand={isModalExpand ? "true" : "false"}
                    sx={{
                        display: openModuleSelection ? "none" : "inherit",
                        padding: {xs: "1rem", md: "2rem"},
                        borderRadius: isModalExpand ? "0px" : "20px",
                        position: "relative",
                    }}
                >
                    <IconButton
                        onClick={() => handleClose()}
                        sx={{position: "absolute", top: 5, right: 8}}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <CustomStackFullWidth spacing={2}>
                        <Typography variant="h6">
                            {t("Type your address here or pick from map")}
                        </Typography>
                        <CustomStackFullWidth>
                            {loadingAuto ? (
                                <Skeleton width="100%" height="40px" variant="rectangular"/>
                            ) : (
                                <Autocomplete
                                    fullWidth
                                    freeSolo
                                    id="combo-box-demo"
                                    getOptionLabel={(option) => option.description}
                                    options={predictions}
                                    onChange={(event, value) => {
                                        if (value) {
                                            if (value !== "" && typeof value === "string") {
                                                setLoadingAuto(true);
                                                const value = places?.predictions?.[0];
                                                handleLocationSelection(value);
                                            } else {
                                                handleLocationSelection(value);
                                            }
                                        }
                                        setPlaceDetailsEnabled(true);
                                    }}
                                    clearOnBlur={false}
                                    value={currentLocationValue}
                                    loading={placesIsLoading}
                                    loadingText={t("Search suggestions are loading...")}
                                    renderInput={(params) => (
                                        <SearchLocationTextField
                                            sx={{
                                                borderRadius: "4px",
                                                border: (theme) =>
                                                    `1px solid ${theme.palette.neutral[200]}`,
                                            }}
                                            frommap="true"
                                            label={null}
                                            {...params}
                                            placeholder={t("Search location")}
                                            onChange={(event) => {
                                                setSearchKey(event.target.value);
                                                if (event.target.value) {
                                                    setEnabled(true);
                                                } else {
                                                    setEnabled(false);
                                                }
                                            }}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    setSearchKey(e.target.value);
                                                }
                                            }}
                                        />
                                    )}
                                />
                            )}
                        </CustomStackFullWidth>
                        <CustomBoxFullWidth
                            sx={{
                                mt: 2,
                                color: (theme) => theme.palette.neutral[1000],
                                p: "5px",
                                position: "relative",
                            }}
                        >
                            <LocationView>
                                {geoCodeResults?.results?.length > 0 ? (
                                    <>
                                        <RoomIcon fontSize="small" color="primary"/>
                                        <Typography>
                                            {geoCodeResults?.results[0]?.formatted_address}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Skeleton variant="rounded" width={300} height={20}/>
                                    </>
                                )}
                            </LocationView>
                            {!!location ? (
                                <GoogleMapComponent
                                    key={rerenderMap}
                                    setDisablePickButton={setDisablePickButton}
                                    setLocationEnabled={setLocationEnabled}
                                    setLocation={handleLocationSet}
                                    setCurrentLocation={setCurrentLocation}
                                    locationLoading={locationLoading}
                                    location={location}
                                    setPlaceDetailsEnabled={setPlaceDetailsEnabled}
                                    placeDetailsEnabled={placeDetailsEnabled}
                                    locationEnabled={locationEnabled}
                                    setPlaceDescription={setPlaceDescription}
                                    isModalExpand={isModalExpand}
                                />
                            ) : (
                                <CustomStackFullWidth
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <FacebookCircularProgress/>
                                    <CustomTypographyGray nodefaultfont="true">
                                        {t("Please wait sometimes")}
                                    </CustomTypographyGray>
                                </CustomStackFullWidth>
                            )}
                            <WrapperCurrentLocationPick alignItems="center" spacing={2}>
                                <ModalExtendShrink
                                    isModalExpand={isModalExpand}
                                    setIsModalExpand={setIsModalExpand}
                                    t={t}
                                />
                                <UseCurrentLocation
                                    setLoadingCurrentLocation={setLoadingCurrentLocation}
                                    setLocationEnabled={setLocationEnabled}
                                    setLocation={setLocation}
                                    coords={coords}
                                    refetchCurrentLocation={refetchCurrentLocation}
                                    setRerenderMap={setRerenderMap}
                                    isLoadingCurrentLocation={isLoadingCurrentLocation}
                                    isGeolocationEnabled={isGeolocationEnabled}
                                />
                            </WrapperCurrentLocationPick>
                        </CustomBoxFullWidth>
                        <CustomStackFullWidth justifyCenter="center" alignItems="center">
                            {errorLocation?.response?.data ? (
                                <Button
                                    aria-label="picklocation"
                                    sx={{
                                        flex: "1 0",
                                        width: "100%",
                                        top: "-3rem",
                                    }}
                                    disabled={locationLoading}
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        if (zoneId) {
                                            localStorage.setItem("zoneid", zoneId);
                                        }
                                        handleClose();
                                    }}
                                >
                                    {errorLocation?.response?.data?.errors[0]?.message}
                                </Button>
                            ) : (
                                <PrimaryButton
                                    disabled={
                                        isLoading || !geoCodeResults?.results[0]?.formatted_address
                                    }
                                    variant="contained"
                                    onClick={() => handlePickLocationOnClick()}
                                >
                                    {t("Pick Locations")}
                                </PrimaryButton>
                            )}
                        </CustomStackFullWidth>
                    </CustomStackFullWidth>
                </CustomBoxWrapper>
            </Modal>
            {openModuleSelection && (
                <ModuleSelection
                    location={currentLocation}
                    closeModal={handleCloseModuleModal}
                    disableAutoFocus={disableAutoFocus}
                />
            )}
        </>
    );
};

export default memo(MapModal);
