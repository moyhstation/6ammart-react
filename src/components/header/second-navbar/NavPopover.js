import React, { useEffect, useId } from "react";

import { Popover, Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import CustomImageContainer from "../../CustomImageContainer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  CustomStackFullWidth,
  CustomTypographyGray,
} from "../../../styled-components/CustomStyles.style";
import CategoryPopover from "./CategoryPopover";
import NavStorePopover from "./NavStorePopover";
import { getLanguage } from "../../../helper-functions/getLanguage";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategories } from "../../../api-manage/hooks/react-query/all-category/all-categorys";
import { setCategories } from "../../../redux/slices/storedData";
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    marginTop: "21px",
    pointerEvents: "auto",
  },
}));

const NavPopover = ({
  catImageUrl,
  open,
  anchorEl,
  handlePopoverOpenSub,
  openSub,
  anchorElSub,
  subCategory,
  popoverFor,
  handlePopoverCloseSub,
}) => {
  const classes = useStyles();
  const { categories } = useSelector((state) => state.storedData);
  const theme = useTheme();
  const popoverDivId = useId();
  const {
    data: categoriesData,
    refetch,
    isFetched,
    isFetching,
    isLoading,
  } = useGetCategories();
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
  const popoverHandle = () => {
    if (popoverFor === "category") {
      if (categories?.length > 0) {
        return (
          <CategoryPopover
            handlePopoverOpenSub={handlePopoverOpenSub}
            catImageUrl={catImageUrl}
            openSub={openSub}
            anchorElSub={anchorElSub}
            subCategory={subCategory}
            handlePopoverCloseSub={handlePopoverCloseSub}
            categories={categories}
          />
        );
      }
    } else {
      return <NavStorePopover />;
    }
  };

  return (
    <CustomStackFullWidth>
      <Popover
        disableScrollLock={true}
        id={popoverDivId}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: getLanguage() === "rtl" ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: getLanguage() === "rtl" ? "right" : "left",
        }}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        //onClose={handlePopoverClose}
      >
        {popoverHandle()}
      </Popover>
    </CustomStackFullWidth>
  );
};

export default NavPopover;
