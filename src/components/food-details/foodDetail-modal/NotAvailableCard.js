import React from "react";
import { Typography, Box, Stack } from "@mui/material";
// import { isAvailable } from '../../utils/customFunctions'
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import moment from "moment/moment";

const NotAvailableCard = ({ endTime, startTime }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Box textAlign="center">
      <Box
        bgcolor={(theme) => theme.palette.error.info}
        borderRadius="10px"
        padding=".8rem"
        mt={{ xs: "7px" }}
      >
        <Stack spacing={0.5} alignItems="center">
          <Typography
            color={(theme) => theme.palette.whiteContainer.main}
            variant="h6"
          >
            {t("Not Available now")}
          </Typography>

          <Typography>{t("Available Form")}</Typography>
          <Typography>{`${moment(startTime, ["HH:mm"]).format(
            "hh:mm a"
          )} - ${moment(endTime, ["HH:mm"]).format("hh:mm a")}`}</Typography>
        </Stack>
      </Box>
    </Box>
  );
};
export default NotAvailableCard;
