import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Button, Card, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import CustomTextFieldWithFormik from "../../form-fields/CustomTextFieldWithFormik";
import RoomIcon from "@mui/icons-material/Room";
import CustomMapSearch from "../../Map/CustomMapSearch";
import HomeIcon from "@mui/icons-material/Home";
import SaveAddress from "../../SaveAddress";
import GetLocationFrom from "./GetLocationFrom";
import MapModal from "../../Map/MapModal";
import { useSelector } from "react-redux";
import CustomPhoneInput from "../../custom-component/CustomPhoneInput";
import { getLanguage } from "../../../helper-functions/getLanguage";
import { getToken } from "../../../helper-functions/getToken";
const SenderInfoForm = ({
  addAddressFormik,
  senderNameHandler,
  senderPhoneHandler,
  handleLocation,
  coords,
  configData,
  senderFormattedAddress,
  setSenderFormattedAddress,
  setSenderLocation,
  senderRoadHandler,
  senderHouseHandler,
  senderFloorHandler,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentLocationValue, setCurrentLactionValue] = useState({
    description: null,
  });
  const [senderOptionalAddress, setSenderOptionalAddress] = useState({});
  const [testLocation, setTestLocation] = useState(null);
  const theme = useTheme();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (senderFormattedAddress) {
      setCurrentLactionValue({
        description: senderFormattedAddress,
      });
      setTestLocation(senderFormattedAddress);
    } else {
      setCurrentLactionValue({
        description: "",
      });
    }
  }, [senderFormattedAddress]);

  useEffect(() => {
    senderRoadHandler(
      senderOptionalAddress?.road ? senderOptionalAddress?.road : ""
    );
    senderFloorHandler(
      senderOptionalAddress?.floor ? senderOptionalAddress?.floor : ""
    );
    senderHouseHandler(
      senderOptionalAddress?.house ? senderOptionalAddress?.house : ""
    );
  }, [senderOptionalAddress]);
  const lanDirection = getLanguage() ? getLanguage() : "ltr";

  return (
    <CustomStackFullWidth height="100%">
      <Card sx={{ padding: "1.2rem", height: "100%" }}>
        <CustomStackFullWidth spacing={2}>
          <Stack align="center" width="100%">
            <Typography variant="h6">{t("Sender Information")}</Typography>
          </Stack>
          <CustomStackFullWidth alignItems="center" spacing={2}>
            <CustomStackFullWidth alignItems="center">
              <CustomTextFieldWithFormik
                required="true"
                type="text"
                label={t("Sender Name")}
                touched={addAddressFormik.touched.senderName}
                errors={addAddressFormik.errors.senderName}
                fieldProps={addAddressFormik.getFieldProps("senderName")}
                onChangeHandler={senderNameHandler}
                value={addAddressFormik.values.senderName}
              />
            </CustomStackFullWidth>
            <CustomStackFullWidth alignItems="center">
              <CustomPhoneInput
                value={addAddressFormik.values.senderPhone}
                onHandleChange={senderPhoneHandler}
                initCountry={configData?.country}
                touched={addAddressFormik.touched.senderPhone}
                errors={addAddressFormik.errors.senderPhone}
                rtlChange="true"
                lanDirection={lanDirection}
                height="45px"
                borderRadius="8px"
              />
              {/*<CustomTextFieldWithFormik*/}
              {/*  required="true"*/}
              {/*  type="number"*/}
              {/*  label={t("Sender Phone")}*/}
              {/*  touched={addAddressFormik.touched.senderPhone}*/}
              {/*  errors={addAddressFormik.errors.senderPhone}*/}
              {/*  fieldProps={addAddressFormik.getFieldProps("senderPhone")}*/}
              {/*  onChangeHandler={senderPhoneHandler}*/}
              {/*  value={addAddressFormik.values.senderPhone}*/}
              {/*/>*/}
            </CustomStackFullWidth>
            <CustomStackFullWidth
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{t("Pickup Address")}</Typography>
              <Stack
                spacing={0.5}
                alignItems="center"
                justifyContent="center"
                direction="row"
              >
                <Button onClick={handleOpen}>
                  <Typography
                    color={theme.palette.primary.main}
                    fontSize="12px"
                  >
                    {t("Set from map")}
                  </Typography>
                  <RoomIcon
                    sx={{ width: "16px", height: "16px" }}
                    color="primary"
                  />
                </Button>
              </Stack>
            </CustomStackFullWidth>
            <CustomStackFullWidth>
              <GetLocationFrom
                handleLocation={handleLocation}
                sender="true"
                fromparcel="true"
                formattedAddress={senderFormattedAddress}
                currentLocationValue={currentLocationValue}
                testLocation={testLocation}
                setCurrentLactionValue={setCurrentLactionValue}
              />
            </CustomStackFullWidth>
            {getToken() && (
              <CustomStackFullWidth>
                <Card sx={{ padding: ".5rem" }} elevation={9}>
                  <SaveAddress
                    handleLocation={handleLocation}
                    configData={configData}
                    setSenderFormattedAddress={setSenderFormattedAddress}
                    setSenderLocation={setSenderLocation}
                    setSenderOptionalAddress={setSenderOptionalAddress}
                    sender="true"
                  />
                </Card>
              </CustomStackFullWidth>
            )}

            {/*<CustomStackFullWidth>*/}
            {/*  <CustomTextFieldWithFormik*/}
            {/*    type="text"*/}
            {/*    label={t("Street number")}*/}
            {/*    touched={addAddressFormik.touched.senderRoad}*/}
            {/*    errors={addAddressFormik.errors.senderRoad}*/}
            {/*    fieldProps={addAddressFormik.getFieldProps("senderRoad")}*/}
            {/*    onChangeHandler={senderRoadHandler}*/}
            {/*    value={addAddressFormik.values.senderRoad}*/}
            {/*  />*/}
            {/*</CustomStackFullWidth>*/}
            {/*<CustomStackFullWidth direction="row" spacing={1.3}>*/}
            {/*  <CustomTextFieldWithFormik*/}
            {/*    type="text"*/}
            {/*    label={t("House no.")}*/}
            {/*    touched={addAddressFormik.touched.senderHouse}*/}
            {/*    errors={addAddressFormik.errors.senderHouse}*/}
            {/*    fieldProps={addAddressFormik.getFieldProps("senderHouse")}*/}
            {/*    onChangeHandler={senderHouseHandler}*/}
            {/*    value={addAddressFormik.values.senderHouse}*/}
            {/*  />*/}
            {/*  <CustomTextFieldWithFormik*/}
            {/*    type="text"*/}
            {/*    label={t("Floor no.")}*/}
            {/*    touched={addAddressFormik.touched.senderFloor}*/}
            {/*    errors={addAddressFormik.errors.senderFloor}*/}
            {/*    fieldProps={addAddressFormik.getFieldProps("senderFloor")}*/}
            {/*    onChangeHandler={senderFloorHandler}*/}
            {/*    value={addAddressFormik.values.senderFloor}*/}
            {/*  />*/}
            {/*</CustomStackFullWidth>*/}
          </CustomStackFullWidth>
        </CustomStackFullWidth>
      </Card>
      {open && (
        <MapModal
          open={open}
          handleClose={handleClose}
          coords={coords}
          setSenderFormattedAddress={setSenderFormattedAddress}
          setSenderLocation={setSenderLocation}
          handleLocation={handleLocation}
          toparcel="1"
        />
      )}
    </CustomStackFullWidth>
  );
};

export default SenderInfoForm;
