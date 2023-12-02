import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/system";
import { Typography, useTheme } from "@mui/material";
import ClosedNowOverlay from "./ClosedNowOverlay";

const ClosedNow = (props) => {
  const { active, open, borderRadius } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  if (active) {
    if (open === 0) {
      return <ClosedNowOverlay borderRadius={borderRadius} />;
    }
  } else {
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
          borderRadius: borderRadius ? borderRadius : "8px",
        }}
      >
        <Typography
          align="center"
          color={theme.palette.neutral[100]}
          sx={{
            fontSize: "10px",
          }}
        >
          {t("Closed Now")}
        </Typography>
      </Stack>
    );
  }
};

ClosedNow.propTypes = {};

export default ClosedNow;
