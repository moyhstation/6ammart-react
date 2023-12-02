import React, { useEffect, useState } from "react";

import { Grid, Skeleton, styled } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useGetBanners from "../../../api-manage/hooks/react-query/useGetBanners";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { getModuleId } from "../../../helper-functions/getModuleId";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";
import { setBanners } from "../../../redux/slices/storedData";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import FoodDetailModal from "../../food-details/foodDetail-modal/FoodDetailModal";

export const BannersWrapper = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  borderRadius: "10px",
  width: "100%",
  height: "230px",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    img: {
      transform: "scale(1.1)",
    },
  },

  [theme.breakpoints.down("md")]: {
    height: "200px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "150px",
  },
}));
const Banners = (props) => {
  const router = useRouter();
  const { selectedModule } = useSelector((state) => state.utilsData);
  const { banners } = useSelector((state) => state.storedData);
  const { data, refetch: refetchBannerData, isFetching } = useGetBanners();
  const [bannersData, setBannersData] = useState([]);
  const [foodBanner, setFoodBanner] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { configData } = useSelector((state) => state.configData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (banners.banners.length === 0) {
      refetchBannerData();
    }
  }, [banners]);
  useEffect(() => {
    if (data) {
      dispatch(setBanners(data));
    }
  }, [data]);
  useEffect(() => {
    if (banners) {
      handleBannersData();
    }
  }, [banners]);

  const handleBannersData = () => {
    let mergedBannerData = [];

    if (getCurrentModuleType() === "food") {
      if (banners?.banners?.length > 0) {
        banners?.banners?.forEach((item) => mergedBannerData.push(item));
      }
      if (banners?.campaigns?.length > 0) {
        banners?.campaigns?.forEach((item) =>
          mergedBannerData.push({ ...item, isCampaign: true })
        );
      }
      setBannersData(mergedBannerData);
    } else {
      if (banners?.banners?.length > 0) {
        banners?.banners?.forEach((item) => mergedBannerData.push({ ...item }));
      }
      setBannersData(mergedBannerData);
    }
  };
  const handleBannerClick = (banner) => {
    if (banner?.isCampaign) {
      router.push(
        {
          pathname: "/campaigns/[id]",
          query: { id: `${banner?.id}`, module_id: `${getModuleId()}` },
        },
        undefined,
        { shallow: true }
      );
    } else {
      if (banner?.type === "store_wise") {
        router.push(
          {
            pathname: "/store/[id]",
            query: {
              id: `${
                banner?.store?.slug ? banner?.store?.slug : banner?.store?.id
              }`,
              module_id: `${getModuleId()}`,
            },
          },
          undefined,
          { shallow: true }
        );
      } else {
        if (banner?.type === "item_wise") {
          if (selectedModule?.module_type !== "ecommerce") {
            setFoodBanner(banner?.item);
            setOpenModal(true);
          } else {
            router.push(
              {
                pathname: "/product/[id]",
                query: {
                  id: `${
                    banner?.item?.slug ? banner?.item?.slug : banner?.item?.id
                  }`,
                  module_id: `${getModuleId()}`,
                },
              },
              undefined,
              { shallow: true }
            );
          }
        }
      }
    }
  };
  const handleModalClose = () => {
    setOpenModal(false);
    //setBannerData(null);
  };

  const getModuleWiseBanners = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.GROCERY:
        if (bannersData.length > 1) {
          return 2;
        } else {
          return 1;
        }
      case ModuleTypes.PHARMACY:
        if (bannersData.length === 1) {
          return 1;
        } else if (bannersData.length === 2) {
          return 2;
        } else {
          return 3;
        }
      case ModuleTypes.ECOMMERCE:
        if (bannersData.length > 1) {
          return 2;
        } else {
          return 1;
        }
      case ModuleTypes.FOOD:
        if (bannersData.length === 1) {
          return 1;
        } else if (bannersData.length === 2) {
          return 2;
        } else {
          return 3;
        }
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: getModuleWiseBanners(),
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
  return (
    <>
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
        {isFetching ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Slider {...settings}>
                {[...Array(getModuleWiseBanners())].map((index) => {
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
          <Slider {...settings}>
            {bannersData.length > 0 &&
              bannersData?.map((item, index) => {
                return (
                  <BannersWrapper
                    key={index}
                    onClick={() => handleBannerClick(item)}
                  >
                    <CustomImageContainer
                      src={`${
                        item?.isCampaign
                          ? configData?.base_urls?.campaign_image_url
                          : configData?.base_urls?.banner_image_url
                      }/${item?.image}`}
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
        )}
      </CustomStackFullWidth>
      {openModal && foodBanner && (
        <FoodDetailModal
          product={foodBanner}
          image={`${configData?.base_urls?.item_image_url}/${foodBanner?.image}`}
          open={openModal}
          handleModalClose={handleModalClose}
          setOpen={setOpenModal}
        />
      )}
    </>
  );
};

Banners.propTypes = {};

export default Banners;
