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
import Shop from "./module-wise-components/ecommerce";
import { ModuleTypes } from "../../helper-functions/moduleTypes";
import FoodModule from "./module-wise-components/food";
import Parcel from "./module-wise-components/parcel/Index";
import useGetLastOrderWithoutReview from "../../api-manage/hooks/react-query/review/useGetLastOrderWithoutReview";
import { getToken } from "../../helper-functions/getToken";
import CustomModal from "../modal";
import LastOrderReview from "./LastOrderReview";
import useReviewReminderCancel from "../../api-manage/hooks/react-query/review/useReviewReminderCancel";

export const HomeComponentsWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  gap: "8px",
}));

const HomePageComponents = ({ configData }) => {
  const [wishListsData, setWishListsData] = useState();
  const [orderId, setOrderId] = useState(null);
  const [open, setOpen] = useState(false);
  const { modules } = useSelector((state) => state.storedData);
  const matches = useMediaQuery("(max-width:1180px)");
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { search } = router.query;
  const dispatch = useDispatch();

  const reviewReminder = (res) => {
    if (res?.order_id) {
      setOrderId(res?.order_id);
      setOpen(true);
    }
  };
  const reviewReminderCancel = (res) => {
    setOpen(false);
  };
  const { refetch: lastReviewRefetch, data } =
    useGetLastOrderWithoutReview(reviewReminder);

  const { refetch: cancelReviewRefetch } = useReviewReminderCancel(
    reviewReminderCancel,
    orderId
  );
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
  useEffect(() => {
    if (getToken()) {
      lastReviewRefetch();
    }
  }, []);

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

  const handleClose = () => {
    if (orderId) {
      cancelReviewRefetch();
    }
  };
  const handleRateButtonClick = () => {
    router.push(`/rate-and-review/${orderId}`, undefined, {
      shallow: true,
    });
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
            <SearchWithTitle
              zoneid={zoneid}
              token={token}
              query={router.query.search}
              name={router.query.name}
            />
          </CustomStackFullWidth>
        </CustomStackFullWidth>
        {/*SEARCH ARE HAPPENING hERE*/}
        {router.query.search ? (
          <SearchResult
            key={router.query.id}
            searchValue={router.query.search}
            name={router.query.name}
            isSearch={router.query.fromSearch}
            fromAllCategories={router.query.from}
            configData={configData}
          />
        ) : (
          <Box width="100%">{getModuleWiseComponents()}</Box>
        )}
      </CustomStackFullWidth>
      {open && (
        <CustomModal openModal={open} handleClose={handleClose}>
          <LastOrderReview
            handleClose={handleClose}
            handleRateButtonClick={handleRateButtonClick}
            productImage={data?.images}
          />
        </CustomModal>
      )}
    </PushNotificationLayout>
  );
};

export default React.memo(HomePageComponents);
