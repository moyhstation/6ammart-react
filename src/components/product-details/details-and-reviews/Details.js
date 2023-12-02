import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const Details = ({ description }) => {
  return <Typography color="customColor.textGray">{description}</Typography>;
};

Details.propTypes = {};

export default Details;
