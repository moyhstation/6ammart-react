import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import FoodDetailModal from "../foodDetail-modal/FoodDetailModal";
import { RTL } from "../RTL/RTL";

const ProductUpdateModal = ({
  openModal,
  setOpenModal,
  currencySymbol,
  currencySymbolDirection,
  digitAfterDecimalPoint,
}) => {
  const [product, setProduct] = useState(null);
  const [language_direction, setlanguage_direction] = useState("");
  const { cartItem } = useSelector((state) => state.cart);
  const { configData } = useSelector((state) => state.configDataSettings);
  useEffect(() => {
    setProduct(cartItem);
  }, []);
  const handleModalClose = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    // Perform localStorage action
    if (typeof window !== "undefined") {
      setlanguage_direction(localStorage.getItem("direction") || "ltr");
    }
  }, [language_direction]);
  return (
    <>
      {product && openModal && (
        <RTL direction={language_direction}>
          <FoodDetailModal
            product={product}
            image={`${configData?.base_urls?.product_image_url}/${product.image}`}
            open={openModal}
            // handleModalClose={handleModalClose}
            setOpen={setOpenModal}
            currencySymbolDirection={currencySymbolDirection}
            currencySymbol={currencySymbol}
            digitAfterDecimalPoint={digitAfterDecimalPoint}
            productUpdate={true}
          />
        </RTL>
      )}
    </>
  );
};

ProductUpdateModal.propTypes = {};

export default ProductUpdateModal;
