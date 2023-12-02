import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid, alpha, styled } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useAddStoreToWishlist } from "../../api-manage/hooks/react-query/wish-list/useAddStoreToWishLists";
import { useWishListStoreDelete } from "../../api-manage/hooks/react-query/wish-list/useWishListStoreDelete";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import {
  addWishListStore,
  removeWishListStore,
} from "../../redux/slices/wishList";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { not_logged_in_message } from "../../utils/toasterMessages";
import CustomImageContainer from "../CustomImageContainer";
import CustomRatingBox from "../CustomRatingBox";
import Body2 from "../typographies/Body2";
import H4 from "../typographies/H4";
import { CustomOverLay } from "./Card.style";
import QuickView from "./QuickView";
import { t } from "i18next";

const FavoriteWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  width: "24px",
  height: "24px",
  backgroundColor: theme.palette.neutral[100],
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const Wrapper = styled(CustomStackFullWidth)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "10px",
  border: `1px solid ${alpha(theme.palette.neutral[400], 0.2)}`,
  borderRadius: "10px",
  cursor: "pointer",
  transition: "all ease 0.5s",
  ".MuiTypography-subtitle2": {
    transition: "all ease 0.5s",
  },
  "&:hover": {
    transform: "scale(1.03)",
    img: { transform: "scale(1.1)" },
    ".MuiTypography-subtitle2": {
      color: theme.palette.primary.main,
      letterSpacing: "0.02em",
    },
  },
}));

const ImageWrapper = styled(CustomBoxFullWidth)(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  height: "130px",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    height: "140px",
  },
}));

const timeAndDeliveryTypeHandler = (item) => {
  const time = item?.delivery_time !== null ? item?.delivery_time : ""
  const free_delivery = item?.free_delivery === true ?  `. ${t("Free Delivery")}` : "";
  return time+free_delivery;
};
const StoreCard = (props) => {
  const { item, imageUrl } = props;
  const [isHover, setIsHover] = useState(false);
  const { wishLists } = useSelector((state) => state.wishList);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { mutate: addFavoriteMutation } = useAddStoreToWishlist();
  const { mutate } = useWishListStoreDelete();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    wishlistItemExistHandler();
  }, [wishLists]);
  const wishlistItemExistHandler = () => {
    if (wishLists?.store?.find((wishItem) => wishItem.id === item?.id)) {
      setIsWishlisted(true);
    } else {
      setIsWishlisted(false);
    }
  };
  const quickViewHandleClick = (e) => {
    // e.stopPropagation();
    // dispatch({ type: ACTION.setOpenModal, payload: true });
  };
  const addToWishlistHandler = (e) => {
    e.stopPropagation();
    let token = undefined;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    if (token) {
      addFavoriteMutation(item?.id, {
        onSuccess: (response) => {
          if (response) {
            dispatch(addWishListStore(item));
            setIsWishlisted(true);
            toast.success(response?.message);
          }
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      });
    } else toast.error(t(not_logged_in_message));
  };
  const removeFromWishlistHandler = (e) => {
    e.stopPropagation();
    const onSuccessHandlerForDelete = (res) => {
      dispatch(removeWishListStore(item?.id));
      setIsWishlisted(false);
      toast.success(res.message, {
        id: "wishlist",
      });
    };
    mutate(item?.id, {
      onSuccess: onSuccessHandlerForDelete,
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  };
  const handleClick = () => {
    router.push({
      pathname: `/store/[id]`,
      query: {
        id: `${item?.slug ? item?.slug : item?.id}`,
        module_id: `${item?.module_id}`,
        module_type: getCurrentModuleType(),
        store_zone_id: `${item?.zone_id}`,
        distance: item?.distance,
      },
    });
  };
  return (
    <Wrapper
      spacing={2}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => handleClick()}
    >
      <ImageWrapper>
        <CustomImageContainer
          src={imageUrl}
          // alt={t("Background")}
          height="100%"
          width="100%"
          borderRadius="10px"
          objectFit="cover"
        />
        {isWishlisted && (
          <Box sx={{ position: "absolute", top: 10, right: 10 }}>
            <FavoriteWrapper>
              <FavoriteIcon fontSize="small" />
            </FavoriteWrapper>
          </Box>
        )}
        <CustomOverLay hover={isHover}>
          <QuickView
            quickViewHandleClick={quickViewHandleClick}
            isTransformed={isHover}
            isWishlisted={isWishlisted}
            addToWishlistHandler={addToWishlistHandler}
            removeFromWishlistHandler={removeFromWishlistHandler}
            noQuickview
          />
        </CustomOverLay>
      </ImageWrapper>

      <CustomBoxFullWidth>
        <Grid container>
          <Grid item xs={9.5}>
            <H4 text={item?.name} />
          </Grid>
          <Grid item xs={2.5}>
            <CustomRatingBox rating={item?.avg_rating} />
          </Grid>
          <Grid item xs={12} sx={{ mt: "10px" }}>
            <Body2 text={item?.address} />
          </Grid>
          <Grid item xs={12} sx={{ mt: "7px" }}>
            <Body2 text={timeAndDeliveryTypeHandler(item)} />
          </Grid>
        </Grid>
      </CustomBoxFullWidth>
    </Wrapper>
  );
};

StoreCard.propTypes = {};

export default StoreCard;
