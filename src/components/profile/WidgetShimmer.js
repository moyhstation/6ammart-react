import { CustomBoxFullWidth } from "../../styled-components/CustomStyles.style";
import { Grid } from "@mui/material";
import { Skeleton } from "@mui/material";

const WidgetShimmer = () => {
  return (
    <CustomBoxFullWidth>
      <Grid container spacing={3} justifyContent="center">
        {[...Array(4)].map((item, index) => {
          return (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <Skeleton variant="rectangular" width="100%" height="8rem" />
            </Grid>
          );
        })}
      </Grid>
    </CustomBoxFullWidth>
  );
};
export default WidgetShimmer;
