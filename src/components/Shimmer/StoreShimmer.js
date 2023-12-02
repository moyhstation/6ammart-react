import React from "react";
import { Card, Grid, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import { Skeleton } from "@mui/material";

const StoreShimmer = () => {
  const matches = useMediaQuery("(max-width:1475px)");
  const matchesXs = useMediaQuery("(max-width:480px)");
  return (
    <>
      <Grid item md={matches ? 3 : 2.4} sm={4} xs={matchesXs ? 12 : 6}>
        <Card sx={{ padding: "1rem" }} elevation={9}>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Skeleton width={100} height={150} sx={{ borderRadius: "50%" }} />
            <Skeleton width={150} height={20} />
            <Skeleton width={30} height={20} />
            <Skeleton width={300} height={20} />
          </Stack>
        </Card>
      </Grid>
      <Grid item md={matches ? 3 : 2.4} sm={4} xs={matchesXs ? 12 : 6}>
        <Card sx={{ padding: "1rem" }}>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Skeleton width={100} height={150} sx={{ borderRadius: "50%" }} />
            <Skeleton width={150} height={20} />
            <Skeleton width={30} height={20} />
            <Skeleton width={300} height={20} />
          </Stack>
        </Card>
      </Grid>
      <Grid item md={matches ? 3 : 2.4} sm={4} xs={matchesXs ? 12 : 6}>
        <Card sx={{ padding: "1rem" }}>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Skeleton width={100} height={150} sx={{ borderRadius: "50%" }} />
            <Skeleton width={150} height={20} />
            <Skeleton width={30} height={20} />
            <Skeleton width={300} height={20} />
          </Stack>
        </Card>
      </Grid>
      <Grid item md={matches ? 3 : 2.4} sm={4} xs={matchesXs ? 12 : 6}>
        <Card sx={{ padding: "1rem" }}>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Skeleton width={100} height={150} sx={{ borderRadius: "50%" }} />
            <Skeleton width={150} height={20} />
            <Skeleton width={30} height={20} />
            <Skeleton width={300} height={20} />
          </Stack>
        </Card>
      </Grid>
      <Grid item md={matches ? 3 : 2.4} sm={4} xs={matchesXs ? 12 : 6}>
        <Card sx={{ padding: "1rem" }}>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Skeleton width={100} height={150} sx={{ borderRadius: "50%" }} />
            <Skeleton width={150} height={20} />
            <Skeleton width={30} height={20} />
            <Skeleton width={300} height={20} />
          </Stack>
        </Card>
      </Grid>
    </>
  );
};

export default StoreShimmer;
