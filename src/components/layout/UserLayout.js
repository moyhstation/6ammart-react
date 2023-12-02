import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";
import MenuBar from "../profile/MenuBar";
import SideDrawer from "../profile/SideDrawer";
import { styled } from "@mui/material/styles";

const CustomBodyContent = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing.unit * 3,
}));
const UserLayout = (props) => {
  const { component, configData, t } = props;
  const router = useRouter();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Grid
        container
        md={12}
        spacing={{ xs: 0, md: 3, lg: 2 }}
        sx={{ minHeight: "100vh" }}
      >
        <Grid
          container
          item
          mt="1rem"
          sx={{ display: { sm: "block", md: "none" } }}
          alignItems="center"
        >
          <SideDrawer t={t} />
        </Grid>
        <Grid
          item
          //sm={3}
          lg={2.5}
          md={3}
          xs={12}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <MenuBar configData={configData} t={t} />
        </Grid>

        <Grid item md={9} lg={9.5} xs={12}>
          <CustomBodyContent>{component}</CustomBodyContent>
        </Grid>
      </Grid>
    </>
  );
};

UserLayout.propTypes = {};

export default UserLayout;
