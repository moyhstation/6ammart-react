import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { textWithEllipsis } from "../../styled-components/TextWithEllipsis";
import { IsSmallScreen } from "../../utils/CommonValues";

const H4 = (props) => {
  const { text } = props;
  const { t } = useTranslation();
  const classes = textWithEllipsis();
  return (
    <Typography
      variant={IsSmallScreen() ? "h8" : "subtitle2"}
      className={classes.singleLineEllipsis}
      maxHeight="20px"
    >
      {t(text)}
    </Typography>
  );
};

H4.propTypes = {};

export default H4;
