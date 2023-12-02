import React from "react";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";
import { alpha } from "@mui/material";
import { useTranslation } from "react-i18next";

const InStockTag = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        padding: "3px 10px",
        backgroundColor: (theme) => alpha(theme.palette.info.blue, 0.1),
        color: (theme) => alpha(theme.palette.info.blue, 1),
        fontSize: "12px",
        borderRadius: "5px",
        fontWeight: "400",
        textAlign: "center",
      }}
    >
      {t("In Stock")}
    </Box>
  );
};

export default InStockTag;
