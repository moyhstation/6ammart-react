import React from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { CustomTypography } from "../landing-page/hero-section/HeroSection.style";
import { t } from "i18next";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";

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
          <CustomTypography>
            {t(
              "You denied location permission. Please allow browsers location permission from your device, refresh the site and receive more accurate delivery."
            )}
          </CustomTypography>
        )}
      </DialogContent>
      <DialogActions>
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button variant="outlined" onClick={handleCloseLocation}>
            <CustomTypography>{t("Close")}</CustomTypography>
          </Button>

          <Button onClick={() => handleCloseLocation()} variant="contained">
            {t("Okay")}
          </Button>
        </CustomStackFullWidth>
      </DialogActions>
    </Dialog>
  );
};

export default AllowLocationDialog;
