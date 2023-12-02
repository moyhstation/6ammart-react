import React from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ValidationSchemaForOfflinePayment = () => {
  const { t } = useTranslation();
  return Yup.object({
    nagad_number: Yup.string().required(t("nagad_number is required")),
    payment_by: Yup.string().required(t("payment_by is required")),
    contact_person_number: Yup.string().required(t("Phone Number is required")),
  });
};
export default ValidationSchemaForOfflinePayment;
