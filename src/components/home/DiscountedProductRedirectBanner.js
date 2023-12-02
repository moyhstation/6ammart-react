import React from "react";
import PropTypes from "prop-types";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { IsSmallScreen } from "../../utils/CommonValues";

const CustomSpan = styled("span")(({ theme, mr }) => ({
  color: theme.palette.primary.main,
  marginLeft: mr !== "true" && "4px",
  marginRight: mr == "true" && "4px",
  fontWeight: "bold",
}));
const DiscountedProductRedirectBanner = (props) => {
  const { t } = useTranslation();
  return (
    <CustomStackFullWidth
      mt="30px"
      direction="row"
      alignItems="center"
      justifyContent={{ xs: "center", sm: "space-between" }}
      flexWrap="wrap"
      gap="10px"
      sx={{
        backgroundColor: "warning.light",
        borderRadius: "5px",
        padding: "1.5rem",
      }}
    >
      <Stack>
        <Typography
          fontSize="19px"
          textAlign={IsSmallScreen() ? "center" : "flex-start"}
        >
          <CustomSpan mr="true">100% Natural Quality</CustomSpan>Organic Product
        </Typography>
        <Typography
          textAlign={IsSmallScreen() ? "center" : "flex-start"}
          fontSize="15px"
          color="text.customText1"
        >
          See Our latest discounted products from here and get a special
          <CustomSpan>discount product</CustomSpan>
        </Typography>
      </Stack>
      <Button variant="contained">{t("Shop Now")}</Button>
    </CustomStackFullWidth>
  );
};

DiscountedProductRedirectBanner.propTypes = {};

export default DiscountedProductRedirectBanner;
