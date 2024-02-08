import React, { useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HomeIcon from "@mui/icons-material/Home";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Badge, BottomNavigation, Paper } from "@mui/material";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { CustomBottomNavigationAction } from "./NavBar.style";
import { t } from "i18next";
import CardView from "../added-cart-view";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getCartListModuleWise } from "../../helper-functions/getCartListModuleWise";
import WishListCardView from "../wishlist";
import { getToken } from "../../helper-functions/getToken";

const styles = {
  maxWidth: 2000,
  width: "100%",
  height: "100%",
  padding: "0px 1rem",
  //paddingRight: "10px",
};

const BottomNav = () => {
  const { wishLists } = useSelector((state) => state.wishList);
  const { cartList } = useSelector((state) => state.cart);
  const { selectedModule } = useSelector((state) => state.utilsData);
  const totalWishList = wishLists?.item?.length + wishLists?.store?.length;
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [wishListSideDrawerOpen, setWishListSideDrawerOpen] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname.replace("/", "");
  const handleCartDrawerOpen = () => {
    setSideDrawerOpen(true);
  };
  const handleWishListsDrawerOpen = () => {
    if (getToken()) {
      setWishListSideDrawerOpen(true);
    } else {
      router.push("/auth/sign-in");
    }
  };
  // const handleChange = () => {};
  return (
    <CustomStackFullWidth>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "5px",
          width: "100%",
          zIndex: 1082,
          boxShadow: "0px -10px 10px -5px rgba(0, 0, 0, 0.2)",
        }}
        elevation={3}
      >
        <SimpleBar style={styles}>
          <BottomNavigation
            showLabels
            value={currentRoute}
            onChange={(event, newValue) => {
              if (newValue !== "cart" && newValue !== "wishlist") {
                if (newValue !== "home") {
                  if (getToken()) {
                    router.push(
                      { pathname: "/profile", query: { page: newValue } },
                      undefined,
                      {
                        shallow: true,
                      }
                    );
                  } else {
                    router.push("/auth/sign-in");
                  }
                } else {
                  router.push(`/${newValue}`);
                }
              }
            }}
          >
            <CustomBottomNavigationAction
              label={t("Home")}
              value="home"
              icon={<HomeIcon />}
            />

            <CustomBottomNavigationAction
              label={t("My Orders")}
              value="my-orders"
              icon={
                <Badge color="error">
                  <LibraryBooksIcon />
                </Badge>
              }
            />
            {selectedModule?.module_type !== "parcel" && (
              <CustomBottomNavigationAction
                onClick={() => handleCartDrawerOpen()}
                label={t("Cart")}
                value="cart"
                icon={
                  <Badge
                    badgeContent={getCartListModuleWise(cartList)?.length}
                    color="error"
                  >
                    <ShoppingCartRoundedIcon />
                  </Badge>
                }
              />
            )}

            <CustomBottomNavigationAction
              label={t("Chat")}
              value="inbox"
              icon={
                <Badge badgeContent={0} color="error">
                  <SmsRoundedIcon />
                </Badge>
              }
            />
            {!!sideDrawerOpen && (
              <CardView
                sideDrawerOpen={sideDrawerOpen}
                setSideDrawerOpen={setSideDrawerOpen}
              />
            )}
            <CustomBottomNavigationAction
              label={t("WishList")}
              value="wishlist"
              onClick={() => handleWishListsDrawerOpen()}
              icon={
                <Badge badgeContent={totalWishList} color="error">
                  <FavoriteIcon />
                </Badge>
              }
            />
          </BottomNavigation>
        </SimpleBar>
        {!!sideDrawerOpen && (
          <CardView
            sideDrawerOpen={sideDrawerOpen}
            setSideDrawerOpen={setSideDrawerOpen}
            cartList={cartList}
          />
        )}

        {!!wishListSideDrawerOpen && (
          <WishListCardView
            sideDrawerOpen={wishListSideDrawerOpen}
            setSideDrawerOpen={setWishListSideDrawerOpen}
          />
        )}
      </Paper>
    </CustomStackFullWidth>
  );
};

export default React.memo(BottomNav);
