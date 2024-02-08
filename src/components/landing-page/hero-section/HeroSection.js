import {
  Box,
  Grid,
  NoSsr,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import CustomContainer from "../../container";
import iconicBg from "../assets/hero_background.png";
import HeroLocationForm from "./HeroLocationForm";
import HeroTitleSection from "./HeroTitleSection";
import MobileFrame from "../assets/MobileFrame";
import { Stack } from "@mui/system";

const DynamicModuleSelection = dynamic(() =>
  import("./module-selection/ModuleSelectionRaw")
);
const HeroSection = ({ configData, landingPageData, handleOrderNow }) => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentLocation(window.localStorage.getItem("location"));
    }
  }, []);

  const calculateTopMagin = () => {
    if (currentLocation) {
      return {
        xs: "4rem",
        sm: "5rem",
        md: "7rem",
      };
    } else {
      return {
        xs: "4rem",
        sm: "5rem",
        md: "5rem",
      };
    }
  }

  return (
    <CustomContainer>
      <CustomBoxFullWidth
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
          marginTop: calculateTopMagin(),
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
          ".shape img": {
            transition: "all ease-in 1s",
          },
        }}
      >
        <Box sx={{ position: "absolute" }} className="shape">
          <CustomImageContainer
            src={iconicBg.src}
            alt={t("Background")}
            height="100%"
            width="100%"
            borderRadius="20px"
            objectFit="cover"
          />
        </Box>
        <Grid container>
          <Grid item xs={8} md={7} sx={{ padding: { xs: "1rem", sm: "2rem", md: "3rem" } }}>
            <NoSsr>
              <HeroTitleSection
                configData={configData}
                landingPageData={landingPageData}
                handleOrderNow={handleOrderNow}
              />
            </NoSsr>
          </Grid>
          <Grid item xs={4} md={5} align="right">
            <CustomStackFullWidth height="100%"
              alignItems="flex-start"
              justifyContent="flex-end" paddingTop={{ xs: "2rem", md: "3rem" }} >
              <Box
                sx={{
                  height: { xs: "125px", sm: "350px", md: "420px" },
                  width: { xs: "78px", sm: "210px", md: "240px" },
                  borderRadius: isXSmall ? "5px 5px 0 0" : "16px 16px 0 0",
                  position: "relative",
                  zIndex: "99",
                  backgroundImage: `url(${landingPageData?.base_urls?.header_banner_url}/${landingPageData?.header_banner})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  marginInline: "auto",
                  padding: "0"
                }}
              >{landingPageData?.header_banner &&
                <Stack margin={isXSmall ? "-5px 0 0 -3px" : "-5px 0 0 -3px"}>
                  <MobileFrame
                    width={isXSmall ? "85" : (isSmall ? "215" : "246")}
                    height={isXSmall ? "148" : (isSmall ? "370" : "427")}
                  />
                </Stack>
                }
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  width: { xs: "50px", sm: "120px", md: "210px" },
                  height: { xs: "50px", sm: "110px", md: "190px" },
                  bottom: isXSmall ? 5 : 16,
                  right: { xs: 7, sm: 10, md: 30 },
                  zIndex: 100,
                }}
              >
                <CustomImageContainer
                  src={`${landingPageData?.base_urls?.header_icon_url}/${landingPageData?.header_icon}`}
                  alt={t("icon")}
                  height="100%"
                  width="100%"
                  objectFit="cover"
                />
              </Box>
            </CustomStackFullWidth>
          </Grid>
        </Grid>
      </CustomBoxFullWidth>
      {isXSmall && (
        <>
          {currentLocation ? (
            <DynamicModuleSelection isSmall />
          ) : (
            <CustomStackFullWidth mt="10px">
              <HeroLocationForm />
            </CustomStackFullWidth>
          )}
        </>
      )}
    </CustomContainer>
  );
};

export default HeroSection;
