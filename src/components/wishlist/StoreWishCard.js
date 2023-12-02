import React from "react";
import {
  CustomStackFullWidth,
  StoreImageBox,
} from "../../styled-components/CustomStyles.style";
import CustomImageContainer from "../CustomImageContainer";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/system";
import { alpha, IconButton, Typography } from "@mui/material";
import deleteIcon from "../../assets/delete.png";
import { useTheme } from "@emotion/react";
import CustomRatings from "../search/CustomRatings";
import CustomDivider from "../CustomDivider";
import { removeWishListStore } from "../../redux/slices/wishList";
import toast from "react-hot-toast";
import { useWishListStoreDelete } from "../../api-manage/hooks/react-query/wish-list/useWishListStoreDelete";
import Link from "next/link";
import { getModuleId } from "../../helper-functions/getModuleId";
import { useRouter } from "next/router";

const StoreWishCard = ({ data, setSideDrawerOpen }) => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { configData } = useSelector((state) => state.configData);
  const store_image_url = `${configData?.base_urls?.store_image_url}`;
  const moduleId = JSON.parse(window.localStorage.getItem("module"))?.id;
  const storeIdOrSlug = data?.id ? data?.id : data?.slug;

  const onStoreSuccessHandlerForDelete = (res) => {
    dispatch(removeWishListStore(data?.id));
    toast.success(res.message, {
      id: "wishlist",
    });
  };
  const { mutate: storesMutate } = useWishListStoreDelete();
  const deleteWishlistStore = (e, id) => {
    e.stopPropagation();
    storesMutate(id, {
      onSuccess: onStoreSuccessHandlerForDelete,
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  };
  const handleCLick = (e) => {
    router.push(
      {
        pathname: "/store/[id]",
        query: { id: `${storeIdOrSlug}`, module_id: `${moduleId}` },
      },
      undefined,
      { shallow: true }
    );

    setSideDrawerOpen(false);
  };
  return (
    <>
      <CustomStackFullWidth
        direction="row"
        sx={{ marginTop: "1rem", cursor: "pointer" }}
        gap="10px"
        onClick={(e) => handleCLick(e)}
      >
        <StoreImageBox
          border={`.5px solid ${alpha(theme.palette.neutral[400], 0.5)}`}
        >
          <CustomImageContainer
            src={`${store_image_url}/${data?.logo}`}
            width="64px"
            height="64px"
            borderRadius="5px"
            objectfit="contain"
          />
        </StoreImageBox>

        <Stack width="0px" flexGrow="1" justifyContent="center" spacing={0.5}>
          <Typography fontWeight="500" fontSize="14px">
            {data?.name}
          </Typography>
          <CustomRatings
            ratingValue={data?.avg_rating}
            readOnly="true"
            fontSize="16px"
          />
          <Typography
            fontWeight="400"
            fontSize="12px"
            color={theme.palette.neutral[400]}
          >
            {data?.address}
          </Typography>
        </Stack>
        <Stack alignItems="center" justifyContent="center">
          <IconButton onClick={(e) => deleteWishlistStore(e, data?.id)}>
            <CustomImageContainer
              src={deleteIcon.src}
              width="18px"
              height="18px"
            />
          </IconButton>
        </Stack>
      </CustomStackFullWidth>
      <CustomDivider paddingTop="1rem" width="100%" />
    </>
  );
};

export default StoreWishCard;
