import React from "react";
import { Stack } from "@mui/system";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import {
  setDecrementToCartItem,
  setIncrementToCartItem,
  setRemoveItemFromCart,
} from "../../redux/slices/cart";
import { useDispatch, useSelector } from "react-redux";
import { CustomCardButton } from "./ProductCard";
import { out_of_stock } from "../../utils/toasterMessages";
import { t } from "i18next";
import { toast } from "react-hot-toast";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";

const ProductCardIncrementDecrement = ({ isInCart, modalData }) => {
  const reduxDispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);
  const getQuantity = (id) => {
    const product = cartList.find((cartItem) => cartItem.id === id);
    return product && product.quantity ? product.quantity : 1;
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (getCurrentModuleType() !== "food") {
      if (modalData?.stock <= getQuantity(modalData?.id)) {
        toast.error(t(out_of_stock));
      } else {
        reduxDispatch(setIncrementToCartItem(isInCart));
      }
    } else {
      reduxDispatch(setIncrementToCartItem(isInCart));
    }
  };
  const handleDecrement = (e) => {
    e.stopPropagation();
    reduxDispatch(setDecrementToCartItem(isInCart));
  };
  const handleRemove = (e) => {
    e.stopPropagation();
    reduxDispatch(setRemoveItemFromCart(isInCart));
  };
  return (
    <>
      <CustomCardButton
        sx={{
          padding: "5.5px 19px",
          fontSize: { xs: "10px", sm: "inherit" },
          "&:hover": {
            backgroundColor: "rgb(0, 204, 150)",
          },

          width: "115px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          height={{ xs: "15px", sm: "20px", md: "25px" }}
        >
          {getQuantity(modalData?.id) === 1 ? (
            <IconButton
              aria-label="delete"
              size="small"
              color="error"
              onClick={(e) => handleRemove(e)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          ) : (
            <>
              <IconButton
                // disabled={
                //   state.modalData[0]?.totalPrice === 0 ||
                //   state.modalData[0]?.quantity <= 1
                // }
                size="small"
                color="primary"
                onClick={(e) => handleDecrement(e)}
              >
                <RemoveIcon
                  size="small"
                  sx={{
                    color: (theme) => theme.palette.neutral[100],
                  }}
                />
              </IconButton>
            </>
          )}
          <Typography variant="h6" fontWeight="500">
            {getQuantity(modalData?.id)}
          </Typography>
          <IconButton
            color="primary"
            aria-label="add"
            onClick={(e) => handleIncrement(e)}
            size="small"
          >
            <AddIcon
              size="small"
              sx={{
                color: (theme) => theme.palette.neutral[100],
              }}
            />
          </IconButton>
        </Stack>
      </CustomCardButton>
    </>
  );
};

export default ProductCardIncrementDecrement;
