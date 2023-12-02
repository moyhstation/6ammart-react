import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import ParcelPaymentMethod from "./item-checkout/ParcelPaymentMethod";
import OtherModulePayment from "./item-checkout/OtherModulePayment";

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  paidBy,
  orderPlace,
  isLoading,
  zoneData,
  forprescription,
  configData,
  orderType,
  parcel,
  setOpenModel,
  offlinePaymentOptions,
  usePartialPayment,
  setPaymentMethodImage,
  setSwitchToWallet,
}) => {
  return (
    <CustomStackFullWidth spacing={2} p={parcel === "true" ? "0px" : "25px"}>
      {parcel === "true" ? (
        <ParcelPaymentMethod
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
          zoneData={zoneData}
          configData={configData}
          orderType={orderType}
          parcel={parcel}
          paidBy={paidBy}
          orderPlace={orderPlace}
          isLoading={isLoading}
          offlinePaymentOptions={offlinePaymentOptions}
          setPaymentMethodImage={setPaymentMethodImage}
        />
      ) : (
        <OtherModulePayment
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
          zoneData={zoneData}
          configData={configData}
          orderType={orderType}
          setOpenModel={setOpenModel}
          usePartialPayment={usePartialPayment}
          forprescription={forprescription}
          offlinePaymentOptions={offlinePaymentOptions}
          setPaymentMethodImage={setPaymentMethodImage}
          setSwitchToWallet={setSwitchToWallet}
        />
      )}
    </CustomStackFullWidth>
  );
};

export default PaymentMethod;
