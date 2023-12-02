import React, { useEffect, useState } from "react";
import NavigationButtons from "./NavigationButtons";
import { useTranslation } from "react-i18next";
import useGetMyOrdersList from "../../api-manage/hooks/react-query/order/useGetMyOrdersList";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomBoxFullWidth,
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { Grid, Skeleton, useMediaQuery } from "@mui/material";
import CustomEmptyResult from "../custom-empty-result";
import nodata from "../loyalty-points/assets/Search.svg";
import Order, { CustomPaper } from "./order";
import CustomPagination from "../custom-pagination";
import { data_limit } from "../../api-manage/ApiRoutes";
import { setCurrentTab, setOrderType } from "../../redux/slices/utils";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import useGetTrackOrderData from "../../api-manage/hooks/react-query/order/useGetTrackOrderData";
import TabsTypeOne from "../custom-tabs/TabsTypeOne";
import { getItemsOrFoods } from "../../helper-functions/getItemsOrFoods";
import { getStoresOrRestaurants } from "../../helper-functions/getStoresOrRestaurants";
import active from "./assets/active_image.png";
import past from "./assets/past_image.png";
import { Stack } from "@mui/system";

const CustomShimmerCard = ({ isXs }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <CustomBoxFullWidth>
      <Grid container spacing={3}>
        {[...Array(6)].map((item, index) => {
          return (
            <Grid item xs={12} sm={isXs ? 12 : 6} md={12} lg={12} key={index}>
              <CustomPaper>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    width="100%"
                  >
                    <Skeleton
                      variant="rectangular"
                      width={isSmall ? "100px" : "90px"}
                      height={isSmall ? "100px" : "72px"}
                    />
                    <Stack width="100%" spacing={0.5}>
                      <Skeleton
                        variant="text"
                        width="200px"
                        height={isSmall ? "15px" : "20px"}
                      />
                      <Skeleton
                        variant="text"
                        width="130px"
                        height={isSmall ? "15px" : "20px"}
                      />
                      <Skeleton
                        variant="text"
                        width="130px"
                        height={isSmall ? "15px" : "20px"}
                      />
                      {isSmall && (
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Skeleton
                            variant="text"
                            width="100px"
                            height="20px"
                          />
                          <Skeleton
                            variant="text"
                            width="100px"
                            height="35px"
                          />
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                  {!isSmall && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Skeleton variant="text" width="130px" height="40px" />
                      <Skeleton variant="text" width="130px" height="60px" />
                    </Stack>
                  )}
                </Stack>
              </CustomPaper>
            </Grid>
          );
        })}
      </Grid>
    </CustomBoxFullWidth>
  );
};

const MyOrders = (props) => {
  const tabsData = [
    {
      title: "ongoing",
      img: active,
    },
    {
      title: "previous",
      img: past,
    },
  ];

  const theme = useTheme();
  const { configData } = props;
  const { t } = useTranslation();
  const isXs = useMediaQuery("(max-width:700px)");
  const { orderType, currentTab } = useSelector((state) => state.utilsData);
  const [offset, setOffSet] = useState(1);
  const dispatch = useDispatch();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const orderTypeValue = orderType === 0 ? "running-orders" : "list";

  const { data, refetch, isFetching } = useGetMyOrdersList({
    orderType: orderTypeValue,
    offset: offset,
  });

  useEffect(() => {
    refetch();
    dispatch(setOrderType(orderType === 0 ? 0 : 1));
  }, [orderType, offset]);

  useEffect(() => {
    if (currentTab) {
      setOffSet(1);
      dispatch(setOrderType(currentTab === "ongoing" ? 0 : 1));
    }
  }, [currentTab]);
  // useEffect(() => {
  //   dispatch(setCurrentTab("ongoing"));
  // }, []);
  useEffect(() => {
    if (isFetching) {
      toast.loading(t("Getting Order List..."));
    } else {
      toast.dismiss();
    }
  }, [isFetching]);
  const handleInnerContent = () => {
    if (data) {
      if (data?.orders?.length === 0) {
        return (
          <CustomEmptyResult
            image={nodata}
            label="No Orders Found"
            width="128px"
            height="128px"
          />
        );
      } else {
        return (
          <Grid container spacing={2}>
            {data &&
              data?.orders?.length > 0 &&
              data?.orders?.map((order, index) => (
                <Grid
                  item
                  xs={12}
                  sm={isXs ? 12 : 6}
                  md={12}
                  lg={12}
                  key={order?.id}
                >
                  <Order
                    index={index}
                    order={order}
                    t={t}
                    configData={configData}
                    dispatch={dispatch}
                  />
                </Grid>
              ))}
          </Grid>
        );
      }
    } else {
      return <CustomShimmerCard isXs={isXs} />;
    }
  };
  return (
    <CustomStackFullWidth
      spacing={2}
      sx={{
        minHeight: "80vh",
        padding: isSmall ? "10px 10px 10px 10px" : "20px 20px 20px 27px",
      }}
    >
      <TabsTypeOne
        tabs={tabsData}
        currentTab={currentTab}
        t={t}
        width="33px !important"
      />
      {/*<NavigationButtons t={t} setOffset={setOffSet} />*/}

      <CustomStackFullWidth spacing={3}>
        {handleInnerContent()}
        {data?.total_size > data_limit && (
          <CustomPagination
            total_size={data?.total_size}
            page_limit={data_limit}
            offset={offset}
            setOffset={setOffSet}
          />
        )}
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default MyOrders;
