import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { IconButton, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import RecentSearches from "./RecentSearches";
import SuggestionBasedOnInterest from "./SuggestionBasedOnInterest";

const RecentSearchWithSuggestions = (props) => {
  const {
    list,
    handleSearchHistoryOnClick,
    handleDeleteAble,
    t,clearAll,
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
      {suggestedKeywords.length > 0 && (
        <SuggestionBasedOnInterest
          suggestedKeywords={suggestedKeywords}
          t={t}
        />
      )}
    </CustomStackFullWidth>
  );
};

export default RecentSearchWithSuggestions;
