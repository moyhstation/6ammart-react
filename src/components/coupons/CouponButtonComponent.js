import React, { useState } from "react";
import { CouponButtonStyle } from "./Coupon";
import toast from "react-hot-toast";
import { t } from "i18next";

const CouponButtonComponent = ({ couponTitle, value, copy, setCopy }) => {
  const handleCopy = (coupon_code) => {
    setCopy(coupon_code);
    navigator.clipboard
      .writeText(coupon_code)
      .then(() => {
        toast(() => (
          <span>
            {t("Code")}
            <b style={{ marginLeft: "4px", marginRight: "4px" }}>
              {coupon_code}
            </b>
            {t("has been copied")}
          </span>
        ));
      })
      .catch((error) => {
        console.error("Failed to copy code:", error);
      });
  };

  return (
    <CouponButtonStyle onClick={() => handleCopy(value)}>
      {copy === value ? t("Copied!") : couponTitle}
    </CouponButtonStyle>
  );
};

export default CouponButtonComponent;
