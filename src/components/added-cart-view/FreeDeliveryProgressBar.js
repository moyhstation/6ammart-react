import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { styled, Typography } from "@mui/material";
import { DeliveryProgressBarStack } from "./Cart.style";
import discountImage from "./assets/discount.png";
import CustomImageContainer from "../CustomImageContainer";
import { useTheme } from "@emotion/react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Stack } from "@mui/system";
import { t } from "i18next";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import { cartItemsTotalAmount } from "../../utils/CustomFunctions";
export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  marginTop: "3px",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.primary.light],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));
const FreeDeliveryProgressBar = ({ configData, cartList }) => {
  const theme = useTheme();
  const freeDeliveryTargetAmount = (configData, cartList) => {
    let lessAmount =
      Number(configData?.free_delivery_over) - cartItemsTotalAmount(cartList);
    if (
      cartItemsTotalAmount(cartList) >= Number(configData?.free_delivery_over)
    ) {
      return 0;
    } else {
      return lessAmount;
    }
  };
  const reamingAmount = freeDeliveryTargetAmount(configData, cartList);
  const convertedNumberToHundred = Math.round(
    (100 / configData?.free_delivery_over) * cartItemsTotalAmount(cartList)
  );
  const convertedValueToHundred = Math.min(
    Math.max(convertedNumberToHundred, 0),
    100
  );

  return (
    <DeliveryProgressBarStack>
      <Stack direction="row" spacing={0.5}>
        <CustomImageContainer src={discountImage.src} width="20px" alt="bar" />
        <Typography
          fontSize="12px"
          fontWeight="500"
          color={theme.palette.primary.main}
        >
          {reamingAmount !== 0 && getAmountWithSign(reamingAmount)}
          {reamingAmount > 0 ? (
            <Typography
              variant="span"
              color={theme.palette.neutral[400]}
              fontWeight="400"
              marginLeft="3px"
            >
              {t("more for free delivery")}
            </Typography>
          ) : (
            <Typography
              variant="span"
              color={theme.palette.primary.main}
              fontWeight="400"
              marginLeft="3px"
            >
              {t("You have reduced delivery charge")}
            </Typography>
          )}
        </Typography>
      </Stack>
      <BorderLinearProgress
        variant="determinate"
        value={convertedValueToHundred}
      />
    </DeliveryProgressBarStack>
  );
};

export default FreeDeliveryProgressBar;
