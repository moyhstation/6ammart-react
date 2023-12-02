import React from "react";
import PropTypes from "prop-types";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
//import { ACTIONS } from "./states/additionalInformationStates";
import {
  CustomStackFullWidth,
  CustomTextField,
} from "../../../styled-components/CustomStyles.style";
import { DeliveryCaption } from "../CheckOut.style";
import { useTheme } from "@emotion/react";
import { ACTIONS } from "../../address/states";

const AdditionalAddresses = (props) => {
  const {
    t,
    additionalInformationStates,
    additionalInformationDispatch,
    saveAddress,address
  } = props;


  const theme = useTheme();
  const handleSave = (e) => {
    if (e.target.checked) {
      saveAddress();
    }
  };
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <CustomStackFullWidth mt="1rem">
      <CustomStackFullWidth mt=".5rem">
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <CustomTextField
              label={t("Street number")}
              value={address? address?.road:additionalInformationStates.streetNumber}
              fullWidth
              onChange={(e) =>
                additionalInformationDispatch({
                  type: ACTIONS.setStreetNumber,
                  payload: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              label={t("House number")}
              value={address? address?.house:additionalInformationStates.houseNumber}
              fullWidth
              onChange={(e) =>
                additionalInformationDispatch({
                  type: ACTIONS.setHouseNumber,
                  payload: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              label={t("Floor")}
              value={address? address?.floor:additionalInformationStates.floor}
              fullWidth
              onChange={(e) =>
                additionalInformationDispatch({
                  type: ACTIONS.setFloor,
                  payload: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <FormGroup>
          <FormControlLabel
            onChange={(e) => handleSave(e)}
            control={<Checkbox />}
            label={
              <Typography
                fontWeight="400"
                fontSize="13px"
                color={theme.palette.primary.main}
              >
                {t("Save this Address")}
              </Typography>
            }
          />
        </FormGroup>
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

AdditionalAddresses.propTypes = {};

export default AdditionalAddresses;
