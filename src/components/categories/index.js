import React, { useEffect, useState } from "react";
import { useGetCategories } from "../../api-manage/hooks/react-query/all-category/all-categorys";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { Grid, useMediaQuery } from "@mui/material";
import H1 from "../typographies/H1";
import FeaturedItemCard from "../home/featured-categories/card";
import Shimmer from "./Shimmer";
import CustomSearch from "../custom-search/CustomSearch";

const Categories = (props) => {
  const { configData, t } = props;
  const matches = useMediaQuery("(max-width:1180px)");
  const [searchKey, setSearchKey] = useState("");

  const handleSearchSuccess = (res) => {};
  const queryKey = "categories";
  const { data, refetch, isFetched, isFetching, isLoading } = useGetCategories(
    searchKey,
    handleSearchSuccess,
    queryKey
  );
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [searchKey]);
  const handleSearchResult = async (values) => {
    if (values === "") {
      await refetch();
      setSearchKey("");
    } else {
      //setType('all')
      setSearchKey(values);
    }
  };
  return (
    <CustomPaperBigCard sx={{ minHeight: "600px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} align="left">
          <CustomStackFullWidth alignItems="flex-start" justifyContent="center">
            <H1 text="Categories" />
          </CustomStackFullWidth>
        </Grid>
        {isFetching
          ? [...Array(10)].map((item, index) => {
              return (
                <Grid
                  item
                  md={matches ? 2 : 1.5}
                  sm={3}
                  xs={6}
                  mt=".5rem"
                  key={index}
                >
                  <Shimmer />
                </Grid>
              );
            })
          : data &&
            data?.data.length > 0 &&
            data?.data?.map((categoryItem) => (
              <Grid
                item
                md={matches ? 2 : 1.5}
                sm={3}
                xs={6}
                mt=".5rem"
                key={categoryItem?.id}
              >
                <FeaturedItemCard
                  image={`${configData?.base_urls?.category_image_url}/${categoryItem?.image}`}
                  title={categoryItem?.name}
                  id={categoryItem?.id}
                />
              </Grid>
            ))}
      </Grid>
    </CustomPaperBigCard>
  );
};

Categories.propTypes = {};

export default Categories;
