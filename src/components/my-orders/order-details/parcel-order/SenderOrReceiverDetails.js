import React from "react";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { Stack } from "@mui/system";
import CustomImageContainer from "../../../CustomImageContainer";
import nodata from "../../assets/nodata.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const SenderOrReceiverDetails = (props) => {
  const { address, phone, title, image, name } = props;
  return (
    <Stack spacing={2.5}>
      <Typography
        fontSize={{ xs: "12px", md: "16px" }}
        fontWeight="500"
        align="left"
      >
        {t(title)}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1.8}>
        <CustomImageContainer
          width="80px"
          height="80px"
          smHeight="60px"
          borderRadius="50%"
          src={image.src}
          objectfit="cover"
        />
        <Stack spacing={0.5} width={{ xs: "100%", md: "250px" }}>
          <Typography
            sx={{ fontWeight: "600" }}
            color="primary.main"
            textTransform="capitalize"
            fontSize={{ xs: "12px", md: "16px" }}
          >
            {name}
          </Typography>
          <Stack direction="row" alignItems="center" gap="3px">
            <LocationOnIcon
              fontSize="1rem"
              sx={{ color: (theme) => theme.palette.neutral[400] }}
            />
            <Typography
              fontSize="12px"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {address}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" gap="3px">
            <PhoneIcon
              fontSize="1rem"
              sx={{ color: (theme) => theme.palette.neutral[400] }}
            />
            <Typography fontSize="12px">{phone}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SenderOrReceiverDetails;
