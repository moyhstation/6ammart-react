import React, { useEffect, useRef, useState } from "react";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import H2 from "../../typographies/H2";

import { Skeleton, styled } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import useGetNewArrivalStores from "../../../api-manage/hooks/react-query/store/useGetNewArrivalStores";
import { useGetPopularStoreWithoutInfiniteScroll } from "../../../api-manage/hooks/react-query/store/useGetPopularStore";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { getStoresOrRestaurants } from "../../../helper-functions/getStoresOrRestaurants";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";
import { setNewArrivalStores } from "../../../redux/slices/storedData";
import CustomImageContainer from "../../CustomImageContainer";
import NearbyStoreCard from "../../cards/NearbyStoreCard";
import ClosedNow from "../../closed-now";
import { HomeComponentsWrapper } from "../HomePageComponents";
import Menus from "../best-reviewed-items/Menus";
import { foodNewArrivalsettings, settings } from "./sliderSettings";
import SpecialOfferCardShimmer from "../../Shimmer/SpecialOfferCardSimmer";

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100px",
  width: "100px",
  borderRadius: "50%",
  boxShadow: "0px 4px 10px 0px rgba(0, 54, 85, 0.10)",
  "&:hover": {
    boxShadow: "5px 0px 20px rgba(0, 54, 85, 0.15)",
    img: {
      transform: "scale(1.1)rotate(5deg)",
    },
  },
  [theme.breakpoints.down("md")]: {
    height: "80px",
    width: "80px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "57px",
    width: "57px",
  },
}));

const SliderWrapper = styled(CustomBoxFullWidth)(({ theme }) => ({
  "& .slick-slide": {
    padding: "0 10px", // Set the desired padding value
  },
  [theme.breakpoints.down("sm")]: {
    "& .slick-slide": {
      padding: "0px", // Set the desired padding value
    },
  },
}));

const menus = ["Popular", "Top Rated", "New"];
const NewArrivalStores = () => {
  const { data, refetch, isFetching, isLoading  } = useGetNewArrivalStores({
    type: "all",
  });
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const { configData } = useSelector((state) => state.configData);
  const store_image_url = `${configData?.base_urls?.store_image_url}`;
  const moduleId = JSON.parse(window.localStorage.getItem("module"))?.id;
  const newA = t("New Arrival");
  const title = `${newA} ${getStoresOrRestaurants()}`;
  const queryKey = "navbar-stores";
  const slider = useRef(null);
  const { newArrivalStores } = useSelector((state) => state.storedData);
  const [storeData, setStoreData] = useState([]);
  const {
    data: popularData,
    refetch: popularRefetch,
    isLoading: popularIsLoading,
  } = useGetPopularStoreWithoutInfiniteScroll({ queryKey, type: "all" });
  const dispatch = useDispatch();
  useEffect(() => {
    if (newArrivalStores.length === 0) {
      refetch();
    }
  }, [newArrivalStores]);

  useEffect(() => {
    if (data?.stores?.length > 0) {
      dispatch(setNewArrivalStores(data?.stores));
    }
  }, [data]);
  useEffect(() => {
    popularRefetch();
  }, []);
  useEffect(() => {
    if (popularData?.stores?.length > 0) {
      setStoreData(popularData?.stores);
    }
  }, [popularData]);
  const handleMenuClick = (index) => {
    setSelectedMenuIndex(index);

    if (index === 0) {
      //popular wise
      setStoreData(popularData?.stores);
    } else if (index === 1) {
      //top-rated wise
      const newStores = popularData?.stores.sort(
        (a, b) => b.avg_rating - a.avg_rating
      );
      setStoreData(newStores);
    } else {
      //new wise
      const newStores = popularData?.stores.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setStoreData(newStores);
    }
  };

  const sliderItems = (
    <SliderWrapper
      sx={{
        "& .slick-slide": {
          paddingRight: { xs: "10px", sm: "20px" },
          paddingY: "10px",
        },
      }}
    >
        {isLoading ? 
                <Slider {...settings}>
                  {[...Array(6)].map((item, index) => {
                    return <SpecialOfferCardShimmer key={index} width={290}/>;
                  })}
                </Slider>
               : 
        <Slider {...settings} ref={slider}>
          {storeData?.map((item, index) => {
            return (
              <NearbyStoreCard key={index} configData={configData} item={item} />
            );
          })}
        </Slider>
      }
    </SliderWrapper>
  );

  const getLayout = () => {
    if (getCurrentModuleType() === ModuleTypes.FOOD) {
      return (
        <>
          {newArrivalStores && newArrivalStores.length > 0 && (
            <>
              <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                {isLoading ? (
                  <Skeleton variant="text" width="110px" />
                ) : (
                  <H2 text={t("New Arrival Restaurants")} />
                )}
              </CustomStackFullWidth>
              <SliderWrapper
                sx={{
                  "& .slick-slide": {
                    paddingRight: { xs: "10px", sm: "20px" },
                    paddingY: "10px",
                  },
                }}
              >
                <Slider {...foodNewArrivalsettings}>
                  {newArrivalStores?.map((item, index) => {
                    return (
                      <Box key={index}>
                        <Link
                          href={{
                            pathname: `/store/[id]`,
                            query: {
                              id: `${item?.id}`,
                              module_id: `${moduleId}`,
                              module_type: getCurrentModuleType(),
                              store_zone_id: `${item?.zone_id}`,
                            },
                          }}
                        >
                          <ImageWrapper>
                            <Box
                              sx={{
                                borderRadius: "50%",
                                overflow: "hidden",
                              }}
                            >
                              <CustomImageContainer
                                src={`${store_image_url}/${item?.logo}`}
                                alt={item?.title}
                                height="100%"
                                width="100%"
                                objectFit="cover"
                                borderRadius="50%"
                              />
                              <ClosedNow
                                active={item?.active}
                                open={item?.open}
                                borderRadius="50%"
                              />
                            </Box>
                          </ImageWrapper>
                        </Link>
                      </Box>
                    );
                  })}
                </Slider>
              </SliderWrapper>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          {popularData && popularData?.stores?.length > 0 && (
            <>
              <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                {isLoading ? (
                  <Skeleton variant="text" width="110px" />
                ) : (
                  <H2 text={t("Best Store Nearby")} />
                )}
                <Menus
                  selectedMenuIndex={selectedMenuIndex}
                  setSelectedMenuIndex={handleMenuClick}
                  menus={menus}
                />
              </CustomStackFullWidth>
              {selectedMenuIndex === 0 && <>{sliderItems}</>}
              {selectedMenuIndex === 1 && <>{sliderItems}</>}
              {selectedMenuIndex === 2 && <>{sliderItems}</>}
            </>
          )}
        </>
      );
    }
  };

  return (
    <HomeComponentsWrapper sx={{ paddingTop: "5px", gap: "1rem" }}>
      {getLayout()}

      {/* {true && (
        <ImageWrapper>
          <Skeleton variant="circular" height="100%" width="100%" />
        </ImageWrapper>
      )} */}
    </HomeComponentsWrapper>
  );
};

export default NewArrivalStores;
