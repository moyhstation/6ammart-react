import { alpha, Stepper, styled } from "@mui/material";
import { Box } from "@mui/system";

export const StepBox = styled(Box)(() => ({
  padding: "40px 0px 40px 0px",
  width: "100%",
}));
export const CustomStepperStyled = styled(Stepper)(
  ({
    theme,
    width,
    height,
    border,
    color,
    marginLeft,
    marginTop,
    connectorHeight,
    parcel,
  }) => ({
    "& .MuiStepConnector-line": {
      height: connectorHeight ? connectorHeight : "30px",
      borderColor: alpha(theme.palette.primary.main, 0.2),
      marginLeft: parcel === "true" && "20px",
      marginBottom: parcel === "true" && "-43px",
      [theme.breakpoints.down("sm")]: {
        marginLeft: parcel === "true" && "12px",
      },
    },
    "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
      borderColor: theme.palette.primary.main,
      height: connectorHeight ? connectorHeight : "30px",
    },
    "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
      borderColor: theme.palette.primary.main,
      height: connectorHeight ? connectorHeight : "30px",
    },
    "& .MuiStepLabel-iconContainer .Mui-active": {
      marginTop: "0px",
      width: width ? width : "10px",
      height: height ? height : "10px",
      borderRadius: "50%",
      color: color ? color : theme.palette.neutral[100],
    },
    "& .MuiStepLabel-iconContainer .Mui-completed": {
      width: "32px",
      height: "20px",
      borderColor: theme.palette.primary.main,
    },
    "& .MuiStepContent-root": {},

    "& .MuiStepLabel-label": {
      color: "#3E594D",
      fontSize: "13px",
      marginBottom: "4px",
      marginLeft: marginLeft ? marginLeft : "0px",
      marginTop: marginTop ? marginTop : "0px",
    },
    "& .MuiStepLabel-label.Mui-active": {
      color: "#3E594D",
      fontSize: "13px",
      fontWeight: 400,
    },
    "& .MuiStepLabel-iconContainer ": {
      width: "32px",
      height: "20px",
      borderColor: theme.palette.primary.main,
    },
    "& .MuiStepConnector-root ": {
      color: theme.palette.primary.main,
      marginLeft: "3px",
      "& .MuiStepConnector-line": {
        borderLeftWidth: parcel === "true" ? "1px dash" : "3px",
        color:
          parcel === "true"
            ? theme.palette.neutral[400]
            : theme.palette.primary.main,
        marginTop: parcel === "true" ? "-18px" : "-11px",
        [theme.breakpoints.down("sm")]: {
          marginTop: parcel === "true" ? "-31px" : "-11px",
        },
      },
    },

    "& .MuiSvgIcon-root": {
      width: width ? width : "10px",
      height: height ? height : "10px",
      color: color ? color : theme.palette.neutral[100],
      border: border ? border : "2px solid",
      borderColor: theme.palette.primary.main,
      borderRadius: "50%",
    },
    "& .MuiStepLabel-root": {
      padding: "0px",
    },
  })
);
