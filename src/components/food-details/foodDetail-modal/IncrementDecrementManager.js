import React from "react";
import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";
// import { CustomFab } from '../../styled-components/CustomStyles.style'
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { CustomFab } from "../../../styled-components/CustomStyles.style";
import { useTranslation } from "react-i18next";

const IncrementDecrementManager = (props) => {
  const theme = useTheme();
  const { decrementPrice, totalPrice, quantity, incrementPrice } = props;
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>{t("Quantity")} :</Typography>
      <CustomFab
        onClick={decrementPrice}
        color="primary"
        aria-label="remove"
        disabled={totalPrice === 0 || quantity <= 1}
      >
        <RemoveIcon
          size="small"
          sx={{
            color: (theme) => theme.palette.neutral[1000],
            width: "16px",
            height: "16px",
          }}
        />
      </CustomFab>
      <Typography variant="h6">{quantity}</Typography>
      <CustomFab color="primary" aria-label="add" onClick={incrementPrice}>
        <AddIcon
          size="small"
          sx={{
            color: (theme) => theme.palette.neutral[1000],
            width: "16px",
            height: "16px",
          }}
        />
      </CustomFab>
    </Stack>
  );
};

IncrementDecrementManager.propTypes = {};

export default IncrementDecrementManager;
