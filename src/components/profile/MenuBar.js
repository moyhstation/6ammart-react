import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import {
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ListItemText from "@mui/material/ListItemText";
import { menuData } from "../header/second-navbar/account-popover/menuData";
import CustomImageContainer from "../CustomImageContainer";

const MenuBar = (props) => {
  const { configData, t } = props;
  const router = useRouter();
  const activeRoute = (routeName, currentRoute) => {
    return routeName.toLowerCase() === currentRoute;
  };
  return (
    <List>
      <Typography
        sx={{
          padding: "0px 0px 30px 0px",
          color: (theme) => theme.palette.neutral[1000],
          fontSize: "26px",
          fontWeight: "700",
          textAlign: "center",
          marginTop: "12px",
        }}
      >
        {t("Your Profile")}
      </Typography>
      {menuData.map((item, index) => {
        if (
          (configData?.customer_wallet_status === 0 && item?.id === 4) ||
          (configData?.loyalty_point_status === 0 && item?.id === 5) ||
          (configData?.ref_earning_status === 0 && item?.id === 6)
        ) {
          return null;
        } else {
          return (
            <Link href={`${item?.path}`} key={index}>
              <Grid container md={12} xs={12}>
                <Grid md={12} xs={12}>
                  <MenuItem selected={activeRoute(item?.path, router.pathname)}>
                    <ListItem key={index}>
                      <ListItemIcon>
                        {item?.icon}
                        {/*<CustomImageContainer*/}
                        {/*  width="26px"*/}
                        {/*  height="26px"*/}
                        {/*  src={item?.icon.src}*/}
                        {/*  alt={item?.name}*/}
                        {/*/>*/}
                      </ListItemIcon>
                      <ListItemText primary={t(item?.name)} />
                    </ListItem>
                  </MenuItem>
                  <Divider />
                </Grid>
              </Grid>
            </Link>
          );
        }
      })}
    </List>
  );
};

MenuBar.propTypes = {};

export default MenuBar;
