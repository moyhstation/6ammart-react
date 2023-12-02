import React, { useState } from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Button, Grid, TextField, useMediaQuery } from "@mui/material";
import CustomTextFieldWithFormik from "../form-fields/CustomTextFieldWithFormik";
import { t } from "i18next";
import { PrimaryButton } from "../Map/map.style";
import { Stack, styled } from "@mui/system";
import { useTheme } from "@emotion/react";
import TrackParcelOrderDrawer from "../home/module-wise-components/parcel/TrackParcelOrderDrawer";
import toast from "react-hot-toast";
import { getToken } from "../../helper-functions/getToken";
import { not_logged_in_message } from "../../utils/toasterMessages";

export const TrackButton = styled(PrimaryButton)(
  ({ theme, fontSize, smPadding, minWidth, radius }) => ({
    fontWeight: "400",
    width: "auto",
    [theme.breakpoints.down("sm")]: {
      fontSize: fontSize ? fontSize : "12px",
      fontWeight: "400",
      padding: smPadding,
      minWidth: minWidth,
      borderRadius: radius ? radius : "2px",
    },
  })
);

const TrackParcelFromHomePage = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [orderId, setOrderId] = useState("");

  const [phoneOrEmail, setPhoneOrEmail] = useState();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const handleClick = () => {
    if (getToken()) {
      if (orderId) {
        setSideDrawerOpen(true);
      } else {
        toast.error("Need a order id");
      }
    } else {
      toast.error(not_logged_in_message);
    }
  };

  return (
    <CustomStackFullWidth justifyContent="center" alignItems="center">
      <Stack spacing={1} direction="row" width="100%" justifyContent="center">
        <Stack
          maxWidth={{ xs: "169px", sm: "252px", md: "352px" }}
          width="100%"
        >
          <TextField
            label={t("Order ID")}
            variant="outlined"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            fullWidth
            InputProps={{
              sx: {
                height: isSmall ? 35 : 43,
                backgroundColor: (theme) => theme.palette.neutral[100],
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: isSmall ? 10 : 14,
                color: "GrayText",
                top: isSmall ? "-5px" : "-4px",
              },
            }}
          />
        </Stack>

        <Stack>
          <TrackButton
            radius="8px"
            smPadding="7px 16px"
            fullWidth="true"
            onClick={handleClick}
          >
            {t("Track Now")}
          </TrackButton>
        </Stack>
      </Stack>
      {sideDrawerOpen && (
        <TrackParcelOrderDrawer
          orderId={orderId}
          sideDrawerOpen={sideDrawerOpen}
          setSideDrawerOpen={setSideDrawerOpen}
        />
      )}
    </CustomStackFullWidth>
  );
};

export default TrackParcelFromHomePage;
