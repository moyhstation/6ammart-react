import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CustomColouredTypography,
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { Button, Grid, Typography } from "@mui/material";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import EarnMoney from "./svg/EarnMoney";
import ReferAFriend from "./svg/ReferAFriend";
import CodePreview from "./CodePreview";
import { t } from "i18next";
import { Stack } from "@mui/system";
import HowItWorks from "./HowItWorks";
import CustomToaster from "../custom-toaster/CustomToaster";
import CongratulationsIcon from "../../assets/img/CongratulationsIcon";
const RefEarning = ({ configData }) => {
  return (
    <>
      <Typography fontWeight="700">
        {getAmountWithSign(configData?.ref_earning_exchange_rate)}
      </Typography>
    </>
  );
};
const ReferralCode = (props) => {
  const { configData } = props;
  const [open, setOpen] = useState(false)
  const referral = t("referral");
  const get = t("Get");
  const join = t("on joining");

  return (
    <CustomStackFullWidth
      my="2rem"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100%" }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 1, md: 2 }}
      >
        <Grid xs={12} sm={12} md={12} height="100%">
          <CustomStackFullWidth
            alignItems="center"
            justifyContent="center"
            spacing={1}
            height="100%"
            p="1rem"
          >
            <Stack width="100%" alignItems="center" maxWidth="420px">
              <ReferAFriend />
            </Stack>
            <Typography
              fontSize={{ xs: "14px", sm: "16px", md: "16px" }}
              // width="323px"
              align="center"
            >
              <Typography component="span">
                {t("Refer your code to your friends and get")}
              </Typography>
              <Typography
                component="span"
                fontWeight="700"
                marginRight="2px"
                marginLeft="2px"
              >
                {getAmountWithSign(configData?.ref_earning_exchange_rate)}
              </Typography>
              <Typography component="span">
                {t("for every referral!")}
              </Typography>
            </Typography>
          </CustomStackFullWidth>
        </Grid>

        <Grid xs={12} md={12} align="center">
          <CodePreview t={t} />
        </Grid>
        <Grid xs={12} md={12} align="center" padding="0 10px">
          <HowItWorks configData={configData}/>
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

ReferralCode.propTypes = {};

export default ReferralCode;
