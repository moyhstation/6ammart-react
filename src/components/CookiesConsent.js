import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Stack, styled } from "@mui/system";
import CustomContainer from "./container";
import { CustomStackFullWidth } from "../styled-components/CustomStyles.style";
import { useTranslation } from "react-i18next";

const Wrapper = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: 9999,
}));

const CookiesConsent = ({ text }) => {
  const [showConsent, setShowConsent] = useState(true);
  const { t } = useTranslation();

  const handleAccept = () => {
    localStorage.setItem("cookiesConsent", "true");
    setShowConsent(false);
  };
  const handleDeny = () => {
    localStorage.setItem("cookiesConsent", "false");
    setShowConsent(false);
  };
  let cookiesConsent;
  if (typeof window !== "undefined") {
    cookiesConsent = window.localStorage.getItem("cookiesConsent");
  }

  if (!showConsent || cookiesConsent === "true") {
    return null;
  }

  return (
    <Wrapper>
      <CustomContainer>
        <CustomStackFullWidth
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography>{text}</Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="outline" color="primary" onClick={handleDeny}>
              {t("Deny")}
            </Button>
            <Button variant="contained" color="primary" onClick={handleAccept}>
              {t("Accept")}
            </Button>
          </Stack>
        </CustomStackFullWidth>
      </CustomContainer>
    </Wrapper>
  );
};

export default CookiesConsent;
