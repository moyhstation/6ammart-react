import { styled, TextField } from "@mui/material";

export const CustomTextFieldStyle = styled(TextField)(
  ({ theme, borderColor, language_direction, height }) => ({
    border: borderColor && `1px solid ${borderColor}`,
    borderRadius: borderColor && "10px",

    "& .MuiOutlinedInput-root": {
      height: height ? height : "100%",
      flexDirection:
        language_direction && language_direction === "rtl"
          ? "row-reverse"
          : "row",
      "& input[type=number]": {
        "-moz-appearance": "text-field",
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
    },
    "& .MuiFormHelperText-root": {
      marginLeft: "0px",
      marginTop: "5px",
    },
  })
);
