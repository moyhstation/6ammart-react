import React from "react";
import { NoSsr, Stack, Typography, useTheme } from "@mui/material";
// import { getAmount, getConvertDiscount } from '../../utils/customFunctions'
import {
  FoodTitleTypography,
  PricingCardActions,
} from "../food-card/FoodCard.style";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// import { CustomTypography } from '../custom-tables/Tables.style'
import { Box } from "@mui/system";
import {
  getAmountWithSign,
  getDiscountedAmount,
} from "../../../helper-functions/CardHelpers";

const StartPriceView = (props) => {
  const { data, hideStartFromText, fontSize, marginFoodCard, configData } =
    props;
  const { t } = useTranslation();
  const theme = useTheme();

  const handleConvertedPrice = () => {
    return getAmountWithSign(
      getDiscountedAmount(
        data.price,
        data.discount,
        data.discount_type,
        data.store_discount
      )
    );
  };
  const handleDiscountedPriceView = () => {
    if (data?.store_discount !== 0 || data.discount > 0) {
      return (
        <Typography
          variant="body1"
          marginRight="10px"
          marginTop="10px"
          fontWeight="400"
          color={theme.palette.error.main}
          sx={{ fontSize: { xs: "13px", sm: "16px" } }}
        >
          <del> {data?.price > 0 && getAmountWithSign(data.price)}</del>
        </Typography>
      );
    }
  };
  return (
    <>
      <NoSsr>
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          textAlign="right"
        >
          {data.price === handleConvertedPrice() ? (
            <Typography
              fontSize="28px"
              display="flex"
              alignItems="center"
              fontWeight="700"
              color={theme.palette.info.main}
            >
              {getAmountWithSign(data.price)}
            </Typography>
          ) : (
            <Stack direction="row" spacing={0.2} alignItems="center">
              {handleDiscountedPriceView()}
              <Stack>
                <Typography
                  sx={{
                    fontSize: { xs: "13px", sm: "16px" },
                  }}
                  display="flex"
                  alignItems="center"
                  fontWeight="700"
                  color={theme.palette.info.main}
                >
                  {handleConvertedPrice()}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
      </NoSsr>
    </>
  );
};

StartPriceView.propTypes = {};

export default StartPriceView;
