import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import useGetTrackOrderData from "../../api-manage/hooks/react-query/order/useGetTrackOrderData";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import {
  alpha,
  Divider,
  Grid,
  Skeleton,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepContent,
  StepLabel,
  Stepper,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { HeadingBox } from "../my-orders/myorders.style";
import CustomFormatedDateTime from "../date/CustomFormatedDateTime";
import CustomFormatedTime from "../date/CustomFormatedTime";
import { useTranslation } from "react-i18next";
import DeliverymanInfo from "./DeliverymanInfo";
import DeliverymanShimmer from "./DeliverymanShimmer";
import MapComponent from "../Map/location-view/MapComponent";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { CustomStepperStyled, StepBox } from "./trackOrder.style";
import { useTheme } from "@emotion/react";
import { t } from "i18next";
import orderConfirmImage from "../my-orders/assets/order-confirmed.png";
import shippedImage from "../my-orders/assets/shhiped.png";
import outForDelivery from "../my-orders/assets/out-for-delivery.png";
import delivered from "../my-orders/assets/delivery.png";
import { StepperCustomBorder } from "../checkout/CheckOut.style";
import { Check } from "@mui/icons-material";
import CustomImageContainer from "../CustomImageContainer";
import { Stack } from "@mui/system";
import moment from "moment";
const CustomStepperLabels = styled(Stepper)(({ theme }) => ({
  "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
    marginTop: "-80px",
  },
  "& .MuiStepLabel-label.Mui-completed": {
    color: theme.palette.primary.main,
  },
}));

const QontoConnector = styled(StepConnector)(({ theme, isMobile }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.neutral[400],
    borderTopWidth: 2,
    borderRadius: 1,
    borderLeftWidth: isMobile === "true" && 3,
    marginTop: isMobile === "true" && "-41px",
    marginBottom: isMobile === "true" && "-41px",
    minHeight: isMobile === "true" && "100px",
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
    fontSize: 0,
    padding: "7px",
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
          padding="5px"
          border={`3px solid ${theme.palette.neutral[100]}`}
          boxshadow={`0px 4px 10px ${alpha(theme.palette.neutral[400], 0.3)}`}
        >
          <Check className="QontoStepIcon-completedIcon" />
        </StepperCustomBorder>
      ) : (
        <StepperCustomBorder
          background={theme.palette.neutral[400]}
          padding="10px"
          border={`3px solid ${theme.palette.neutral[100]}`}
          boxshadow={`0px 4px 10px ${alpha(theme.palette.neutral[400], 0.3)}`}
        >
          <div className="QontoStepIcon-circle" />
        </StepperCustomBorder>
      )}
    </QontoStepIconRoot>
  );
}
const TrackOrder = ({ configData, trackOrderData }) => {
  const { t } = useTranslation();
  const [actStep, setActStep] = useState(1);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const steps = [
    {
      label: "Order Confirmed",
      time: trackOrderData?.confirmed,
      img: orderConfirmImage.src,
    },
    {
      label: `Preparing ${
        trackOrderData?.module?.module_type === "food" ? "foods" : "items"
      }`,
      time: trackOrderData?.processing,
      img: shippedImage.src,
    },
    {
      label: ` ${
        trackOrderData?.module?.module_type === "food" ? "foods" : "items"
      } is on the way`,
      time: trackOrderData?.picked_up,
      img: outForDelivery.src,
    },
    {
      label: "Delivered",
      time: trackOrderData?.delivered,
      img: delivered.src,
    },
  ];

  const handleStepper = () => {
    if (trackOrderData?.order_status === "panding") {
      setActStep(1);
    } else if (trackOrderData?.order_status === "confirmed") {
      setActStep(2);
    } else if (
      trackOrderData?.order_status === "processing" ||
      trackOrderData?.order_status === "handover"
    ) {
      setActStep(3);
    } else if (trackOrderData?.order_status === "picked_up") {
      setActStep(4);
    } else if (trackOrderData?.order_status === "delivered") {
      setActStep(5);
    }
  };
  useEffect(() => {
    handleStepper();
  }, [actStep, trackOrderData]);
  return (
    <CustomStackFullWidth
      mt={{ xs: "20px", md: "70px" }}
      minHeight="30vh"
      alignItems={isSmall ? "center" : "initial"}
    >
      {isSmall ? (
        <Stepper
          activeStep={actStep}
          orientation="vertical"
          connector={<QontoConnector isMobile="true" />}
        >
          {steps.map((labels, index) => (
            <Step key={labels.label}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  gap={{ xs: "5px", md: "10px" }}
                  marginBottom="25px"
                >
                  <CustomImageContainer
                    src={labels.img}
                    width="29px"
                    height="29px"
                    alt={labels.label}
                  />
                  {t(labels?.label)}
                  {labels?.time && (
                    <Typography mt="10px" variant="body2" textAlign="center">
                      {moment(labels?.time).format("ddd, Do MMM")}
                    </Typography>
                  )}
                </Stack>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      ) : (
        <CustomStepperLabels
          activeStep={actStep}
          alternativeLabel
          connector={<QontoConnector />}
        >
          {steps.map((labels, index) => (
            <Step key={labels}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  gap={{ xs: "5px", md: "10px" }}
                >
                  <CustomImageContainer
                    src={labels.img}
                    width="29px"
                    height="29px"
                    alt={labels.label}
                  />
                  {t(labels?.label)}
                </Stack>
              </StepLabel>
              {labels?.time && (
                <Typography mt="10px" variant="body2" textAlign="center">
                  {moment(labels?.time).format("ddd, Do MMM")}
                </Typography>
              )}
            </Step>
          ))}
        </CustomStepperLabels>
      )}
    </CustomStackFullWidth>
  );
};

TrackOrder.propTypes = {};

export default TrackOrder;
