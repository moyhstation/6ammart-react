import React from "react";
import Link from "next/link";
import { Badge, IconButton, Stack, Typography, useTheme } from "@mui/material";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const NavBarIcon = ({ icon, label, user, handleClick, badgeCount }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <IconButton
          sx={{
            gap: "15px",
          }}
          onClick={() => handleClick()}
        >
          <Badge color="primary" badgeContent={badgeCount} showZero>
            {icon}
          </Badge>
          {/*<Typography color={theme.palette.neutral[1000]}>{label}</Typography>*/}
        </IconButton>
      </Stack>
    </>
  );
};

export default NavBarIcon;
