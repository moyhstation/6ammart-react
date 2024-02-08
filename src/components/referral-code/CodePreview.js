import React from "react";
import PropTypes from "prop-types";
import { Box, Stack } from "@mui/system";
import { alpha, styled, Typography, useMediaQuery } from "@mui/material";
import {
  CustomStackFullWidth,
  CustomTypographyGray,
} from "../../styled-components/CustomStyles.style";
import { useSelector } from "react-redux";
import CustomCopyWithTooltip from "../custom-copy-with-tooltip";
import { useTheme } from "@emotion/react";
import { CodePreviewWrapper } from "./ReferralCode.style";
import ReferralShare from "./ReferralShare";
import { t } from "i18next";

const CodePreview = (props) => {
  const theme = useTheme();
  const isXsmall = useMediaQuery(theme.breakpoints.down("sm"))
  const { profileInfo } = useSelector((state) => state.profileInfo);
  return (
    <Stack
      sx={{ p: "1rem" }}
      gap={{xs:"10px", sm:"15px", md:"20px"}}
      maxWidth="450px"
      width="100%"
      justifyContent="center"
    >
      <CodePreviewWrapper
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight="600" color={theme.palette.primary.main}>
          {profileInfo?.ref_code}{" "}
        </Typography>
        <CustomCopyWithTooltip t={t} value={profileInfo?.ref_code} />
      </CodePreviewWrapper>
      <Typography>
        {t("OR SHARE")}
      </Typography>
        <ReferralShare referralCode={profileInfo?.ref_code} size={isXsmall ? 30 : 40 }/>
    </Stack>
  );
};

CodePreview.propTypes = {};

export default CodePreview;
