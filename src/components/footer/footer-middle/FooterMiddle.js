import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Box, alpha } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import ractangle from "../../../../public/static/footer/Rectangle.svg";
import magnifying from "../../../../public/static/footer/magnifying.svg";
import phone from "../../../../public/static/footer/phone.svg";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import AppLinks from "./AppLinks";
import RouteLinks from "./RouteLinks";
import SocialLinks from "./SocialLinks";
import SomeInfo from "./SomeInfo";

const FooterMiddle = (props) => {
  const { configData, landingPageData } = props;
  const { t } = useTranslation();
  let zoneid = undefined;
  if (typeof window !== "undefined") {
    zoneid = localStorage.getItem("zoneid");
  }
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  let token;
  const businessLogo = `${configData?.base_urls?.business_logo_url}/${configData?.logo}`;

  return (
    <CustomStackFullWidth sx={{ py: { xs: "10px", sm: "3rem" } }}>
      <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="flex-start">
        <Grid item xs={12} sm={6} md={4}>
          <CustomStackFullWidth
            spacing={2}
            alignItems={{ xs: "center", sm: "flex-start" }}
            justifyContent="flex-start"
          >
            <Box
              sx={{
                img: {
                  transition: "all ease 0.5s",
                },
                "&:hover": {
                  img: {
                    transform: "scale(1.04)",
                  },
                },
              }}
            >
              <CustomImageContainer
                src={businessLogo}
                alt={`${configData?.business_name}`}
                width="auto"
                height="50px"
                objectfit="contain"
              />
            </Box>

            <>
              <SocialLinks
                configData={configData}
                landingPageData={landingPageData}
              />
              {(Number.parseInt(
                landingPageData?.download_user_app_links?.playstore_url_status
              ) === 1 ||
                Number.parseInt(
                  landingPageData?.download_user_app_links
                    ?.apple_store_url_status
                ) === 1) && (
                <AppLinks
                  configData={configData}
                  changeSingle
                  landingPageData={landingPageData}
                />
              )}
            </>
          </CustomStackFullWidth>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Box
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                borderRadius: "23px",
                inset: "0",
                background: theme.palette.background.default,
              },
            }}
          >
            <Box
              sx={{
                backgroundColor:
                  getCurrentModuleType() === ModuleTypes?.FOOD
                    ? alpha(theme.palette.moduleTheme.food, 0.051)
                    : alpha(theme.palette.primary.main, 0.051),
                borderRadius: "23px",
                padding: "30px",
                position: "relative",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3} align={isSmall && "center"}>
                  <RouteLinks token={token} configData={configData} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{
                    display: { xs: "flex", sm: "none", md: "flex" },
                    alignItems: "flex-start",
                  }}
                >
                  <SomeInfo
                    image={ractangle}
                    alt="rantangle"
                    title="Send us mails"
                    info={configData?.email}
                    t={t}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{
                    display: { xs: "flex", sm: "none", md: "flex" },
                    alignItems: "flex-start",
                  }}
                >
                  <SomeInfo
                    image={phone}
                    alt="Phone"
                    title="Contact us"
                    info={configData?.phone}
                    t={t}
                    phone
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{
                    display: { xs: "flex", sm: "none", md: "flex" },
                    alignItems: "flex-start",
                  }}
                >
                  <SomeInfo
                    image={magnifying}
                    alt="magnifying"
                    title="Find us here"
                    info={configData?.address}
                    t={t}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: { xs: "none", sm: "inherit", md: "none" } }}
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor:
                getCurrentModuleType() === ModuleTypes?.FOOD
                  ? alpha(theme.palette.moduleTheme.food, 0.05)
                  : alpha(theme.palette.primary.main, 0.05),
              borderRadius: "23px",
              padding: "30px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <SomeInfo
                  image={ractangle}
                  alt="rantangle"
                  title="Send us mails"
                  info={configData?.email}
                  t={t}
                />
              </Grid>
              <Grid item xs={4}>
                <SomeInfo
                  image={phone}
                  alt="Phone"
                  title="Contact us"
                  info={configData?.phone}
                  t={t}
                />
              </Grid>
              <Grid item xs={4}>
                <SomeInfo
                  image={magnifying}
                  alt="magnifying"
                  title="Find us here"
                  info={configData?.address}
                  t={t}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

FooterMiddle.propTypes = {};

export default FooterMiddle;
