// import { getConvertDiscount } from '../../../utils/customFunctions'

export const handleInitialTotalPriceVarPriceQuantitySet = (
  product,
  setModalData,
  productUpdate,
  setTotalPrice,
  setVarPrice,
  setQuantity,
  setSelectedOptions,
  setTotalWithoutDiscount,
  setSelectedAddOns
) => {
  setModalData([product]);
  if (productUpdate) {
    setTotalPrice(product.totalPrice);
    setVarPrice(product.totalPrice);
  } else {
    setTotalPrice(product.price);
    setVarPrice(product.price);
    setTotalWithoutDiscount(product.price);
  }

  if (product.quantity) {
    setQuantity(product.quantity);
  }
  if (product?.selectedAddons?.length > 0) {
    setSelectedAddOns([...product.selectedAddons]);
  }
  let selectedOption = [];
  if (product?.food_variations?.length > 0) {
    product?.food_variations?.forEach((item) => {
      if (item?.values?.length > 0) {
        item?.values?.forEach((value) => {
          if (value?.isSelected) {
            selectedOption.push(value);
          }
        });
      }
    });
  }
  if (productUpdate) {
    setSelectedOptions(product?.selectedOption)
  } else {
    if (selectedOption.length > 0) {
      setSelectedOptions(selectedOption);
    }
  }

};
