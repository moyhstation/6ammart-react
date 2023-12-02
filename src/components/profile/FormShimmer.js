import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { Skeleton } from "@mui/material";

const CustomShimmerForForm = () => {
  return (
    <CustomStackFullWidth mt="40px">
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <CustomStackFullWidth alignItems="center">
            <Stack spacing={2}>
              <Skeleton variant="circular" width="150px" height={150} />
            </Stack>
          </CustomStackFullWidth>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomStackFullWidth height="100%" spacing={3}>
            <Skeleton variant="rounded" width="100%" height={50} />
            <Skeleton variant="rounded" width="100%" height={50} />
          </CustomStackFullWidth>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomStackFullWidth height="100%" spacing={3}>
            <Skeleton variant="rounded" width="100%" height={50} />
            <Skeleton variant="rounded" width="100%" height={50} />
          </CustomStackFullWidth>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack
            alignItems="center"
            justifyContent="flex-end"
            width="100%"
            direction="row"
            spacing={2}
          >
            <Skeleton variant="rounded" width="100px" height={35} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomStackFullWidth height="100%" spacing={3}>
            <Skeleton variant="rounded" width="100%" height={50} />
          </CustomStackFullWidth>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomStackFullWidth height="100%" spacing={3}>
            <Skeleton variant="rounded" width="100%" height={50} />
          </CustomStackFullWidth>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack
            alignItems="center"
            justifyContent="flex-end"
            width="100%"
            direction="row"
            spacing={2}
          >
            <Skeleton variant="rectangular" width="100px" height={35} />
          </Stack>
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

export default CustomShimmerForForm;
