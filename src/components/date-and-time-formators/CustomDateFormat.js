import React from "react";
import moment from "moment";

export const CustomDateFormat = (date) => {
  return moment(date).format("ll");
};
