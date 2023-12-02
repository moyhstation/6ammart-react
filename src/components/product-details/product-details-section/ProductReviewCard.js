import React, { useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Avatar, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import CustomImageContainer from "../../CustomImageContainer";
import CustomRatings from "../../search/CustomRatings";
import { useSelector } from "react-redux";
import CustomModal from "../../modal";
import { Scrollbar } from "../../srollbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";

const ProductReviewCard = ({ review }) => {
  const { configData } = useSelector((state) => state.configData);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const userImageUrl = configData?.base_urls?.customer_image_url;
  return (
    <>
      <CustomStackFullWidth
        direction="row"
        spacing={7}
        sx={{ marginBottom: "35px" }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar
            src={`${userImageUrl}/${review?.customer?.image}`}
            width="42px"
            height="42px"
          />
          <Stack>
            <Typography
              fontSize="11px"
              fontWeight="700"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {`${review?.customer?.f_name}` +
                " " +
                `${review?.customer?.l_name}`}
            </Typography>
            <Stack direction="row">
              <StarIcon
                color="warning"
                style={{ width: "15px", height: "15px" }}
              />
              <Typography component="span" fontSize="12px" ml="5px">
                {`${review?.rating}/5`}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Typography fontSize="12px">{review?.comment}</Typography>
          {review?.attachment?.length > 0 && (
            <Stack direction="row" spacing={1}>
              {JSON.parse(review?.attachment)?.map((item, index) => {
                return (
                  <CustomImageContainer
                    key={index}
                    src={`${image_url}/${review?.customer?.image}`}
                    width="55px"
                    height="55px"
                  />
                );
              })}
            </Stack>
          )}
        </Stack>
      </CustomStackFullWidth>
      <CustomModal
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <CustomStackFullWidth
          backgroundColor={theme.palette.neutral[300]}
          padding="20px"
          spacing={1.5}
          sx={{
            borderRadius: ".9rem",
            width: { xs: "300px", sm: "550px" },
            cursor: "pointer",
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              top: 0,
              right: 3,
              width: "45px",
              borderRadius: "50%",
            }}
          >
            <CloseIcon />
          </IconButton>
          <CustomImageContainer
            src={`${userImageUrl}/${review?.customer?.image}`}
            width="100%"
            height="100%"
          />
        </CustomStackFullWidth>
      </CustomModal>
    </>
  );
};

export default ProductReviewCard;
