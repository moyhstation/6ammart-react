import React from "react";
import PropTypes from "prop-types";
import VariationsManager from "../../product-details/product-details-section/VariationsManager";

const OtherVariationManager = (props) => {
  const { modalData, handleChoices } = props;
  return (
    <VariationsManager
      productDetailsData={modalData}
      handleChoices={handleChoices}
    />
  );
};

OtherVariationManager.propTypes = {};

export default OtherVariationManager;
