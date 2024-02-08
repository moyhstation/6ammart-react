import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";

import {
  alpha,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { t } from "i18next";

import { Box } from "@mui/system";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { getLanguage } from "../../../helper-functions/getLanguage";
import CustomImageContainer from "../../CustomImageContainer";
import DollarSignHighlighter from "../../DollarSignHighlighter";
import down_arrow from "../assets/downarrow.png";
import HeroLocationForm from "./HeroLocationForm";
import ModuleSelectionRaw from "./module-selection/ModuleSelectionRaw";
import DownArrow from "../assets/DownArrow";

const HeroTitleSection = ({ configData, landingPageData, handleOrderNow }) => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const currentLanguage = getLanguage();
  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentLocation(window.localStorage.getItem("location"));
    }
  }, []);
  const getSearchOrModulesBySelectedModules = () => {
    if (currentLocation) {
      return <ModuleSelectionRaw />;
    } else {
      return (
        <CustomStackFullWidth mt="15px">
          <HeroLocationForm />
        </CustomStackFullWidth>
      );
    }
  };
  return (
    <CustomStackFullWidth>
      <CustomStackFullWidth spacing={0.4}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={0.5}
          flexWrap="wrap"
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.main,
              fontSize: isXSmall ? "20px" : "54px",
              lineHeight: isXSmall ? "24px" : "58px",
              fontWeight: "bold",
            }}
          >
            <DollarSignHighlighter
              theme={theme}
              text={landingPageData?.header_title}
            />
          </Typography>
        </Stack>
        <Typography
          color={alpha(theme.palette.neutral[700], 0.8)}
          fontSize={isXSmall ? "16px" : "35px"}
          lineHeight={isXSmall ? "22px" : "58px"}
          fontWeight="400"
        >
          <DollarSignHighlighter
            theme={theme}
            text={landingPageData?.header_sub_title}
          />
        </Typography>
      </CustomStackFullWidth>
      <CustomStackFullWidth flexDirection="row" spacing={2} mt="14px" sx={{ position: "relative" }}>
        <Typography
          sx={{
            fontSize: { xs: "12px", md: "20px" },
            color: (theme) => alpha(theme.palette.neutral[500], 0.5),
          }}
          fontWeight="400"
        >
          <DollarSignHighlighter
            theme={theme}
            text={landingPageData?.header_tag_line}
          />
        </Typography>
        {(!getCurrentModuleType() && !isXSmall) && (<DownArrow />)}
      </CustomStackFullWidth>
      {!isXSmall && getSearchOrModulesBySelectedModules()}
    </CustomStackFullWidth>
  );
};

export default HeroTitleSection;
