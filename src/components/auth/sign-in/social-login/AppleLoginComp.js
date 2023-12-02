import React from "react";
import PropTypes from "prop-types";
import AppleLogin from "react-apple-login";

import { Button, Typography } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import { useTranslation } from "react-i18next";
import { appleLoginCredential } from "../../../../utils/staticCredential";
const AppleLoginComp = (props) => {
  const credentials = appleLoginCredential;
  const { t } = useTranslation();
  const handleAppleResponse = async (res) => {

  };

  return (
    <div>
      <AppleLogin
        clientId={credentials.serviceId}
        redirectURI={credentials.redirectURI}
        responseType="code"
        responseMode="form_post"
        usePopup={true}
        callback={handleAppleResponse} // Catch the response
        scope="email name"
        render={(
          renderProps //Custom Apple Sign in Button
        ) => (
          <Button
            onClick={renderProps.onClick}
            sx={{
              width: "220px",
              border: (theme) => `1px solid ${theme.palette.neutral[1000]}`,
            }}
          >
            <AppleIcon sx={{ color: (theme) => theme.palette.neutral[1000] }} />
            <Typography sx={{ color: (theme) => theme.palette.neutral[1000] }}>
              {t("Continue with Apple")}
            </Typography>
          </Button>
        )}
      />
    </div>
  );
};

AppleLoginComp.propTypes = {};

export default AppleLoginComp;
