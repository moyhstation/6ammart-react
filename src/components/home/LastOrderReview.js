import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import CustomImageContainer from "../CustomImageContainer";
import startImage from "./assets/start.png";
import { Button, IconButton, Typography, useTheme } from "@mui/material";
import { t } from "i18next";
import ProductMoreView from "./visit-again/ProductMoreView";
import StarBorderSharpIcon from "@mui/icons-material/StarBorderSharp";
import CloseIcon from "@mui/icons-material/Close";

const LastOrderReview = ({
  handleClose,
  handleRateButtonClick,
  productImage,
}) => {
  const theme = useTheme();
  return (
    <CustomStackFullWidth
      p="1rem 2rem"
      justifyContent="center"
      alignItems="center"
      spacing={1.4}
    >
      <IconButton
        onClick={() => handleClose()}
        sx={{ position: "absolute", top: 5, right: 8 }}
      >
        <CloseIcon sx={{ fontSize: { xs: "18px", md: "24px" } }} />
      </IconButton>
      <CustomImageContainer src={startImage.src} width="66px" height="66px" />
      <Typography fontSize={{ xs: "13px", sm: "15px" }} textAlign="center" fontWeight="600">
        {t("How was your experience with your last order ?")}
      </Typography>
      <Typography
        fontSize={{ xs: "10px", sm: "12px" }}
        fontWeight="400"
        color={theme.palette.neutral[600]}
      >
        {t("Share us your valuable feedbacks")}
      </Typography>
      <CustomStackFullWidth justifyContent="center" alignItems="center">
        <ProductMoreView
          products={productImage}
          width="36px"
          height="36px"
          justifyContent="center"
        />
      </CustomStackFullWidth>

      <Button
        onClick={() => handleRateButtonClick()}
        variant="contained"
        // startIcon={
        //   <StarBorderSharpIcon
        //     sx={{
        //       width: { xs: "19px", sm: "19px", md: "20px" },
        //       height: "23px",
        //       paddingBottom: "3px",
        //     }}
        //   />
        // }
        sx={{
          p: {
            xs: "5px 10px 5px 10px",
            sm: "8px 15px 8px 15px",
            md: "7px 15px 7px 15px",
          },
          fontSize: {
            xs: "12px",
            sm: "12px",
            md: "14px",
          },

          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.dark,
            color: (theme) => theme.palette.whiteContainer.main,
          },
        }}
      >
        {t("Give Review")}
      </Button>
    </CustomStackFullWidth>
  );
};

export default LastOrderReview;
