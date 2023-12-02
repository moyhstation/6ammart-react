import React from "react";
import { Step, StepLabel, Typography, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import { CustomStepperStyled } from "../track-order/trackOrder.style";
import StepperSimmer from "../Shimmer/Parcel/StepperSimmer";

const ParcelInstruction = ({ steps, theme, isLoading }) => {
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack>
      {
        isLoading ? (
          <CustomStepperStyled
            orientation="vertical"
            width={isSmall ? "32px" : "45px"}
            height={isSmall ? "32px" : "45px"}
            border="0px"
            color={theme.palette.primary.main}
            marginLeft={isSmall ? "27px" : "2rem"}
            marginTop={isSmall ? ".5rem" : "2rem"}
            connectorHeight="80px"
            parcel="true"
          >
            {[...Array(3)].map(index => {
              return (
                <Step key={index}>
                  <StepLabel>
                    <StepperSimmer />
                  </StepLabel>
                </Step>
              )
            })}
          </CustomStepperStyled>
        ) : (
          <CustomStepperStyled
            orientation="vertical"
            width={isSmall ? "32px" : "45px"}
            height={isSmall ? "32px" : "45px"}
            border="0px"
            color={theme.palette.primary.main}
            marginLeft={isSmall ? "27px" : "2rem"}
            marginTop={isSmall ? ".5rem" : "2rem"}
            connectorHeight="80px"
            parcel="true"
          >
            {steps?.map((step, index) => (
              <Step key={index}>
                <StepLabel>
                  <Stack>
                    <Typography
                      fontSize={{ xs: "14px", sm: "16", md: "20px" }}
                      fontWeight="600"
                    >
                      {step?.label}
                    </Typography>
                    <Typography fontSize={{ xs: "12px", sm: "14px", md: "14px" }}>
                      {step?.description}
                    </Typography>
                  </Stack>
                </StepLabel>
              </Step>
            ))}
          </CustomStepperStyled>
        )
      }
    </Stack>
  );
};

export default ParcelInstruction;
