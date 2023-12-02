import React from "react";
import { styled } from "@mui/material/styles";
import { alpha, IconButton, Stack, Typography } from "@mui/material";
import { t } from "i18next";
import ClearIcon from "@mui/icons-material/Clear";
import { CustomCloseIconButton } from "./Cart.style";
const DrawerHeaderWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  padding: "1.1rem",
  background: alpha(theme.palette.primary.main, 0.1),
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
}));
const DrawerHeader = ({ CartIcon, title, closeHandler }) => {
  return (
    <DrawerHeaderWrapper>
      <Stack direction="row" spacing={1}>
        {CartIcon}
        <Typography fontSize="1rem" fontWeight="600">
          {t(title)}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <CustomCloseIconButton onClick={closeHandler}>
          <ClearIcon fontSize="16px" />
          <Typography fontSize="14px" fontWeight="400">
            {t("Close")}
          </Typography>
        </CustomCloseIconButton>
      </Stack>
    </DrawerHeaderWrapper>
  );
};

export default DrawerHeader;
