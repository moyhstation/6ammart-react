import React from "react";
import { Button, Dialog, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import { CustomTypography } from "../landing-page/hero-section/HeroSection.style";
import { t } from "i18next";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import LocationPermissionIcon from "./assets/LocationPermissionIcon";

const AllowLocationDialog = ({
  handleCloseLocation,
  openLocation,
  isGeolocationEnabled,
}) => {
  return (
    <Dialog
      open={openLocation}
      onClose={handleCloseLocation}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        {!isGeolocationEnabled && (
          <CustomStackFullWidth
            gap="10px"
            alignItems="center"
            maxWidth="500px"
            textAlign="center"
            padding={{ xs: "0 10px", sm: "0 40px", md: "0 60px" }}
          >
            <LocationPermissionIcon />
            <Typography fontSize={{ xs: "14px", sm: "16px", md: "18px" }} fontWeight={500}>{t("Please allow browser location permission")}</Typography>

            <CustomTypography>
              {t("Your browser location track permission is off. Please turn on the location permission to detect current location")}
            </CustomTypography>
          </CustomStackFullWidth>
        )}
      </DialogContent>
      <DialogActions>
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          paddingBottom="35px"
        >

          <Button onClick={() => handleCloseLocation()} variant="contained">
            {t("Okay")}
          </Button>
        </CustomStackFullWidth>
      </DialogActions>
    </Dialog>
  );
};

export default AllowLocationDialog;
