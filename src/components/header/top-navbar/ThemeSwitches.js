import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import { useTheme } from "@mui/material/styles";
import { CustomSwitch } from "../NavBar.style";
import { useSettings } from "../../../contexts/use-settings";
import i18n from "i18next";
const getValues = (settings) => ({
  direction: settings.direction,
  responsiveFontSizes: settings.responsiveFontSizes,
  theme: settings.theme,
});

const ThemeSwitches = ({noText}) => {
  const { settings, saveSettings } = useSettings();
  const [values, setValues] = useState(getValues(settings));
  const [value, setvalue] = useState("");
  const { t } = useTranslation();
  const theme = useTheme();
  const handleChange = (event) => {
    setvalue(event.target.checked);
    if (event.target.checked) {
      saveSettings({
        ...values,
        theme: "light",
      });
    } else {
      saveSettings({
        ...values,
        theme: "dark",
      });
    }
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={0.8}
    >
      <CustomSwitch
        checked={settings.theme === "light"}
        onChange={handleChange}
      />
      {
        !noText ?   <Typography color={theme.palette.neutral[1000]}>
          {settings.theme === "light" ? t("Light Mode") : t("Dark Mode")}
        </Typography> : null
      }

    </Stack>
  );
};

// ThemeSwitches.propTypes = {};

export default ThemeSwitches;
