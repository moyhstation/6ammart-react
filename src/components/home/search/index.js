import React, { useEffect, useRef, useState } from "react";
import CustomContainer from "../../container";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import TabsTypeTwo from "../../custom-tabs/TabsTypeTwo";
import SearchMenu from "../../search/SearchMenu";
import SideBarWithData from "../../search/SideBarWithData";
import useGetSearch from "../../../api-manage/hooks/react-query/search/useGetSearch";
import { useRouter } from "next/router";
import { VIEW_ALL_TEXT } from "../../../utils/staticTexts";
import useGetCategories from "../../../api-manage/hooks/react-query/categories-details/useCategoriesDetails";
import useGetCategoriesForStore from "../../../api-manage/hooks/react-query/categories-details/useCategoriesDetailsForStore";
import { getHighToLow, getLowToHigh } from "../../store-details/middle-section";
import { useInView } from "react-intersection-observer";
import { alpha } from "@mui/material";
import MobileSideDrawer from "./MobileSideDrawer";
import { getFilteredData } from "./getFilteredData";
import { removeDuplicates } from "../../../utils/CustomFunctions";
import { useGetDiscountedItemsWithInfiniteScroll } from "../../../api-manage/hooks/react-query/product-details/useGetDiscountedItems";
import { filterTypeItems, filterTypeStores } from "../../search/filterTypes";
import { useNewArrivalsInfiniteScroll } from "../../../api-manage/hooks/react-query/product-details/useNewArrivals";
import useGetStoresByFiltering from "../../../api-manage/hooks/react-query/store/useGetStoresByFiltering";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";

