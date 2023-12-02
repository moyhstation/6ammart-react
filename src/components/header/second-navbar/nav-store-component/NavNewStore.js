import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useGetLatestStore from "../../../../api-manage/hooks/react-query/store/useGetLatestStore";
import { getModuleId } from "../../../../helper-functions/getModuleId";
import { setNewStores } from "../../../../redux/slices/storedData";
import {
  CustomStackFullWidth,
  CustomTypographyGray,
} from "../../../../styled-components/CustomStyles.style";
import ViewMore from "../ViewMore";
import NavStoreShimmer from "./NavStoreShimmer";
import { getCurrentModuleType } from "../../../../helper-functions/getCurrentModuleType";

const NavNewStore = () => {
  const { configData } = useSelector((state) => state.configData);
  const { t } = useTranslation();
  const newText = t("New On");
  const router = useRouter();
  const { data, refetch, isFetching } = useGetLatestStore();
  const { newStores } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (newStores.length === 0) {
      refetch();
    }
  }, []);
  useEffect(() => {
    if (data) {
      dispatch(setNewStores(data?.stores));
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
  return (
    <CustomStackFullWidth spacing={4}>
      <Typography variant="h7" fontWeight="500">
        {`${newText} ${configData?.business_name}`}
      </Typography>
      <Stack width="100%" spacing={2.5}>
        {!isFetching ? (
          <>
            {newStores?.slice(0, 6).map((store) => {
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
                      lineHeight: "20px",
                      transition: "all ease 0.5s",
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
          <ViewMore redirect="/store/latest" />
        </Stack>
      </Stack>
    </CustomStackFullWidth>
  );
};

export default NavNewStore;
