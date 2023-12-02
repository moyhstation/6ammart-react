import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { ButtonGroup, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { StoreDetailsNavButton } from "../styled-components/CustomStyles.style";

const useStyles = makeStyles((theme) => ({
  affected: {
    textAlign: "right",
  },
  unaffected: {
    flip: false,
    textAlign: "right",
  },
}));

const GroupButtons = ({ setType, type }) => {
  const [language_direction, setlanguage_direction] = useState("ltr");
  useEffect(() => {
    if (localStorage.getItem("direction")) {
      setlanguage_direction(localStorage.getItem("direction"));
    }
  }, []);

  const { t } = useTranslation();

  const classes = useStyles();
  return (
    <Tabs
      orientation="horizontal"
      // variant="contained"
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      <ButtonGroup
        sx={{ borderTopLeftRadius: "30px" }}
        className={classes.unaffected}
      >
        <StoreDetailsNavButton
          language_direction={language_direction}
          background={type === "all"}
          onClick={() => setType("all")}
          sx={{
            width: { xs: "80px", md: "100px" },
          }}
        >
          {t("All")}
        </StoreDetailsNavButton>
        <StoreDetailsNavButton
          background={type === "veg"}
          onClick={() => setType("veg")}
          sx={{ width: { xs: "80px", md: "100px" } }}
        >
          {t("Veg")}
        </StoreDetailsNavButton>
        <StoreDetailsNavButton
          language_direction={language_direction}
          background={type === "non_veg"}
          onClick={() => setType("non_veg")}
          sx={{ width: { xs: "80px", md: "100px" } }}
          borderLeftBottom="15px"
          borderLeftTop="20px"
        >
          {t("Non-Veg")}
        </StoreDetailsNavButton>
      </ButtonGroup>
    </Tabs>
  );
};

GroupButtons.propTypes = {};

export default GroupButtons;
