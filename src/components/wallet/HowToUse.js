import { useTheme } from "@emotion/react";
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import { CustomStepperStyled } from "../track-order/trackOrder.style";
import { t } from "i18next";
const DesignStepper = styled(Stepper)(({ theme }) => ({}));
const HowToUse = ({ steps }) => {
  const theme = useTheme();
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Box sx={{ maxWidth: 400 }}>
      <CustomStepperStyled orientation="vertical">
        {steps?.map((step, index) => (
          <Step key={index}>
            <StepLabel>
              <Typography
                fontSize="12px"
                fontWeight="400"
                sx={{ color: theme.palette.text.secondary }}
              >
                {t(step?.label)}
              </Typography>
            </StepLabel>
            <StepContent>
              <Typography sx={{ color: theme.palette.text.secondary }}>
                {step?.description}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </CustomStepperStyled>
    </Box>
  );
};

export default HowToUse;
