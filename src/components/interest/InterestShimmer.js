import React from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const InterestShimmer = (props) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid container spacing={2}>
      {[...Array(16)].map((item, index) => {
        return (
          <Grid item xs={6} sm={3} md={2} lg={2} align="center" key={index}>
            <CustomPaperBigCard padding=".5rem">
              <CustomStackFullWidth spacing={1} alignItems="center">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={isSmall ? "100px" : "150px"}
                />
                <Skeleton variant="text" width="100px" />
              </CustomStackFullWidth>
            </CustomPaperBigCard>
          </Grid>
        );
      })}
    </Grid>
  );
};

InterestShimmer.propTypes = {};

export default InterestShimmer;
