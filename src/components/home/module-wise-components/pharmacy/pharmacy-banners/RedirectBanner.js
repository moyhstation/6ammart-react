import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { CustomBoxFullWidth } from "../../../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../../../CustomImageContainer";
import redirectBannerPharmacy from "../../../assets/redirectBannerPharmacy.png";
const ImageWrapper = styled(CustomBoxFullWidth)(({ theme }) => ({
  height: "180px",
  position: "relative",
  marginTop: "30px",
  borderRadius: "10px",
}));
const RedirectBanner = (props) => {
  return (
    <ImageWrapper>
      <CustomImageContainer
        src={redirectBannerPharmacy.src}
        width="100%"
        height="100%"
        borderRadius="10px"
        objectfit="cover"
      />
    </ImageWrapper>
  );
};

RedirectBanner.propTypes = {};

export default RedirectBanner;
