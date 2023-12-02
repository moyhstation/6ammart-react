import React, { useEffect, useReducer, useState } from "react";
import { Scrollbar } from "../../srollbar";
import {
  Drawer,
  Skeleton,
  styled,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useGetCategories } from "../../../api-manage/hooks/react-query/all-category/all-categorys";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import CustomDivider from "../../CustomDivider";
import CustomSlider from "../../search/CustomSlider";
import { useTheme } from "@emotion/react";
import CheckboxWithChild from "./CheckboxWithChild";
import HighToLow from "../../../sort/HighToLow";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import VegNonVegCheckBox from "../../group-buttons/OutlinedGroupButtons";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";

export const CustomPaperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "paper.default",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
  borderRadius: "10px",
  p: "1rem",
  color: theme.palette.neutral[900],
}));
const initialState = {
  categories: [],
  isSelected: 0,
};

const Dummy = [
  {
    name: "Fruits & Vegetables",
    child: [
      {
        name: "Fresh Fruits",
      },
      {
        name: "Fresh Vegetables",
      },
      {
        name: "Dates ",
      },
    ],
  },
  {
    name: "Fruits & Vegetables",
    child: [
      {
        name: "Fresh Fruits",
      },
      {
        name: "Fresh Vegetables",
      },
      {
        name: "Dates ",
      },
    ],
  },
  {
    name: "Fruits & Vegetables",
    child: [
      {
        name: "Fresh Fruits",
      },
      {
        name: "Fresh Vegetables",
      },
      {
        name: "Dates ",
      },
    ],
  },
  {
    name: "Fruits & Vegetables",
    child: [
      {
        name: "Fresh Fruits",
      },
      {
        name: "Fresh Vegetables",
      },
      {
        name: "Dates ",
      },
    ],
  },
  {
    name: "Fruits & Vegetables",
    child: [
      {
        name: "Fresh Fruits",
      },
      {
        name: "Fresh Vegetables",
      },
      {
        name: "Dates ",
      },
    ],
  },
];
const reducer = (state, action) => {
  switch (action.type) {
    case "setCategories":
      return {
        ...state,
        categories: action.payload,
      };
    case "setIsSelected":
      return {
        ...state,
        isSelected: action.payload,
      };
    default:
      return state;
  }
};
const ACTION = {
  setCategories: "setCategories",
  setIsSelected: "setIsSelected",
};
const Sidebar = (props) => {
  const {
    open,
    onClose,
    ownCategories,
    handleCategoryId,
    handleChangePrice,
    priceFilterRange,
    storesApiLoading,
    searchIsLoading,
    storeId,
    handleSortBy,
    sortBy,
    isSmall,
    selectedCategories,
    selected,
    handleSelection,
    checkState,
    setCheckState,
  } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { t } = useTranslation();
  const theme = useTheme();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const [minMax, setMinMax] = useState([0, 0]);
  const handleOnSuccess = (res) => {
    if (ownCategories?.length > 0 && res?.data?.length > 0) {
      const common = res?.data?.filter((item) =>
        ownCategories.some((oItem) => oItem === item?.id)
      );
      dispatch({ type: ACTION.setCategories, payload: common });
    }
  };
  const searchKey = "";
  const queryKey = "stores-categories";
  const { refetch, isFetched, isFetching, isLoading } = useGetCategories(
    searchKey,
    handleOnSuccess,
    queryKey
  );
  useEffect(() => {
    refetch();
  }, [storeId]);
  // useEffect(() => {
  //   handleFilter();
  // }, [minMax]);

  const handleCategoriesClick = (id) => {
    dispatch({ type: ACTION.setIsSelected, payload: id });
    handleCategoryId?.(id);
  };
  const handleMinMax = (value) => {
    if (value[0] === 0) {
      value[0] = priceFilterRange?.[0]?.min_price;
    }
    setMinMax(value);
    handleChangePrice(value);
  };

  const handleFilter = () => {
    handleChangePrice(minMax);
  };
  const categoriesCheckBoxHandler = (data) => {
    handleCategoryId?.(data);
  };

  const content = (
    <CustomStackFullWidth sx={{ padding: "1rem" }} spacing={2}>
      {isSmall && (
        <CustomBoxFullWidth sx={{ mt: "3rem" }}>
          <HighToLow handleSortBy={handleSortBy} sortBy={sortBy} />
        </CustomBoxFullWidth>
      )}
      {state.categories?.length > 0 && (
        <Typography fontWeight="bold" color={theme.palette.neutral[1000]}>
          {t("Categories")}
        </Typography>
      )}
      {state.categories?.length > 0 && (
        <CustomPaperBox>
          <CustomStackFullWidth p="1rem">
            <Scrollbar style={{ maxHeight: "300px" }} scrollbarMinSize={5}>
              {state.categories?.length > 0 &&
                state.categories?.map((item, index) => {
                  return (
                    <CheckboxWithChild
                      key={index}
                      item={item}
                      checkHandler={categoriesCheckBoxHandler}
                      selectedItems={selectedCategories}
                    />
                  );
                })}
            </Scrollbar>
            {/*</List>*/}
          </CustomStackFullWidth>
        </CustomPaperBox>
      )}
      {isFetching && (
        <CustomPaperBox>
          {[...Array(4)].map((item, index) => {
            return (
              <ListItemButton key={index}>
                <ListItemText>
                  <Skeleton variant="rectangle" height="10px" width="100%" />
                </ListItemText>
              </ListItemButton>
            );
          })}
        </CustomPaperBox>
      )}
      {getCurrentModuleType() === ModuleTypes.FOOD && isSmall && (
        <VegNonVegCheckBox
          selected={state.type}
          handleSelection={handleSelection}
          checkState={checkState}
          setCheckState={setCheckState}
        />
      )}

      <CustomStackFullWidth spacing={2}>
        <Typography fontWeight="bold" color={theme.palette.neutral[1000]}>
          {t("Price Range")}
        </Typography>
        <CustomPaperBox>
          <CustomStackFullWidth p="1rem" spacing={1} key={"12"}>
            <CustomDivider />
            <CustomSlider
              handleChangePrice={handleMinMax}
              minMax={minMax}
              priceFilterRange={
                priceFilterRange?.length > 0 && priceFilterRange[0]
              }
            />
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              spacing={2}
              //flexWrap='wrap'
            >
              <TextField
                sx={{
                  backgroundColor: (theme) => theme.palette.neutral[300],
                }}
                variant="outlined"
                value={minMax[0] === 0 ? "" : minMax[0]}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setMinMax((prevState) => [e.target.value, prevState[1]]);
                  }
                }}
                label={t("Min")}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Typography>-</Typography>
              <TextField
                sx={{
                  backgroundColor: (theme) => theme.palette.neutral[300],
                }}
                variant="outlined"
                value={minMax[1] === 0 ? "" : minMax[1]}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setMinMax((prevState) => [prevState[0], e.target.value]);
                  }
                }}
                label={t("Max")}
                InputProps={{
                  readOnly: true,
                }}
              />
              {/*<LoadingButton*/}
              {/*  variant="contained"*/}
              {/*  sx={{*/}
              {/*    backgroundColor: (theme) => theme.palette.secondary.light,*/}
              {/*  }}*/}
              {/*  onClick={() => handleFilter()}*/}
              {/*  loading={storesApiLoading}*/}
              {/*  disabled={JSON.stringify(minMax) === JSON.stringify([0, 0])}*/}
              {/*>*/}
              {/*  <ArrowRightIcon fontSize="large" />*/}
              {/*</LoadingButton>*/}
            </CustomStackFullWidth>
          </CustomStackFullWidth>
        </CustomPaperBox>
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
  if (lgUp) {
    return (
      <Box
        sx={{
          //backgroundColor: "paper.default",
          width: "100%",
          py: "3px",
          height: "100%",
        }}
      >
        {content}
      </Box>
    );
  }
  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "paper.default",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

Sidebar.propTypes = {};

export default React.memo(Sidebar);
