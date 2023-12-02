import React, { useEffect, useReducer, useState } from "react";
import CustomSearch from "../../custom-search/CustomSearch";
import {
  alpha,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Sidebar from "./Sidebar";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import useGetStoresCategoriesItem from "../../../api-manage/hooks/react-query/stores-categories/useGetStoresCategoriesItem";
import ProductCard, { CardWrapper } from "../../cards/ProductCard";
import { useRouter } from "next/router";
import useGetSearchedStoreItems from "../../../api-manage/hooks/react-query/store/useGetSearchedStoreItems";
import { ACTION, initialState, reducer } from "./states";
import CustomEmptyResult from "../../custom-empty-result";
import notFoundImage from "../../../../public/static/empty.png";
import { useTranslation } from "react-i18next";
import VegNonVegCheckBox from "../../group-buttons/OutlinedGroupButtons";
import { getModuleId } from "../../../helper-functions/getModuleId";
import HighToLow from "../../../sort/HighToLow";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { useSelector } from "react-redux";

import { getDiscountedAmount } from "../../../helper-functions/CardHelpers";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";
import { useInView } from "react-intersection-observer";
import { removeDuplicates } from "../../../utils/CustomFunctions";
import DotSpin from "../../DotSpin";
import SearchIcon from "@mui/icons-material/Search";

export const handleShimmerProducts = () => {
  return (
    <>
      {[...Array(3)].map((item, index) => {
        return (
          <Grid item key={index} xs={6} sm={4} md={3} lg={3}>
            <CardWrapper>
              <CustomStackFullWidth
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <Skeleton
                  variant="rectangular"
                  animation="pulse"
                  width="100%"
                  height={170}
                />
                <CustomStackFullWidth
                  padding="1rem"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    height={20}
                    width="80%"
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    height={20}
                    width="40%"
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    height={20}
                    width="30%"
                  />
                  {/*<RatingStarIcon fontSize="small" color="#808080" />*/}
                  <Stack direction="row" spacing={2}>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={70}
                      height={20}
                    />

                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={70}
                      height={20}
                    />
                  </Stack>
                </CustomStackFullWidth>
              </CustomStackFullWidth>
            </CardWrapper>
          </Grid>
        );
      })}
    </>
  );
};

export const getDiscountedPriceAmount = (item) => {
  return getDiscountedAmount(
    item?.price,
    item?.discount,
    item?.discount_type,
    item?.store_discount,
    item?.quantity
  );
};

export const getHighToLow = (data) => {
  if (data?.length > 0) {
    return data.sort(
      (a, b) => getDiscountedPriceAmount(b) - getDiscountedPriceAmount(a)
    );
  } else {
    return data;
  }
};
// Sort products by low to high value
export const getLowToHigh = (data) => {
  if (data?.length > 0) {
    return data.sort(
      (a, b) => getDiscountedPriceAmount(a) - getDiscountedPriceAmount(b)
    );
  } else {
    return data;
  }
};
const MiddleSection = (props) => {
  const { storeDetails, ownCategories, isSmall, storeShare } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const [checkState, setCheckState] = React.useState({
    veg: false,
    non_veg: false,
  });
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { configData } = useSelector((state) => state.configData);
  const imageBaseUrl = configData?.base_urls?.item_image_url;
  const router = useRouter();
  const { id } = router.query;
  const storeId = id;
  const limit = 12;
  const { ref, inView } = useInView();
  const [offset, setOffset] = useState(1);
  const pageParams = {
    storeId: storeId,
    categoryId: state.categoryId,
    offset: offset,
    minMax: state.minMax,
    type: state.type,
    limit: limit,
    ...storeShare,
  };
  const searchPageParams = {
    storeId: storeId,
    searchKey: state.searchKey,
    offset: offset,
    type: "all",
    limit: limit,
    ...storeShare,
  };
  const handleSearchSuccess = (res) => {
    if (res) {
      dispatch({
        type: ACTION.setData,
        payload: res,
      });
    }
  };

  const {
    data: searchData,
    refetch: refetchSearchData,
    isRefetching: isRefetchingSearch,
    isFetched,
    fetchNextPage: fetchNextPageSearch,
    hasNextPage: hasNextPageSearch,
  } = useGetSearchedStoreItems(searchPageParams);

  const handleLocalStorageSave = (resProducts) => {
    if (offset === 1) {
      let visitedStoresProducts = JSON.parse(
        localStorage.getItem("visitedStoresProducts")
      );
      if (visitedStoresProducts) {
        if (visitedStoresProducts?.length > 0) {
          const isThisStoresProductExist = visitedStoresProducts?.filter(
            (item) => item?.store_id === storeDetails?.id
          );
          if (isThisStoresProductExist?.length > 0) {
            return null;
          } else {
            resProducts
              ?.slice(0, 5)
              ?.forEach((item) => visitedStoresProducts.push(item));
          }
          localStorage.setItem(
            "visitedStoresProducts",
            JSON.stringify(visitedStoresProducts)
          );
        }
      } else {
        const products =
          resProducts?.length > 5 ? resProducts?.slice(0, 5) : resProducts;
        localStorage.setItem("visitedStoresProducts", JSON.stringify(products));
      }
    }
  };

  const handleSuccess = (res) => {
    if (res) {
      if (res?.products?.length > 0) {
        handleLocalStorageSave(res?.products);
      }
      const initialHigh2LowSortedData = getHighToLow(res?.products);

      if (offset > 1) {
        if (state?.data) {
          if (initialHigh2LowSortedData?.length > 0) {
            const newArray = [
              ...state?.data?.products,
              ...initialHigh2LowSortedData,
            ];
            const withoutDuplicacy = removeDuplicates(newArray, "id");
            dispatch({
              type: ACTION.setData,
              payload: {
                ...res,
                products: withoutDuplicacy,
              },
            });
          }
        } else {
          dispatch({
            type: ACTION.setData,
            payload: {
              ...res,
              products: initialHigh2LowSortedData,
            },
          });
        }

        dispatch({ type: ACTION.setIsSidebarOpen, payload: false });
      } else {
        if (state?.data) {
          if (initialHigh2LowSortedData?.length > 0) {
            const newArray = [...initialHigh2LowSortedData];
            const withoutDuplicacy = removeDuplicates(newArray, "id");
            dispatch({
              type: ACTION.setData,
              payload: {
                ...res,
                products: withoutDuplicacy,
              },
            });
          } else {
            dispatch({
              type: ACTION.setData,
              payload: {
                ...res,
                products: initialHigh2LowSortedData,
              },
            });
          }
        } else {
          dispatch({
            type: ACTION.setData,
            payload: {
              ...res,
              products: initialHigh2LowSortedData,
            },
          });
        }
        dispatch({ type: ACTION.setIsSidebarOpen, payload: false });
      }
      // dispatch({
      //   type: ACTION.setData,
      //   payload: {
      //     ...res,
      //     products: res?.products,
      //   },
      // });
    }
  };
  const {
    data,
    refetch,
    isRefetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingStoresCategories,
    isFetchingNextPage,
  } = useGetStoresCategoriesItem(pageParams);
  useEffect(() => {
    if (state.searchKey === "" || !state.searchKey) {
      refetch();
    }
  }, [state.categoryId, offset, state.type, id]);

  useEffect(() => {
    if (state.searchKey) {
      if (searchData?.pages?.length > 0) {
        searchData?.pages?.forEach((item) => {
          handleSuccess(item);
        });
      }
    } else {
      if (data?.pages?.length > 0) {
        data?.pages?.forEach((item) => {
          handleSuccess(item);
        });
      }
    }
  }, [data, searchData]);
  useEffect(() => {
    if (inView) {
      if (!isLoadingStoresCategories) {
        dispatch({ type: ACTION.setOffSet, payload: 1 });
        setOffset((prev) => prev + 1);
      }
    }
  }, [inView]);

  const handleCategoryId = (id) => {
    setOffset(1);
    if (id?.checked) {
      const newIds = [...state.categoryId, id?.id];
      dispatch({
        type: ACTION.setCategoryId,
        payload: [...new Set(newIds)],
      });
    } else {
      const newIds = state.categoryId?.filter((item) => item !== id?.id);
      dispatch({
        type: ACTION.setCategoryId,
        payload: newIds,
      });
    }
    dispatch({ type: ACTION.setIsSidebarOpen, payload: false });
  };

  useEffect(() => {
    if (state.searchKey && state.searchKey !== "") {
      if (offset === 1) {
        refetchSearchData();
      } else {
        fetchNextPageSearch();
      }
    } else {
      if (offset === 1) {
        refetch();
      } else {
        fetchNextPage();
      }
    }
  }, [state.searchKey, offset]);
  useEffect(() => {
    if (JSON.stringify(state.minMax) !== JSON.stringify([0, 1])) {
      refetch();
    }
  }, [state.minMax]);

  useEffect(() => {
    if (state?.data?.products?.length > 0) {
      sortWiseDataHandle();
    }
  }, [state.sortBy]);

  const handleChangePrice = (value) => {
    dispatch({ type: ACTION.setMinMax, payload: value });
    setOffset(1);
  };
  const handleSelection = () => {
    if (checkState?.veg && !checkState?.non_veg) {
      dispatch({
        type: ACTION.setType,
        payload: "veg",
      });
    } else if (checkState?.non_veg && !checkState?.veg) {
      dispatch({
        type: ACTION.setType,
        payload: "non_veg",
      });
    } else if (checkState?.veg && checkState?.non_veg) {
      dispatch({
        type: ACTION.setType,
        payload: "all",
      });
    } else {
      dispatch({
        type: ACTION.setType,
        payload: "all",
      });
    }
  };
  useEffect(() => {
    handleSelection();
    setOffset(1);
  }, [checkState?.veg, checkState.non_veg]);

  let moduleId = getModuleId()
    ? getModuleId()
    : parseInt(router.query.module_id);
  const handleSearchResult = (value) => {
    setOffset(1);
    dispatch({ type: ACTION.setOffSet, payload: 1 });
    if (value !== "") {
      dispatch({ type: ACTION.setSearchKey, payload: value });
      dispatch({ type: ACTION.setMinMax, payload: [0, 1] });
    } else {
      dispatch({ type: ACTION.setSearchKey, payload: null });
    }
  };

  const sortWiseDataHandle = () => {
    let newData;
    if (state.sortBy === "high2Low") {
      newData = {
        ...state.data,
        products: getHighToLow(state.data.products),
      };
    } else {
      newData = {
        ...state.data,
        products: getLowToHigh(state.data.products),
      };
    }
    dispatch({ type: ACTION.setData, payload: newData });
  };

  const handleSortBy = (value) => {
    dispatch({
      type: ACTION.setSortBy,
      payload: value,
    });
    dispatch({ type: ACTION.setIsSidebarOpen, payload: false });
  };

  const priceRangeWiseSorted = (products) => {
    if (products.length > 0) {
      return products?.filter(
        (newItem) =>
          newItem?.price >= state.minMax[0] && newItem?.price <= state.minMax[1]
      );
    }
  };

  const minMaxWiseSorted = (products) => {
    if (state.minMax[0] === 0 && state.minMax[1] === 1) {
      return products;
    } else {
      return priceRangeWiseSorted(products);
    }
  };

  const getCategoryWiseProduct = (products) => {
    const isAllExist = state.categoryId?.length === 0 ? true : false;
    if (isAllExist) {
      return minMaxWiseSorted(products);
    } else {
      const filteredData = products?.filter((item) =>
        state.categoryId.some((catId) => catId === item.category_id)
      );

      return minMaxWiseSorted(filteredData);
    }
  };

  const handleOpenSerach = () => {
    setOpen(!open);
  };

  return (
    <CustomBoxFullWidth>
      {moduleId && (
        <Grid container sx={{ mt: { xs: "5px", sm: "20px" } }}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={3} md={5} align="left">
              <Typography
                fontSize={{ xs: "13px", md: "15px" }}
                textAlign="start"
                fontWeight="600"
              >
                {t("All Products")}
              </Typography>
            </Grid>
            <Grid item xs={9} md={7} container spacing={3}>
              {isSmall ? (
                <Grid item xs={12}>
                  <CustomStackFullWidth
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    // spacing={1}
                  >
                    {!open ? (
                      <IconButton
                        onClick={handleOpenSerach}
                        sx={{ color: "primary.main", display: { lg: "none" } }}
                      >
                        <SearchIcon />
                      </IconButton>
                    ) : (
                      <CustomBoxFullWidth
                        sx={{
                          width: open ? "200px" : "0px",
                          transition: "width 0.5s ease-in-out",
                        }}
                      >
                        {open && (
                          <CustomSearch
                            label={t("Search for items...")}
                            selectedValue={state.searchKey}
                            handleSearchResult={handleSearchResult}
                            type2
                          />
                        )}
                      </CustomBoxFullWidth>
                    )}
                    <IconButton
                      onClick={() =>
                        dispatch({
                          type: ACTION.setIsSidebarOpen,
                          payload: true,
                        })
                      }
                      sx={{ color: "primary.main", display: { lg: "none" } }}
                    >
                      <MenuOpenIcon />
                    </IconButton>
                    {getCurrentModuleType() === "food" && !isSmall && (
                      <VegNonVegCheckBox
                        selected={state.type}
                        handleSelection={handleSelection}
                        checkState={checkState}
                        setCheckState={setCheckState}
                      />
                    )}
                  </CustomStackFullWidth>
                </Grid>
              ) : (
                <>
                  <Grid item xs={7} md={7.5}>
                    {getCurrentModuleType() === ModuleTypes.FOOD ? (
                      <VegNonVegCheckBox
                        selected={state.type}
                        handleSelection={handleSelection}
                        checkState={checkState}
                        setCheckState={setCheckState}
                      />
                    ) : (
                      <CustomSearch
                        label={t("Search for items...")}
                        selectedValue={state.searchKey}
                        handleSearchResult={handleSearchResult}
                        type2
                      />
                    )}
                  </Grid>
                  <Grid item xs={7} md={4.5}>
                    {getCurrentModuleType() === ModuleTypes.FOOD ? (
                      <CustomSearch
                        label={t("Search for items...")}
                        selectedValue={state.searchKey}
                        handleSearchResult={handleSearchResult}
                        type2
                      />
                    ) : (
                      <HighToLow
                        handleSortBy={handleSortBy}
                        sortBy={state.sortBy}
                      />
                    )}
                  </Grid>{" "}
                </>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Stack
              width="100%"
              sx={{
                mt: "20px",
                mb: "20px",
                borderBottom: (theme) =>
                  `2px solid ${alpha(theme.palette.neutral[400], 0.2)}`,
              }}
            ></Stack>
          </Grid>
          <Grid item xs={0} sm={0} md={0} lg={3}>
            <Sidebar
              {...props}
              onClose={() =>
                dispatch({ type: ACTION.setIsSidebarOpen, payload: false })
              }
              open={state.isSidebarOpen}
              handleCategoryId={handleCategoryId}
              handleChangePrice={handleChangePrice}
              selectedCategories={state.categoryId}
              // priceFilterRange={handlePriceFilterRange(
              //   storeDetails?.price_range
              // )}
              ownCategories={ownCategories}
              priceFilterRange={storeDetails?.price_range}
              storesApiLoading={isRefetching}
              searchIsLoading={refetchSearchData}
              storeId={id}
              handleSortBy={handleSortBy}
              sortBy={state.sortBy}
              isSmall={isSmall}
              selected={state.type}
              handleSelection={handleSelection}
              checkState={checkState}
              setCheckState={setCheckState}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={9}
            container
            spacing={3}
            alignItems="flex-start"
          >
            {isLoading && handleShimmerProducts()}
            <Grid item xs={12} container spacing={2}>
              {state.data &&
                state.data?.products?.length > 0 &&
                getCategoryWiseProduct(state.data?.products)?.map(
                  (item, index) => {
                    return (
                      <Grid item key={index} xs={6} sm={4} md={3} lg={3}>
                        <ProductCard
                          key={item?.id}
                          item={item}
                          cardheight="365px"
                          cardFor="vertical"
                          cardType="vertical-type"
                          // cardFor="popular items"
                        />
                      </Grid>
                    );
                  }
                )}
              {state.data?.products?.length === 0 && !isRefetching && (
                <Stack width="100%" paddingTop={{ xs: "0px", md: "30px" }}>
                  <CustomEmptyResult
                    image={notFoundImage}
                    label="Nothing found"
                    width="200px"
                    height="200px"
                  />
                </Stack>
              )}
            </Grid>
            {(isFetchingNextPage || isRefetching || isRefetchingSearch) && (
              <Grid
                item
                xs={12}
                sx={{
                  paddingBlockEnd: "30px",
                  paddingBlockStart: "30px",
                }}
              >
                <Stack sx={{ minHeight: "40vh", marginTop: "2rem" }}>
                  <DotSpin />
                </Stack>
              </Grid>
            )}
            {(hasNextPage || hasNextPageSearch) && (
              <Grid item xs={12} sx={{ marginBottom: "2rem" }}>
                <CustomBoxFullWidth
                  ref={ref}
                  sx={{ height: "10px" }}
                ></CustomBoxFullWidth>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </CustomBoxFullWidth>
  );
};

export default React.memo(MiddleSection);
