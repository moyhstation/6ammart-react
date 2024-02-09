import React from "react";
import { Avatar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { StyledBadge } from "./InfoCard";
import { Stack } from "@mui/system";

const ChatWithAdmin = ({ handleChannelOnClick, configData }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const language_direction = localStorage.getItem("direction");
  return (
    <CustomStackFullWidth
      direction="row"
      spacing={2}
      alignItems="center"
      padding="10px 15px 10px 10px"
      xs={{ cursor: "pointer" }}
      onClick={() =>
        handleChannelOnClick({
          receiver_type: "admin",
          sender_type: "customer",
          // receiver:{
          //     f_name:"Admin",l_name:""
          // }
        })
      }
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        //variant="dot"
      >
        <Avatar
          src={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
          sx={{ width: "48px", height: "48px" }}
        />
      </StyledBadge>
      <CustomStackFullWidth>
        <Stack
          direction="row"
          justifyContent="space-between"
          marginRight={language_direction === "rtl" ? "1rem" : "0rem"}
        >
          <Typography fontSize="14px" fontWeight="500">
            {configData?.business_name}
          </Typography>
        </Stack>
        {/*<Stack*/}
        {/*  direction="row"*/}
        {/*  justifyContent="space-between"*/}
        {/*  color={*/}
        {/*    selectedId === currentId*/}
        {/*      ? theme.palette.neutral[100]*/}
        {/*      : theme.palette.neutral[1000]*/}
        {/*  }*/}
        {/*>*/}
        {/*  <CustomTypographyEllipsis*/}
        {/*    sx={{*/}
        {/*      maxWidth: "130px",*/}
        {/*      color: (theme) => theme.palette.neutral[400],*/}
        {/*      textTransform: "capitalize ",*/}
        {/*    }}*/}
        {/*    fontSize={isRead > 0 ? "15px" : "12px"}*/}
        {/*    fontWeight={isRead > 0 ? "700" : "400"}*/}
        {/*    color={*/}
        {/*      isRead > 0*/}
        {/*        ? theme.palette.neutral[1000]*/}
        {/*        : theme.palette.neutral[500]*/}
        {/*    }*/}
        {/*  >*/}
        {/*    {last_message?.message && last_message?.message}{" "}*/}
        {/*  </CustomTypographyEllipsis>*/}
        {/*  /!*{!isLoading && !isSender && unRead > 0 && (*!/*/}
        {/*  /!*  <Stack*!/*/}
        {/*  /!*    width="16px"*!/*/}
        {/*  /!*    height="16px"*!/*/}
        {/*  /!*    backgroundColor={theme.palette.primary.main}*!/*/}
        {/*  /!*    justifyContent="center"*!/*/}
        {/*  /!*    alignItems="center"*!/*/}
        {/*  /!*    borderRadius="50%"*!/*/}
        {/*  /!*    color={theme.palette.neutral[100]}*!/*/}
        {/*  /!*  >*!/*/}
        {/*  /!*    <Typography fontSize="12px">{unRead}</Typography>*!/*/}
        {/*  /!*  </Stack>*!/*/}
        {/*  /!*)}*!/*/}
        {/*</Stack>*/}
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};
export default ChatWithAdmin;
