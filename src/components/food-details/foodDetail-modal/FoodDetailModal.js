import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, Modal } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import toast from "react-hot-toast";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import StartPriceView from "./StartPriceView";

import { handleProductVariationRequirementsToaster } from "./SomeHelperFuctions";
import AddUpdateOrderToCart from "./AddUpdateOrderToCart";
import AddOrderToCart from "./AddOrderToCart";
import TotalAmountVisibility from "./TotalAmountVisibility";
import AddOnsManager from "./AddOnsManager";
import VariationsManager from "./VariationsManager";
import FoodDetailsManager from "./FoodDetailsManager";
import IncrementDecrementManager from "./IncrementDecrementManager";
import { handleDiscountChip } from "./helper-functions/handleDiscountChip";
import { handleInitialTotalPriceVarPriceQuantitySet } from "./helper-functions/handleDataOnFirstMount";
import {
  calculateItemBasePrice,
  getIndexFromArrayByComparision,
  isAvailable,
} from "../../../utils/CustomFunctions";
import { getDiscountedAmount } from "../../../helper-functions/CardHelpers";
import {
  setBuyNowItemList,
  setCampaignItemList,
  setCart,
  setClearCart,
  setUpdateVariationToCart,
} from "../../../redux/slices/cart";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { FoodDetailModalStyle } from "./foodDetailModal.style";
import IconButton from "@mui/material/IconButton";
import CartClearModal from "../../product-details/product-details-section/CartClearModal";
import { useAddToWishlist } from "../../../api-manage/hooks/react-query/wish-list/useAddWishList";
import CustomModal from "../../modal";
import {
  not_logged_in_message,
  out_of_limits,
} from "../../../utils/toasterMessages";
import { getCartListModuleWise } from "../../../helper-functions/getCartListModuleWise";
import { Stack } from "@mui/system";
import useAddCartItem from "../../../api-manage/hooks/react-query/add-cart/useAddCartItem";
import { onErrorResponse } from "../../../api-manage/api-error-response/ErrorResponses";
import { handleValuesFromCartItems } from "../../product-details/product-details-section/helperFunction";
import useCartItemUpdate from "../../../api-manage/hooks/react-query/add-cart/useCartItemUpdate";
import { getGuestId } from "../../../helper-functions/getToken";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";

