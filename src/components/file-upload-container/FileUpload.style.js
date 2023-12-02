import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  CustomBoxFullWidth,
  ImageContainer,
} from "../../styled-components/CustomStyles.style";

export const ImageContainerFileUpload = styled(ImageContainer)(({ theme }) => ({
  maxHeight: "1.75rem",
  maxWidth: "1.75rem",
}));
export const FileUploadTextContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  width: "8rem",
}));
export const FileUploadHeader = styled(CustomBoxFullWidth)(({ theme }) => ({
  display: "flex",
}));
export const DashedBox = styled(Box)(
  ({ theme, width, color, errorStatus }) => ({
    height: "7.75rem",
    width: width ? width : "7.75rem",
    border: "1.3px dashed",
    borderColor: color
      ? "red"
      : theme.palette.neutral[400] && errorStatus
      ? "red"
      : theme.palette.neutral[400],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.neutral[400],
    borderRadius: "12px",
    cursor: "pointer",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  })
);
