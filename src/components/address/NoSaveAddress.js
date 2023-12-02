import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { Stack } from "@mui/system";
import { useTheme } from "@emotion/react";

const NoSaveAddress = ({ title, descriptions, image }) => {
  const theme = useTheme();
  return (
    <CustomStackFullWidth
      justifyContent="center"
      alignItems="center"
      spacing={2.5}
    >
      {image}
      <Stack maxWidth="206px" align="center">
        {title && (
          <Typography
            fontWeight="600"
            fontSize="16px"
            color={theme.palette.neutral[1000]}
          >
            {t(title)}
          </Typography>
        )}
        {descriptions && (
          <Typography fontWeight="400" fontSize="12px">
            {t(descriptions)}
          </Typography>
        )}
      </Stack>
    </CustomStackFullWidth>
  );
};

export default NoSaveAddress;
