import React, { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

export const IsSmallScreen = () => {
  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmall = isSmallSize ? true : false;

  return isSmall;
};
