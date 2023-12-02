import React, { useEffect, useRef } from "react";
import { Box, Stack, styled } from "@mui/material";
import ChatMessages from "./ChatMessages";
import ChatMessageAdd from "./ChatMessageAdd";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "&::-webkit-scrollbar": {
      width: 7,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      outline: `1px solid slategrey`,
    },
  },
}));
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  // overflow: 'hidden',
  minHeight: "70vh",
  height: "100%",
  justifyContent: "space-between",
}));
export const ScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() =>
    elementRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    })
  );
  return <div ref={elementRef} />;
};

const ChatView = ({
  conversationData,
  handleChatMessageSend,
  messageIsLoading,
  handleScroll,
  scrollBottom,
}) => {
  const classes = useStyles();
  return (
    <StyledBox>
      <Box
        sx={{
          overflowY: "scroll",
          height: "60vh",
        }}
        onScroll={handleScroll}
        className={classes.root}
      >
        {conversationData && (
          <ChatMessages
            conversationData={conversationData}
            scrollBottom={scrollBottom}
          />
        )}
      </Box>

      <ChatMessageAdd onSend={handleChatMessageSend} />
    </StyledBox>
  );
};
export default ChatView;
