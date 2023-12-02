import React from "react";
import { Stack, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
const ChatWithAdmin = ({ handleChannelOnClick }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      backgroundColor={theme.palette.primary.main}
      spacing={2}
      padding="1rem"
      sx={{
        cursor: "pointer",
        borderRadius: "4px",
      }}
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
      <ChatIcon sx={{ color: (theme) => theme.palette.whiteContainer.main }} />
      <Typography sx={{ color: (theme) => theme.palette.whiteContainer.main }}>
        {t("Chatting with admin")}
      </Typography>
    </Stack>
  );
};
export default ChatWithAdmin;
