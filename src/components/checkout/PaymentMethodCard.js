import React from "react";
import {
  FormControlLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Stack } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useDispatch } from "react-redux";
import CustomImageContainer from "../CustomImageContainer";
import {
  setOfflineInfoStep,
  setOfflineMethod,
} from "../../redux/slices/offlinePaymentData";

const PaymentMethodCard = (props) => {
  const {
    image,
    type,
    paymentMethod,
    setPaymentMethod,
    paymentType,
    parcel,
    digitalPaymentMethodActive,
    imageUrl,
    setIsCheckedOffline,
    setPaymentMethodImage,
  } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const handleChange = () => {
    setPaymentMethod(type);
    if (!parcel) {
      setPaymentMethodImage(
        digitalPaymentMethodActive ? `${imageUrl}/${image}` : image.src
      );
    }
    dispatch(setOfflineMethod(""));
    setIsCheckedOffline(false);
    dispatch(setOfflineInfoStep(0));
  };

  const radioLabel = () => {
    return (
      <Stack
        direction="row"
        gap="16px"
        alignItems="center"
        paddingLeft={{ xs: "5px", sm: "5px", md: "15px" }}
      >
        {parcel === "true" ? (
          <CustomImageContainer
            src={
              digitalPaymentMethodActive ? `${imageUrl}/${image}` : image.src
            }
            width="20px"
            height="20px"
            objectfit="contain"
            borderRadius="50%"
          />
        ) : (
          !isSmall && (
            <CustomImageContainer
              width="20px"
              height="20px"
              objectfit="contain"
              borderRadius="50%"
              src={
                digitalPaymentMethodActive ? `${imageUrl}/${image}` : image.src
              }
            />
          )
        )}

        <Typography
          fontWeight={parcel === "true" ? "400" : "500"}
          fontSize={{ xs: "12px", sm: "12px", md: "12px" }}
        >
          {paymentType}
        </Typography>
      </Stack>
    );
  };
  return (
    <Stack paddingLeft={parcel === "true" ? "0px" : "20px"}>
      <FormControl
        sx={{
          marginRight: { xs: "0px" },
          marginLeft: { xs: "5px" },
          paddingLeft: "5px",
        }}
      >
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel
            value={type}
            control={
              <Radio
                sx={{ padding: { xs: "2px", md: "10px" } }}
                checked={paymentMethod === type}
              />
            }
            label={radioLabel()}
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default PaymentMethodCard;
