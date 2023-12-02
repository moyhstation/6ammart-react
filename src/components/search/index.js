import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import SearchFilterWithResults from "./SearchFilterWithResults";
import useGetSearch from "../../api-manage/hooks/react-query/search/useGetSearch";
import { useSelector } from "react-redux";
import { getFilterChoices } from "./getFilterChoices";
import SEO from "../seo";

const tabsData = [
  {
    title: "Items",
    value: "items",
  },
  {
    title: "Stores",
    value: "stores",
  },
];
const ProductSearchPage = ({ configData }) => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(tabsData[0].value);
  const [searchValue, setSearchValue] = useState("");
  const [page_limit, setPageLimit] = useState(50);
  const [offset, setOffset] = useState(1);
  const [pageData, setPageData] = useState({});
  const [checkfilter, setCheckfilter] = useState(false);
  const { filterData } = useSelector((state) => state.searchFilterStore);

  const handleAPiCallOnSuccess = (res) => {
    setPageData(res);
  };
  const { isLoading, data, isError, error, refetch, isRefetching } =
    useGetSearch(
      {
        currentTab,
        searchValue,
        offset,
        page_limit,
      },
      handleAPiCallOnSuccess
    );
  useEffect(() => {
    let searchValue = "";
    if (typeof window !== "undefined") {
      searchValue = localStorage.getItem("searchValue");
    }
    if (router.query.searchValue) {
      setSearchValue(router.query.searchValue);
    } else {
      let searchValues = [];
      if (typeof window !== "undefined") {
        searchValues = JSON.parse(localStorage.getItem("searchedValues"));
        if (searchValues.length > 0 && searchValues[0]) {
          setSearchValue(searchValues[0]);
        } else {
          router.push("/home", undefined, { shallow: true });
        }
      }
    }
  }, [router]);
  useEffect(() => {
    if (searchValue !== "") {
      refetch();
    }
  }, [searchValue, currentTab]);
  useEffect(() => {
    setOffset(1);
  }, [currentTab]);

  useEffect(() => {
    handleFilteredData(filterData, data);
  }, [checkfilter]);

  const handleFilter = () => {
    setCheckfilter((prevState) => !prevState);
  };

  const handleClearAll = async () => {
    await refetch();
  };

  const handleFilteredData = (filterData, data) => {
    let filteredData = getFilterChoices(filterData, data, currentTab);

    if (filteredData) {
      if (currentTab === "items") {
        setPageData({
          ...pageData,
          products: filteredData,
          total_size: filteredData?.length,
        });
      } else {
        setPageData({
          ...pageData,
          store: filteredData,
          total_size: filteredData?.length,
        });
      }
    }
  };

  return (
    <>
      <SEO
        title={configData ? `${searchValue}` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />

      <CustomStackFullWidth>
        <SearchFilterWithResults
          tabsData={tabsData}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          count={pageData?.total_size}
          searchValue={searchValue}
          pageData={pageData}
          isLoading={isRefetching}
          page_limit={page_limit}
          offset={offset}
          setOffset={setOffset}
          isNetworkCalling={isLoading}
          handleFilter={handleFilter}
          handleClearAll={handleClearAll}
        />
      </CustomStackFullWidth>
    </>
  );
};

export default ProductSearchPage;
