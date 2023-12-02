import React, { useEffect, useState } from "react";
import { AppBarStyle } from "./NavBar.style";

import {Box, Card, useMediaQuery, useScrollTrigger, useTheme} from "@mui/material";
import { useRouter } from "next/router";
import TopNavBar from "../header/top-navbar/TopNavBar";
import SecondNavBar from "../header/second-navbar/SecondNavbar";
import { debounce } from "lodash";
const HeaderComponent = ({ configData }) => {
  const router = useRouter();
  const theme=useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const scrolling = useScrollTrigger()

  return (
      <AppBarStyle scrolling={scrolling}
                   isSmall={isSmall}
      >
        {router.pathname === "/" ? (
            <Box
            ><TopNavBar configData={configData} />
              <SecondNavBar configData={configData} />
            </Box>
        ) : (
            <>
              <Card
                  sx={{
                    boxShadow: "none",
                  }}
              >
                <TopNavBar configData={configData} />
              </Card>
              <SecondNavBar configData={configData} />
            </>
        )}
      </AppBarStyle>
  );
};

export default HeaderComponent;