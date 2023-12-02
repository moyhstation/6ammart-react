import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";
import useGetPopularStore from "../../../api-manage/hooks/react-query/store/useGetPopularStore";
import { removeDuplicates } from "../../../utils/CustomFunctions";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import { Grid } from "@mui/material";
import StoreCard from "../../cards/StoreCard";
import DotSpin from "../../DotSpin";
import useGetTopRatedStores from "../../../api-manage/hooks/react-query/store/useGetTopRatedStores";

const TopRatedStores = (props) => {
  const { selectedFilterValue, configData, totalDataCount, setTotalDataCount } =
    props;
  const [offset, setOffSet] = useState(1);
  const [page_limit, setPage_Limit] = useState(12);
  const [storeData, setStoreData] = useState([]);
  const { ref, inView } = useInView();
  const prevSelectedFilter = useRef();
  const pageParams = {
    type: selectedFilterValue,
    offset,
    limit: page_limit,
  };
  const { data, refetch, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetTopRatedStores(pageParams);
  useEffect(() => {
    setOffSet(1);
  }, [selectedFilterValue]);
  const handleAPiCallOnSuccess = (item) => {
    setTotalDataCount(item.total_size);
    if (selectedFilterValue === prevSelectedFilter?.current) {
      setStoreData((prev) =>
        removeDuplicates([...new Set([...prev, ...item?.stores])], "id")
      );
    } else {
      setStoreData(item?.stores);
    }

    prevSelectedFilter.current = selectedFilterValue;
  };
  const handleStoreData = () => {
    if (data && data?.pages?.length > 0) {
      data?.pages?.forEach((item) => {
        handleAPiCallOnSuccess(item);
      });
    }
  };
  useEffect(() => {
    handleStoreData();
  }, [data]);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
      // if (!isLoading) {
      //   setOffSet((prevState) => prevState + 1);
      // }
    }
  }, [inView]);
  // useEffect(() => {
  //   if (offset === 1) {
  //     refetch();
  //   } else {
  //     fetchNextPage();
  //   }
  // }, [offset]);
  return (
    <CustomBoxFullWidth>
      <Grid container spacing={2}>
        {storeData?.length > 0 &&
          storeData?.map((item, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <StoreCard
                  item={item}
                  imageUrl={`${configData?.base_urls?.store_cover_photo_url}/${item?.cover_photo}`}
                />
              </Grid>
            );
          })}
        {(isLoading || isFetchingNextPage) && (
          <CustomStackFullWidth
            alignItems="center"
            justifyContent="center"
            mt="3rem"
          >
            <DotSpin />
          </CustomStackFullWidth>
        )}
      </Grid>
      {totalDataCount !== storeData.length && (
        <CustomBoxFullWidth ref={ref}></CustomBoxFullWidth>
      )}
    </CustomBoxFullWidth>
  );
};

TopRatedStores.propTypes = {};

export default React.memo(TopRatedStores);
