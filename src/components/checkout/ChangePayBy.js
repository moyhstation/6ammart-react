import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { CustomTypography } from "../landing-page/hero-section/HeroSection.style";
import { t } from "i18next";
import { alpha, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import CustomImageContainer from "../CustomImageContainer";
import senderImage from "../../../public/static/senderimage.svg";
import receiverImage from "../../../public/static/receiverimage.svg";
import { useSelector } from "react-redux";

const ChangePayBy = ({ paidBy, setPaidBy, zoneData }) => {
  const theme = useTheme();
  return (
    <CustomStackFullWidth spacing={1.1}>
      <CustomStackFullWidth>
        <CustomTypography fontWeigh="500">
          {t("Charge Paid By")}
        </CustomTypography>
      </CustomStackFullWidth>
      <CustomStackFullWidth direction="row" spacing={4}>
        <Stack
          spacing={0.5}
          sx={{ cursor: "pointer" }}
          onClick={() => setPaidBy("sender")}
        >
          <Stack
            backgroundColor={
              paidBy === "sender" && alpha(theme.palette.primary.main, 0.1)
            }
            sx={{ borderRadius: "5px" }}
            direction="row"
            alignItems="center"
            spacing={1}
            padding="8px 30px"
            border="1px solid"
            borderColor={
              paidBy === "sender"
                ? theme.palette.primary.main
                : theme.palette.neutral[400]
            }
          >
            <CustomImageContainer
              src={senderImage.src}
              height="30px"
              width="30x"
              objectfit="contain"
            />
            <Typography align="center">{t("Sender")}</Typography>
          </Stack>
        </Stack>
        {zoneData?.data?.zone_data?.[0]?.cash_on_delivery && (
          <Stack
            spacing={0.5}
            onClick={() => setPaidBy("receiver")}
            sx={{ cursor: "pointer" }}
          >
            <Stack
              //selected={paidBy === "receiver"}

              backgroundColor={
                paidBy === "receiver" && alpha(theme.palette.primary.main, 0.1)
              }
              sx={{ borderRadius: "5px" }}
              direction="row"
              alignItems="center"
              spacing={1}
              padding="8px 20px"
              border="1px solid"
              borderColor={
                paidBy === "receiver"
                  ? theme.palette.primary.main
                  : theme.palette.neutral[400]
              }
            >
              <CustomImageContainer
                src={receiverImage.src}
                height="30px"
                width="30px"
                objectfit="contain"
              />
              <Typography align="center">{t("Receiver")}</Typography>
            </Stack>
          </Stack>
        )}
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default ChangePayBy;
