import { Button, Grid, Skeleton, styled, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
  SliderCustom,
} from "../../../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../../../CustomImageContainer";
import useGetBasicCampaigns from "../../../../../api-manage/hooks/react-query/useGetBasicCampaigns";
import Slider from "react-slick";
import { BannersWrapper } from "../../../banners";
import { useSelector } from "react-redux";
import { getModuleId } from "../../../../../helper-functions/getModuleId";
import { useRouter } from "next/router";

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Quicksand",
  fontSize: "16px",
  fontWeight: "700",
  lineHeight: "26px",
}));

const BgContainer = styled(CustomStackFullWidth)(({ theme, pink }) => ({
  background:
    pink === "true"
      ? "linear-gradient(90deg, #FDD8E9 0%, #FFEFF7 102.8%)"
      : "linear-gradient(89.86deg, #B7F9FD -11.92%, #DCF7FF 101.4%)",
  padding: "1.875rem",
  borderRadius: "10px",
}));
const ImageContainer = styled(CustomBoxFullWidth)(({ theme, pink }) => ({
  position: "relative",
  height: "210px",
  [theme.breakpoints.down("md")]: {
    height: "120px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "120px",
  },
}));

const DataCard = ({ title, image, buttonText, pink }) => {
  const { t } = useTranslation();
  return (
    <BgContainer
      direction="row"
      alignItems="center"
      justifyContent="center"
      pink={pink ? "true" : "false"}
    >
      <Grid container alignItems="center" justifyContent="center" spacing={2}>
        <Grid item xs={7}>
          <Stack spacing={3}>
            <CustomTypography>{t(title)}</CustomTypography>
            <Button
              sx={{
                maxWidth: "200px",
                fontSize: { xs: "11px", md: "inherit" },
              }}
              variant="contained"
            >
              {t(buttonText)}
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={5} sx={{ position: "relative" }}>
          <ImageContainer>
            <CustomImageContainer
              src={image.src}
              alt={t("Background")}
              height="100%"
              width="100%"
              objectFit="cover"
            />
          </ImageContainer>
        </Grid>
      </Grid>
    </BgContainer>
  );
};
const PharmacyStaticBanners = (props) => {
  const router = useRouter();
  const { configData } = useSelector((state) => state.configData);
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.03,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { data, refetch, isLoading } = useGetBasicCampaigns();
  useEffect(() => {
    refetch();
  }, []);
  const handleBannerClick = (banner) => {
    router.push(
      {
        pathname: "/campaigns/[id]",
        query: { id: `${banner?.id}`, module_id: `${getModuleId()}` },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <CustomStackFullWidth
      sx={{
        mt: "30px",
        "& .slick-list": {
          marginRight: { xs: "-10px", sm: "-20px" },
        },
        "& .slick-slide": {
          paddingRight: { xs: "10px", sm: "20px" },
        },
      }}
    >
      {isLoading ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Slider {...settings}>
              {[...Array(2)].map((index) => {
                return (
                  <BannersWrapper key={index}>
                    <Skeleton
                      variant="rectangle"
                      // width="100%"
                      height="100%"
                    />
                  </BannersWrapper>
                );
              })}
            </Slider>
          </Grid>
        </Grid>
      ) : (
        <SliderCustom>
          <Slider {...settings}>
            {data?.length > 0 &&
              data?.map((item, index) => {
                return (
                  <BannersWrapper
                    key={index}
                    onClick={() => handleBannerClick(item)}
                  >
                    <CustomImageContainer
                      src={`${configData?.base_urls?.campaign_image_url}/${item?.image}`}
                      alt={item?.title}
                      height="100%"
                      width="100%"
                      objectfit="cover"
                      borderRadius="10px"
                    />
                  </BannersWrapper>
                );
              })}
          </Slider>
        </SliderCustom>
      )}
    </CustomStackFullWidth>
  );
};

PharmacyStaticBanners.propTypes = {};

export default PharmacyStaticBanners;
