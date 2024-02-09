import React, { useEffect } from "react";
import {
  CustomStackFullWidth,
  CustomTypographyGray,
} from "../../../../styled-components/CustomStyles.style";
//import Subtitle1 from "../../../typographies/Subtitle1";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import useGetPopularStore from "../../../../api-manage/hooks/react-query/store/useGetPopularStore";
import ViewMore from "../ViewMore";
import NavStoreShimmer from "./NavStoreShimmer";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getModuleId } from "../../../../helper-functions/getModuleId";
import { getStoresOrRestaurants } from "../../../../helper-functions/getStoresOrRestaurants";
import { setPopularStores } from "../../../../redux/slices/storedData";
import { getCurrentModuleType } from "../../../../helper-functions/getCurrentModuleType";

const NavPopularStore = () => {
  const { t } = useTranslation();
  const type = "all";
  const filterBy = "all";
  const router = useRouter();
  const pageLimit = 12;
  const { data, refetch, isFetching } = useGetPopularStore({
    type,
    offset: 1,
    limit: pageLimit,
  });
  const { popularStores } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (popularStores.length === 0) {
      refetch();
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

  const handleClick = (item) => {
    router.push({
      pathname: "/store/[id]",
      query: {
        id: `${item?.slug ? item?.slug : item?.id}`,
        module_id: `${getModuleId()}`,
        module_type: getCurrentModuleType(),
        store_zone_id: `${item?.zone_id}`,
        distance: item?.distance,
      },
    });
  };
  const popular = t("Popular");
  return (
    <CustomStackFullWidth spacing={4}>
      <Typography variant="h7" fontWeight="500">
        {t(`${popular} ${getStoresOrRestaurants()}`)}
      </Typography>
      <Stack width="100%" spacing={2.5}>
        {!isFetching ? (
          <>
            {popularStores?.length > 0 &&
              popularStores?.slice(0, 6).map((store) => {
                return (
                  <Stack
                    key={store.id}
                    width="100%"
                    onClick={() => handleClick(store)}
                  >
                    <CustomTypographyGray
                      variant="subtitle2"
                      sx={{
                        fontWeight: "400",
                        cursor: "pointer",
                        transition: "all ease 0.5s",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        "&:hover": {
                          letterSpacing: "0.02em",
                          color: (theme) => theme.palette.primary.main,
                        },
                      }}
                    >
                      {store.name}
                    </CustomTypographyGray>
                  </Stack>
                );
              })}
          </>
        ) : (
          <Stack width="100%">
            <NavStoreShimmer />
          </Stack>
        )}
        <Stack width="70%" justifyContent="flex-start" alignItems="center">
          <ViewMore redirect="/store/popular" />
        </Stack>
      </Stack>
    </CustomStackFullWidth>
  );
};

export default NavPopularStore;
