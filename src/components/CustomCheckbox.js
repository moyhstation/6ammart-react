import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { StyleCheckBox } from "./group-buttons/OutlinedGroupButtons";
import { useTheme } from "@emotion/react";
import {getModule} from "../helper-functions/getLanguage";

const CustomCheckbox = (props) => {
  const { item, checkHandler, isChecked, selectedId } = props;
  const [checked, setChecked] = React.useState(false);
  const theme = useTheme();
  const checkboxRef = useRef(null);
  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);
  useEffect(() => {
    checkboxRef.current.focus();
  }, [checked]);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    checkHandler?.({
      checked: event.target.checked,
      id: item?.id,
      value: event.target.value,
    });
  };


  return (
    <FormControlLabel
      ref={checkboxRef}
      control={
        <StyleCheckBox
          ref={checkboxRef}
          module={getModule()?.module_type}
          value={item?.value}
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      label={
        <Typography color={theme.palette.neutral[1000]}>
          {item?.name}
        </Typography>
      }
    />
  );
};

CustomCheckbox.propTypes = {};

export default CustomCheckbox;
