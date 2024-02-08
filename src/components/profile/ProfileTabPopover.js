import React, { useState } from "react";
import { alpha, IconButton, MenuItem, MenuList, Popover } from "@mui/material";
import { menuData } from "../header/second-navbar/account-popover/menuData";
import { useSelector } from "react-redux";
import { t } from "i18next";
import { Stack, styled } from "@mui/system";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRouter } from "next/router";
// import CustomDialogConfirm from "../../../custom-dialog/confirm/CustomDialogConfirm";
import CustomDialogConfirm from "../custom-dialog/confirm/CustomDialogConfirm";
import CustomModal from "../modal";
import DeleteAccount from "../user-information/DeleteAccount";

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
  const { deleteUserHandler,isLoadingDelete,accountDeleteStatus,setAccountDeleteStatus, anchorEl, onClose, open, page, ...other } = props;
  const { configData } = useSelector((state) => state.configData);
  const [openModal, setOpenModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const router = useRouter();

  const handleClose = () => {
    setDeleteModal(false)
    setAccountDeleteStatus(true)
  };

  const handleOpenDeleteModal= ()=>{
    onClose();
    setOpenModal(false)
    setDeleteModal(true)
  }

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
          onClick={handleOpenDeleteModal}
        >
          {t("Delete Your Account")}
        </StyledMenuItem>
      </MenuList>
      <CustomModal
        openModal={deleteModal}
        handleClose={handleClose}
      >
        <DeleteAccount
          isLoading={isLoadingDelete}
          handleClose={handleClose}
          deleteUserHandler={deleteUserHandler}
          accountDeleteStatus={accountDeleteStatus}
        />
      </CustomModal>
    </Popover>
  );
};

export default ProfileTabPopover;
