import React, { useRef, useState } from "react";
import { Stack } from "@mui/system";
import CustomImageContainer from "../CustomImageContainer";
import {
  IconButton,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CustomDateFormat } from "../date-and-time-formators/CustomDateFormat";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CustomTypographyEllipsis } from "../../styled-components/CustomTypographies.style";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ProfileTabPopover from "../profile/ProfileTabPopover";

const UserDetails = ({ data, page, deleteUserHandler }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { configData } = useSelector((state) => state.configData);
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const [openPopover, setOpenPopover] = useState(false);
  const anchorRef = useRef(null);
  const handleOpenPopover = () => {
    setOpenPopover(true);
  };
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2.5}
        position="relative"
      >
        <Stack
          width={{ xs: page === "inbox" ? "50px" : "100px", md: "140px" }}
          height={{ xs: page === "inbox" ? "50px" : "100px", md: "140px" }}
          sx={{
            border: "2px solid",
            borderColor: (theme) => theme.palette.neutral[100],
            borderRadius: "50%",
          }}
        >
          <CustomImageContainer
            src={`${configData?.base_urls?.customer_image_url}/${data?.image}`}
            borderRadius="50%"
            objectfit="cover"
            width="100%"
            height="100%"
          />
        </Stack>
        <Stack justifyContent="start">
          <CustomTypographyEllipsis fontWeight="600" fontSize="18px">
            {data ? (
              `${data?.f_name} ${data?.l_name}`
            ) : (
              <Skeleton variant="text" width="200px" height="30px" />
            )}
          </CustomTypographyEllipsis>
          <Typography variant="body" color={theme.palette.neutral[400]}>
            {t("Join")} {CustomDateFormat(data?.created_at)}
          </Typography>
        </Stack>
        {isSmall && (
          <Stack position="absolute" top="0px" left="unset" right="10px">
            <IconButton
              ref={anchorRef}
              onClick={() => handleOpenPopover()}
              sx={{
                backgroundColor: (theme) => theme.palette.neutral[100],
                padding: "3px",
                borderRadius: "2px",
              }}
            >
              <GridViewRoundedIcon color="primary" />
            </IconButton>
          </Stack>
        )}
      </Stack>
      <ProfileTabPopover
        anchorEl={anchorRef.current}
        onClose={() => setOpenPopover(false)}
        open={openPopover}
        page={page}
        deleteUserHandler={deleteUserHandler}
      />
    </>
  );
};

export default UserDetails;
