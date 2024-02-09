import React, { useEffect } from "react";
import { Stack } from "@mui/system";
import { alpha, Grid, Typography, useTheme } from "@mui/material";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import NavPopularStore from "./nav-store-component/NavPopularStores";
import NavNewStore from "./nav-store-component/NavNewStore";
import NavFoodCampaigns from "./nav-store-component/NavFoodCampaigns";
import useGetItemCampaigns from "../../../api-manage/hooks/react-query/useGetItemCampaigns";
import useGetBasicCampaigns from "../../../api-manage/hooks/react-query/useGetBasicCampaigns";
import { useDispatch, useSelector } from "react-redux";
import { setBasicCampaigns } from "../../../redux/slices/storedData";

const NavStorePopover = () => {
  const theme = useTheme();
  const bgColor = alpha(theme.palette.primary.main, 0.2);
  const { data, refetch, isLoading, isFetching } = useGetBasicCampaigns();
  const { basicCampaigns } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (basicCampaigns.length === 0) {
      refetch();
    }
  }, []);
  useEffect(() => {
    if (data) {
      dispatch(setBasicCampaigns(data));
    }
  }, [data]);
  return (
    <Stack
      width={basicCampaigns?.length > 0 ? "843px" : "500px"}
      sx={{
        position: "relative",
        zIndex: "1",
        padding: "0px",
      }}
    >
      {basicCampaigns?.length > 0 && (
        <span
          style={{
            position: "absolute",
            zIndex: "-1",
            blockSize: "100%",
            inlineSize: "50%",
            insetInlineEnd: "0",
            insetBlockStart: "0",
            display: "block",
            backgroundColor: bgColor,
          }}
        ></span>
      )}

      <CustomStackFullWidth sx={{ padding: "2.5rem" }}>
        <Grid container spacing={2}>
          <Grid item md={basicCampaigns?.length > 0 ? 3 : 6}>
            <NavPopularStore />
          </Grid>
          <Grid item md={basicCampaigns?.length > 0 ? 3 : 6}>
            <NavNewStore />
          </Grid>
          {basicCampaigns?.length > 0 && (
            <Grid item md={6}>
              <NavFoodCampaigns
                campaigns={basicCampaigns}
                isLoading={isLoading}
              />
            </Grid>
          )}
        </Grid>
      </CustomStackFullWidth>
    </Stack>
  );
};

export default NavStorePopover;
