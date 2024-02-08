import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import RecentSearches from "./RecentSearches";

const RecentSearchWithSuggestions = (props) => {
  const {
    list,
    handleSearchHistoryOnClick,
    handleDeleteAble,
    t,
    clearAll,
    suggestedKeywords,
  } = props;
  return (
    <CustomStackFullWidth spacing={2}>
      <RecentSearches
        list={list}
        handleSearchHistoryOnClick={handleSearchHistoryOnClick}
        handleDeleteAble={handleDeleteAble}
        t={t}
        clearAll={clearAll}
      />
      {/*{suggestedKeywords.length > 0 && (*/}
      {/*  <SuggestionBasedOnInterest*/}
      {/*    suggestedKeywords={suggestedKeywords}*/}
      {/*    t={t}*/}
      {/*  />*/}
      {/*)}*/}
    </CustomStackFullWidth>
  );
};

export default RecentSearchWithSuggestions;
