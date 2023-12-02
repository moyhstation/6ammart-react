import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IsSmallScreen } from "../../utils/CommonValues";

const H1 = (props) => {
  const { text, textAlign, textTransform, fontWeight } = props;

  const { t } = useTranslation();
  return (
    <Typography
      textAlign={textAlign ? textAlign : "center"}
      fontWeight={fontWeight ? fontWeight : "700"}
      lineHeight={IsSmallScreen() ? "10px" : "30px"}
      sx={{ fontSize: { xs: "15px", md: "22px" } }}
      textTransform={textTransform}
    >
      {t(text)}
    </Typography>
  );
};

H1.propTypes = {
  text: PropTypes.string.isRequired,
};

export default H1;
