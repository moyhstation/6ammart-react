import React, { useEffect } from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import H1 from "../typographies/H1";
import { Grid, Typography } from "@mui/material";
import CampaignCard from "./CampaignCard";
import useGetBasicCampaigns from "../../api-manage/hooks/react-query/useGetBasicCampaigns";
import { Skeleton } from "@mui/material";

const CampaignsPage = () => {
  const { data, refetch, isLoading, isFetching } = useGetBasicCampaigns();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <CustomStackFullWidth>
      <CustomPaperBigCard>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <H1 text="Campaigns" />
          </Grid>

          {data?.length > 0 &&
            data?.map((camp, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CampaignCard data={camp} />
              </Grid>
            ))}
          {isLoading && (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangle" width="100%" height="400px" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangle" width="100%" height="400px" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangle" width="100%" height="400px" />
              </Grid>
            </>
          )}
        </Grid>
      </CustomPaperBigCard>
    </CustomStackFullWidth>
  );
};

export default CampaignsPage;
