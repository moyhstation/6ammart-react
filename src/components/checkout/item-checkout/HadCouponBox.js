import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { styled } from "@mui/material/styles";
import { Grid, IconButton, Typography } from "@mui/material";
import { RoundButton } from "../CheckOut.style";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import { useTheme } from "@emotion/react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { getAmountWithSign } from "../../../helper-functions/CardHelpers";
import { t } from "i18next";

const CouponStackWithBorder = styled(CustomStackFullWidth)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "5px",
  padding: "10px",
  gap: "10px",
  alignItems: "center",
}));

const HadCouponBox = ({ removeCoupon, couponInfo }) => {
  const theme = useTheme();

  return (
    <CouponStackWithBorder direction="row">
      <RoundButton minWidth="24px" padding="6px 6px">
        <CheckIcon sx={{ width: "15px", height: "15px" }} />
      </RoundButton>
      <Stack flexGrow="1">
        <Typography
          fontSize="14px"
          fontWeight="500"
          color={theme.palette.primary.dark}
        >
          {couponInfo?.title}
          <Typography
            component="span"
            fontSize="10px"
            color={theme.palette.neutral[400]}
            marginLeft="4px"
          >
            {t("Applied")}
          </Typography>
        </Typography>
        <Typography fontSize="10px" color={theme.palette.neutral[400]}>
          {couponInfo?.discount_type === "amount"
            ? `${getAmountWithSign(couponInfo?.discount)} off`
            : `${couponInfo?.discount}%off`}
        </Typography>
      </Stack>
      <IconButton onClick={removeCoupon}>
        <DeleteRoundedIcon
          sx={{
            width: "18px",
            height: "18px",
            color: (theme) => theme.palette.error.main,
          }}
        />
      </IconButton>
    </CouponStackWithBorder>
  );
};

export default HadCouponBox;
