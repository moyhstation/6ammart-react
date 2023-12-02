import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Stack } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import note from "../assets/note.png";
import CustomImageContainer from "../../CustomImageContainer";
import { Button, Typography } from "@mui/material";
import { t } from "i18next";
import { GrayButton } from "../../address";
import { PrimaryButton } from "../../Map/map.style";
import { useTheme } from "@emotion/react";
import { getAmountWithSign } from "../../../helper-functions/CardHelpers";
import PartialSvg from "../assets/PartialSvg";

const PartialPaymentModal = (props) => {
  const { payableAmount, agree, reject, title, colorTitle, remainingBalance } =
    props;
  const theme = useTheme();
  return (
    <CustomStackFullWidth p="1rem" spacing={1.5} sx={{ maxWidth: "434px" }}>
      <Stack alignItems="center" spacing={1.5} padding="10px">
        <Stack>
          <CustomImageContainer src={note.src} width="34px" height="34px" />
          <Typography fontWeight="700">{t("Note !")}</Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center">
          <Typography fontWeight="500" fontSize="16px" textAlign="center">
            {title}
            <Typography
              fontWeight="500"
              fontSize="16px"
              color={theme.palette.primary.main}
              component="span"
            >
              {colorTitle}
            </Typography>
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <PartialSvg />
          <Typography
            fontWeight="700"
            fontSize="20px"
            color={theme.palette.primary.main}
          >
            {getAmountWithSign(payableAmount)}
          </Typography>
          <Typography>(Order Amount)</Typography>
        </Stack>
        {remainingBalance && (
          <Typography fontSize="12px">
            Remaining Wallet Balance :
            <Typography component="span" fontSize="12px">
              {getAmountWithSign(remainingBalance)}
            </Typography>
          </Typography>
        )}
      </Stack>
      <Stack direction="row" width="100%" spacing={1}>
        <GrayButton fullWidth onClick={reject}>
          {t("No")}
        </GrayButton>
        <Button fullWidth variant="contained" onClick={agree}>
          {"Yes"}
        </Button>
      </Stack>
    </CustomStackFullWidth>
  );
};

export default PartialPaymentModal;
