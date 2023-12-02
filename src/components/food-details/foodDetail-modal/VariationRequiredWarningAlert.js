import React from "react";
import PropTypes from "prop-types";
import CustomAlert from "../../alert/CustomAlert";
// import CustomAlert from '../alert/CustomAlert'

const VariationRequiredWarningAlert = (props) => {
  const { alertData, type, t } = props;
  let text;
  if (alertData) {
    text = `${t("This Variation needs to be selected in between minimum")} ${
      alertData?.min
    } ${t("and Maximum")} ${alertData?.max} ${t("items.")}`;
  }
  return (
    <>
      <CustomAlert type={type} text={text} />
    </>
  );
};

VariationRequiredWarningAlert.propTypes = {
  alertData: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default VariationRequiredWarningAlert;
