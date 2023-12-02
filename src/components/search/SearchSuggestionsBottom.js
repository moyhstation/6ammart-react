import React, { useEffect, useState } from "react";
import { Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import useGetSuggestedProducts from "../../api-manage/hooks/react-query/search/useGetSuggestedProducts";
import RecentSearchWithSuggestions from "./recent-search/RecentSearchWithSuggestions";
import CustomScrollBar from "../CustomScrollBar";
import SuggestedSearches from "./recent-search/SuggestedSearches";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../helper-functions/moduleTypes";
import useGetItemOrStore from "../../api-manage/hooks/react-query/search/useGetItemOrStore";
import { debounce } from "lodash";

const CustomPaper = styled(Paper)(({ theme, display }) => ({
  position: "absolute",
  top: getCurrentModuleType() === ModuleTypes.FOOD ? 77 : 32,
  width: "100%",
  padding: "1.5rem",
  zIndex: 999,
  display: display ? display : "inherit",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
}));
const SearchSuggestionsBottom = (props) => {
  const {
    searchValue,
    setOpenSearchSuggestions,
    setOnSearchdiv,
    setSelectedValue,
    isEmpty,
    handleKeyPress,
    itemOrStoreSuggestionData,
    isRefetchingItemOrStoreSuggestion,
  } = props;
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);
  const [list, setList] = useState([]);
  const { t } = useTranslation();
  const router = useRouter();
  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const handleSearchSuccess = (res) => {
    setSuggestedKeywords(res);
  };

  const { refetch, isRefetching } =
    useGetSuggestedProducts(handleSearchSuccess);

  useEffect(() => {
    let getItem = JSON.parse(localStorage.getItem("searchedValues"));
    if (getItem && getItem.length > 0) {
      setList(getItem);
    }
    if (token) {
      refetch();
    }
  }, []);

  const handleSearchHistoryOnClick = (value) => {
    setSelectedValue(value);
    setOpenSearchSuggestions(false);
    router.push(
      {
        pathname: "/home",
        query: {
          search: value,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };
  const handleSearchSuggestionsOnClick = (value) => {
    setSelectedValue(value);
    setOpenSearchSuggestions(false);
    router.push(
      {
        pathname: "/search",
        query: {
          searchValue: value.substring(0, value.indexOf(" ")),
        },
      },
      "/search"
    );
  };

  const handleDeleteAble = (value) => {
    let getItem = JSON.parse(localStorage.getItem("searchedValues"));
    if (getItem && getItem.length > 0) {
      let newItems = getItem.filter((item) => item !== value);
      setList(newItems);
      localStorage.setItem("searchedValues", JSON.stringify(newItems));
    }
  };
  const clearAll=()=>{
    setList([])
    localStorage.removeItem("searchedValues");
  }
  return (
    <>
      <CustomPaper
        elevation={8}
        onMouseEnter={() => setOnSearchdiv(true)}
        onMouseLeave={() => setOnSearchdiv(false)}
        display={token ? "inherit" : (list.length > 0 || itemOrStoreSuggestionData) ? "inherit" : "none"}
      >
        <CustomStackFullWidth spacing={1}>
          {isEmpty ? (
            <>
              {list.length > 0 && (
                <RecentSearchWithSuggestions
                  list={list}
                  handleSearchHistoryOnClick={handleSearchHistoryOnClick}
                  handleDeleteAble={handleDeleteAble}
                  t={t}
                  suggestedKeywords={suggestedKeywords}
                  clearAll={clearAll}
                />
              )}
            </>
          ) : (
            <>
              {(itemOrStoreSuggestionData?.items?.length > 0 ||
                itemOrStoreSuggestionData?.stores?.length > 0) && (
                <SuggestedSearches
                  t={t}
                  data={itemOrStoreSuggestionData}
                  handleKeyPress={handleKeyPress}
                  isRefetching={isRefetchingItemOrStoreSuggestion}
                />
              )}
            </>
          )}

          {isRefetching && (
            <Stack spacing={1}>
              <Skeleton variant="text" width="120px" />
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                flexGrow={1}
                alignItems="center"
                justifyContent="flex-start"
              >
                <Skeleton variant="text" width="120px" height="40px" />
                <Skeleton variant="text" width="120px" height="40px" />
                <Skeleton variant="text" width="120px" height="40px" />
              </Stack>
            </Stack>
          )}
        </CustomStackFullWidth>
      </CustomPaper>
    </>
  );
};

SearchSuggestionsBottom.propTypes = {};

export default SearchSuggestionsBottom;
