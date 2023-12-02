import React from "react";
import { FoodDetailModalStyle } from "../food-details/foodDetail-modal/foodDetailModal.style";
import { Modal } from "@mui/material";
import ProductDetailsSection from "../product-details/product-details-section/ProductDetailsSection";
import { Scrollbar } from "../srollbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { useTheme } from "@emotion/react";

const ModuleModal = (props) => {
  const theme = useTheme();
  const {
    open,
    handleModalClose,
    productDetailsData,
    configData,
    addToWishlistHandler,
    removeFromWishlistHandler,
    isWishlisted,
  } = props;
  return (
    <>
      {productDetailsData && (
        <Modal open={open} onClose={handleModalClose} disableAutoFocus={true}>
          <FoodDetailModalStyle sx={{ bgcolor: "background.paper" }}>
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
                  top: -20,
                  right: -25,
                  backgroundColor: (theme) => theme.palette.neutral[100],
                  borderRadius: "50%",
                  [theme.breakpoints.down("md")]: {
                    top: 10,
                    right: 5,
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: "16px", fontWeight: "700" }} />
              </IconButton>
            </CustomStackFullWidth>
            <Scrollbar style={{ maxHeight: "80vh" }}>
              <ProductDetailsSection
                productDetailsData={productDetailsData}
                configData={configData}
                modalmanage="true"
                handleModalClose={handleModalClose}
                addToWishlistHandler={addToWishlistHandler}
                removeFromWishlistHandler={removeFromWishlistHandler}
                isWishlisted={isWishlisted}
              />
            </Scrollbar>
          </FoodDetailModalStyle>
        </Modal>
      )}
    </>
  );
};

ModuleModal.propTypes = {};

export default ModuleModal;
