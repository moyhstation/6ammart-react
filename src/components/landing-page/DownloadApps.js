import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { useTranslation } from "react-i18next";
import AppLinks from "../footer/footer-middle/AppLinks";
import { styled, Typography } from "@mui/material";
import DollarSignHighlighter from "../DollarSignHighlighter";

const HighLightedText = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));
const DownloadApps = ({ theme, isSmall, landingPageData }) => {
  const { t } = useTranslation();
  return (
    <CustomStackFullWidth
      alignItems={isSmall ? "center" : "flex-start"}
      justifyContent="center"
    >
      <Typography textAlign="flex-start" variant={isSmall ? "h7" : "h5"}>
        <DollarSignHighlighter
          theme={theme}
          text={landingPageData?.download_user_app_title}
        />
      </Typography>
      <Typography
        variant={isSmall ? "body3" : "body1"}
        textAlign="flex-start"
        lineHeight={isSmall ? "17px" : "38px"}
        sx={{ mt: "10px" }}
      >
        <DollarSignHighlighter
          theme={theme}
          text={landingPageData?.download_user_app_sub_title}
        />
      </Typography>
      <AppLinks landingPageData={landingPageData} graybackground />
    </CustomStackFullWidth>
  );
};
DownloadApps.propTypes = {};

export default DownloadApps;
