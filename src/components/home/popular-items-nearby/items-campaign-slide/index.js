import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  CustomBoxFullWidth,
  CustomSpan,
  CustomStackFullWidth,
  SliderCustom,
} from "../../../../styled-components/CustomStyles.style";
import { Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import CustomImageContainer from "../../../CustomImageContainer";
import bg from "./assets/bg.png";
import Slide from "./Slide";
import Slider from "react-slick";
import { settings } from "./Settings";
import CustomSlider from "../../../search/CustomSlider";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import CustomCountdown from "../../../countdown";
import CustomLinearProgressbar from "../../../linear-progressbar";
import useGetFlashSales from "../../../../api-manage/hooks/react-query/useGetFlashSales";
import { useRouter } from "next/router";

const CustomCounterBox = styled(CustomStackFullWidth)(({ theme }) => ({
  transform: "translateY(-115px)",
  height: "20px",
}))

const StyledCustomSlider = styled(SliderCustom)(({ theme, isSmall }) => ({
  "& .slick-dots": {
    top:"500px",

    "& li": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      width: "8px",
      height: "3px",
      "& button::before": {
        color: "transparent",
      },
    },
    "& li.slick-active button::before": {
      backgroundColor: theme.palette.primary.main,
      width: "8px",
      height: "3px",
      borderRadius: "100px",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& .slick-dots": {
      bottom: 0,
      top: "480px",
    },
  },
}));
const ItemsCampaign = ({ flashSales }) => {

  const theme = useTheme();
  const router = useRouter()
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const handleFlashSales = () => {
    router.push({
      pathname: '/flash-sales',
      query: {id: flashSales?.id}
    })
  }

  return (
    <CustomStackFullWidth
      height="100%"
      alignItems="center"
      justifyContent="flex-start"
      onClick={handleFlashSales}
      sx={{
        backgroundColor: (theme) => alpha(theme.palette.neutral[400], 0.1),
        padding: "4px",
        // margin: { xs: "none", md: "10px 15px" },
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      <StyledCustomSlider isSmall={isSmall}>
        <Slider {...settings}>
          {flashSales?.active_products?.slice(0,15).map((item, index) => {
            return (
              <Box key={index}>
                <Slide item={item} />
              </Box>
            );
          })}
        </Slider>
      </StyledCustomSlider>
      {flashSales?.active_products?.length > 0 &&
        <CustomCounterBox
          alignItems="center"
          justifyContent="center"
        >
          <CustomCountdown
            startDate={flashSales?.start_date}
            endDate={flashSales?.end_date}
          />
        </CustomCounterBox>}
    </CustomStackFullWidth>
  );
};

ItemsCampaign.propTypes = {};

export default ItemsCampaign;
