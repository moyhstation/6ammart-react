import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

const Subtitle1 = (props) => {
  const { text, textAlign, fontSize } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Typography
      textAlign={textAlign ? textAlign : "center"}
      variant={isSmall ? "body2" : "subtitle1"}
      lineHeight="24px"
      fontWeight="400"
      sx={{ color: "text.secondary" }}
    >
      {t(text)}
    </Typography>
  );
};

Subtitle1.propTypes = {};

export default Subtitle1;
