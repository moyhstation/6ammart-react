import React from "react";
import PropTypes from "prop-types";
// import { CustomTypography } from '../custom-tables/Tables.style'
import { Button, Typography } from "@mui/material";

const UpdateToCartUi = (props) => {
  const { addToCard, t } = props;
  return (
    <Button
      // disabled={quantity <= 0}
      onClick={() => addToCard()}
      variant="contained"
      fullWidth
    >
      <Typography
        sx={{
          color: (theme) => theme.palette.whiteContainer.main,
        }}
      >
        {t("Update to cart")}
      </Typography>
    </Button>
  );
};

UpdateToCartUi.propTypes = {};

export default UpdateToCartUi;
