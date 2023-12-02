import React, { useEffect, useState } from "react";
import useGetTypeWiseStore from "../../api-manage/hooks/react-query/typewise-store/useGetTypeWiseStore";
import { Box } from "@mui/system";
import { Card, Grid } from "@mui/material";
import StoresInfoCard from "../home/stores-with-filter/cards-grid/StoresInfoCard";
import { getModuleId } from "../../helper-functions/getModuleId";
import { useSelector } from "react-redux";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import GroupButtons from "../GroupButtons";
import { Skeleton } from "@mui/material";
import Shimmer from "../home/stores-with-filter/Shimmer";
import useMediaQuery from "@mui/material/useMediaQuery";
import StoreCard from "../cards/StoreCard";

const StoreList = ({ storeType, type, setType, data }) => {
  const { selectedModule } = useSelector((state) => state.utilsData);
  const matchesXs = useMediaQuery("(max-width:470px)");
  const { configData } = useSelector((state) => state.configData);
  const store_image_url = `${configData?.base_urls?.store_image_url}`;
  return (
    <Box marginTop="20px" minHeight="60vh">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="flex-start"
      // alignItems="center"
      >
        {selectedModule?.module_type === "food" && (
          <Grid item xs={12} sm={12} md={12} align="center">
            <CustomStackFullWidth alignItems="center" justifyContent="center">
              <GroupButtons setType={setType} type={type} />
            </CustomStackFullWidth>
          </Grid>
        )}

        {data?.map((store) => {
          return (
            <Grid
              key={store?.id}
              item
              xs={matchesXs ? 12 : 6}
              sm={6}
              md={3}
            >
              <StoreCard
                item={store}
                imageUrl={`${configData?.base_urls?.store_cover_photo_url}/${store?.cover_photo}`}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default StoreList;
