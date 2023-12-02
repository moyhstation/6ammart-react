import React from "react";
import { CustomStepperStyled } from "../track-order/trackOrder.style";
import {
  alpha,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Stack, styled } from "@mui/system";
import moment from "moment";
const StepperStyled = styled(Stepper)(({ theme }) => ({
  "& .MuiStepConnector-root ": {
    "& .MuiStepConnector-line": {
      borderLeftWidth: "2px",
    },
  },
  "& .MuiStepConnector-line": {
    height: "28px",
    marginLeft: "-6px",
    marginBottom: "-11px",
    marginTop: "-10px",
  },
  "& .MuiSvgIcon-root ": {
    width: "14px",
    height: "14px",
    color: theme.palette.neutral[100],
    border: "3px solid",
    borderColor: theme.palette.neutral[400],
    borderRadius: "50%",
  },
  "& .Mui-completed": {
    borderColor: theme.palette.primary.main,
  },
  "& .MuiStepLabel-label.Mui-completed": {
    color: theme.palette.primary.main,
  },
  "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
    borderColor: theme.palette.neutral[400],
  },
  "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
    borderColor: theme.palette.primary.main,
  },
}));

const ParcelTrackOderStepper = ({ steps, activeStep }) => {
  return (
    <StepperStyled orientation="vertical" activeStep={activeStep}>
      {steps?.map((step, index) => (
        <Step key={index}>
          <StepLabel>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize="12px" fontWeight="400">
                {step?.label}
              </Typography>
              <Typography fontSize="12px">
                {step?.time && moment(step?.time).format("D MMM, h:mm A")}
              </Typography>
            </Stack>
          </StepLabel>
        </Step>
      ))}
    </StepperStyled>
  );
};

export default ParcelTrackOderStepper;
