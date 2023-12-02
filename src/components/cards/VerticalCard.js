import React, { useState } from "react";
import { alpha, styled, Typography } from "@mui/material";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import CustomImageContainer from "../CustomImageContainer";
import vertical_card_image from "./assets/vartical_card_image.png";
import QuickView from "./QuickView";
import { CustomOverLay } from "./Card.style";
import { useTranslation } from "react-i18next";
import Body2 from "../typographies/Body2";
import H3 from "../typographies/H3";
import { Box } from "@mui/system";
import AddWithIncrementDecrement from "./AddWithIncrementDecrement";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";

export const Wrapper = styled(CustomStackFullWidth)(
  ({ theme, marginbottom }) => ({
    marginBottom: marginbottom === "true" ? "16px" : "0px",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${alpha(theme.palette.neutral[600], 0.2)}`,
    borderRadius: "10px",
    padding: "5px",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 30px 20px rgba(88, 110, 125, 0.1)",
    },
  })
);
export const ImageWrapper = styled(CustomBoxFullWidth)(({ theme }) => ({
  height: "180px",
  padding: "5px",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    height: "135px",
  },
}));
export const CartWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: 10,
  bottom: 0,
  zIndex: 10,
}));
const VerticalCard = (props) => {
  const { item, marginbottom, imageBaseUrl } = props;
  const [isHover, setIsHover] = useState(false);
  const [showAddtocart, setShowAddtocart] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { t } = useTranslation();
  const quickViewHandleClick = (e) => {
    // e.stopPropagation();
    // dispatch({ type: ACTION.setOpenModal, payload: true });
  };
  const handleAddToCardFromQuickview = () => {
    setShowAddtocart(false);
  };
  const handleCardHoverFromCartIconClick = (e) => {
    // e.stopPropagation();
    setIsButtonClicked(true);
    setIsHover(false);
  };
  const handleHover = () => {
    if (!isButtonClicked) {
      setIsHover(true);
    }
  };

  const handleLeave = () => {
    if (!isButtonClicked) {
      setIsHover(false);
    }
  };

  return (
    <Wrapper
      alignItems="center"
      justifyContent="center"
      onMouseEnter={
        handleHover
        // dispatch({ type: ACTION.setIsTransformed, payload: true })
      }
      // onMouseDown={
      //   () => setIsHover(false)
      //   // dispatch({ type: ACTION.setIsTransformed, payload: true })
      // }
      onMouseLeave={
        handleLeave
        // dispatch({ type: ACTION.setIsTransformed, payload: false })
      }
      marginbottom={marginbottom ? "true" : "false"}
    >
      <ImageWrapper>
        <CustomImageContainer
          height="100%"
          width="100%"
          src={`${imageBaseUrl}/${item?.image}`}
          borderRadius="10px"
        />
        <CustomOverLay hover={isHover} border_radius="10px">
          <QuickView
            quickViewHandleClick={quickViewHandleClick}
            // item={item}
            isHover={isHover}
            showAddtocart={showAddtocart}
            handleCart={handleAddToCardFromQuickview}
          />
        </CustomOverLay>
        {!showAddtocart && (
          <CartWrapper>
            <AddWithIncrementDecrement
              onHover={isHover}
              handleCardHoverFromCartIconClick={
                handleCardHoverFromCartIconClick
              }
              setIsButtonClicked={setIsButtonClicked}
              setShowAddtocart={setShowAddtocart}
              setIsHover={setIsHover}
              verticalCard
            />
          </CartWrapper>
        )}
      </ImageWrapper>
      <Box sx={{ marginTop: "10px", marginBottom: "6px" }}>
        <Body2 text={item?.store_name} />
      </Box>
      <Box sx={{ marginBottom: "8px" }}>
        <H3 text={item?.name} />
      </Box>
      <Typography>{item?.unit_type}</Typography>
      <Box sx={{ marginTop: "8px", marginBottom: "10px" }}>
        <Typography
          variant="h5"
          display="flex"
          alignItems="center"
          color="primary.main"
          flexWrap="wrap"
          gap="5px"
          lineHeight="28px"
          sx={{
            fontSize: { xs: "13px", sm: "18px" },
          }}
        >
          {getAmountWithSign(item?.price)}
        </Typography>
      </Box>
    </Wrapper>
  );
};

VerticalCard.propTypes = {};

export default VerticalCard;
