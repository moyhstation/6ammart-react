import { useTheme } from "@emotion/react";
import StarIcon from "@mui/icons-material/Star";
import { Typography, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { getCurrentModuleType } from "../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../helper-functions/moduleTypes";
import { IsSmallScreen } from "../utils/CommonValues";
import { useSelector } from "react-redux";

const CustomRatingBox = (props) => {
  const { rating } = props;
  const { configData } = useSelector((state) => state.configData);
  const getRating = () => {
    return rating.toFixed(configData?.digit_after_decimal_point);
  };
  const theme = useTheme();
  // isXsmall = useMediaQuery(theme.breakpoints.down("sm"))
  const getModuleWise = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.GROCERY:
        return {
          background: "primary.main",
          color: "whiteContainer.main",
          borderRadius: "2px",
        };
      case ModuleTypes.PHARMACY:
        return {
          background: "primary.lite",
          color: "primary.main",
          borderRadius: "14px",
        };
      case ModuleTypes.ECOMMERCE:
        return {
          background: "primary.lite",
          color: "primary.main",
          borderRadius: "2px",
        };
      case ModuleTypes.FOOD:
        return {
          background: theme.palette.moduleTheme.food,
          color: "whiteContainer.main",
          borderRadius: "2px",
        };
    }
  };
  return (
    <Stack
      width="52px"
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={0.6}
      sx={{
        color: getModuleWise()?.color,
        backgroundColor: getModuleWise()?.background,
        borderRadius: getModuleWise()?.borderRadius,
        // paddingInline: "4px",
      }}
    >
      <StarIcon
        sx={{
          paddingBottom: "1px",
          fontSize: IsSmallScreen() ? "12px" : "14px",
          display: "inline-flex",
          height: "unset",
        }}
      />
      <Typography fontSize={{ xs: "10px", md: "13px" }}>
        {getRating()}
      </Typography>
    </Stack>
  );
};

CustomRatingBox.propTypes = {};

export default CustomRatingBox;
