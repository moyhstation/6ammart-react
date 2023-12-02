import React from "react";
import { Box, FormGroup } from "@mui/material";

import IncDecAddOn from "./IncDecAddOn";
import { FoodTitleTypography } from "../food-card/FoodCard.style";

const AddOnsManager = (props) => {
  const { t, modalData, changeAddOns, selectedAddons } = props;
  return (
    <Box
      paddingLeft={{ xs: "10px", md: "0px" }}
      paddingRight={{
        xs: "5px",
        md: "10px",
      }}
    >
      <FoodTitleTypography
        textAlign="left"
        gutterBottom
        component="h6"
        sx={{ margin: "10px 0", fontWeight: "500", fontSize: "14px" }}
      >
        {t("Add Ons (Optional)")}
      </FoodTitleTypography>
      <FormGroup sx={{ marginLeft: "20px" }}>
        {modalData.length > 0 &&
          modalData[0].add_ons?.map((item) => (
            <IncDecAddOn
              key={item?.id}
              changeAddOns={changeAddOns}
              add_on={item}
              selectedAddons={selectedAddons}
            />
          ))}
      </FormGroup>
    </Box>
  );
};

AddOnsManager.propTypes = {};

export default AddOnsManager;