const FoodDetailModal = ({
  product,
  handleModalClose,
  imageBaseUrl,
  open,
  setOpen,
  productUpdate,
  addToWishlistHandler,
  removeFromWishlistHandler,
  isWishlisted,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [varPrice, setVarPrice] = useState(null);
  const [totalWithoutDiscount, setTotalWithoutDiscount] = useState(null);
  const [selectedAddons, setSelectedAddOns] = useState([]);
  const { cartList: allCartList } = useSelector((state) => state.cart);
  const { configData } = useSelector((state) => state.configData);
  const [quantity, setQuantity] = useState(1);
  const [clearCartModal, setClearCartModal] = React.useState(false);
  const [otherSelectedOption, setOtherSelectedOption] = useState([]);
  const cartList = getCartListModuleWise(allCartList);
  const handleClearCartModalOpen = () => setClearCartModal(true);
  // const { token } = useSelector((state) => state.configDataSettings);
  const { wishLists } = useSelector((state) => state.wishList);
  const [modalData, setModalData] = useState([]);
  //const guestId = localStorage.getItem("guest_id");
  const { mutate: updateMutate, updateIsLoading } = useCartItemUpdate();
  const { mutate, isLoading } = useAddCartItem();
  const guestId = getGuestId();
  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  useEffect(() => {
    //initially setting these states to use further
    handleInitialTotalPriceVarPriceQuantitySet(
      product,
      setModalData,
      productUpdate,
      setTotalPrice,
      setVarPrice,
      setQuantity,
      setSelectedOptions,
      setTotalWithoutDiscount,
      setSelectedAddOns,
      setOtherSelectedOption
    );
  }, [product]);

  const notify = (i) => toast(i);
  const itemValuesHandler = (itemIndex, variationValues) => {
    const isThisValExistWithinSelectedValues = selectedOptions.filter(
      (sItem) => sItem.choiceIndex === itemIndex
    );
    if (variationValues.length > 0) {
      let newVariation = variationValues.map((vVal, vIndex) => {
        let exist =
          isThisValExistWithinSelectedValues.length > 0 &&
          isThisValExistWithinSelectedValues.find(
            (item) => item.optionIndex === vIndex
          );
        if (exist) {
          return exist;
        } else {
          return { ...vVal, isSelected: false };
        }
      });
      return newVariation;
    } else {
      return variationValues;
    }
  };
  const getNewVariationForDispatch = () => {
    const newVariations =
      modalData?.[0]?.food_variations.length > 0
        ? modalData?.[0]?.food_variations?.map((item, index) => {
            if (selectedOptions.length > 0) {
              return {
                ...item,
                values:
                  item.values.length > 0
                    ? itemValuesHandler(index, item.values)
                    : item.values,
              };
            } else {
              return item;
            }
          })
        : modalData?.[0]?.food_variations;
    return newVariations;
  };

  const getNewObj = () => ({
    ...modalData[0],
    totalPrice: getDiscountedAmount(
      totalPrice,
      product?.discount,
      product?.discount_type,
      product?.store_discount,
      quantity
    ),
    quantity: quantity,
    food_variations: getNewVariationForDispatch(),
    selectedAddons: selectedAddons,
    itemBasePrice: getDiscountedAmount(
      calculateItemBasePrice(modalData[0], selectedOptions),
      product?.discount,
      product?.discount_type,
      product?.store_discount,
      quantity
    ),
  });
  const handleSuccess = (res) => {
    if (res) {
      let product = {};
      res?.forEach((item) => {
        product = {
          ...item?.item,
          cartItemId: item?.id,
          totalPrice: item?.price,
          quantity: item?.quantity,
          food_variations: item?.item?.food_variations,
          selectedAddons: selectedAddons,
          selectedOption: selectedOptions,
          itemBasePrice: item?.item?.price,
        };
      });
      dispatch(setCart(product));
      handleClose();
      //dispatch()
    }
  };
  const updateCartSuccessHandler = (res) => {
    const indexNumber = getIndexFromArrayByComparision(cartList, modalData[0]);
    if (res) {
      let product = {};
      res?.forEach((item) => {
        product = {
          ...item?.item,
          cartItemId: item?.id,
          totalPrice: item?.price,
          quantity: item?.quantity,
          food_variations: item?.item?.food_variations,
          selectedAddons: selectedAddons,
          selectedOption: selectedOptions,
          itemBasePrice: item?.item?.price,
        };
      });
      dispatch(
        setUpdateVariationToCart({
          newObj: product,
          indexNumber: indexNumber,
        })
      );
      toast.success(t("Item updated successfully"));
      handleModalClose?.();
      //dispatch()
    }
  };

  const addOrUpdateToCartByDispatch = () => {
    if (productUpdate) {
      //for updating

      let totalQty = 0;
      const itemObject = {
        cart_id: product?.cart_id,
        guest_id: getGuestId(),
        model: product?.available_date_starts ? "ItemCampaign" : "Item",
        add_on_ids:
          selectedAddons?.length > 0
            ? selectedAddons?.map((add) => {
                return add.id;
              })
            : [],
        add_on_qtys:
          selectedAddons?.length > 0
            ? selectedAddons?.map((add) => {
                totalQty += add.quantity;
                return totalQty;
              })
            : [],
        item_id: product?.id,
        price: totalPrice,
        quantity: quantity,
        variation:
          getNewVariationForDispatch()?.length > 0
            ? getNewVariationForDispatch()?.map((variation) => {
                return {
                  name: variation.name,
                  values: {
                    label: handleValuesFromCartItems(variation.values),
                  },
                };
              })
            : [],
      };

      updateMutate(itemObject, {
        onSuccess: updateCartSuccessHandler,
        onError: onErrorResponse,
      });
    } else {
      //for adding;
      // dispatch(
      //   setCart({
      //     ...modalData[0],
      //     totalPrice: getDiscountedAmount(
      //       totalPrice,
      //       product?.discount,
      //       product?.discount_type,
      //       product?.store_discount,
      //       quantity
      //     ),
      //     quantity: quantity,
      //     food_variations: getNewVariationForDispatch(),
      //     selectedAddons: selectedAddons,
      //     selectedOption: otherSelectedOption,
      //     itemBasePrice: getDiscountedAmount(
      //       calculateItemBasePrice(modalData[0], selectedOptions),
      //       product?.discount,
      //       product?.discount_type,
      //       product?.store_discount,
      //       quantity
      //     ),
      //     // selectedVariations: selectedVariations,
      //   })
      // );
      let totalQty = 0;
      const itemObject = {
        guest_id: guestId,
        model: modalData[0]?.available_date_starts ? "ItemCampaign" : "Item",
        add_on_ids:
          selectedAddons?.length > 0
            ? selectedAddons?.map((add) => {
                return add.id;
              })
            : [],
        add_on_qtys:
          selectedAddons?.length > 0
            ? selectedAddons?.map((add) => {
                totalQty += add.quantity;
                return totalQty;
              })
            : [],
        item_id: modalData[0]?.id,
        price: totalPrice,
        quantity: quantity,
        variation:
          getNewVariationForDispatch()?.length > 0
            ? getNewVariationForDispatch()?.map((variation) => {
                return {
                  name: variation.name,
                  values: {
                    label: handleValuesFromCartItems(variation.values),
                  },
                };
              })
            : [],
      };
      mutate(itemObject, {
        onSuccess: handleSuccess,
        onError: onErrorResponse,
      });
    }
  };
  const handleBuyOrOrderNow = (status) => {
    const product = getNewObj();
    if (status === "buy_now") {
      dispatch(setBuyNowItemList(product));
      router.push(`/checkout?page=buy_now`, undefined, { shallow: true });
    } else {
      dispatch(setCampaignItemList(product));
      router.push(`/checkout?page=campaign`, undefined, { shallow: true });
    }
  };

  const handleProductAddUpdate = (checkingFor) => {
    if (checkingFor === "cart") {
      addOrUpdateToCartByDispatch();
    } else if (checkingFor === "campaign") {
      handleBuyOrOrderNow(checkingFor);
    } else if (checkingFor === "buy_now") {
      handleBuyOrOrderNow(checkingFor);
    }
  };

  const handleRequiredItemsToaster = (itemsArray, selectedOptions) => {
    itemsArray?.forEach((item) => {
      if (selectedOptions.length > 0) {
        selectedOptions?.forEach((sOption) => {
          if (sOption.choiceIndex !== item.indexNumber) {
            const text = item.name;
            let checkingQuantity = false;
            handleProductVariationRequirementsToaster(
              text,
              checkingQuantity,
              t
            );
          }
        });
      } else {
        const text = item.name;
        let checkingQuantity = false;
        handleProductVariationRequirementsToaster(text, checkingQuantity, t);
      }
    });
  };
  const optionalVariationSelectionMinMax = () => {
    const selectedValues = selectedOptions.filter(
      (item) => item.type === "optional"
    );
    let isTrue = false;
    if (selectedValues.length > 0) {
      const selectedIndexCount = [];
      selectedValues.forEach((item) =>
        selectedIndexCount.push(item.choiceIndex)
      );
      const indexWithoutDuplicates = [...new Set(selectedIndexCount)];
      if (indexWithoutDuplicates.length > 0) {
        indexWithoutDuplicates.forEach((itemIndex) => {
          let optionalItemIndex = modalData?.[0]?.food_variations?.find(
            (mItem, index) => index === itemIndex
          );

          if (optionalItemIndex) {
            if (optionalItemIndex.type === "multi") {
              let indexNum = modalData[0]?.food_variations?.findIndex(
                (mItem) => mItem.name === optionalItemIndex.name
              );
              let count = 0;
              selectedIndexCount.forEach((indexN) => {
                if (indexN === indexNum) {
                  count += 1;
                }
              });

              if (
                count >= Number.parseInt(optionalItemIndex.min) &&
                count <= Number.parseInt(optionalItemIndex.max)
              ) {
                isTrue = true;
              } else {
                const text = {
                  name: optionalItemIndex.name,
                  min: optionalItemIndex.min,
                  max: optionalItemIndex.max,
                };
                let checkingQuantity = true;
                isTrue = false;
                let id = true;
                handleProductVariationRequirementsToaster(
                  text,
                  checkingQuantity,
                  t,
                  id
                );
              }
            } else {
              isTrue = true;
            }
          } else {
            isTrue = true;
          }
        });
      } else {
        isTrue = true;
      }
    } else {
      isTrue = true;
    }

    return isTrue;
  };

  const handleAddToCartOnDispatch = (checkingFor) => {
    let requiredItemsList = [];
    if (modalData?.[0]?.food_variations?.length > 0) {
      modalData?.[0]?.food_variations?.forEach((item, index) => {
        if (item.required === "on") {
          const itemObj = {
            indexNumber: index,
            type: item.type,
            max: item.max,
            min: item.min,
            name: item.name,
          };
          requiredItemsList.push(itemObj);
        }
      });
    }
    if (requiredItemsList.length > 0) {
      if (selectedOptions.length === 0) {
        handleRequiredItemsToaster(requiredItemsList, selectedOptions);
      } else {
        let itemCount = 0;

        requiredItemsList?.forEach((item, index) => {
          // if(item)
        });

        requiredItemsList?.forEach((item, index) => {
          const isExistInSelection = selectedOptions?.find(
            (sitem) => sitem.choiceIndex === item.indexNumber
          );
          if (isExistInSelection) {
            if (item.type === "single") {
              //call add/update to cart functionalities
              itemCount += 1;
            } else {
              //check based on min max for multiple selection
              let selectedOptionCount = 0;
              selectedOptions?.forEach((item) => {
                if (item.choiceIndex === isExistInSelection?.choiceIndex) {
                  selectedOptionCount += 1;
                }
              });
              if (
                selectedOptionCount >= Number.parseInt(item.min) &&
                selectedOptionCount <= Number.parseInt(item.max)
              ) {
                //call add/update to cart functionalities
                itemCount += 1;
              } else {
                const text = {
                  name: item.name,
                  min: item.min,
                  max: item.max,
                };
                let checkingQuantity = true;

                handleProductVariationRequirementsToaster(
                  text,
                  checkingQuantity,
                  t
                );
              }
            }
            if (
              itemCount === requiredItemsList.length &&
              optionalVariationSelectionMinMax(selectedOptions, modalData)
            ) {
              handleProductAddUpdate(checkingFor);
            }
          } else {
            handleRequiredItemsToaster(requiredItemsList, selectedOptions);
          }
        });
      }
    } else {
      handleProductAddUpdate(checkingFor);
    }
  };
  const addToCard = (status) => {
    let checkingFor = status ? status : "cart";
    if (cartList?.length > 0) {
      //checking same restaurant items already exist or not
      const isRestaurantExist = cartList.find(
        (item) => item.store_id === product.store_id
      );
      if (isRestaurantExist) {
        if (productUpdate) {
          handleAddToCartOnDispatch(checkingFor);
        } else {
          //add the same product based on variations
          handleAddToCartOnDispatch(checkingFor);
        }
      } else {
        if (cartList.length !== 0) {
          handleClearCartModalOpen();
        }
      }
    } else {
      handleAddToCartOnDispatch(checkingFor);
    }
  };
  const clearCartAlert = () => {
    dispatch(setClearCart());
    setClearCartModal(false);
    toast.success(
      t(
        "Previously added restaurant foods have been removed from cart. Now, try again."
      ),
      {
        duration: 6000,
      }
    );
  };
  const handleClose = () => setOpen?.(false);

  const changeChoices = (
    e,
    option,
    optionIndex,
    choiceIndex,
    isRequired,
    choiceType,
    checked
  ) => {
    if (choiceType === "single") {
      if (checked) {
        //selected or checked variation handling
        if (selectedOptions.length > 0) {
          const isExist = selectedOptions.find(
            (item) =>
              item.choiceIndex === choiceIndex &&
              item.optionIndex === optionIndex
          );
          if (isExist) {
            const newSelectedOptions = selectedOptions.filter(
              (sOption) =>
                sOption.choiceIndex === choiceIndex &&
                sOption.label !== isExist.label
            );
            setSelectedOptions(newSelectedOptions);
            setTotalPrice(
              (prevState) =>
                prevState - Number.parseInt(option.optionPrice) * quantity
            );
            setVarPrice(
              (prevPrice) =>
                prevPrice - Number.parseInt(option.optionPrice) * quantity
            );
          } else {
            const isItemExistFromSameVariation = selectedOptions.find(
              (item) => item.choiceIndex === choiceIndex
            );
            if (isItemExistFromSameVariation) {
              const newObjs = selectedOptions.map((item) => {
                if (item.choiceIndex === choiceIndex) {
                  return {
                    choiceIndex: choiceIndex,
                    ...option,
                    optionIndex: optionIndex,
                    isSelected: true,
                    type: isRequired === "on" ? "required" : "optional",
                  };
                } else {
                  return item;
                }
              });
              setSelectedOptions(newObjs);
              //changing total price by removing previous ones price and adding new selection options price
              setTotalPrice(
                (prevState) =>
                  prevState -
                  Number.parseInt(isItemExistFromSameVariation.optionPrice) *
                    quantity +
                  Number.parseInt(option.optionPrice) * quantity
              );
              setVarPrice(
                (prevPrice) =>
                  prevPrice -
                  Number.parseInt(isItemExistFromSameVariation.optionPrice) *
                    quantity +
                  Number.parseInt(option.optionPrice) * quantity
              );
            } else {
              const newObj = {
                choiceIndex: choiceIndex,
                ...option,
                optionIndex: optionIndex,
                isSelected: true,
                type: isRequired === "on" ? "required" : "optional",
              };
              setSelectedOptions([...selectedOptions, newObj]);
              setTotalPrice(
                (prevState) =>
                  prevState + Number.parseInt(option.optionPrice) * quantity
              );
              setVarPrice(
                (prevPrice) =>
                  prevPrice + Number.parseInt(option.optionPrice) * quantity
              );
            }
          }
        } else {
          // for a new selected variation
          const newObj = {
            choiceIndex: choiceIndex,
            ...option,
            optionIndex: optionIndex,
            isSelected: true,
            type: isRequired === "on" ? "required" : "optional",
          };
          setSelectedOptions([newObj]);
          setTotalPrice(
            (prevState) =>
              prevState + Number.parseInt(option.optionPrice) * quantity
          );
          setVarPrice(
            (prevPrice) =>
              prevPrice + Number.parseInt(option.optionPrice) * quantity
          );
        }
      } else {
        // uncheck or unselect variation handle
        const filtered = selectedOptions.filter((item) => {
          if (item.choiceIndex === choiceIndex) {
            if (item.label !== option.label) {
              return item;
            }
          } else {
            return item;
          }
        });
        setSelectedOptions(filtered);

        setTotalPrice(
          (prevState) =>
            prevState - Number.parseInt(option.optionPrice) * quantity
        );
        setVarPrice(
          (prevPrice) =>
            prevPrice - Number.parseInt(option.optionPrice) * quantity
        );
      }
    } else {
      //for multiple optional variation selection
      if (e.target.checked) {
        setSelectedOptions((prevState) => [
          ...prevState,
          {
            choiceIndex: choiceIndex,
            ...option,
            optionIndex: optionIndex,
            isSelected: true,
            type: isRequired === "on" ? "required" : "optional",
          },
        ]);
        setTotalPrice(
          (prevState) =>
            prevState + Number.parseInt(option.optionPrice) * quantity
        );
        setVarPrice(
          (prevPrice) =>
            prevPrice + Number.parseInt(option.optionPrice) * quantity
        );
      } else {
        const filtered = selectedOptions.filter((item) => {
          if (item.choiceIndex === choiceIndex) {
            if (item.label !== option.label) {
              return item;
            }
          } else {
            return item;
          }
        });
        setSelectedOptions(filtered);
        setTotalPrice(
          (prevState) =>
            prevState - Number.parseInt(option.optionPrice) * quantity
        );
        setVarPrice(
          (prevPrice) =>
            prevPrice - Number.parseInt(option.optionPrice) * quantity
        );
      }
    }
  };
  const radioCheckHandler = useCallback(
    (choiceIndex, option, optionIndex) => {
      const isExist = selectedOptions.find(
        (sOption) =>
          sOption.choiceIndex === choiceIndex &&
          sOption.optionIndex === optionIndex
      );
      return !!isExist;
    },
    [selectedOptions]
  );
  const changeAddOns = (addOn) => {
    if (addOn?.isChecked && addOn?.quantity > 0) {
      let newArray = [];
      if (selectedAddons?.length > 0) {
        newArray = [...selectedAddons];
        const existIndex = newArray.findIndex((item) => item.id === addOn.id);
        if (existIndex !== -1) {
          newArray[existIndex] = addOn;
        } else {
          newArray.push(addOn);
        }
      } else {
        newArray.push(addOn);
      }
      setSelectedAddOns(newArray);
    } else {
      let filter = selectedAddons.filter((item) => item.id !== addOn.id);
      setSelectedAddOns(filter);
    }
  };
  const handleTotalPrice = () => {
    let price;
    if (productUpdate) {
      if (modalData.length > 0) {
        price = modalData?.[0]?.price;
      }
    } else {
      price = product?.price;
    }
    if (selectedOptions?.length > 0) {
      selectedOptions?.forEach(
        (item) => (price += Number.parseInt(item?.optionPrice))
      );
    }
    setTotalPrice(price * quantity);
  };
  useEffect(() => {
    if (product) {
      handleTotalPrice();
    }
  }, [quantity, modalData]);
  const decrementPrice = () => {
    setQuantity((prevQty) => prevQty - 1);
  };

  const incrementPrice = () => {
    if (modalData[0]?.maximum_cart_quantity) {
      if (modalData[0]?.maximum_cart_quantity <= modalData[0]?.quantity) {
        toast.error(t(out_of_limits));
      } else {
        setQuantity((prevQty) => prevQty + 1);
      }
    } else {
      setQuantity((prevQty) => prevQty + 1);
    }
  };
  const { mutate: addFavoriteMutation } = useAddToWishlist();

  const isInCart = (id) => {
    if (productUpdate) {
      const isInCart = cartList.filter((item) => item.id === id);
      if (isInCart.length > 0) {
        return true;
      } else {
        return false;
      }
    }

    // return !!cartList.find((item) => item.id === id)
  };

  const isInList = (id) => {
    return !!wishLists?.food?.find((wishFood) => wishFood.id === id);
  };
  //auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const orderNow = () => {
    let checkingFor = "campaign";
    if (token) {
      handleAddToCartOnDispatch(checkingFor);
    } else {
      toast.error(not_logged_in_message);
    }
  };
  const handleSignInSuccess = () => {
    dispatch(
      setCampCart({
        ...modalData[0],
        totalPrice: totalPrice,
        quantity: quantity,
        selectedAddons: selectedAddons,
      })
    );
    router.push(`/checkout?page=campaign`, undefined, { shallow: true });
  };
  const [selectedChoice, setChoices] = useState([]);
  const cartResetHandler = () => {
    setClearCartModal(false);
  };

  const handleChoices = (option, choice) => {
    if (cartList.length > 0) {
      const itemIsInCart = cartList.find(
        (item) =>
          item?.id === modalData?.[0]?.id &&
          JSON.stringify(item?.selectedOption?.[0]) === JSON.stringify(option)
      );
      if (itemIsInCart) {
        setOtherSelectedOption(modalData?.[0]?.selectedOption);
      } else {
        setOtherSelectedOption([option]);
      }
    } else {
      setOtherSelectedOption([option]);
    }
  };

  const handleRouteToStore = () => {
    router.push({
      pathname: `/store/[id]`,
      query: {
        id: modalData[0]?.store_id,
        module_id: `${modalData[0]?.module_id}`,
        module_type: getCurrentModuleType(),
        store_zone_id: `${modalData[0].zone_id}`,
      },
    });
  };

  return (
    <>
      <Modal open={open} onClose={handleModalClose} disableAutoFocus={true}>
        <FoodDetailModalStyle
          sx={{ bgcolor: "background.paper" }}
          foodmodal="true"
        >
          <CustomStackFullWidth
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ position: "relative" }}
          >
            <IconButton
              onClick={handleModalClose}
              sx={{
                zIndex: "99",
                position: "absolute",
                top: 10,
                right: 5,
                backgroundColor: (theme) => theme.palette.neutral[100],
                borderRadius: "50%",
                [theme.breakpoints.down("md")]: {
                  top: 10,
                  right: 5,
                },
              }}
            >
              <CloseIcon sx={{ fontSize: "16px", fontWeight: "500" }} />
            </IconButton>
          </CustomStackFullWidth>

          <FoodDetailsManager
            configData={configData}
            handleDiscountChip={handleDiscountChip}
            imageBaseUrl={imageBaseUrl}
            modalData={modalData}
            product={product}
            t={t}
            router={router}
            isInList={isInList}
            theme={theme}
            addToWishlistHandler={addToWishlistHandler}
            removeFromWishlistHandler={removeFromWishlistHandler}
            isWishlisted={isWishlisted}
            handleRouteToStore={handleRouteToStore}
          />
          <SimpleBar style={{ maxHeight: "30vh " }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              paddingX="1rem"
              direction="row"
            >
              <Grid item md={12} pt=".5rem">
                <CustomStackFullWidth
                  direction="row"
                  alignItems="center"
                  flexWrap="wrap"
                  justifyContent="space-between"
                  gap="35px"
                >
                  {modalData.length > 0 && (
                    <StartPriceView
                      data={modalData[0]}
                      configData={configData}
                    />
                  )}
                  <IncrementDecrementManager
                    decrementPrice={decrementPrice}
                    totalPrice={totalPrice}
                    quantity={quantity}
                    incrementPrice={incrementPrice}
                  />
                </CustomStackFullWidth>
              </Grid>
            </Grid>
            <Stack paddingX="1rem">
              {modalData.length > 0 &&
                modalData[0].food_variations?.length > 0 && (
                  <VariationsManager
                    t={t}
                    modalData={modalData}
                    radioCheckHandler={radioCheckHandler}
                    changeChoices={changeChoices}
                  />
                )}
              {/*{modalData.length > 0 && modalData[0].variations?.length > 0 && (*/}
              {/*  <OtherVariationManager*/}
              {/*    modalData={modalData[0]}*/}
              {/*    handleChoices={handleChoices}*/}
              {/*  />*/}
              {/*)}*/}
              {modalData.length > 0 && modalData[0].add_ons?.length > 0 && (
                <AddOnsManager
                  t={t}
                  modalData={modalData}
                  changeAddOns={changeAddOns}
                  selectedAddons={selectedAddons}
                />
              )}
            </Stack>
          </SimpleBar>
          <Stack paddingX="1rem" pt=".5rem">
            <TotalAmountVisibility
              modalData={modalData}
              totalPrice={totalPrice}
              t={t}
              productDiscount={product?.discount}
              productDiscountType={product?.discount_type}
              productRestaurantDiscount={product?.store_discount}
              productQuantity={quantity}
              selectedAddOns={selectedAddons}
            />
          </Stack>
          <Box sx={{ marginTop: "20px" }}>
            <Grid container direction="row" paddingX="1rem" pb="1rem">
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                alignSelf="center"
                paddingLeft={{ xs: "10px", md: "0px" }}
                paddingBottom={{ sm: "10px", md: "0px" }}
              ></Grid>
              <Grid item md={12} sm={12} xs={12}>
                {/*this check is for normal food if the food is available*/}
                {modalData.length > 0 &&
                  isAvailable(
                    modalData[0].available_time_starts,
                    modalData[0].available_time_ends
                  ) &&
                  !modalData[0]?.available_date_starts && (
                    <AddOrderToCart
                      isInCart={isInCart}
                      product={product}
                      t={t}
                      addToCard={addToCard}
                      orderNow={orderNow}
                      router={router}
                      isLoading={isLoading}
                      updateIsLoading={updateIsLoading}
                    />
                  )}
                {/*this check is for normal food if the food is not available but the schedule order is on*/}
                {modalData.length > 0 &&
                  !isAvailable(
                    modalData[0].available_time_starts,
                    modalData[0].available_time_ends
                  ) &&
                  !modalData[0]?.available_date_starts && (
                    <AddOrderToCart
                      isLoading={isLoading}
                      isInCart={isInCart}
                      product={product}
                      t={t}
                      addToCard={addToCard}
                      orderNow={orderNow}
                      router={router}
                      isScheduled={
                        modalData[0].schedule_order ? "true" : "false"
                      }
                      updateIsLoading={updateIsLoading}
                    />
                  )}
                {/*this check is for campaign food if the food is available*/}
                {modalData.length > 0 &&
                  isAvailable(
                    modalData[0].available_time_starts,
                    modalData[0].available_time_ends
                  ) &&
                  modalData[0]?.available_date_starts && (
                    <AddUpdateOrderToCart
                      modalData={modalData}
                      isInCart={isInCart}
                      addToCard={addToCard}
                      t={t}
                      product={product}
                      orderNow={orderNow}
                      isCampaign
                      isLoading={isLoading}
                      updateIsLoading={updateIsLoading}
                    />
                  )}
              </Grid>
            </Grid>
          </Box>
          {clearCartModal && (
            <CustomModal
              openModal={clearCartModal}
              handleClose={() => cartResetHandler()}
            >
              <CartClearModal
                handleClose={() => cartResetHandler()}
                dispatchRedux={dispatch}
              />
            </CustomModal>
          )}
        </FoodDetailModalStyle>
      </Modal>
    </>
  );
};

export default FoodDetailModal;
