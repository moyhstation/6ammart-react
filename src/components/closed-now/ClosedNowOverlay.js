import React from "react";
import { Stack } from "@mui/system";
import { Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const ClosedNowOverlay = ({ borderRadius }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Stack
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        background: (theme) => theme.palette.primary.overLay,
        opacity: "0.5",
        color: (theme) => theme.palette.neutral[100],
        padding: "10px",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: borderRadius ? borderRadius : ".5rem",
      }}
    >
      <Typography
        align="center"
        color={theme.palette.neutral[100]}
        fontWeight="600"
        fontSize="12px"
      >
        {t("CLOSED NOW")}
      </Typography>
    </Stack>
  );
};

ClosedNowOverlay.propTypes = {};

export default ClosedNowOverlay;
