import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { Grid, IconButton, Typography } from "@mui/material";
import CustomSideDrawer from "../side-drawer/CustomSideDrawer";
import MenuBar from "./MenuBar";
import MenuIcon from "@mui/icons-material/Menu";
const SideDrawer = ({ t }) => {
  const theme = useTheme();
  const router = useRouter();
  const { title } = router.query;
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  return (
    <>
      <Grid item xs={2}>
        <IconButton variant="outlined" onClick={() => setSideDrawerOpen(true)}>
          <MenuIcon
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          />
        </IconButton>
      </Grid>
      <CustomSideDrawer
        open={sideDrawerOpen}
        onClose={() => setSideDrawerOpen(false)}
        anchor="left"
      >
        <MenuBar t={t} />
      </CustomSideDrawer>
    </>
  );
};

SideDrawer.propTypes = {};

export default SideDrawer;
