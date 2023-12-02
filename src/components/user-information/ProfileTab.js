import { Button, Popover, Typography, useTheme } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  UserProfileTab,
  UserProfileTabs,
} from "../../styled-components/CustomStyles.style";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getToken } from "../../helper-functions/getToken";

const ProfileTab = ({
  page,
  menuData,
  marginright,
  fontSize,
  padding,
  handlePage,
  borderRadius,
  deleteUserHandler,
}) => {
  const theme = useTheme();
  const tabMenu = menuData?.filter((item) => item?.id !== 10);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = (item) => {
    handlePage(item);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickDelete = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const { query } = router;

  return (
    <Stack
      width="100%"
      padding={{
        xs: "5px 6px 0px 0px",
        md: padding ? padding : "15px 15px 15px 15px",
      }}
      direction="row"
      justifyContent="space-between"
    >
      <UserProfileTabs
        value={page}
        indicatorColor="none"
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabMenu?.map((item, index) => {
          return (
            <Box key={index}>
              <UserProfileTab
                marginright={marginright}
                fontSize={fontSize}
                item={item}
                page={page}
                onClick={() => handleClick(item)}
                value={page}
                borderRadius={borderRadius}
              >
                <Typography
                  fontWeight={item?.name === page ? "600" : "400"}
                  color={
                    item?.name === page
                      ? theme.palette.primary.main
                      : theme.palette.neutral[400]
                  }
                  sx={{
                    transition: "all ease 0.3s",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                  fontSize={{
                    xs: "12px",
                    md:
                      item?.name === page
                        ? "16px"
                        : fontSize
                          ? fontSize
                          : "14px",
                  }}
                >
                  {" "}
                  {t(item?.name.replace("-", " "))}
                </Typography>
              </UserProfileTab>
            </Box>
          );
        })}
      </UserProfileTabs>
      {getToken() && query?.page === "profile-settings" && (
        <MoreVertIcon
          aria-describedby={id}
          variant="contained"
          onClick={handleClickDelete}
          sx={{ cursor: "pointer" }}
        />
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Button
          sx={{ p: 2, color: (theme) => theme.palette.error.main }}
          onClick={deleteUserHandler}
        >
          {t("Delete your account")}
        </Button>
      </Popover>
    </Stack>
  );
};

export default ProfileTab;
//
