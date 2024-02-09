import React, { useEffect, useState } from "react";

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
import { useTheme } from "@emotion/react";
import { ACTIONS } from "../../address/states";

const AdditionalAddresses = (props) => {
  const {
    t,
    additionalInformationStates,
    additionalInformationDispatch,
    saveAddress,
    address,
  } = props;
  const [street, setStreet] = useState(
    additionalInformationStates.streetNumber
  );
  const [house, setHouse] = useState(additionalInformationStates.houseNumber);
  const [floor, setFloor] = useState(additionalInformationStates.floor);
  useEffect(() => {
    setStreet(address?.road ?? "");
    setHouse(address?.house ?? "");
    setFloor(address?.floor ?? "");
  }, [address?.house, address?.road, address?.floor]);
  const handleStreetChange = (e) => {
    setStreet(e.target.value);
    additionalInformationDispatch({
      type: ACTIONS.setStreetNumber,
      payload: e.target.value,
    });
  };
  const handleHouseChange = (e) => {
    setHouse(e.target.value);
    additionalInformationDispatch({
      type: ACTIONS.setHouseNumber,
      payload: e.target.value,
    });
  };
  const handleFloorChange = (e) => {
    setFloor(e.target.value);
    additionalInformationDispatch({
      type: ACTIONS.setFloor,
      payload: e.target.value,
    });
  };

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
        <FormGroup>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <CustomTextField
                label={t("Street number")}
                value={street}
                fullWidth
                onChange={(e) => handleStreetChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                label={t("House number")}
                value={house}
                fullWidth
                onChange={(e) => handleHouseChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                label={t("Floor")}
                value={floor}
                fullWidth
                onChange={(e) => handleFloorChange(e)}
              />
            </Grid>
          </Grid>
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
