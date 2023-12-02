import React from "react";
import { Grid } from "@mui/material";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";

const Shimmer = ({ count }) => {
  const shimmerCount = Number(count);
  return (
    <Box>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {shimmerCount &&
          [...Array(shimmerCount)].map((item, index) => {
            return (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
                <Skeleton variant="rectangle" width="100%" height="260px" />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default Shimmer;
