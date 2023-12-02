import React from "react";
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

const HeroTitleSection = ({ configData, landingPageData, handleOrderNow }) => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const currentLanguage = getLanguage();
  const getSearchOrModulesBySelectedModules = () => {
    if (getCurrentModuleType()) {
      return <ModuleSelectionRaw />;
    } else {
      return (
        <CustomStackFullWidth mt="45px">
          <HeroLocationForm />
        </CustomStackFullWidth>
      );
    }
  };
  return (
    <CustomStackFullWidth>
      <CustomStackFullWidth spacing={0.5}>
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
              fontSize: isXSmall ? "19px" : "2.30rem",
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
          variant={isXSmall ? "body1" : "h4"}
          fontWeight="400"
        >
          <DollarSignHighlighter
            theme={theme}
            text={landingPageData?.header_sub_title}
          />
        </Typography>
      </CustomStackFullWidth>
      <CustomStackFullWidth spacing={2} mt="14px" sx={{ position: "relative" }}>
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
        {!getCurrentModuleType() && (
          <Box
            sx={{
              display: { xs: "none", md: "inherit" },
              position: "absolute",
              height: "70px",
              width: "80px",
              top: 20,
              right: -65,
            }}
          >
            <CustomImageContainer
              src={down_arrow.src}
              alt={t("Background")}
              height="100%"
              width="100%"
              borderRadius="20px"
              objectFit="cover"
            />
          </Box>
        )}
      </CustomStackFullWidth>
      {!isXSmall && getSearchOrModulesBySelectedModules()}
    </CustomStackFullWidth>
  );
};

export default HeroTitleSection;