// Three types of data shows here. Search results, all discounted products and stores and categories stores and products
const SearchResult = (props) => {
  const { searchValue, configData } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const [currentView, setCurrentView] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [openSideDrawer, setOpenSideDrawer] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([
    { min_price: 0, max_price: 1 },
  ]);
  const [qureyValue, setQureyValue] = useState("");
  // const offset = 1;
  const page_limit = 12;
  const router = useRouter();
  const tabs = [
    {
      name:
        getCurrentModuleType() === "food"
          ? "Foods"
          : getCurrentModuleType() === "ecommerce"
          ? "Items"
          : getCurrentModuleType() === "pharmacy"
          ? "Medicines"
          : "Groceries",
      value: "items",
    },
    {
      name: getCurrentModuleType() === "food" ? "Restaurants" : "Stores",
      value: "stores",
    },
  ];

  //--------------> single categories
  const [type, setType] = useState("all");
  const id = router.query.id;

  const [category_id, setCategoryId] = useState(id);
  const [sortBy, setSortBy] = useState("high2Low");
  const { ref, inView } = useInView();
  const scrollDivRef = useRef(true);
  const selectedCategoriesIds= selectedCategories?.length>0 ? selectedCategories:[id]

  const {
    data: allItems,
    refetch: refetchAllItems,
    isLoading: allItemsLoading,
    fetchNextPage: fetchNextPageAllItems,
    hasNextPage: hasNextPageAllItems,
    isFetchingNextPage: isFetchingNextPageAllItems,
  } = useNewArrivalsInfiniteScroll({
    limit: 12,
    currentTab,
  });

  const {
    data: specialOfferData,
    refetch: refetchSpecialOffer,
    isLoading: specialOfferLoading,
    fetchNextPage: fetchNextPageSpecialOffer,
    isFetchingNextPage: isFetchingNextPagePageSpecialOffer,
    hasNextPage: hasNextPagePageSpecialOffer,
  } = useGetDiscountedItemsWithInfiniteScroll({
    limit: 12,
    offset,
    currentTab,
  });
  const {
    data: categoryData,
    refetch: refetchCategoryData,
    isRefetching: isCategoryRefetching,
    isFetching: isFetchingCategoriesItemsAPi,
    fetchNextPage: fetchNextPageForCategoriesItems,
    isFetchingNextPage: isFetchingNextPageForCategoriesItems,
    hasNextPage: hasNextPageForCategoriesItems,
    isLoading: itemIsLoading,
    isFetching: isFetchingCategoriesProduct,
  } = useGetCategories({
    category_id,
    selectedCategoriesIds,
    page_limit,
    offset,
    type,
  });

  const {
    data: storeData,
    refetch: storeRefetch,
    isLoading,
    isFetching: isFetchingCategoriesStores,
    isRefetching: isRefetchingCategoriesStores,
    fetchNextPage: fetchNextPageForCategoriesStores,
    isFetchingNextPage: isFetchingNextPageForCategoriesStores,
    hasNextPage: hasNextPageForCategoriesStores,
  } = useGetCategoriesForStore({
    category_id,
    selectedCategoriesIds,
    page_limit,
    offset,
    type,
  });
  // All stores api
  const pageParams = {
    type: "all",
    offset,
    limit: page_limit,
    currentTab,
  };
  const {
    data: allStoresData,
    refetch: refetchAllStores,
    fetchNextPage: fetchNextPageAllStores,
    isFetchingNextPage: isFetchingNextPageAllStores,
    isLoading: isLoadingAllStores,
    hasNextPage: hasNextPageStores,
  } = useGetStoresByFiltering(pageParams);


  useEffect(() => {
    if (category_id) {
      if (currentTab === 0) {
        if (selectedCategories?.length > 0) {
          refetchCategoryData();
        }
      }
    }
  }, [selectedCategories]);
  useEffect(() => {
    if (category_id) {
      if (currentTab === 1) {
        if (selectedCategories?.length > 0) {
          storeRefetch();
        }
      }
    }
  }, [selectedCategories]);
 useEffect(()=>{
   if(searchValue==="special-offer"){
     refetchSpecialOffer()
   }
 },[])
  const hasApiNextPage =
    hasNextPageStores ||
    hasNextPageForCategoriesStores ||
    hasNextPageForCategoriesItems ||
    hasNextPagePageSpecialOffer ||
    hasNextPageAllItems;
  const getPriceRange = (productsArray) => {
    const prices = productsArray.reduce(
      (result, product) => {
        result[0] = Math.min(result[0], product.price);
        result[1] = Math.max(result[1], product.price);
        return result;
      },
      [Infinity, -Infinity]
    );
    return prices;
  };

  const handleAPiCallOnSuccess = (res) => {
    const initialHigh2LowSortedData = getHighToLow(
      currentTab === 0 ? res?.products : res?.stores
    );
    if (currentTab === 0) {
      if (res?.products?.length > 0) {
        let priceRange = getPriceRange(res?.products);
        setPriceRange((prevState) => [
          {
            min_price: priceRange[0],
            max_price: priceRange[1],
          },
        ]);
      }
      setTotalDataCount(res?.total_size);
      if (initialHigh2LowSortedData?.length > 0) {
        const newArray = [...pageData, ...initialHigh2LowSortedData];
        const withoutDuplicacy = removeDuplicates(newArray, "id");
        const key = "variations";
        const onlyItems = withoutDuplicacy.filter((item) => key in item);
        setPageData(onlyItems);
      }
    } else {
      setTotalDataCount(res?.total_size);
      if (initialHigh2LowSortedData?.length > 0) {
        const newArray = [...pageData, ...initialHigh2LowSortedData];
        const withoutDuplicacy = removeDuplicates(newArray, "id");
        const key = "comission";
        const onlyItems = withoutDuplicacy.filter((item) => key in item);
        setPageData(onlyItems);
      }
    }
  };
  const {
    data: searchData,
    refetch: serachRefetch,
    isFetching: isFetchingSearchAPi,
    isRefetching: isRefetchingSearch,
    fetchNextPage: fetchNextPageSearch,
    isFetchingNextPage,
    isLoading: isLoadingSearch,
  } = useGetSearch({
    currentTab: tabs[currentTab]?.value,
    searchValue,
    offset,
    page_limit,
  });
  useEffect(() => {
    if (searchValue !== "special-offer" && searchValue !== "category") {
      setQureyValue(searchValue);
    } else {
      setQureyValue("");
    }
  }, [searchValue]);
  useEffect(() => {
    if (qureyValue) {
      serachRefetch();
    }
  }, [qureyValue]);
  useEffect(() => {
    if (currentTab === 0) {
      if (categoryData?.pages?.length > 0) {
        categoryData?.pages?.forEach((item) => {
          handleAPiCallOnSuccess(item);
        });
      } else if (searchData?.pages?.length > 0) {
        if (searchData?.pages?.length > 0) {
          searchData?.pages?.forEach((item) => {
            handleAPiCallOnSuccess(item);
          });
        }
      } else if (specialOfferData?.pages?.length > 0) {
        specialOfferData?.pages?.forEach((item) => {
          handleAPiCallOnSuccess(item);
        });
      }
    } else {
      if (storeData?.pages?.length > 0) {
        storeData?.pages?.forEach((item) => {
          handleAPiCallOnSuccess(item);
        });
      } else if (searchData?.pages?.length > 0) {
        if (searchData?.pages?.length > 0) {
          searchData?.pages?.forEach((item) => {
            handleAPiCallOnSuccess(item);
          });
        }
      } else if (specialOfferData?.pages?.length > 0) {
        specialOfferData?.pages?.forEach((item) => {
          handleAPiCallOnSuccess(item);
        });
      } else if (allItems?.pages?.length > 0) {
        allItems?.pages?.forEach((item) => {
          handleAPiCallOnSuccess(item);
        });
      }
    }
  }, [searchData, categoryData, storeData, currentTab, specialOfferData]);
  //ALL STORES AND ALL ITEMS

  useEffect(() => {
    if (currentTab === 0) {
      if (allItems?.pages?.length > 0) {
        allItems?.pages?.forEach((item) => {
          handleAPiCallOnSuccess(item);
        });
      }
    } else {
      if (allStoresData?.pages?.length > 0) {
        allStoresData?.pages?.forEach((item) => {
          handleAPiCallOnSuccess(item);
        });
      }
    }
  }, [allItems, allStoresData, currentTab]);

  useEffect(() => {
    if (inView) {
      searchValuesHandler();
      setOffset((prev) => prev + 1);
    }
  }, [inView, searchValue, currentTab]);
  //---------------------------------------------------------> INITIAL PRICE RANGE SET
  useEffect(() => {
    handleFilterSelection();
  }, [priceRange, currentTab]);

  const handleFilterSelection = () => {
    const filterTypesConditionally =
      currentTab === 0 ? filterTypeItems : filterTypeStores;
    const newData = filterTypesConditionally.map((item) => {
      if (item?.value === "price") {
        return {
          ...item,
          price: [priceRange?.[0]?.min_price, priceRange?.[0]?.max_price],
        };
      } else if (item?.value === "discounted") {
        if (searchValue === VIEW_ALL_TEXT.specialOffer) {
          return {
            ...item,
            checked: true,
          };
        } else {
          return item;
        }
      } else {
        return item;
      }
    });
    setFilterData(newData);
  };

  const searchValuesHandler = async () => {
    if (searchValue) {
      if (searchValue === VIEW_ALL_TEXT.allCategories) {
        // all categories handle
        if (currentTab === 0) {
          await fetchNextPageAllItems();
        } else {
          await fetchNextPageAllStores();
        }
      } else if (searchValue === "category") {
        if (currentTab === 0) {
          await fetchNextPageForCategoriesItems();
        } else {
          await fetchNextPageForCategoriesStores();
        }
      } else if (searchValue === VIEW_ALL_TEXT.specialOffer) {
        await fetchNextPageSpecialOffer();
      } else {
        await fetchNextPageSearch();
      }
    }
  };
  //-------------------------> HANDLE SORT BY
  const handleSortBy = (value) => {
    if (value === "high2Low") {
      setPageData(getHighToLow(pageData));
    } else {
      setPageData(getLowToHigh(pageData));
    }
    setSortBy(value);
  };

  const getCategoriesWiseFilter = () => {
    let categoryWiseFiltered;
    let pageItems = [];
    if (selectedCategories?.length > 0) {
      if (pageData?.length > 0) {
        pageData?.forEach((item) => {
          if (item?.category_ids?.length === 1) {
            const itemCategoryId = Number.parseInt(
              currentTab === 0
                ? item?.category_ids?.[0]?.id
                : item?.category_ids?.[0]
            );
            if (selectedCategories?.includes(itemCategoryId)) {
              pageItems?.push(item);
            }
          } else {
            item?.category_ids?.forEach((catItem, index) => {
              if (index != 0) {
                const categoryId = Number.parseInt(
                  currentTab === 0 ? catItem?.id : catItem
                );
                if (selectedCategories?.includes(categoryId)) {
                  pageItems?.push(item);
                }
              }
            });
          }
        });
        const uniqueItems = [...new Set(pageItems)];
        return uniqueItems;
      }
    } else {
      categoryWiseFiltered = pageData;
    }
    return categoryWiseFiltered;
  };

  const getPageData = () => {
    const categoryWiseFiltered = getCategoriesWiseFilter();
    const isChecked =
      filterData?.length > 0
        ? filterData?.some((item) => item?.checked === true)
        : false;
    //CHECKING FILTER
    if (isChecked) {
      let filteredData;
      if (searchValue === VIEW_ALL_TEXT.specialOffer) {
        const isDiscounted = filterData?.find(
          (item) => item?.value === "discounted"
        )?.checked;
        filteredData = isDiscounted
          ? getFilteredData(filterData, categoryWiseFiltered, currentTab)
          : [];
      } else {
        filteredData = getFilteredData(
          filterData,
          categoryWiseFiltered,
          currentTab
        );
      }
      return filteredData;
    } else {
      if (currentTab === 0) {
        return pageData;
      } else {
        return categoryWiseFiltered;
      }
    }
  };

  const handleCurrentTab = (value) => {
    setCurrentTab(value);
    setOffset(1);
    setPageData([]);
  };

  //---------------------------------------------------- HANDLE FILTER
  const handleCheckbox = (value, e) => {
    let newData = filterData.map((item) =>
      item?.value === value?.value
        ? { ...item, checked: e.target.checked }
        : item
    );
    setFilterData(newData);
  };

  const handleChangeRatings = (value) => {
    let newData = filterData.map((item, index) =>
      index === filterData.length - 1
        ? { ...item, rating: value, checked: value > 0 ? true : false }
        : item
    );
    setFilterData(newData);
  };
  const getRatingValue = () => {
    return filterData[filterData.length - 1]?.rating;
  };

  const filterDataAndFunctions = {
    filterData: filterData,
    setFilterData: setFilterData,
    handleCheckbox: handleCheckbox,
    handleChangeRatings: handleChangeRatings,
    getRatingValue: getRatingValue,
    currentTab: currentTab,
  };

  //............................................> CATEGORIES SELECTION
  const selectedCategoriesHandler = (dataArray) => {
    setSelectedCategories([...new Set(dataArray)]);
  };

  const getRefBox = () => (
    <CustomBoxFullWidth ref={ref} sx={{ height: "10px" }}></CustomBoxFullWidth>
  );

  const refBoxHandler = () => {
    return <>{getRefBox()}</>;
  };
  const getTotalDataCount = () => {
    return getPageData()?.length || 0;
  };
  const isApiCalling =
      isFetchingSearchAPi||
      isFetchingNextPageAllStores ||
      isFetchingNextPageForCategoriesStores ||
      isFetchingNextPageForCategoriesItems ||
      isFetchingNextPagePageSpecialOffer ||
      isFetchingNextPageAllItems;
  return (
    <CustomContainer>
      <CustomStackFullWidth alignItems="center" justifyContent="center">
        <CustomStackFullWidth
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: "20px", marginBottom: "30px" }}
        >
          <TabsTypeTwo
            tabs={tabs}
            currentTab={currentTab}
            setCurrentTab={handleCurrentTab}
          />
        </CustomStackFullWidth>
        <SearchMenu
          currentView={currentView}
          setCurrentView={setCurrentView}
          handleSortBy={handleSortBy}
          sortBy={sortBy}
          totalDataCount={getTotalDataCount()}
          currentTab={currentTab}
          tabs={tabs}
          isRefetching={
            isCategoryRefetching ||
            isFetchingSearchAPi ||
            isCategoryRefetching ||
            isRefetchingCategoriesStores
          }
          setOpenSideDrawer={setOpenSideDrawer}
          priceRange={priceRange}
          filterDataAndFunctions={filterDataAndFunctions}
        />
        <CustomBoxFullWidth
          sx={{
            borderBottom: (theme) =>
              `1px solid ${alpha(theme.palette.neutral[400], 0.4)}`,
          }}
        ></CustomBoxFullWidth>
        <CustomBoxFullWidth>
          <SideBarWithData
            searchValue={searchValue}
            pageData={getPageData()}
            isLoading={
                itemIsLoading ||
                isLoading ||
                isLoadingAllStores ||
                specialOfferLoading
            }
            isInitialRefetching={
              isRefetchingSearch ||
              isCategoryRefetching ||
              isRefetchingCategoriesStores
            }
            id={id}
            currentTab={currentTab}
            configData={configData}
            isFetchingNextPage={isFetchingNextPage}
            currentView={currentView}
            filterData={filterData}
            setFilterData={setFilterData}
            selectedCategoriesHandler={selectedCategoriesHandler}
            isApiCalling={isApiCalling}
          />
          {refBoxHandler()}
        </CustomBoxFullWidth>
        {openSideDrawer && (
          <MobileSideDrawer
            open={openSideDrawer}
            onClose={() => setOpenSideDrawer(false)}
            sortBy={sortBy}
            handleSortBy={handleSortBy}
            searchValue={searchValue}
            id={id}
            setPageData={setPageData}
            selectedCategoriesHandler={selectedCategoriesHandler}
          />
        )}
      </CustomStackFullWidth>
    </CustomContainer>
  );
};

SearchResult.propTypes = {};

export default React.memo(SearchResult);
