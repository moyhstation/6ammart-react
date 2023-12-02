import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Button, Card, TextField, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import CustomTextFieldWithFormik from "../../form-fields/CustomTextFieldWithFormik";
import RoomIcon from "@mui/icons-material/Room";
import CustomMapSearch from "../../Map/CustomMapSearch";
import SaveAddress from "../../SaveAddress";
import GetLocationFrom from "./GetLocationFrom";
import MapModal from "../../Map/MapModal";
import CustomPhoneInput from "../../custom-component/CustomPhoneInput";
import { getLanguage } from "../../../helper-functions/getLanguage";
const ReceiverInfoFrom = ({
  addAddressFormik,
  receiverNameHandler,
  receiverPhoneHandler,
  roadHandler,
  houseHandler,
  floorHandler,
  handleLocation,
  coords,
  sender,
  receiver,
  receiverFormattedAddress,
  setReceiverFormattedAddress,
  setReceiverLocation,
  configData,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [receiverOptionalAddress, setReceiverOptionalAddress] = useState({});
  const [open, setOpen] = useState(false);
  const [testLocation, setTestLocation] = useState(null);
  const [currentLocationValue, setCurrentLactionValue] = useState({
    description: null,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (receiverFormattedAddress) {
      setCurrentLactionValue({
        description: receiverFormattedAddress,
      });
      setTestLocation(receiverFormattedAddress);
    } else {
      setCurrentLactionValue({
        description: "",
      });
    }
  }, [receiverFormattedAddress]);

  useEffect(() => {
    roadHandler(
      receiverOptionalAddress?.road ? receiverOptionalAddress?.road : ""
    );
    floorHandler(
      receiverOptionalAddress?.floor ? receiverOptionalAddress?.floor : ""
    );
    houseHandler(
      receiverOptionalAddress?.house ? receiverOptionalAddress?.house : ""
    );
  }, [receiverOptionalAddress]);
  const lanDirection = getLanguage() ? getLanguage() : "ltr";
  return (
    <CustomStackFullWidth height="100%">
      <Card sx={{ padding: "1.2rem", height: "100%" }}>
        <CustomStackFullWidth spacing={2}>
          <Stack align="center">
            <Typography variant="h6">{t("Receiver Information")}</Typography>
          </Stack>
          <CustomStackFullWidth alignItems="center" spacing={2}>
            <CustomStackFullWidth alignItems="center">
              <CustomTextFieldWithFormik
                required="true"
                type="text"
                label={t("Receiver Name")}
                touched={addAddressFormik.touched.receiverName}
                errors={addAddressFormik.errors.receiverName}
                fieldProps={addAddressFormik.getFieldProps("receiverName")}
                onChangeHandler={receiverNameHandler}
                value={addAddressFormik.values.receiverName}
              />
            </CustomStackFullWidth>
            <CustomStackFullWidth alignItems="center">
              <CustomPhoneInput
                value={addAddressFormik.values.receiverPhone}
                onHandleChange={receiverPhoneHandler}
                initCountry={configData?.country}
                touched={addAddressFormik.touched.receiverPhone}
                errors={addAddressFormik.errors.receiverPhone}
                rtlChange="true"
                lanDirection={lanDirection}
                height="45px"
                borderRadius="8px"
              />
              {/*<CustomTextFieldWithFormik*/}
              {/*  required="true"*/}
              {/*  type="number"*/}
              {/*  label={t("Receiver Phone")}*/}
              {/*  touched={addAddressFormik.touched.receiverPhone}*/}
              {/*  errors={addAddressFormik.errors.receiverPhone}*/}
              {/*  fieldProps={addAddressFormik.getFieldProps("receiverPhone")}*/}
              {/*  onChangeHandler={receiverPhoneHandler}*/}
              {/*  value={addAddressFormik.values.receiverPhone}*/}
              {/*/>*/}
            </CustomStackFullWidth>
            <CustomStackFullWidth
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{t("Delivery Address")}</Typography>
              <Stack
                spacing={0.5}
                alignItems="center"
                justifyContent="center"
                direction="row"
              >
                <Button onClick={() => handleOpen()}>
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
            <CustomStackFullWidth pb="4px">
              <GetLocationFrom
                fromparcel="true"
                handleLocation={handleLocation}
                formattedAddress={receiverFormattedAddress}
                currentLocationValue={currentLocationValue}
                setCurrentLactionValue={setCurrentLactionValue}
                testLocation={testLocation}
                toReceiver="true"
              />
            </CustomStackFullWidth>
            {/*<CustomStackFullWidth>*/}
            {/*  <Card sx={{ padding: "1rem" }} elevation={9}>*/}
            {/*    <SaveAddress*/}
            {/*      handleLocation={handleLocation}*/}
            {/*      configData={configData}*/}
            {/*      setReceiverFormattedAddress={setReceiverFormattedAddress}*/}
            {/*      setReceiverLocation={setReceiverLocation}*/}
            {/*      setReceiverOptionalAddress={setReceiverOptionalAddress}*/}
            {/*    />*/}
            {/*  </Card>*/}
            {/*</CustomStackFullWidth>*/}
            <CustomStackFullWidth>
              <CustomTextFieldWithFormik
                type="text"
                label={t("Street number")}
                touched={addAddressFormik.touched.road}
                errors={addAddressFormik.errors.road}
                fieldProps={addAddressFormik.getFieldProps("road")}
                onChangeHandler={roadHandler}
                value={addAddressFormik.values.road}
              />
            </CustomStackFullWidth>
            <CustomStackFullWidth direction="row" spacing={1.3}>
              <CustomTextFieldWithFormik
                type="text"
                label={t("House no.")}
                touched={addAddressFormik.touched.house}
                errors={addAddressFormik.errors.house}
                fieldProps={addAddressFormik.getFieldProps("house")}
                onChangeHandler={houseHandler}
                value={addAddressFormik.values.senderPhone}
              />
              <CustomTextFieldWithFormik
                type="text"
                label={t("Floor no.")}
                touched={addAddressFormik.touched.floor}
                errors={addAddressFormik.errors.floor}
                fieldProps={addAddressFormik.getFieldProps("floor")}
                onChangeHandler={floorHandler}
                value={addAddressFormik.values.floor}
              />
            </CustomStackFullWidth>
          </CustomStackFullWidth>
        </CustomStackFullWidth>
      </Card>
      {open && (
        <MapModal
          open={open}
          handleClose={handleClose}
          coords={coords}
          toparcel="1"
          handleLocation={handleLocation}
          fromReceiver="1"
        />
      )}
    </CustomStackFullWidth>
  );
};

export default ReceiverInfoFrom;
