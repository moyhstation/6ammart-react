import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Skeleton, Stack, Typography, useTheme } from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import { t } from "i18next";
import moment from "moment";

const MiddleSection = ({ campaignsDetails, image }) => {
  const theme = useTheme();
  return (
    <CustomStackFullWidth spacing={1} sx={{ paddingLeft: "1.6rem" }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <CustomImageContainer
          src={image}
          width="100px"
          borderRadius=".6rem"
          objectfit="contain"
        />
        <Stack justifyContent="center" alignItems="flex-start">
          <Typography fontWeight="600" variant="h6">
            {campaignsDetails?.title}
          </Typography>
          <Typography variant="subtitle2">
            {campaignsDetails?.description}
          </Typography>
        </Stack>
      </Stack>
      <CustomStackFullWidth spacing={0.5}>
        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">
            {t("Campaign Schedule :")}
          </Typography>
          <Typography
            fontWeight="600"
            fontSize="16px"
            color={theme.palette.primary.main}
          >
            {moment(campaignsDetails?.available_date_starts).format(
              "MMMM Do YYYY"
            )}
            -
            {moment(campaignsDetails?.available_date_ends).format(
              "MMMM Do YYYY"
            )}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">{t("Daily time: ")}</Typography>
          {campaignsDetails ? (
            <Typography
              fontWeight="600"
              fontSize="16px"
              color={theme.palette.primary.main}
            >
              {moment(campaignsDetails?.start_time, ["HH:mm"]).format(
                "hh:mm a"
              )}{" "}
              -{" "}
              {moment(campaignsDetails?.end_time, ["HH:mm"]).format("hh:mm a")}
            </Typography>
          ) : (
            <Skeleton variant="text" width="100px" />
          )}
        </Stack>
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default MiddleSection;
