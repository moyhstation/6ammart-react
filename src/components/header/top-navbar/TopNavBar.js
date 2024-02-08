import { Box, NoSsr, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { CustomStackForLoaction } from "../NavBar.style";
import ThemeSwitches from "./ThemeSwitches";
import AddressReselect from "./address-reselect/AddressReselect";
import CustomLanguage from "./language/CustomLanguage";

import { useSelector } from "react-redux";
import CallToAdmin from "../../CallToAdmin";
import CustomContainer from "../../container";
import LogoSide from "../../logo/LogoSide";
import DrawerMenu from "./drawer-menu/DrawerMenu";

const TopNavBar = () => {
  const { configData, countryCode, language } = useSelector(
    (state) => state.configData
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  let location = undefined;
  let zoneid = undefined;
  if (typeof window !== "undefined") {
    location = localStorage.getItem("location");
    zoneid = JSON.parse(localStorage.getItem("zoneid"));
  }
  const isSmall = useMediaQuery("(max-width:1180px)");

  return (
    <>
      <NoSsr>
        <Box
          sx={{
            width: "100%",
            background: (theme) => theme.palette.neutral[100],
            // animation: `fadeIn 0.3s ease-in-out`,
          }}
        >
          {!isSmall && (
            <CustomContainer>
              <Box
                sx={{
                  display: isSmall ? "none" : "block",
                  borderRadius: "0",
                }}
              >
                <Stack
                  pt=".4rem"
                  pb=".4rem"
                  width="100%"
                  height="30px"
                  direction="row"
                  justifyContent="space-between"
                >
                  <CustomStackForLoaction direction="row">
                    {location && (
                      <AddressReselect
                        setOpenDrawer={setOpenDrawer}
                        location={location}
                      />
                    )}
                  </CustomStackForLoaction>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="end"
                    alignItems="center"
                  >
                    <ThemeSwitches />
                    <CallToAdmin configData={configData} />
                    <CustomLanguage
                      countryCode={countryCode}
                      language={language}
                    />
                  </Stack>
                </Stack>
              </Box>
              {!location && (
                <Box
                  sx={{
                    display: {
                      xs: "flex",
                      md: "none",
                      alignItems: "center",
                      gap: "10px",
                      flexDirection: "row",
                      justifyContent: " space-between ",
                    },
                    flexGrow: 1,
                  }}
                >
                  {/* <Logo src={logoSm.src} /> */}
                  <Stack alignItems="center" justifyContent="center">
                    <LogoSide width="126px" configData={configData} />
                  </Stack>
                  <Stack>
                    <DrawerMenu
                      openDrawer={openDrawer}
                      setOpenDrawer={setOpenDrawer}
                    />
                  </Stack>
                </Box>
              )}
            </CustomContainer>
          )}
        </Box>
      </NoSsr>
    </>
  );
};

export default TopNavBar;
