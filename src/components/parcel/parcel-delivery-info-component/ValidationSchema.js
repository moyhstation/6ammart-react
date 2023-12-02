import React from "react";

import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const ValidationSchemaForRestaurant = () => {

  return Yup.object({
    senderName: Yup.string().required(t("Sender name required")),
    senderPhone: Yup.string().required(t("Sender phone required")),
    receiverName: Yup.string().required(t("Receiver name required")),
    receiverPhone: Yup.string().required(t("Receiver phone required")),
  });
};

export default ValidationSchemaForRestaurant;
