import React from "react";
import PropTypes from "prop-types";
import { CustomStackFullWidth } from "../styled-components/CustomStyles.style";
import NoItemsSvg from "./svg-components/NoItemsSvg";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SEARCH_NO_DATA_FOUND } from "../utils/staticTexts";
import NoStoresSvg from "./svg-components/NoStoresSvg";

const EmptySearchResults = (props) => {
  const { isItems, text } = props;
  const { t } = useTranslation();
  return (
    <CustomStackFullWidth alignItems="center" justifyContent="center">
      {isItems ? <NoItemsSvg /> : <NoStoresSvg />}
      <Typography
        sx={{
          textTransform: "capitalize",
          fontSize: "18px",
          fontWeight: "bold",
          color: (theme) => theme.palette.customColor.textGray,
        }}
      >
        {t(text)}
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          color: (theme) => theme.palette.customColor.textGray,
        }}
      >
        {t(SEARCH_NO_DATA_FOUND)}
      </Typography>
    </CustomStackFullWidth>
  );
};

EmptySearchResults.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EmptySearchResults;
