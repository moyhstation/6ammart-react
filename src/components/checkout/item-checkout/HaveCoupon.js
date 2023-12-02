import React, { useEffect, useState } from "react";
import { Grid, InputBase } from "@mui/material";
// import {
//     CouponButton,
//     CouponGrid,
//     CouponTitle,
//     InputField,
// } from './CheckOut.style'
import { useQuery } from "react-query";
// import { CouponApi } from '../../hooks/react-query/config/couponApi'
import { useTranslation } from "react-i18next";
// import { onErrorResponse } from '../ErrorResponse'
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// import { setCouponInfo, setCouponType } from '../../redux/slices/configData'
// import {
//     CustomPaperBigCard,
//     CustomStackFullWidth,
// } from '../../styled-components/CustomStyles.style'
import { useTheme } from "@mui/material/styles";
import { CouponApi } from "../../../api-manage/another-formated-api/couponApi";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-manage/api-error-response/ErrorResponses";
import { CustomPaperBigCard } from "../../../styled-components/CustomStyles.style";
import { CouponButton, CouponTitle, InputField } from "../CheckOut.style";
import {
  setCouponInfo,
  setCouponType,
} from "../../../redux/slices/profileInfo";
import { coupon_minimum } from "../../../utils/toasterMessages";
import { getAmountWithSign } from "../../../helper-functions/CardHelpers";
import HadCouponBox from "./HadCouponBox";

const HaveCoupon = (props) => {
  const {
    store_id,
    setCouponDiscount,
    couponDiscount,
    totalAmount,
    deliveryFee,
    deliveryTip,
    setSwitchToWallet,
    payableAmount,
    walletBalance,
  } = props;
  const theme = useTheme();
  const { couponInfo } = useSelector((state) => state.profileInfo);
  const [couponCode, setCouponCode] = useState(couponInfo?.code);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let zoneId;
  if (typeof window !== "undefined") {
    zoneId = JSON.parse(localStorage.getItem("zoneid"));
  }

  const getCouponDiscount=(discount,discountType,totalAmountOverall)=>{
    if(discountType==="amount"){
      return discount
    }else{
      return (discount / 100) * totalAmountOverall
    }
  }
  const handleSuccess = (response) => {
    const totalAmountOverall = totalAmount - deliveryFee - deliveryTip;
    if (
      Number.parseInt(response?.data?.min_purchase) <=
      Number.parseInt(totalAmountOverall)
    ) {
      if(response?.data?.discount_type === "percent"){
        dispatch(setCouponInfo(response.data));
        toast.success(t("Coupon Applied"));
        dispatch(setCouponType(response.data.coupon_type));
        setCouponDiscount({ ...response.data, zoneId: zoneId });
      }else {
        if( response?.data?.discount && payableAmount >= response?.data?.discount){
          dispatch(setCouponInfo(response.data));
          toast.success(t("Coupon Applied"));
          dispatch(setCouponType(response.data.coupon_type));
          setCouponDiscount({ ...response.data, zoneId: zoneId });
        }else {
          toast.error(
              t("Your total price must be more then coupon amount")
          );
        }
      }
    } else {
      toast.error(
        `${t(coupon_minimum)} ${getAmountWithSign(
          response?.data?.min_purchase
        )}`
      );
    }
  };
  const { isLoading, refetch } = useQuery(
    "apply-coupon",
    () => CouponApi.applyCoupon(couponCode, store_id),
    {
      onSuccess: handleSuccess,
      onError: onErrorResponse,
      enabled: false,
      retry: 1,
    }
  );

  useEffect(() => {
    return () => {
      dispatch(setCouponInfo(null));
    };
  }, []);
  const removeCoupon = () => {
    setCouponDiscount(null);
    localStorage.removeItem("coupon");
    setCouponCode(null);
    dispatch(setCouponInfo(null));
    setSwitchToWallet(false);
  };
  const handleApply = async () => {

    await refetch();
  };
  const borderColor = theme.palette.primary.main;
  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        pt="20px"
        pb="10px"
        spacing={1}
      >
        {couponInfo ? (
          <Grid item xs={12} sm={12} md={12}>
            <HadCouponBox removeCoupon={removeCoupon} couponInfo={couponInfo} />
          </Grid>
        ) : (
          <>
            <Grid
              item
              md={9}
              xs={8}
              sm={7}
              pr={{ xs: "0px", sm: "8px", md: "8px" }}
              pb={{ xs: "8px", sm: "0px", md: "0px" }}
            >
              <InputField
                variant="outlined"
                sx={{
                  height: "100%",
                  border: `1px solid ${borderColor}`,
                  borderRadius: "5px",
                }}
              >
                <InputBase
                  placeholder={t("Enter Your Coupon..")}
                  sx={{
                    flex: 1,
                    width: "100%",
                    padding: "5px 10px 5px",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "12px",
                    },
                  }}
                  onChange={(e) => setCouponCode(e.target.value)}
                  value={couponCode ? couponCode : ""}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleApply();
                    }
                  }}
                />
              </InputField>
            </Grid>
            <Grid
              item
              md={3}
              xs={4}
              sm={5}
              pb={{ xs: "8px", sm: "0px", md: "0px" }}
            >
              <CouponButton
                loading={isLoading}
                loadingPosition="start"
                variant="contained"
                onClick={handleApply}
                disabled={couponCode === "" || !couponCode}
              >
                {t("Apply")}
              </CouponButton>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};
export default HaveCoupon;
