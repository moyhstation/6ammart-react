import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import { CloseIconWrapper } from "../../styled-components/CustomStyles.style";
import { Search, StyledInputBase } from "./CustomSearch.style";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../helper-functions/moduleTypes";

const CustomSearch = ({
  handleSearchResult,
  label,
  isLoading,
  selectedValue,
  setIsEmpty,
  setSearchValue,
  type2,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  let language_direction = undefined;
  if (typeof window !== "undefined") {
    language_direction = localStorage.getItem("direction");
  }
  useEffect(() => {
    if (selectedValue){
      setValue(selectedValue);
    }else {
      setValue("")
    }

  }, [selectedValue]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchResult(e.target.value);
      e.preventDefault();
    }
  };
  const handleReset = () => {
    setValue("");
    handleSearchResult?.("");
    setIsEmpty?.(true);
  };
  const handleChange = (value) => {
    if (value === "") {
      handleSearchResult?.("");
      setIsEmpty?.(true);
    } else {
      setIsEmpty?.(false);
    }
    setValue(value);
    setSearchValue?.(value);
  };

  const getTypeWiseChanges = () => {
    if (type2) {
      return (
        <>
          <SearchIcon
            sx={{
              color: (theme) =>
                getCurrentModuleType() === ModuleTypes.FOOD
                  ? theme.palette.moduleTheme.food
                  : "primary.main",
              marginInlineStart: "15px",
              marginInlineEnd: "-8px",
            }}
          />
          <StyledInputBase
            placeholder={t(label)}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            language_direction={language_direction}
            // onFocus={() => handleOnFocus?.(value)}
          />
          {/*<>*/}
          {/*  {isLoading ? (*/}
          {/*    <CloseIconWrapper*/}
          {/*      right={-1}*/}
          {/*      language_direction={language_direction}*/}
          {/*    >*/}
          {/*      <LoadingButton loading variant="text" sx={{ width: "10px" }} />*/}
          {/*    </CloseIconWrapper>*/}
          {/*  ) : (*/}
          {/*    <CloseIconWrapper*/}
          {/*      onClick={() => handleReset?.()}*/}
          {/*      language_direction={language_direction}*/}
          {/*    >*/}
          {/*      <IconButton>*/}
          {/*        <CloseIcon fontSize="small" />*/}
          {/*      </IconButton>*/}
          {/*    </CloseIconWrapper>*/}
          {/*  )}*/}
          {/*</>*/}
        </>
      );
    } else {
      return (
        <>
          <StyledInputBase
            placeholder={t(label)}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            language_direction={language_direction}
            // onFocus={() => handleOnFocus?.(value)}
          />
          {value === "" ? (
            <SearchIcon sx={{ marginInlineEnd: "12px" }} />
          ) : (
            <>
              {isLoading ? (
                <CloseIconWrapper
                  right={-1}
                  language_direction={language_direction}
                >
                  <LoadingButton
                    loading
                    variant="text"
                    sx={{ width: "10px" }}
                  />
                </CloseIconWrapper>
              ) : (
                <CloseIconWrapper
                  onClick={() => handleReset()}
                  language_direction={language_direction}
                  right="20px"
                >
                  <IconButton sx={{ marginRight: "-4px !important" }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </CloseIconWrapper>
              )}
            </>
          )}
        </>
      );
    }
  };

  return (
    <form onSubmit={handleKeyPress}>
      <Search direction="row" alignItems="center" type2={type2}>
        {getTypeWiseChanges()}
      </Search>
    </form>
  );
};

CustomSearch.propTypes = {};

export default CustomSearch;
