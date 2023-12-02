import { CustomBoxFullWidth } from "../../styled-components/CustomStyles.style";
import { Card, Grid } from "@mui/material";
import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";

const CustomShimmerCard = () => {
  return (
    <CustomBoxFullWidth paddingLeft="1.25rem">
      <Grid container spacing={3}>
        {[...Array(3)].map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={9} sx={{ padding: "15px" }}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack
                    justifyContent="center"
                    spacing={1}
                    alignItems="center"
                  >
                    <Skeleton
                      variant="rectangular"
                      width="40px"
                      height="2.5rem"
                    />
                    <Skeleton variant="text" width="70px" height="1rem" />
                    <Skeleton variant="text" width="90px" height="1rem" />
                  </Stack>
                  <Stack alignItems="center" spacing={1} width="100%">
                    <Skeleton variant="text" width="120px" height="3.5rem" />
                    <Skeleton variant="text" width="150px" height="1rem" />
                    <Skeleton variant="text" width="150px" height="1rem" />
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </CustomBoxFullWidth>
  );
};
export default CustomShimmerCard;
