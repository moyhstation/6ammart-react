import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { getItemsOrFoods } from "../../helper-functions/getItemsOrFoods";
import { getStoresOrRestaurants } from "../../helper-functions/getStoresOrRestaurants";
export default function SearchResult({ searchValue, count, currentTab }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const language_direction = localStorage.getItem("direction");
  const items_text = `${getItemsOrFoods()} for you !`;
  const stores_Text = `${getStoresOrRestaurants()} for you !`;
  return (
    <Grid item container md={12} lg={12} xs={12}>
      <Grid
        item
        md={12}
        lg={12}
        xs={12}
        sx={{
          padding: "10px 0px",
        }}
      >
        <Typography
          sx={{ textAlign: "center" }}
          color={theme.palette.text.customText1}
          fontSize="16px"
        >
          {t("Search result for")}{" "}
          <Typography
            component="span"
            color={theme.palette.primary.main}
            fontSize="16px"
            fontWeight="500"
            textTransform="capitalize"
          >
            {`"${searchValue ? searchValue : "search"}"`}{" "}
          </Typography>
          <Typography
            component="span"
            color={theme.palette.primary.main}
            fontWeight="500"
            fontSize="16px"
          >
            {count}{" "}
          </Typography>
          {currentTab === "items" ? t(items_text) : t(stores_Text)}{" "}
        </Typography>
      </Grid>
    </Grid>
  );
}
