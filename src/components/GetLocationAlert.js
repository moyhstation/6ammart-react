import React, { useState } from "react";
import { CustomStackFullWidth } from "../styled-components/CustomStyles.style";
import CustomImageContainer from "./CustomImageContainer";
import locationImage from "../../public/static/locationSelect.png";
import { Button, Typography, useTheme } from "@mui/material";
import { t } from "i18next";
import MapModal from "./Map/MapModal";
import { useGeolocated } from "react-geolocated";

const GetLocationAlert = ({ setOpenAlert }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    isGeolocationEnabled: true,
  });
  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
    //setOpenAlert(false);
  };
  return (
    <CustomStackFullWidth
      p="1rem"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <CustomImageContainer
        src={locationImage.src}
        width="70px"
        height="70px"
      />
      <Typography variant="h5" color={theme.palette.neutral[1000]}>
        {t("Insert delivery location")}
      </Typography>
      <Typography
        variant="subtitle2"
        color={theme.palette.neutral[400]}
        textAlign="center"
      >
        {t(
          "Please add you delivery location so that we can review if the restaurant is available to deliver in your area or not  "
        )}
      </Typography>
      <Button variant="outlined" onClick={(e) => handleOpen(e)}>
        {t("Pick from Map")}
      </Button>

      {open && (
        <MapModal
          open={open}
          handleClose={() => setOpen(false)}
          coords={coords}
          disableAutoFocus
          fromStore
        />
      )}
    </CustomStackFullWidth>
  );
};

export default GetLocationAlert;
