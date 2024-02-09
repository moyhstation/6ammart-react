import React, { useState } from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { TextField, useMediaQuery } from "@mui/material";
import { t } from "i18next";
import { PrimaryButton } from "../Map/map.style";
import { Stack, styled } from "@mui/system";
import { useTheme } from "@emotion/react";
import TrackParcelOrderDrawer from "../home/module-wise-components/parcel/TrackParcelOrderDrawer";
import toast from "react-hot-toast";
import CustomPhoneInput from "../custom-component/CustomPhoneInput";
import { useSelector } from "react-redux";
import { getLanguage } from "../../helper-functions/getLanguage";
import { getToken } from "../../helper-functions/getToken";

export const TrackButton = styled(PrimaryButton)(
  ({ theme, fontSize, smPadding, minWidth, radius }) => ({
    fontWeight: "400",

    width: "100%",
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
  const { configData } = useSelector((state) => state.configData);
  const [phoneOrEmail, setPhoneOrEmail] = useState();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const token = getToken();
  const lanDirection = getLanguage() ? getLanguage() : "ltr";
  const handleClick = () => {
    if (orderId) {
      if (!token) {
        if (phoneOrEmail) {
          setSideDrawerOpen(true);
        } else {
          toast.error("Need a contact number");
        }
      } else {
        setSideDrawerOpen(true);
      }
    } else {
      toast.error("Need a order id");
    }
  };
  const handleOnChange = (value) => {
    setPhoneOrEmail(`+${value}`);
  };

  return (
    <CustomStackFullWidth justifyContent="center" alignItems="center">
      <Stack spacing={1} direction="row" width="100%" justifyContent="center">
        <Stack
          maxWidth={{ xs: "252px", sm: "252px", md: token ? "452px" : "700px" }}
          width="100%"
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={1}
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
          {!token && (
            <CustomPhoneInput
              value={phoneOrEmail}
              onHandleChange={handleOnChange}
              initCountry={configData?.country}
              // touched={loginFormik.touched.phone}
              // errors={loginFormik.errors.phone}
              lanDirection={lanDirection}
              height={isSmall ? "35px" : "43px"}
              borderRadius="8px"
            />
          )}

          <Stack maxWidth={isSmall ? "100%" : "120px"} width="100%">
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
      </Stack>
      {sideDrawerOpen && (
        <TrackParcelOrderDrawer
          orderId={orderId}
          sideDrawerOpen={sideDrawerOpen}
          setSideDrawerOpen={setSideDrawerOpen}
          phoneOrEmail={phoneOrEmail}
        />
      )}
    </CustomStackFullWidth>
  );
};

export default TrackParcelFromHomePage;
