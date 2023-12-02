import React from "react";
import {
  CustomColouredTypography,
  CustomPaperBigCard,
  CustomStackFullWidth,
  CustomTypographyBold,
} from "../../styled-components/CustomStyles.style";
import { Grid, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

const Shimmer = () => {
  return (
    <CustomPaperBigCard>
      <CustomStackFullWidth>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <CustomStackFullWidth
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Skeleton variant="rectangle" width="100px" height="90px" />
                <Stack>
                  <CustomTypographyBold>
                    <Skeleton variant="text" width="90px" />
                  </CustomTypographyBold>
                  <CustomTypographyBold>
                    <Skeleton variant="text" width="90px" />
                  </CustomTypographyBold>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Skeleton variant="text" width="130px" />
              </Stack>
            </CustomStackFullWidth>
          </Grid>
          <Grid item xs={12} md={12}>
            <Divider sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} md={12} align="center">
            <Stack alignItems="center">
              <Skeleton variant="text" width="130px" />
              <Skeleton variant="text" width="130px" />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12} align="center">
            <Stack alignItems="center" spacing={1}>
              <Skeleton variant="text" width="130px" />
              <Skeleton variant="rectangle" height="80px" width="100%" />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12} mt="1rem">
            <Skeleton variant="rectangle" height="35px" width="100%" />
          </Grid>
        </Grid>
      </CustomStackFullWidth>
    </CustomPaperBigCard>
  );
};

export default Shimmer;
