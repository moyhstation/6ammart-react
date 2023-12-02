import React from "react";
import PropTypes from "prop-types";
import { Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import { isAvailable } from "../../utils/CustomFunctions";
import { getItemsOrFoods } from "../../helper-functions/getItemsOrFoods";

const OverLay = ({ isScheduled, theme, t, thisText, endText, endText1 }) => (
  <Stack
    sx={{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      background: (theme) => theme.palette.primary.overLay,
      opacity: "0.5",
      // color: (theme) => theme.palette.neutral[100],
      padding: "6px",
      alignItems: "center",
      justifyContent: "center",
      //borderRadius: borderRadius ? borderRadius : ".5rem",
    }}
  >
    <Typography align="center" color={theme.palette.whiteContainer.main}>
      {isScheduled
        ? t(`${thisText} ${getItemsOrFoods().replace("s", "")} ${endText}`)
        : t(`${thisText} ${getItemsOrFoods().replace("s", "")} ${endText1}`)}
    </Typography>
  </Stack>
);

const ProductsUnavailable = (props) => {
  const { borderRadius, product } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const thisText = t("This");
  const endText = t("is not available right now. You can order it later.");
  const endText1 = t("is not available right now.");
  return (
    <>
      {!isAvailable(
        product.available_time_starts,
        product.available_time_ends
      ) && (
        <OverLay
          thisText={thisText}
          endText={endText}
          endText1={endText1}
          isScheduled={product?.schedule_order}
          theme={theme}
          t={t}
        />
      )}
    </>
  );
};

ProductsUnavailable.propTypes = {};

export default ProductsUnavailable;
