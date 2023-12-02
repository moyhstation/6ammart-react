import { Grid, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useGetMostReviewed from "../../../api-manage/hooks/react-query/useGetMostReviewed";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";
import { setBestReviewedItems } from "../../../redux/slices/storedData";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
  SliderCustom,
} from "../../../styled-components/CustomStyles.style";
import ProductCard from "../../cards/ProductCard";
import H2 from "../../typographies/H2";
import { HomeComponentsWrapper } from "../HomePageComponents";
import Menus from "./Menus";
import { NextFood, PrevFood } from "./SliderSettings";
import { Stack } from "@mui/system";
import CustomImageContainer from "../../CustomImageContainer";

const BestReviewedItems = (props) => {
  const { title, info, bannerIsLoading } = props;
  const url = `${info?.promotional_banner_url}/${info?.best_reviewed_section_banner}`;
  const [menu, setMenu] = useState([]);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [reRender, setReRender] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isMedium = useMediaQuery(theme.breakpoints.up("sm"));
  const SliderRef = useRef(null);
  const {
    data,
    refetch,
    isRefetching: itemIsLoading,
  } = useGetMostReviewed({ type: "all" });
  const { bestReviewedItems } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();

  const getCategoryIds = () => {
    const categoryIds = [];
    if (bestReviewedItems && bestReviewedItems.products) {
      bestReviewedItems.products.forEach((product) => {
        if (product?.category_ids) {
          product?.category_ids.forEach((categoryId) => {
            categoryIds.push(categoryId);
          });
        }
      });
    }

    return categoryIds;
  };
  const uniqueCategories = [
    ...new Set(getCategoryIds().map((item) => JSON.stringify(item))),
  ].map(JSON.parse);
  useEffect(() => {
    if (bestReviewedItems.products.length === 0) {
      refetch();
    }
  }, [bestReviewedItems]);
  useEffect(() => {
    if (data) {
      dispatch(setBestReviewedItems(data));
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      setMenu(["All", ...uniqueCategories?.map((item) => item.name)]);
      setFilteredData(bestReviewedItems.products);
    }
  }, [bestReviewedItems.products]);

  useEffect(() => {
    if (selectedMenuIndex === 0) {
      setFilteredData(bestReviewedItems.products);
      setReRender(true);
    } else {
      const categoryWiseData = bestReviewedItems?.products?.filter((item) => {
        return item?.category_ids?.some((categoryId) => {
          return uniqueCategories[selectedMenuIndex - 1]?.id === categoryId?.id;
        });
      });

      setFilteredData(categoryWiseData);
      setReRender(true);
    }
  }, [selectedMenuIndex]);

  const slides = () =>
    filteredData?.map((product) => (
      <ProductCard
        key={product?.id}
        item={product}
        cardheight="365px"
        cardFor="vertical"
        cardType="vertical-type"
        // cardFor="popular items"
      />
    ));

  const bestReviewedSliderSettings = {
    //centerMode: true,
    initialSlide: 0,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: info?.best_reviewed_section_banner ? 4 : 5,
    slidesToScroll: 2,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1.7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: info?.best_reviewed_section_banner ? 1.6 : 2.1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <PrevFood displayNoneOnMobile />,
    nextArrow: <NextFood displayNoneOnMobile />,
  };

  const foodBestReviewedSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesPerRow: 1,
    rows: 2,
    slidesToShow: info?.best_reviewed_section_banner ? 2.1 : 2.7,
    slidesToScroll: 1,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1.1,
          slidesPerRow: 1,
          rows: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.1,
          slidesPerRow: 1,
          rows: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1.34,
          slidesPerRow: 1,
          rows: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1.45,
          slidesPerRow: 1,
          rows: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1.15,
          slidesPerRow: 1,
          rows: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: info?.best_reviewed_section_banner ? 1.6 : 2.1,
          slidesPerRow: 1,
          rows: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2.3,
          slidesPerRow: 1,
          rows: 2,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <PrevFood displayNoneOnMobile />,
    nextArrow: <NextFood displayNoneOnMobile />,
  };

  return (
    <>
      {getCurrentModuleType() === ModuleTypes.FOOD ? (
        <HomeComponentsWrapper>
          {bestReviewedItems && bestReviewedItems?.products?.length > 0 && (
            <>
              <CustomStackFullWidth
                alignItems={isSmall ? "center" : "flex-start"}
                justyfyContent="center"
                mt="30px"
                spacing={1}
              >
                <H2 text={title} textAlign="left" />
                <CustomBoxFullWidth>
                  <Grid
                    container
                    alignItems="center"
                    spacing={{ xs: 1.3, md: 1.5, lg: 1.5 }}
                  >
                    {info?.best_reviewed_section_banner && (
                      <Grid item xs={0} sm={3} md={2.5} lg={2.5}>
                        <CustomBoxFullWidth
                          sx={{
                            position: "relative",
                            height: {
                              xs: "200px",
                              sm: "300px",
                              md: "330px",
                            },
                            margin: "10px",
                            display: { xs: "none", md: "inherit" },
                          }}
                        >
                          {bannerIsLoading ? (
                            <Skeleton
                              variant="rectangular"
                              height="100%"
                              width="100%"
                            />
                          ) : (
                            <CustomImageContainer
                              src={url}
                              height="100%"
                              width="100%"
                              borderRadius=".7rem"
                              objectfit="contain"
                            />
                          )}
                        </CustomBoxFullWidth>
                      </Grid>
                    )}
                    <Grid
                      item
                      xs={12}
                      sm={info?.best_reviewed_section_banner ? 9 : 12}
                      md={info?.best_reviewed_section_banner ? 9.5 : 12}
                    >
                      <SliderCustom nopadding="true">
                        <Slider {...foodBestReviewedSliderSettings}>
                          {bestReviewedItems?.products?.map((item, index) => {
                            return (
                              <ProductCard
                                key={index}
                                item={item}
                                cardheight="150px"
                                cardWidth="95%"
                                horizontalcard="true"
                                cardFor="food horizontal card"
                              />
                            );
                          })}
                        </Slider>
                      </SliderCustom>
                    </Grid>
                  </Grid>
                </CustomBoxFullWidth>
              </CustomStackFullWidth>
            </>
          )}
        </HomeComponentsWrapper>
      ) : (
        <>
          {bestReviewedItems && filteredData.length > 0 && (
            <HomeComponentsWrapper sx={{ paddingTop: "1rem" }}>
              <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <H2 text={title} />
                <Stack maxWidth="960px" width={isSmall ? "initial" : "100%"}>
                  {menu?.length > 0 && (
                    <Menus
                      selectedMenuIndex={selectedMenuIndex}
                      setSelectedMenuIndex={setSelectedMenuIndex}
                      menus={menu}
                    />
                  )}
                </Stack>
              </CustomStackFullWidth>
              <Grid container spacing={{ xs: 1, md: 1, lg: 1 }}>
                {info?.best_reviewed_section_banner && (
                  <Grid item xs={0} sm={12} md={2.5} lg={2.5}>
                    <CustomBoxFullWidth
                      sx={{
                        position: "relative",
                        height: {
                          xs: "200px",
                          sm: "300px",
                          md: "370px",
                        },
                        paddingTop: "8px",
                        display: { xs: "none", sm: "inherit" },
                      }}
                    >
                      {bannerIsLoading ? (
                        <Skeleton
                          variant="rectangular"
                          height="100%"
                          width="100%"
                        />
                      ) : (
                        <CustomImageContainer
                          src={url}
                          height="100%"
                          width="100%"
                          borderRadius=".7rem"
                          objectfit="cover"
                        />
                      )}
                    </CustomBoxFullWidth>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  sm={info?.best_reviewed_section_banner ? 9 : 12}
                  md={info?.best_reviewed_section_banner ? 9.5 : 12}
                >
                  <Grid item md={12} container position="relative">
                    <CustomStackFullWidth justifyContent="right" key={reRender}>
                      {/*{isMedium && filteredData.length > 3 && (*/}
                      {/*	<LeftArrowStyle top="45%" left={0}>*/}
                      {/*		<IconButtonGray*/}
                      {/*			onClick={() => SliderRef.current.slickPrev()}*/}
                      {/*		>*/}
                      {/*			{getLanguage() === "rtl" ? (*/}
                      {/*				<ArrowForwardIosIcon fontSize="small" />*/}
                      {/*			) : (*/}
                      {/*				<ArrowBackIosNewIcon fontSize="small" />*/}
                      {/*			)}*/}
                      {/*		</IconButtonGray>*/}
                      {/*	</LeftArrowStyle>*/}
                      {/*)}*/}
                      {/*{isSmall && filteredData.length > 2 && (*/}
                      {/*	<LeftArrowStyle left={0}>*/}
                      {/*		<IconButtonGray*/}
                      {/*			onClick={() => SliderRef.current.slickPrev()}*/}
                      {/*		>*/}
                      {/*			{getLanguage() === "rtl" ? (*/}
                      {/*				<ArrowForwardIosIcon fontSize="small" />*/}
                      {/*			) : (*/}
                      {/*				<ArrowBackIosNewIcon fontSize="small" />*/}
                      {/*			)}*/}
                      {/*		</IconButtonGray>*/}
                      {/*	</LeftArrowStyle>*/}
                      {/*)}*/}

                      {/*{isMedium && filteredData.length > 3 && (*/}
                      {/*	<RightArrowStyle top="45%" right={0}>*/}
                      {/*		<IconButtonGray*/}
                      {/*			onClick={() => SliderRef.current.slickNext()}*/}
                      {/*		>*/}
                      {/*			{getLanguage() === "rtl" ? (*/}
                      {/*				<ArrowBackIosNewIcon fontSize="small" />*/}
                      {/*			) : (*/}
                      {/*				<ArrowForwardIosIcon fontSize="small" />*/}
                      {/*			)}*/}
                      {/*		</IconButtonGray>*/}
                      {/*	</RightArrowStyle>*/}
                      {/*)}*/}
                      {/*{isSmall && filteredData.length > 2 && (*/}
                      {/*	<RightArrowStyle right={0}>*/}
                      {/*		<IconButtonGray*/}
                      {/*			onClick={() => SliderRef.current.slickNext()}*/}
                      {/*		>*/}
                      {/*			{getLanguage() === "rtl" ? (*/}
                      {/*				<ArrowBackIosNewIcon fontSize="small" />*/}
                      {/*			) : (*/}
                      {/*				<ArrowForwardIosIcon fontSize="small" />*/}
                      {/*			)}*/}
                      {/*		</IconButtonGray>*/}
                      {/*	</RightArrowStyle>*/}
                      {/*)}*/}
                      <SliderCustom>
                        <Slider ref={SliderRef} {...bestReviewedSliderSettings}>
                          {/* <Slider ref={SliderRef} {...settings}> */}
                          {slides()}
                        </Slider>
                      </SliderCustom>
                    </CustomStackFullWidth>
                  </Grid>
                </Grid>
              </Grid>
            </HomeComponentsWrapper>
          )}
        </>
      )}
    </>
  );
};

BestReviewedItems.propTypes = {};

export default BestReviewedItems;
