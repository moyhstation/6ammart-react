import React from "react";
import Link from "next/link";
import { alpha, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CustomBoxFullWidth } from "../styled-components/CustomStyles.style";

const CustomDivider = ({
  phone,
  children,
  paddingTop,
  width,
  marginLeft,
  border,
}) => {
  const theme = useTheme();
  return (
    <CustomBoxFullWidth
      sx={{
        borderBottom: `${border} solid ${alpha(
          theme.palette.neutral[400],
          0.2
        )}`,
        paddingTop: paddingTop,
        width: width,
        marginLeft: marginLeft,
      }}
    ></CustomBoxFullWidth>
  );
};
export default CustomDivider;
