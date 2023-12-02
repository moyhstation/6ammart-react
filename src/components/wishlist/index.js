import React from "react";
import CustomSideDrawer from "../side-drawer/CustomSideDrawer";
import WishLists from "./WishLists";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { t } from "i18next";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import DrawerHeader from "../added-cart-view/DrawerHeader";
import CartIcon from "../added-cart-view/assets/CartIcon";
import { useTheme } from "@emotion/react";

const WishListCardView = (props) => {
  const theme = useTheme();
  const closeHandler = () => {
    setSideDrawerOpen(false);
  };
  const { sideDrawerOpen, setSideDrawerOpen } = props;
  return (
    <CustomSideDrawer
      anchor="right"
      open={sideDrawerOpen}
      onClose={closeHandler}
      variant="temporary"
      maxWidth="523px"
      width="100%"
      height="100vh"
    >
      <CustomStackFullWidth>
        <DrawerHeader
          CartIcon={<FavoriteIcon sx={{ width: "20px" }} />}
          title="Wishlist"
          closeHandler={closeHandler}
        />
        <WishLists t={t} setSideDrawerOpen={setSideDrawerOpen} />
      </CustomStackFullWidth>
    </CustomSideDrawer>
  );
};

export default WishListCardView;
