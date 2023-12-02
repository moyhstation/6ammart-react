import React from "react";
import { CustomBoxFullWidth } from "../../styled-components/CustomStyles.style";
import { Grid } from "@mui/material";
import { Skeleton } from "@mui/material";

const Shimmer = () => {
  return (
    <CustomBoxFullWidth>
      <Grid container spacing={3}>
        {[...Array(2)].map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Skeleton variant="rectangular" width="100%" height="10rem" />
            </Grid>
          );
        })}
      </Grid>
    </CustomBoxFullWidth>
  );
};

export default Shimmer;
