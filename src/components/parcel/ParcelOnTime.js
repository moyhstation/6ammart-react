import React, { useEffect } from "react";
import { SliderCustom } from "../../styled-components/CustomStyles.style";
import { Box, Stack, styled } from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import useGetOtherBanners from "../../api-manage/hooks/react-query/useGetOtherBanners";
import Slider from "react-slick";

const BgBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  overflow: "hidden",
}));

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};
const ParcelOnTime = () => {
  const { data, refetch, isLoading } = useGetOtherBanners();
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      {data && (
        <BgBox>
          <SliderCustom>
            <Slider {...settings}>
              {data?.banners?.map((item, index) => {
                return (
                  <Stack key={index}>
                    <CustomImageContainer
                      src={`${data?.promotional_banner_url}/${item.value}`}
                      height="370px"
                      mdHeight="353px"
                      smHeight="70px"
                      objectfit
                    />
                  </Stack>
                );
              })}
            </Slider>
          </SliderCustom>
        </BgBox>
      )}
    </>
  );
};

export default ParcelOnTime;
