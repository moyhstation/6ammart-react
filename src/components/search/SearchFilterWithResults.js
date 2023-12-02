import React from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { Skeleton } from "@mui/material";
import SearchResult from "./SearchResult";
import { Grid, useMediaQuery } from "@mui/material";
import TabsTypeOne from "../custom-tabs/TabsTypeOne";
import { t } from "i18next";
import ProductCard from "../cards/ProductCard";
import CustomPagination from "../custom-pagination";
import CustomEmptyResult from "../custom-empty-result";
import noData from "../../../public/static/nodata.png";
import StoresInfoCard from "../home/stores-with-filter/cards-grid/StoresInfoCard";
import { useSelector } from "react-redux";
import { Shimmer } from "../home/popular-items-nearby";
import { Stack } from "@mui/system";
import FilterWithSideDrawer from "./FilterWithSideDrawer";
import ProductCardShimmer from "./ProductCardShimmer";
import CustomShimmerForBestFood from "./ProductCardShimmer";

const SearchFilterWithResults = ({
  isNetworkCalling,
  searchValue,
  count,
  tabsData,
  currentTab,
  setCurrentTab,
  pageData,
  isLoading,
  offset,
  page_limit,
  setOffset,
  handleFilter,
  handleClearAll,
}) => {
  const { configData } = useSelector((state) => state.configData);
  const store_image_url = `${configData?.base_urls?.store_image_url}`;
  const moduleId = JSON.parse(window.localStorage.getItem("module"))?.id;
  const matches = useMediaQuery("(max-width:1100px)");
  const matchesXs = useMediaQuery("(max-width:480px)");
  return (
    <CustomStackFullWidth spacing={1}>
      {isNetworkCalling ? (
        <Skeleton width="100%" height="40px" variant="rectangular" />
      ) : (
        <SearchResult
          searchValue={searchValue}
          count={count}
          currentTab={currentTab}
        />
      )}
      <CustomPaperBigCard padding="20px">
        <Grid container spacing={{ xs: 2, md: 3 }} minHeight="50vh">
          <Grid item xs={12} sm={12} md={12} align="center">
            <TabsTypeOne
              tabs={tabsData}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              t={t}
              count={count}
            />
          </Grid>
          <Grid item xs={12} align="right">
            {pageData && (
              <FilterWithSideDrawer
                handleFilter={handleFilter}
                handleClearAll={handleClearAll}
                pageData={pageData}
              />
            )}
          </Grid>
          <Grid item container xs={12} sm={12} md={12} spacing={1}>
            {currentTab === "items" && (
              <>
                {pageData?.products?.length > 0 &&
                  !isLoading &&
                  pageData?.products?.map((item) => (
                    <Grid
                      item
                      md={matches ? 3 : 2.4}
                      sm={4}
                      xs={12}
                      key={item.id}
                    >
                      <ProductCard item={item} />
                    </Grid>
                  ))}

                {pageData?.products?.length === 0 && (
                  <CustomEmptyResult label="No Items found" image={noData} />
                )}
              </>
            )}
            {currentTab === "stores" && (
              <>
                {pageData?.stores?.length > 0 &&
                  !isLoading &&
                  pageData?.stores?.map((item) => (
                    <Grid
                      item
                      md={matches ? 3 : 3}
                      sm={4}
                      xs={matchesXs ? 12 : 6}
                      key={item.id}
                    >
                      <StoresInfoCard
                          data={item}
                        // image={`${store_image_url}/${item?.logo}`}
                        // title={item?.name}
                        // avgRating={item?.avg_rating}
                        // address={item?.address}
                        // id={item?.id}
                        // moduleId={moduleId}
                      />
                    </Grid>
                  ))}

                {pageData?.stores?.length === 0 && (
                  <CustomEmptyResult label="No store found" image={noData} />
                )}
              </>
            )}
            {pageData.total_size > page_limit && (
              <Grid item xs={12} sm={12} md={12} align="center">
                <CustomPagination
                  total_size={pageData?.total_size}
                  page_limit={page_limit}
                  offset={offset}
                  setOffset={setOffset}
                />
              </Grid>
            )}
          </Grid>
          {isNetworkCalling && <CustomShimmerForBestFood />}
          {isLoading && <CustomShimmerForBestFood />}
        </Grid>
      </CustomPaperBigCard>
    </CustomStackFullWidth>
  );
};

export default SearchFilterWithResults;
