import React from "react";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { CustomColorBox, CustomSizeBox } from "../ProductDetails.style";

const SizeVariation = ({ productDetailsData }) => {
  return (
    <CustomStackFullWidth spacing={1.4}>
      <Typography fontWeight="400">{t("Size")} : red</Typography>
      <CustomStackFullWidth direction="row" spacing={2}>
        <CustomSizeBox>M</CustomSizeBox>
        <CustomSizeBox>L</CustomSizeBox>
        <CustomSizeBox>XL</CustomSizeBox>
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default SizeVariation;
