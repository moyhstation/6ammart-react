import React from "react";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { alpha, useMediaQuery, useTheme } from "@mui/material";
import { CustomBoxFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import { Box } from "@mui/system";
import banner from "../assets/banner.png";
import pharmacy from "../assets/par.png";
import rcommerceSearchBg from "../assets/ecommerce_top_bg.png";
import foodBanner from "../assets/food.png";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";
import parcelImage from "../assets/parcelBg.png";

const TopBanner = () => {
  const moduleType = getCurrentModuleType();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const getBGColor = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.GROCERY:
        return alpha(theme.palette.primary.main, 0.2);
      case ModuleTypes.PHARMACY:
        return alpha(theme.palette.primary.main, 0.2);
      case ModuleTypes.ECOMMERCE:
        return alpha(theme.palette.primary.main, 0.2);
      case ModuleTypes.FOOD:
        return alpha(theme.palette.primary.main, 0.2);
      case ModuleTypes.PARCEL:
        return alpha(theme.palette.primary.main, 0.2);
      default:
        return "inherit";
    }
  };
  const getBGImage = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.GROCERY:
        return banner.src;
      case ModuleTypes.PHARMACY:
        return pharmacy.src;
      case ModuleTypes.ECOMMERCE:
        return rcommerceSearchBg.src;
      case ModuleTypes.FOOD:
        return foodBanner.src;
      case ModuleTypes.PARCEL:
        return parcelImage.src;

      // case "food":
      //   return theme.palette.warning.lite;
      default:
        return "inherit";
    }
  };

  const image = banner;
  // src={`${imageBaseUrl}/${item?.image}`}
  return (
    <CustomBoxFullWidth
      sx={{
        height: { xs: "160px", sm: "270px" },
        backgroundColor: getBGColor(),
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", height: "100%", width: "100%" }}>
        <CustomImageContainer
          src={getBGImage()}
          alt="banner"
          height="100%"
          width="100%"
          obejctfit="cover"
        />
      </Box>
    </CustomBoxFullWidth>
  );
};

export default TopBanner;
