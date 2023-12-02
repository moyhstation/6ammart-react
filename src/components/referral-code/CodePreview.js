import React from "react";
import PropTypes from "prop-types";
import { Box, Stack } from "@mui/system";
import { alpha, styled, Typography } from "@mui/material";
import {
  CustomStackFullWidth,
  CustomTypographyGray,
} from "../../styled-components/CustomStyles.style";
import { useSelector } from "react-redux";
import CustomCopyWithTooltip from "../custom-copy-with-tooltip";
import { useTheme } from "@emotion/react";

const Wrapper = styled(CustomStackFullWidth)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),

  paddingInlineStart: "24px",
  paddingInlineEnd: "2px",
  paddingBlock: "4px",
  border: "1px dashed",
  borderColor: theme.palette.primary.main,
  borderRadius: "5px",
  [theme.breakpoints.down("md")]: {
    padding: "10px",
  },
}));

const CodePreview = (props) => {
  const theme = useTheme();
  const { t } = props;
  const { profileInfo } = useSelector((state) => state.profileInfo);
  return (
    <Stack
      sx={{ p: "1rem" }}
      spacing={1}
      maxWidth="845px"
      width="100%"
      justifyContent="center"
    >
      <Typography fontWeight="bold" fontSize="1rem" align="left">
        {t("Your Referral Code")}
      </Typography>
      <Wrapper
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight="600" color={theme.palette.primary.main}>
          {profileInfo?.ref_code}{" "}
        </Typography>
        <CustomCopyWithTooltip t={t} value={profileInfo?.ref_code} />
      </Wrapper>
    </Stack>
  );
};

CodePreview.propTypes = {};

export default CodePreview;
