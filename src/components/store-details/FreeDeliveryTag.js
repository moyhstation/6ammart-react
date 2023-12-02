import React from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import {
  CustomColouredTypography,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import CustomImageContainer from "../CustomImageContainer";
import free from "./assets/free.png";
import { useTranslation } from "react-i18next";

const CustomBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100px",
  //height: "60px",
  // left: 586.99px;
  // top: 387px;
  background: theme.palette.background.paper,
  boxShadow: "0px 0px 3.73239px rgba(0, 0, 0, 0.25)",
  borderRadius: "8.93109px",
  bottom: 20,
  right: 15,
  textAlign: "center",
  padding: "5px",
}));
const FreeDeliveryTag = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <CustomBox>
      <CustomImageContainer
        src={free.src}
        width="34px"
        height="35px"
        alt={t("Delivery")}
      />
      <CustomColouredTypography variant="h6" color={theme.palette.error.light}>
        {t("Delivery")}
      </CustomColouredTypography>
    </CustomBox>
  );
};

FreeDeliveryTag.propTypes = {};

export default FreeDeliveryTag;
