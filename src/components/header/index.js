import React from "react";
import { AppBarStyle } from "./NavBar.style";

import {
  Card,
  NoSsr,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import SecondNavBar from "./second-navbar/SecondNavbar";
import TopNavBar from "./top-navbar/TopNavBar";

const HeaderComponent = () => {
  const router = useRouter();
  const { configData } = useSelector((state) => state.configData);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const scrolling = useScrollTrigger();
  let token = undefined;
  let location = undefined;
  if (typeof window !== "undefined") {
    location = localStorage.getItem("location");
    token = localStorage.getItem("token");
  }

  return (
    <AppBarStyle
      scrolling={location || token ? scrolling : false}
      isSmall={isSmall}
    >
      <Box>
        <NoSsr>
          {(location || token) && (
            <Card
              sx={{
                boxShadow: "none",
              }}
            >
              <TopNavBar configData={configData} />
            </Card>
          )}
          <SecondNavBar configData={configData} />
        </NoSsr>
      </Box>
    </AppBarStyle>
  );
};

export default HeaderComponent;
