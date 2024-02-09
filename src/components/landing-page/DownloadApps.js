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
      gap={{xs:"10px", sm:"15px"}}
    >
      <Typography textAlign="flex-start" fontSize={isSmall ? "14px" : "26px"} fontWeight={600}>
        <DollarSignHighlighter
          theme={theme}
          text={landingPageData?.download_user_app_title}
        />
      </Typography>
      <Typography
        textAlign="flex-start"
        fontSize={isSmall ? "12px" : "18px"}
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
