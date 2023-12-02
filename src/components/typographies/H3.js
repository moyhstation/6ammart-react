import { useTranslation } from "react-i18next";
import { textWithEllipsis } from "../../styled-components/TextWithEllipsis";
import { Typography } from "@mui/material";
import React from "react";

const H3 = (props) => {
  const { text } = props;
  const { t } = useTranslation();
  const classes = textWithEllipsis();
  return (
    <Typography
      variant="subtitle1"
      className={classes.singleLineEllipsis}
      maxHeight="20px"
    >
      {t(text)}
    </Typography>
  );
};

H3.propTypes = {};

export default H3;
