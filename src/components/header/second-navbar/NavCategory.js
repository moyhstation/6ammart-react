import React, { useEffect, useLayoutEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { NavMenuLink } from "../NavBar.style";
import { useDispatch, useSelector } from "react-redux";
import NavPopover from "./NavPopover";
import { useGetCategories } from "../../../api-manage/hooks/react-query/all-category/all-categorys";
import { useGetSubCategories } from "../../../api-manage/hooks/react-query/all-category/useGetSubCategory";
import ViewMore from "./ViewMore";
import { setBasicCampaigns } from "../../../redux/slices/storedData";

const NavCategory = ({ openModal, setModal, setRestaurantModal }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const searchKey = "";
  const { configData } = useSelector((state) => state.configData);
  const catImageUrl = `${configData?.base_urls?.category_image_url}`;

  const { selectedModule } = useSelector((state) => state.utilsData);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSub, setAnchorElSub] = React.useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [enable, setEnable] = useState(false);

  const handlePopoverOpen = async (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    handlePopoverCloseSub();
    setAnchorEl(null);
  };
  const handlePopoverOpenSub = (event, category) => {
    if (category?.childes.length > 0) {
      setAnchorElSub(event.currentTarget);
      setCategoryId(category?.slug ? category?.slug : category?.id);
      setEnable(true);
    } else {
      handlePopoverCloseSub();
    }

    // handlePopoverOpen();
  };
  const open = Boolean(anchorEl);
  const openSub = Boolean(anchorElSub);
  const { data: subCategory } = useGetSubCategories(categoryId, enable);
  const handlePopoverCloseSub = () => {
    setAnchorElSub(null);
  };

  return (
    <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <NavMenuLink>
        {t("Categories")} <KeyboardArrowDownIcon />
      </NavMenuLink>
      <NavPopover
        catImageUrl={catImageUrl}
        open={open}
        openSub={openSub}
        handlePopoverOpenSub={handlePopoverOpenSub}
        handlePopoverCloseSub={handlePopoverClose}
        anchorEl={anchorEl}
        anchorElSub={anchorElSub}
        subCategory={subCategory}
        popoverFor="category"
      />
    </div>
  );
};

export default NavCategory;
