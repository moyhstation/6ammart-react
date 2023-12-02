import React from "react";
import PropTypes from "prop-types";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const H2 = (props) => {
  const { text, textAlign } = props;

  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Typography
      textAlign={textAlign ? textAlign : "center"}
      variant={isSmall ? "h6" : "h5"}
      textTransform="capitalize"
    >
      {t(text)}
    </Typography>
  );
};

H2.propTypes = {
  text: PropTypes.string.isRequired,
};

export default H2;
