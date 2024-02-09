import React, { useEffect } from "react";
import { Drawer, styled, useMediaQuery } from "@mui/material";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import MultipleCheckboxWithTitle from "../../multiple-checkbox-with-title";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategories } from "../../../api-manage/hooks/react-query/all-category/all-categorys";
import { setCategories } from "../../../redux/slices/storedData";

const CustomPaperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "paper.default",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
  borderRadius: "10px",
  p: "1rem",
  color: theme.palette.neutral[900],
}));
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
const SearchFilter = (props) => {
  const {
    open,
    onClose,
    isFetching,
    searchValue,
    id,
    sideDrawer,
    selectedCategoriesHandler,
  } = props;
  const { categories } = useSelector((state) => state.storedData);
  const { data: categoriesData, refetch } = useGetCategories();
  const dispatch = useDispatch();
  useEffect(() => {
    if (categories.length === 0) {
      refetch();
    }
  }, []);
  useEffect(() => {
    if (categoriesData?.data) {
      dispatch(setCategories(categoriesData?.data));
    }
  }, [categoriesData]);
  const theme = useTheme();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });

  const content = (
    <CustomStackFullWidth sx={{ padding: !sideDrawer && "1rem" }} spacing={3}>
      {categories?.length > 0 && (
        <MultipleCheckboxWithTitle
          title="Categories"
          data={categories}
          searchValue={searchValue}
          id={id}
          showAll
          selectedCategoriesHandler={selectedCategoriesHandler}
        />
      )}

      {/*<MultipleCheckboxWithTitle title="Brands" data={Dummy} showAll />*/}
      {/*<TagsCheckbox title="Popular Tags" data={Dummy} showAll />*/}
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
  if (sideDrawer) {
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
      anchor="left"
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

SearchFilter.propTypes = {};

export default SearchFilter;
