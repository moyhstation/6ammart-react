/* eslint-disable react-hooks/exhaustive-deps */
import { alpha, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Slider from "react-slick";
import usePopularProductsInStore from "../../../api-manage/hooks/react-query/product-details/usePopularProductsInStore";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
  SliderCustom,
} from "../../../styled-components/CustomStyles.style";
import SpecialCard from "../../cards/SpecialCard";
import H1 from "../../typographies/H1";
import { settings } from "./settings";
import ProductCard from "../../cards/ProductCard";
import useGetCommonConditionStore from "../../../api-manage/hooks/react-query/common-conditions/useGetCommonConditionStore";

const PopularInTheStore = ({ id, storeShare }) => {
  const theme = useTheme();
  const offset = 1;
  const limit = 10;
  const getBG = () => {
    if (getCurrentModuleType()) {
      switch (getCurrentModuleType()) {
        case ModuleTypes.GROCERY:
          return {
            bgColor: alpha(theme.palette.primary.main, 0.2),
            title: "Popular in this store!",
          };
        case ModuleTypes.PHARMACY:
          return {
            bgColor: alpha(theme.palette.info.custom1, 0.2),
            title: "Common Conditions!",
          };
        case ModuleTypes.ECOMMERCE:
          return {
            bgColor: alpha(theme.palette.info.blue, 0.1),
            title: "Popular in this store!",
          };
        case ModuleTypes.FOOD:
          return {
            bgColor: alpha(theme.palette.moduleTheme.food, 0.1),
            title: "Popular in this Restaurant!",
          };
      }
    } else {
      switch (storeShare?.moduleType) {
        case ModuleTypes.GROCERY:
          return {
            bgColor: alpha(theme.palette.primary.main, 0.2),
            title: "Popular in this store!",
          };
        case ModuleTypes.PHARMACY:
          return {
            bgColor: alpha(theme.palette.info.custom1, 0.2),
            title: "Common Conditions!",
          };
        case ModuleTypes.ECOMMERCE:
          return {
            bgColor: alpha(theme.palette.info.blue, 0.1),
            title: "Popular in this store!",
          };
        case ModuleTypes.FOOD:
          return {
            bgColor: alpha(theme.palette.moduleTheme.food, 0.1),
            title: "Popular in this Restaurant!",
          };
      }
    }
  };

  const { data, refetch, isLoading } = usePopularProductsInStore({
    id,
    ...storeShare,
  });
  const {
    data: commonConditionitems,
    refetch: refetchCommonCondition,
    isLoading: isLoddingCondition,
  } = useGetCommonConditionStore({
    id,
    ...storeShare,
    offset,
    limit,
  })

  useEffect(() => {
    refetchCommonCondition();
  }, []);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <CustomBoxFullWidth>
      {
        getCurrentModuleType() === "pharmacy" ? (
          <>
            {commonConditionitems?.products?.length > 0 && ( 
              <SliderCustom
              nopadding="true"
              sx={{
                backgroundColor: getBG()?.bgColor,
                padding: "20px",
                borderRadius: "4px",
                marginTop: "12px",
                "& .slick-slide": {
                  paddingRight: "20px",
                },
              }}
            >
              <CustomStackFullWidth spacing={2.2}>
                <H1 textAlign="start" text={getBG()?.title} />
                {!isLoading && (
                  <Slider {...settings}>
                    {commonConditionitems?.products?.map((item, index) => {
                      return (
                        <ProductCard key={index} item={item} specialCard="true" />
                      );
                    })}
                  </Slider>
                )}
              </CustomStackFullWidth>
            </SliderCustom>
            )}
          </>
        ) : (
          <>
            {data?.length > 0 && ( 
              <SliderCustom
              nopadding="true"
              sx={{
                backgroundColor: getBG()?.bgColor,
                padding: "20px",
                borderRadius: "4px",
                marginTop: "12px",
                "& .slick-slide": {
                  paddingRight: "20px",
                },
              }}
            >
              <CustomStackFullWidth spacing={2.2}>
                <H1 textAlign="start" text={getBG()?.title} />
                {!isLoading && (
                  <Slider {...settings}>
                    {data?.map((item, index) => {
                      return (
                        <ProductCard key={index} item={item} specialCard="true" />
                      );
                    })}
                  </Slider>
                )}
              </CustomStackFullWidth>
            </SliderCustom>
            )}
          </>
        )
      }
    </CustomBoxFullWidth>
  );
};

PopularInTheStore.propTypes = {};

export default PopularInTheStore;
