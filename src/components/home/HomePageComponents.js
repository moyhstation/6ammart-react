import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useWishListGet } from "../../api-manage/hooks/react-query/wish-list/useWishListGet";
import { setWishList } from "../../redux/slices/wishList";
import PushNotificationLayout from "../PushNotificationLayout";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import { Box, Stack } from "@mui/system";
import TopBanner from "./top-banner";
import SearchWithTitle from "./SearchWithTitle";
import SearchResult from "./search";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import Grocery from "./module-wise-components/Grocery";
import Pharmacy from "./module-wise-components/pharmacy/Pharmacy";
import CustomContainer from "../container";
import Shop from "./module-wise-components/ecommerce";
import { ModuleTypes } from "../../helper-functions/moduleTypes";
import FoodModule from "./module-wise-components/food";
import Parcel from "./module-wise-components/parcel/Index";
import useGetGuest from "../../api-manage/hooks/react-query/guest/useGetGuest";
import useGetAllCartList from "../../api-manage/hooks/react-query/add-cart/useGetAllCartList";
import { setCartList } from "../../redux/slices/cart";

export const HomeComponentsWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  gap: "8px",
}));

const HomePageComponents = ({ configData }) => {
  const [wishListsData, setWishListsData] = useState();
  const { modules } = useSelector((state) => state.storedData);
  const matches = useMediaQuery("(max-width:1180px)");
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { search } = router.query
  const dispatch = useDispatch();
  let zoneid = undefined;
  if (typeof window !== "undefined") {
    zoneid = localStorage.getItem("zoneid");
  }
  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const onSuccessHandler = (response) => {
    setWishListsData(response);
    dispatch(setWishList(response));
  };

  const { refetch } = useWishListGet(onSuccessHandler);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, []);
  useEffect(() => {
    window.scrollTo({ top, behavior: "smooth" });
  }, []);
  const getModule = () => {
    return JSON.parse(window.localStorage.getItem("module"));
  };

  const getModuleWiseComponents = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.GROCERY:
        return <Grocery configData={configData} />;
      case ModuleTypes.PHARMACY:
        return <Pharmacy configData={configData} />;
      case ModuleTypes.ECOMMERCE:
        return <Shop configData={configData} />;
      case ModuleTypes.FOOD:
        return <FoodModule configData={configData} />;
      case ModuleTypes.PARCEL:
        return <Parcel configData={configData} />;
    }
  };

  return (
    <PushNotificationLayout>
      <CustomStackFullWidth>
        <CustomStackFullWidth sx={{ position: "relative" }}>
          <TopBanner />
          <CustomStackFullWidth
            alignItems="center"
            justifyContent="center"
            sx={{
              position: "absolute",
              top: 0,
              height: "100%",
            }}
          >
            <SearchWithTitle zoneid={zoneid} token={token} query={router.query.search} />
          </CustomStackFullWidth>
        </CustomStackFullWidth>
        {/*SEARCH ARE HAPPENING hERE*/}
        {router.query.search ? (
          <SearchResult
            key={router.query.id}
            searchValue={router.query.search}
            configData={configData}
          />
        ) : (
          <Box width="100%">{getModuleWiseComponents()}</Box>
        )}
      </CustomStackFullWidth>
    </PushNotificationLayout>
  );
};

export default React.memo(HomePageComponents);
