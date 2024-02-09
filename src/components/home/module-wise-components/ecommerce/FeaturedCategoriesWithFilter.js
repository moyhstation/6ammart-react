import React, {useEffect, useState} from "react";
import H2 from "../../../typographies/H2";
import {
  CustomBoxFullWidth,
  CustomFullDivider,
  CustomStackFullWidth,
  SliderCustom,
} from "../../../../styled-components/CustomStyles.style";
import {Grid, Tab, Tabs, useMediaQuery} from "@mui/material";
import Slider from "react-slick";
import {HomeComponentsWrapper} from "../../HomePageComponents";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import ProductCard from "../../../cards/ProductCard";
import {Next, Prev} from "../../popular-items-nearby/SliderSettings";
import {useGetFeaturedCategories} from "../../../../api-manage/hooks/react-query/all-category/all-categorys";
import useGetFeatureCategoriesProducts from "../../../../api-manage/hooks/react-query/useGetFeatureCategories";
import EmptySearchResults from "../../../EmptySearchResults";
import {useTheme} from "@emotion/react";
import DotSpin from "../../../DotSpin";

const menus = [
    "Cough, Cold & Flue",
    "Fever & Pain",
    "Diabetes",
    "Eye & Ear",
    "Digestive Health",
    "Allergy & Asthma",
    "Blood Pressure & Heart Disease",
    "Skin & Hair Condition",
    "Infection",
    "All Medicine",
];
export const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesPerRow: 1,
    rows: 3,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "linear",
    responsive: [
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1.2,
                slidesPerRow: 1,
                rows: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 1.5,
                slidesPerRow: 2,
                rows: 3,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 750,
            settings: {
                slidesToShow: 2,
                slidesPerRow: 2,
                rows: 3,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 1,
                slidesPerRow: 2,
                rows: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1150,
            settings: {
                slidesToShow: 2,
                slidesPerRow: 2,
                rows: 3,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 2,
                slidesPerRow: 2,
                rows: 3,
                slidesToScroll: 1,
            },
        },
    ],
    prevArrow: <Prev/>,
    nextArrow: <Next/>,
};

const FeaturedCategoriesWithFilter = (props) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("md"));
    const {title} = props;
    const [selected, setSelected] = useState(0);
    const [categoryId, setCategoryId] = useState(null);
    const page_limit = "20";
    const offset = 1;
    const type = "all";
    //const { popularItemsNearby } = useSelector((state) => state.storedData);
    const {t} = useTranslation();
    const {
        data: featureData,
        refetch: featureRefetch,
        isLoading,
        isRefetching,
    } = useGetFeaturedCategories();

    const {
        data,
        refetch,
        isRefetching: itemIsLoading,
    } = useGetFeatureCategoriesProducts({
        categoryId,
        page_limit,
        offset,
        type,
    });
    const dispatch = useDispatch();

    // useEffect(() => {
    //   if (popularItemsNearby.products.length === 0) {
    //     refetch();
    //   }
    // }, [popularItemsNearby]);
    //
    // useEffect(() => {
    //   if (data) {
    //     dispatch(setPopularItemsNearby(data));
    //   }
    // }, [data]);
    useEffect(() => {
        setCategoryId(featureData?.data[0]?.id);
    }, [featureData]);

    useEffect(() => {
        if (categoryId) {
            refetch();
        }
    }, [categoryId]);
    const featureCategoryData = featureData?.data?.filter(
        (item) => item.featured === 1
    );
    const handleClick = (index, id) => {
        setSelected(index);
        setCategoryId(id);
    };

    return (
        <>
            {featureCategoryData?.length > 0 && (
                <HomeComponentsWrapper sx={{marginTop: "30px", marginBottom: "20px"}}>
                    <H2 text={title} textAlign="flex-start"/>
                    <CustomFullDivider sx={{marginY: "10px"}}/>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={0} md={3}>
                            <Tabs
                                orientation={isSmall ? "horizontal" : "vertical"}
                                variant={isSmall && "scrollable"}
                                scrollButtons
                            >
                                {featureCategoryData?.map((item, index) => {
                                    return (
                                        <Tab
                                            textAlign="flex-start"
                                            sx={{
                                                alignItems: "flex-start",
                                                marginLeft: isSmall
                                                    ? "24px !important"
                                                    : "0px !important",
                                                fontSize: selected === index ? "700" : "400",
                                                color:
                                                    selected === index
                                                        ? "primary.main"
                                                        : "text.secondary",
                                                cursor: "pointer",
                                            }}
                                            // variant={selected === index ? "16px" : "subtitle2"}
                                            // lineHeight="16.59px"
                                            // fontWeight={selected === index ? "700" : "400"}
                                            // sx={{
                                            //   color:
                                            //     selected === index
                                            //       ? "primary.main"
                                            //       : "text.secondary",
                                            //   cursor: "pointer",
                                            // }}
                                            key={index}
                                            onClick={() => handleClick(index, item?.id)}
                                            label={item?.name}
                                        />
                                    );
                                })}
                            </Tabs>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9}>
                            {itemIsLoading ? (
                                <CustomStackFullWidth
                                    sx={{height: "100%"}}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <DotSpin/>
                                </CustomStackFullWidth>
                            ) : (
                                <CustomBoxFullWidth>
                                    <SliderCustom
                                        nopadding="true"
                                        // sx={{
                                        //   mt: { md: "-22px" },
                                        //   "& .slick-slide": {
                                        //     marginRight: {
                                        //       xs: "0px",
                                        //       md: "-25px",
                                        //     },
                                        //   },
                                        // }}
                                    >
                                        <Slider {...settings}>
                                            {data?.products?.map((item, index) => {
                                                return (
                                                    <ProductCard
                                                        key={index}
                                                        item={item}
                                                        cardheight="150px"
                                                        cardWidth="100%"
                                                        horizontalcard="true"
                                                        cardFor="popular items"
                                                    />
                                                );
                                            })}
                                        </Slider>
                                    </SliderCustom>
                                    {data?.products?.length === 0 && (
                                        <CustomStackFullWidth
                                            sx={{height: "100%", padding: "2rem"}}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <EmptySearchResults text="Items Not Found!" isItems/>
                                        </CustomStackFullWidth>
                                    )}
                                </CustomBoxFullWidth>
                            )}
                        </Grid>
                    </Grid>
                </HomeComponentsWrapper>
            )}
        </>
    );
};

FeaturedCategoriesWithFilter.propTypes = {};

export default FeaturedCategoriesWithFilter;
