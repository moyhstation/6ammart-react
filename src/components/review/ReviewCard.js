import { Card, Stack, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { CustomTypographyGray } from "../../styled-components/CustomTypographies.style";
import CustomImageContainer from "../CustomImageContainer";
import CustomModal from "../modal";
// import ReviewModal from "../RreviewModal";
const ReviewCard = ({ review, productImageUrl }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const imageUrl = `${productImageUrl}/${review.item_image}`;
  return (
    <>
      <Card
        sx={{
          padding: ".5rem",
          backgroundColor: (theme) => theme.palette.neutral[300],
        }}
      >
        <CustomStackFullWidth direction="row" spacing={2}>
          <Stack maxWidth="120px" width="100%">
            {/* <Typography>Veg</Typography> */}

            <CustomImageContainer
              src={imageUrl}
              alt={review.item_name}
              width="100%"
              height="100%"
              objectFit="cover"
              borderRadius=".7rem"
            />
          </Stack>
          <Stack width="100%" spacing={0.5}>
            <Typography variant="h6">{review.item_name}</Typography>
            <Typography
              variant="h5"
              sx={{ display: "flex", direction: "row", alignItems: "center" }}
            >
              {review.rating}
              <StarIcon sx={{ width: "16px", color: "orange" }} />
            </Typography>
            <Typography variant="h6">{review.customer_name}</Typography>
            <CustomTypographyGray
              sx={{
                fontSize: "13px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                cursor: "pointer",
              }}
              onClick={() => setOpenModal(true)}
            >
              {review.comment}
            </CustomTypographyGray>
          </Stack>
        </CustomStackFullWidth>
      </Card>
      <CustomModal
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            padding: "15px",
            width: "450px",
            [theme.breakpoints.down("sm")]: {
              width: "250px",
            },
          }}
        >
          <Stack maxWidth="120px" width="100%" height="100px">
            <CustomImageContainer
              src={imageUrl}
              alt={review.item_name}
              width="100%"
              height="100%"
              smHeight="70px"
              objectFit="cover"
              borderRadius=".7rem"
            />
          </Stack>
          <Stack width="100%" paddingRight="10px">
            <Typography fontSize={{ xs: "12px", md: "16px" }} fontWeight="500">
              {review.item_name}
            </Typography>
            <Typography
              variant="h6"
              sx={{ display: "flex", direction: "row", alignItems: "center" }}
            >
              {review.rating}
              <StarIcon sx={{ width: "16px", color: "orange" }} />
            </Typography>
            <Typography fontSize={{ xs: "12px", md: "16px" }} fontWeight="500">
              {review.customer_name}
            </Typography>
            <CustomTypographyGray sx={{ fontSize: "13px" }}>
              {review.comment}
            </CustomTypographyGray>
          </Stack>
        </Stack>
      </CustomModal>
    </>
  );
};
export default ReviewCard;
