import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Card, Grid } from "@mui/material";
import { Skeleton } from "@mui/material";

const ParcelCategoryShimmer = () => {
  return (
    <CustomStackFullWidth>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: "20px" }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={4} sm={4} md={4}>
                <Skeleton width="100%" height="120px" variant="rounded" />
              </Grid>
              <Grid item xs={8} sm={8} md={8}>
                <Skeleton width="50%" height="20px" variant="text" />
                <Skeleton width="80%" height="20px" variant="text" />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: "20px" }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={4} sm={4} md={4}>
                <Skeleton width="100%" height="120px" variant="rounded" />
              </Grid>
              <Grid item xs={8} sm={8} md={8}>
                <Skeleton width="50%" height="20px" variant="text" />
                <Skeleton width="80%" height="20px" variant="text" />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: "20px" }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={4} sm={4} md={4}>
                <Skeleton width="100%" height="120px" variant="rounded" />
              </Grid>
              <Grid item xs={8} sm={8} md={8}>
                <Skeleton width="50%" height="20px" variant="text" />
                <Skeleton width="80%" height="20px" variant="text" />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

export default ParcelCategoryShimmer;
