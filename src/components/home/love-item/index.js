import React, { useEffect, useState } from "react";
import { HomeComponentsWrapper } from "../HomePageComponents";
import {
  CustomStackFullWidth,
  SliderCustom,
} from "../../../styled-components/CustomStyles.style";
import H2 from "../../typographies/H2";
import { Skeleton, Stack, useMediaQuery, useTheme } from "@mui/material";
import ProductCard from "../../cards/ProductCard";
import { useTranslation } from "react-i18next";
import ProductCardSimmer from "../../Shimmer/ProductCardSimmer";
import Menus from "./Menus";
import { useDispatch, useSelector } from "react-redux";
import { setYouWillLoveItems } from "../../../redux/slices/storedData";
import { useGetRecommendProductsForHome } from "../../../api-manage/hooks/react-query/useGetRecommendProductsForHome";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { loveItemSettings } from "./loveItemSettings";

const LoveItem = (props) => {
  const [menu, setMenu] = useState([]);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [reRender, setReRender] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const params = {
    offset: 1,
    limit: 15,
  };
  const { data, refetch, isLoading } = useGetRecommendProductsForHome(params);
  useEffect(() => {
    refetch();
  }, []);
  const { youWillLoveItems } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  const getCategoryIds = () => {
    const categoryIds = [];
    if (youWillLoveItems && youWillLoveItems?.products) {
      youWillLoveItems?.products?.forEach((product) => {
        if (product.category_ids) {
          product?.category_ids?.forEach((categoryId) => {
            categoryIds?.push(categoryId);
          });
        }
      });
    }
    return categoryIds;
  };
  const uniqueCategories = [
    ...new Set(getCategoryIds()?.map((item) => JSON.stringify(item))),
  ].map(JSON.parse);

  useEffect(() => {
    if (youWillLoveItems?.products?.length === 0) {
      refetch();
    }
  }, [youWillLoveItems]);

  useEffect(() => {
    if (data) {
      dispatch(setYouWillLoveItems(data));
    }
  }, [data]);
  useEffect(() => {
    if (data?.total_size > 0) {
      setMenu(["Recommended", ...uniqueCategories?.map((item) => item.name)]);
      setFilteredData(setYouWillLoveItems.products);
    }
  }, [setYouWillLoveItems.products]);

  useEffect(() => {
    if (selectedMenuIndex == 0) {
      setFilteredData(youWillLoveItems?.products);
      setReRender(true);
    } else {
      const categoryWiseData = youWillLoveItems?.products?.filter((item) => {
        return item?.category_ids?.some((categoryId) => {
          return uniqueCategories[selectedMenuIndex - 1]?.id === categoryId?.id;
        });
      });

      setFilteredData(categoryWiseData);
      setReRender(true);
    }
  }, [selectedMenuIndex]);

  return (
    <HomeComponentsWrapper>
      <CustomStackFullWidth
        alignItems="center"
        justyfyContent="center"
        mt="30px"
        spacing={1}
      >
        <CustomStackFullWidth
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          {isLoading ? (
            <Skeleton variant="text" width="110px" />
          ) : (
            <>
              {data?.items?.length > 0 && <H2 text="Item That You’ll Love" />}
            </>
          )}
          <Stack maxWidth="960px" width={isSmall ? "initial" : "100%"}>
            {data?.items?.length ? (
              <>
                {menu?.length > 0 && (
                  <Menus
                    selectedMenuIndex={selectedMenuIndex}
                    setSelectedMenuIndex={setSelectedMenuIndex}
                    menus={menu}
                  />
                )}
              </>
            ) : null}
          </Stack>
        </CustomStackFullWidth>
        <CustomStackFullWidth>
          {isLoading ? (
            <SliderCustom nopadding="true">
              <Slider {...loveItemSettings}>
                {[...Array(5)].map((index) => {
                  return <ProductCardSimmer key={index} />;
                })}
              </Slider>
            </SliderCustom>
          ) : (
            <SliderCustom nopadding="true">
              <Slider {...loveItemSettings}>
                {data?.items?.map((item, index) => {
                  return (
                    <ProductCard
                      key={item?.id}
                      cardType="vertical-type"
                      loveItem="true"
                      cardFor="vertical"
                      item={item}
                    />
                  );
                })}
              </Slider>
            </SliderCustom>
          )}

          {/*{isLoading ? (*/}
          {/*  <Grid container spacing={2}>*/}
          {/*    {[...Array(5)].map((index) => {*/}
          {/*      return (*/}
          {/*        <Grid key={index} item xs={6} sm={3} md={2.4}>*/}
          {/*          <ProductCardSimmer key={index} />*/}
          {/*        </Grid>*/}
          {/*      );*/}
          {/*    })}*/}
          {/*  </Grid>*/}
          {/*) : (*/}
          {/*  <Grid container spacing={2}>*/}
          {/*    <Grid  item xs={12} sm={12} md={12}>*/}
          {/*     */}
          {/*    </Grid>*/}

          {/*  </Grid>*/}
          {/*)}*/}
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    </HomeComponentsWrapper>
  );
};

LoveItem.propTypes = {};

export default LoveItem;
