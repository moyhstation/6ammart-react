import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { alpha, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { t } from "i18next";
import { useRouter } from "next/router";
import CollapsableMenu from "./CollapsableMenu";
import Slide from "@mui/material/Slide";
import useGetLatestStore from "../../../../api-manage/hooks/react-query/store/useGetLatestStore";
import { useGetCategories } from "../../../../api-manage/hooks/react-query/all-category/all-categorys";
import useGetPopularStore from "../../../../api-manage/hooks/react-query/store/useGetPopularStore";
import { CustomChip } from "../../../../styled-components/CustomStyles.style";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbar } from "../../../srollbar";
import ButtonsContainer from "./ButtonsContainer";
import { getStoresOrRestaurants } from "../../../../helper-functions/getStoresOrRestaurants";
import { getModuleId } from "../../../../helper-functions/getModuleId";
import CallToAdmin from "../../../CallToAdmin";
import { setPopularStores } from "../../../../redux/slices/storedData";
import { Stack } from "@mui/system";
import ThemeSwitches from "../ThemeSwitches";
import CustomLanguage from "../language/CustomLanguage";

const MobileTopMenu = ({
  handleRoute,
  toggleDrawer,
  setOpenDrawer,
  handleLogout,
  openModal,
  isLogoutLoading,
  setOpenModal,
}) => {
  const { wishLists } = useSelector((state) => state.wishList);
  const router = useRouter();
  let token = undefined;
  let location = undefined;
  if (typeof window !== undefined) {
    location = localStorage.getItem("location");
    token = localStorage.getItem("token");
  }
  const { configData, countryCode, language } = useSelector(
    (state) => state.configData
  );
  const { data: categoriesData, refetch } = useGetCategories();
  const { data: latestStore, refetch: refetchStore } = useGetLatestStore();
  const type = "all";
  const pageLimit = 12;
  const {
    data,
    refetch: popularRefetch,
    isFetching,
  } = useGetPopularStore({
    type,
    offset: 1,
    limit: pageLimit,
  });
  const { popularStores } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (popularStores.length === 0) {
      popularRefetch();
    }
  }, []);
  useEffect(() => {
    if (
      data &&
      data?.pages?.length > 0 &&
      data?.pages?.[0]?.stores?.length > 0
    ) {
      dispatch(setPopularStores(data?.pages?.[0]?.stores));
    }
  }, [data]);
  useEffect(() => {
    if (getModuleId()) {
      refetch();
      refetchStore();
    }
  }, []);

  const collapsableMenu = {
    cat: {
      text: "Categories",
      items: categoriesData?.data?.map((item) => item),
      path: "/category",
    },
    latest: {
      text: `Latest ${getStoresOrRestaurants()}`,
      items: latestStore?.stores?.slice(0, 12)?.map((i) => i),
      path: "/store",
    },
    popularStore: {
      text: `Popular ${getStoresOrRestaurants()}`,
      items: popularStores?.map((i) => i),
      path: "/store",
    },
    profile: {
      text: "Profile",
    },
  };
  const getWishlistCount = () => {
    return wishLists?.item?.length + wishLists?.store?.length;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "auto",
        height: "100%",
        justifyContent: "space-between",
      }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ paddingX: "20px" }}>
        <Scrollbar style={{ maxHeight: "500px" }}>
          <List component="nav" aria-labelledby="nested-list-subheader">
            <>
              <ListItemButton
                sx={{
                  marginTop: "30px",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.3),
                  },
                }}
              >
                <ListItemText
                  sx={{ fontSize: "12px" }}
                  primary={t("Home")}
                  onClick={() => handleRoute("/home")}
                />
              </ListItemButton>
              {location && (
                <>
                  <CollapsableMenu
                    value={collapsableMenu.cat}
                    setOpenDrawer={setOpenDrawer}
                    toggleDrawers={toggleDrawer}
                    pathName="/categories"
                    forcategory="true"
                  />
                  <CollapsableMenu
                    value={collapsableMenu.latest}
                    setOpenDrawer={setOpenDrawer}
                    toggleDrawers={toggleDrawer}
                    pathName="/store/popular"
                  />
                  <CollapsableMenu
                    value={collapsableMenu.popularStore}
                    setOpenDrawer={setOpenDrawer}
                    toggleDrawers={toggleDrawer}
                    pathName="/store/latest"
                  />
                </>
              )}
              <ListItemButton>
                <ListItemText>{t("Theme Mode")}</ListItemText>
                <ThemeSwitches noText />
              </ListItemButton>
              <ListItemButton>
                <ListItemText>{t("Language")}</ListItemText>
                <CustomLanguage
                  countryCode={countryCode}
                  language={language}
                  noText
                />
              </ListItemButton>
              {/*{token && (*/}
              {/*  <>*/}
              {/*    {router.pathname === "/" && (*/}
              {/*      <ListItemButton*/}
              {/*        sx={{*/}
              {/*          "&:hover": {*/}
              {/*            backgroundColor: (theme) =>*/}
              {/*              alpha(theme.palette.primary.main, 0.3),*/}
              {/*          },*/}
              {/*        }}*/}
              {/*      >*/}
              {/*        <ListItemText*/}
              {/*          primary={t("Favorites")}*/}
              {/*          onClick={() => handleRoute("wishlist")}*/}
              {/*        />*/}
              {/*        <CustomChip*/}
              {/*          label={getWishlistCount()}*/}
              {/*          color="secondary"*/}
              {/*        />*/}
              {/*      </ListItemButton>*/}
              {/*    )}*/}
              {/*  </>*/}
              {/*)}*/}
            </>
          </List>
        </Scrollbar>
      </Box>
      <ButtonsContainer
        token={token}
        handleRoute={handleRoute}
        handleLogout={handleLogout}
        openModal={openModal}
        isLogoutLoading={isLogoutLoading}
        setOpenModal={setOpenModal}
      />
    </Box>
  );
};

export default MobileTopMenu;
