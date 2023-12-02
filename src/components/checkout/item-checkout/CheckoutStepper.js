import React, { useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { CustomStepperStyled } from "../../track-order/trackOrder.style";

import {
  Skeleton,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from "@mui/material";
import CustomFormatedTime from "../../date/CustomFormatedTime";
import { t } from "i18next";
import { Check } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { StepperCustomBorder } from "../CheckOut.style";
import { useTheme } from "@emotion/react";

const CustomStepperLabels = styled(Stepper)(({ theme }) => ({
  "& .MuiStepLabel-label.Mui-completed": {
    color: theme.palette.primary.main,
  },
}));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
    [theme.breakpoints.down("md")]: {
      left: "calc(-50% + 10px)",
      right: "calc(50% + 10px)",
    },
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.neutral[400],
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.neutral[100],
    borderTopWidth: 3,
    borderRadius: 1,
    [theme.breakpoints.down("md")]: {
      borderTopWidth: 2,
    },
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.primary.main,
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: theme.palette.primary.main,
  }),
  "& .QontoStepIcon-completedIcon": {
    color: theme.palette.neutral[100],
    zIndex: 1,
    fontSize: 18,
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
    },
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: theme.palette.neutral[400],
  },
}));
function QontoStepIcon(props) {
  const { active, completed, className } = props;
  const theme = useTheme();
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <StepperCustomBorder
          background={theme.palette.primary.main}
          padding={{ xs: "3px", md: "5px" }}
        >
          <Check className="QontoStepIcon-completedIcon" />
        </StepperCustomBorder>
      ) : (
        <StepperCustomBorder
          background={theme.palette.neutral[100]}
          padding={{ xs: "4px", md: "10px" }}
        >
          <div className="QontoStepIcon-circle" />
        </StepperCustomBorder>
      )}
    </QontoStepIconRoot>
  );
}
const CheckoutStepper = () => {
  const [actStep, setActStep] = useState(2);
  const steps = [
    {
      label: "Add To Cart",
    },
    {
      label: "Fill details",
    },
    {
      label: "Confirmation",
    },
  ];
  return (
    <CustomStackFullWidth>
      <CustomStepperLabels
        activeStep={actStep}
        alternativeLabel
        connector={<QontoConnector />}
      >
        {steps.map((labels, index) => (
          <Step key={index}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              {t(labels.label)}
            </StepLabel>
          </Step>
        ))}
      </CustomStepperLabels>
    </CustomStackFullWidth>
  );
};

export default CheckoutStepper;
