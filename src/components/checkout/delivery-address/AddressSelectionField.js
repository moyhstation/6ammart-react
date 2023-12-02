import React from "react";

import { InputBase, Typography } from "@mui/material";
// import AddNewAddress from '../customer-page/address/AddNewAddress'
import Link from "next/link";
import { InputField, SaveAddressBox } from "../CheckOut.style";
import AddNewAddress from "../../address/add-new-address";

const AddressSelectionField = (props) => {
  const { theme, address, refetch, t, configData } = props;
  const borderColor = theme.palette.primary.main;
  return (
    <>
      <InputField
        variant="outlined"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          border: `.5px solid ${borderColor}`,
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            fontSize: "15px",
              paddingRight:'10px',

            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          }}
          placeholder="Set Location"
          inputProps={{
            "aria-label": "search google maps",
          }}
          value={address?.address}
        />
        <AddNewAddress refetch={refetch} t={t} configData={configData} />
      </InputField>
      <SaveAddressBox>
        <Link href="/address">
          <Typography
            color={theme.palette.primary.main}
            sx={{ cursor: "pointer" }}
          >
            {t("View Saved Address")}
          </Typography>
        </Link>
      </SaveAddressBox>
    </>
  );
};

AddressSelectionField.propTypes = {};

export default AddressSelectionField;
