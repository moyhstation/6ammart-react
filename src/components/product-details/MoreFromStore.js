import React, { useEffect, useRef, useState } from "react";
import {
  CustomStackFullWidth,
  SliderCustom,
} from "../../styled-components/CustomStyles.style";
import { Grid, Typography } from "@mui/material";
import { t } from "i18next";

import Slider from "react-slick";

import ProductCard from "../cards/ProductCard";
import { SimilarProductSettings } from "./SimilarProductSettings";
import horizontalCardShimmer from "../Shimmer/horizontalCardShimmer";
import { Shimmer } from "../home/popular-items-nearby";
import { Skeleton } from "@mui/material";
import { ACTION } from "../store-details/middle-section/states";
import useGetStoresCategoriesItem from "../../api-manage/hooks/react-query/stores-categories/useGetStoresCategoriesItem";
import useGetMoreFromStores from "../../api-manage/hooks/react-query/product-details/useGetMoreFromStore";

const MoreFromStore = ({ productDetails }) => {
  const [moreItem, setMoreItem] = useState([]);
  const [offSet, setOffSet] = useState(1);

  const limit = 10;
  const pageParams = {
    storeId: productDetails?.store_id,
    categoryId: productDetails?.category_id,
    productId: productDetails?.id,
    offset: offSet,
    type: "all",
    limit: limit,
  };
  const handleSuccess = (res) => {
    if (res) {
      setMoreItem(res);
      //dispatch({ type: ACTION.setData, payload: res });
    }
  };
  const { refetch, isRefetching } = useGetMoreFromStores(
    pageParams,
    handleSuccess
  );
  useEffect(() => {
    refetch();
  }, []);
  const SliderRef = useRef(null);

  return (
    <>
      {moreItem?.products?.length > 0 && (
        <CustomStackFullWidth>
          <Typography fontWeight="600" variant="h5">
            {t("More from Store")}
          </Typography>
          <SliderCustom>
            <Slider ref={SliderRef} {...SimilarProductSettings}>
              {moreItem?.products &&
                moreItem?.products?.length > 0 &&
                moreItem?.products?.map((item, index) => {
                  return (
                    <ProductCard
                      key={index}
                      item={item}
                      cardheight="180px"
                      horizontalcard="true"
                      changed_bg="true"
                    />
                  );
                })}
            </Slider>
            {isRefetching && [
              ...Array(3).map((item, index) => {
                return (
                  <Grid key={index} xs={6} sm={4} md={3} lg={3}>
                    <Skeleton variant="rectangle" width="100%" height="200px" />
                  </Grid>
                );
              }),
            ]}
          </SliderCustom>
        </CustomStackFullWidth>
      )}
    </>
  );
};

export default MoreFromStore;
