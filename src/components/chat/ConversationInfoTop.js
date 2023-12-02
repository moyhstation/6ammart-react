import React from "react";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { ChatUserTop } from "./Chat.style";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { t } from "i18next";

const ConversationInfoTop = ({
  receiver,
  mdUp,
  handleToggleSidebar,
  ChatImageUrl,
  userImage,
  theme,
  deliveryman_name,
  deliveryUrl,
}) => {
  const language_direction = localStorage.getItem("direction");
  return (
    <Stack>
      {!mdUp && (
        <ChatUserTop direction="row">
          {!mdUp &&
            (language_direction === "rtl" ? (
              <IconButton onClick={handleToggleSidebar}>
                <ArrowForwardIosIcon
                  sx={{
                    width: "16px",
                    height: "15px",
                    color: (theme) => theme.palette.neutral[1000],
                  }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={handleToggleSidebar}>
                <ArrowBackIosNewIcon
                  fontSize="small"
                  sx={{
                    width: "16px",
                    height: "15px",
                    color: (theme) => theme.palette.neutral[1000],
                  }}
                />
              </IconButton>
            ))}
          <Stack width="100%">
            <Typography fontSize="16px" fontWeight="700" textAlign="center">
              {t("Messages")}
            </Typography>
          </Stack>
        </ChatUserTop>
      )}

      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-start"
        alignItems="center"
      >
        <IconButton>
          <Avatar
            fontSize="small"
            src={`${
              deliveryman_name ? deliveryUrl : ChatImageUrl()
            }/${userImage}`}
            sx={{ width: 50, height: 50 }}
          />
        </IconButton>
        <Stack justifyContent="flex-start" alignItems="start">
          {deliveryman_name ? (
            <Typography
              textAlign="left"
              color={theme.palette.neutral[1000]}
              fontSize="16px"
              fontWeight="600"
            >
              {deliveryman_name}
            </Typography>
          ) : (
            <Typography
              textAlign="left"
              color={theme.palette.neutral[1000]}
              fontSize="16px"
              fontWeight="600"
            >
              {receiver?.sender_type === "customer"
                ? receiver?.receiver?.f_name.concat(
                    " ",
                    receiver?.receiver?.l_name
                  ) || " "
                : receiver?.sender?.f_name.concat(
                    " ",
                    receiver?.sender?.l_name
                  ) || " "}
            </Typography>
          )}

          {/*<Typography*/}
          {/*  fontSize="12px"*/}
          {/*  color={theme.palette.neutral[400]}*/}
          {/*  textTransform="capitalize"*/}
          {/*  textAlign="left"*/}
          {/*>*/}
          {/*  Online - Last seen, 2.02pm*/}
          {/*</Typography>*/}
        </Stack>
        {/*<Avatar />*/}
      </Stack>
    </Stack>
  );
};

ConversationInfoTop.propTypes = {};

export default ConversationInfoTop;
