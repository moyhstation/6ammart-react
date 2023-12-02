import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import {
  CustomBoxForTips,
  CustomStackFullWidth,
  CustomTextField,
} from "../../styled-components/CustomStyles.style";
import { alpha, Button, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { CouponTitle, DeliveryCaption, RoundButton } from "./CheckOut.style";
import { useTheme } from "@emotion/react";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import { debounce } from "lodash";
const DeliveryManTip = ({
  deliveryTip,
  setDeliveryTip,
  orderType,
  isSmall,
  parcel,
  tripsData,
  setUsePartialPayment,
}) => {
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const [fieldValue, setFieldValue] = useState(deliveryTip);
  const [isCustom,setIsCustom]=useState(false)
  const deliveryTips = [0, 10, 15, 20, 40];
  const { t } = useTranslation();

  const debouncedSetInputValue = debounce((value) => {
    setDeliveryTip(value);

  }, 300);
  const handleOnChange = (e) => {
    // setFieldValue(e.target.value);
    // debouncedSetInputValue(e.target.value);

    if (e.target.value > -1) {
      setFieldValue(e.target.value);
      debouncedSetInputValue(e.target.value);
      setIsCustom(true)
    }else{
      setIsCustom(false)
    }
  };

  const handleClickOnTips = (tip) => {
    setFieldValue(tip);
    setIsCustom(false)
  };
  useEffect(() => {
    debouncedSetInputValue(fieldValue);
  }, [fieldValue]);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <CustomStackFullWidth>
      <Grid container rowGap="14px" spacing={1}>
        <Grid item xs={12} md={12}>
          <DeliveryCaption>{t(`Delivery Man Tips`)}</DeliveryCaption>
        </Grid>
        {!show && (
          <Grid item xs={12}>
            <CustomStackFullWidth
              direction="row"
              alignItems={!isSmall && "center"}
              gap="10px"
              flexWrap="wrap"
            >
              {deliveryTips.map((item, index) => {
                return (
                  <Stack key={index} alignItems="flex-start">
                    <CustomBoxForTips
                      onClick={() => handleClickOnTips(item)}
                      active={item === deliveryTip}
                    >
                      <Typography
                        fontSize={item === deliveryTip ? "14px" : "12px"}
                        textTransform="capitalize"
                        fontWeight="600"
                        color={
                          item === deliveryTip
                            ? theme.palette.whiteContainer.main
                            : theme.palette.primary.main
                        }
                      >
                        {index === 0 ? t("not now") : getAmountWithSign(item)}
                      </Typography>
                      {tripsData?.most_tips_amount === item && !isSmall && (
                        <Stack
                          position="absolute"
                          bottom="0px"
                          alignItems="center"
                          width="100%"
                          backgroundColor={theme.palette.primary.main}
                        >
                          <Typography
                            color={theme.palette.whiteContainer.main}
                            fontSize="10px"
                          >
                            {t("Most Tipped")}
                          </Typography>
                        </Stack>
                      )}
                    </CustomBoxForTips>
                    {tripsData?.most_tips_amount === item && isSmall && (
                      <Typography
                        color={theme.palette.primary.main}
                        fontSize="10px"
                      >
                        {t("Most Tipped")}
                      </Typography>
                    )}
                  </Stack>
                );
              })}
              <CustomBoxForTips
                sx={{ borderColor: (theme) => theme.palette.primary.main }}
                onClick={handleShow}
                active={isCustom}
              >
                <Typography color={isCustom?theme.palette.neutral[100]:theme.palette.primary.main} fontSize="12px">
                  {t("Custom")}
                </Typography>
              </CustomBoxForTips>
            </CustomStackFullWidth>
          </Grid>
        )}
        {show && (
          <Stack width="100%" direction="row" spacing={1.8} >
            <CustomTextField
              type="number"
              label={t("Amount")}
              autoFocus={true}
              value={fieldValue}
              onChange={(e) => handleOnChange(e)}
              InputProps={{
                inputProps: { min: 0 },
              }}
              onKeyPress={(event) => {
                if (event?.key === "-" || event?.key === "+") {
                  event.preventDefault();
                }
              }}
            />

            <RoundButton
              onClick={handleClose}
              minWidth="50px"
              padding="9px 16px"
            >
              <CloseIcon sx={{ width: "15px", height: "20px" }} />
            </RoundButton>
          </Stack>
        )}
      </Grid>
    </CustomStackFullWidth>
  );
};

export default DeliveryManTip;
