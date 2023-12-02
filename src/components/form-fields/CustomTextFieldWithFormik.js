import React, { useState } from "react";
//import PropTypes from 'prop-types'
import { CustomTextFieldStyle } from "./CustomTextField.style";
import { InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { CustomTextFieldContainer } from "../../styled-components/CustomStyles.style";

const CustomTextFieldWithFormik = (props) => {
  const {
    label,
    type,
    required,
    touched,
    errors,
    value,
    fieldProps,
    multiline,
    onChangeHandler,
    rows,
    disabled,
    placeholder,
    height,
  } = props;
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);
  const onChangeHandlerForField = (e) => {
    setInputValue(e.target.value);
    //onChangeHandler(e.target.value)
  };
  const onBlurHandler = () => {
    onChangeHandler(inputValue);
  };

  const renderHandler = () => {
    if (type === "password") {
      return (
        <CustomTextFieldContainer>
          <CustomTextFieldStyle
            height={height}
            //inputRef={(input) => input && input.focus()}
            disabled={disabled}
            fullWidth
            multiline={multiline}
            rows={rows ? rows : 4}
            label={label}
            name={label}
            required={required}
            error={Boolean(touched && errors)}
            helperText={touched && errors}
            value={inputValue}
            onChange={onChangeHandlerForField}
            onBlur={onBlurHandler}
            type={showPassword ? "text" : type}
            kout
            InputProps={{
              style: {
                height: "45px", // Set your desired height value here
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    // onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...fieldProps}
          />
        </CustomTextFieldContainer>
      );
    } else {
      return (
        <CustomTextFieldContainer>
          <CustomTextFieldStyle
            disabled={disabled}
            fullWidth
            multiline={multiline}
            rows={rows ? rows : 6}
            label={label}
            placeholder={ placeholder ? placeholder : "" }
            name={label}
            required={required}
            error={Boolean(touched && errors)}
            helperText={touched && errors}
            value={inputValue}
            onChange={onChangeHandlerForField}
            onBlur={onBlurHandler}
            type={type}
            height={height}
            InputProps={{
              inputProps: { min: 0 },
              style: {
                height: "45px", // Set your desired height value here
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
            {...fieldProps}
          />
        </CustomTextFieldContainer>
      );
    }
  };
  return <Box sx={{ width: "100%", height: "55px" }}>{renderHandler()}</Box>;
};

export default CustomTextFieldWithFormik;
