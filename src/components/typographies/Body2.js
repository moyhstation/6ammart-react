import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Body2 = (props) => {
  const { text, fontWeight } = props;
  const { t } = useTranslation();
  return (
    <Typography variant="body2" color="text.secondary" fontWeight={fontWeight}>
      {t(text)}
    </Typography>
  );
};

Body2.propTypes = {};

export default Body2;
