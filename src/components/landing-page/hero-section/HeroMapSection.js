import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomImageContainer from "../../CustomImageContainer";
import marker from "../../../../public/landingpage/marker.svg";
import Subtitle1 from "../../typographies/Subtitle1";
import HeroLocationForm from "./HeroLocationForm";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";

const HeroMapSection = ({ configData }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return;
};

export default HeroMapSection;
