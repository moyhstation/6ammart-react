import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CustomTimeFormat from "../../date-and-time-formators/CustomTimeFormat";
import CustomAlert from "../../alert/CustomAlert";

const NotAvailableCard = ({ endTime, startTime, moduleType }) => {
  const { t } = useTranslation();
  return (
    <Box textAlign="center">
      {moduleType === "food" ? (
        <Box
          bgcolor={(theme) => theme.palette.error.info}
          borderRadius="10px"
          padding="1rem"
          mt={{ xs: "7px" }}
        >
          <Stack spacing={1} alignItems="flex-start">
            <Typography
              color={(theme) => theme.palette.primary.main}
              variant="h6"
            >
              {t("Not Available now")}
            </Typography>
            <Typography variant="h6">
              {t("Available will be")}: <CustomTimeFormat time={startTime} /> -{" "}
              <CustomTimeFormat time={endTime} />
            </Typography>
          </Stack>
        </Box>
      ) : (
        <Stack spacing={1} alignItems="flex-start">
          <Typography
            color={(theme) => theme.palette.primary.main}
            variant="h5"
          >
            {t("Store is closed.")}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};
export default NotAvailableCard;
