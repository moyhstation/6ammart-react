import React from "react";
import { alpha, IconButton, MenuItem, MenuList, Popover } from "@mui/material";
import { menuData } from "../header/second-navbar/account-popover/menuData";
import { useSelector } from "react-redux";
import { t } from "i18next";
import { Stack, styled } from "@mui/system";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRouter } from "next/router";

const StyledMenuItem = styled(MenuItem)(({ theme, page, menu }) => ({
  backgroundColor:
    page === menu?.name && alpha(theme.palette.footer.inputButton, 0.1),
  minHeight: "30px",
  height: "38px",
  lineHeight: "30px",
  borderRadius: "5px",
  fontSize: "12px",
  "&:hover": {
    backgroundColor: (theme) => theme.palette.primary.semiLight,
  },
}));
const ProfileTabPopover = (props) => {
  const { deleteUserHandler, anchorEl, onClose, open, page, ...other } = props;
  const { configData } = useSelector((state) => state.configData);
  const router = useRouter();
  const handleClick = (item) => {
    router.push({
      pathname: "/profile",
      query: {
        page: item?.name,
      },
    });
    onClose();
  };
  return (
    <Popover
      disableScrollLock={true}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          width: 235,
          top: "56px !important",
          left: "157px !important",
          borderRadius: "0px",
        },
      }}
      transitionDuration={2}
      {...other}
    >
      <Stack paddingRight="10px" alignItems="flex-end">
        <IconButton onClick={onClose}>
          <CloseRoundedIcon sx={{ width: "15px", height: "15px" }} />
        </IconButton>
      </Stack>
      <MenuList
        sx={{
          paddingInlineStart: "15px",
          paddingInlineEnd: "24px",
          paddingBottom: "50px",
        }}
      >
        {menuData?.map((menu, index) => {
          if (
            (configData?.customer_wallet_status === 0 && menu?.id === 4) ||
            (configData?.loyalty_point_status === 0 && menu?.id === 5) ||
            (configData?.ref_earning_status === 0 && menu?.id === 6)
          ) {
            return null;
          } else {
            return (
              <StyledMenuItem
                key={index}
                sx={{ textTransform: "capitalize" }}
                page={page}
                menu={menu}
                onClick={() => handleClick(menu)}
              >
                {t(menu?.name?.replace("-", " "))}
              </StyledMenuItem>
            );
          }
        })}
        <StyledMenuItem
          page={page}
          menu={{ name: "delete" }}
          onClick={deleteUserHandler}
        >
          {t("Delete Your Account")}
        </StyledMenuItem>
      </MenuList>
    </Popover>
  );
};

export default ProfileTabPopover;
