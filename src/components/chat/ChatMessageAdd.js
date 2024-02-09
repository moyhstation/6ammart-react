import React, { useRef, useState } from "react";
import {
  Box,
  IconButton,
  styled,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import Picker from "emoji-picker-react";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import ChatImage from "./ChatImage";
import { message_sending_image_limit } from "../../utils/toasterMessages";
import { Stack } from "@mui/system";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { getLanguage } from "../../helper-functions/getLanguage";
import SendIcon from "@mui/icons-material/Send";

const CssTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "#EF7822",
    background: "#fff",
    border: "none",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#EF7822",
    background: "#fff",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    padding: "13px 14px",
    borderRadius: "5px",
    [theme.breakpoints.down("md")]: {
      padding: "8px 14px",
    },
    "& fieldset": {
      // borderColor: '#EF7822',
    },
    "&:hover fieldset": {
      borderColor: "#EF7822",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#EF7822",
    },
  },
}));
const AttachmentBox = styled(Box)(({ theme }) => ({
  borderRadius: "5px",
  [theme.breakpoints.down("md")]: {
    padding: "7.5px",
  },
}));
const ChatMessageAdd = ({ onSend }) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [body, setBody] = useState({
    text: "",
    file: [],
  });
  const xSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const fileInputRef = useRef(null);
  const handleChange = (event) => {
    setBody({ ...body, text: event.target.value });
  };

  const handleSend = () => {
    if (!body) {
      toast.error(t("write something"));
      return;
    }
    if (body.file.length > 3) {
      toast.error(t(message_sending_image_limit));
    } else {
      onSend?.(body);
      setBody({ text: "", file: [] });
    }
  };
  const handleAttach = () => {
    fileInputRef.current.click();
  };
  const handleKeyUp = (event) => {
    if (event.code === "Enter" && !event.shiftKey) {
      handleSend();
    }
  };
  const MAX_LENGTH = 3;
  const handleFileOnChange = (e) => {
    setBody({ ...body, file: [...body.file, ...e.target.files] });
  };

  const removeImage = (name) => {
    const tempData = body.file.filter((item) => item.name !== name);
    setBody({ ...body, file: tempData });
  };
  const onEmojiClick = (event, emojiObject) => {
    setBody({ ...body, text: body.text + event?.emoji });
    setOpenEmoji(false);
  };

  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{
        position: "relative",
      }}
      padding={{ xs: "10px", md: "20px" }}
    >
      {/*<Avatar*/}
      {/*    sx={{*/}
      {/*        display: {*/}
      {/*            xs: 'none',*/}
      {/*            sm: 'inline'*/}
      {/*        },*/}
      {/*        mr: 2*/}
      {/*    }}*/}
      {/*    src={user.avatar}*/}
      {/*/>*/}
      <Stack sx={{ position: "absolute", bottom: "80%" }}>
        {openEmoji && (
          <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
        )}
      </Stack>
      <Stack
        sx={{
          border: "1px solid #EAEEF2",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <CssTextField
          // disabled={disabled}
          fullWidth
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder={t("Start a new message")}
          value={body.text}
          size="small"
          multiline
        />
        <Stack
          padding="10px"
          direction="row"
          justifyContent={body.file.length > 0 ? "space-between" : "flex-end"}
        >
          <input
            hidden
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileOnChange}
          />
          {body.file.length > 0 && (
            <ChatImage body={body} removeImage={removeImage} />
          )}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title={t("Attach photo")}>
              <AttachmentBox>
                <IconButton
                  disabled={body.file.length >= 3}
                  sx={{ padding: "0px" }}
                  onClick={handleAttach}
                >
                  <InsertPhotoIcon
                    sx={{
                      width: { xs: "20px", md: "24px" },
                      height: { xs: "20px", md: "24px" },
                    }}
                  />
                </IconButton>
              </AttachmentBox>
            </Tooltip>
            <InsertEmoticonIcon
              sx={{ cursor: "pointer", marginRight: "-10px" }}
              onClick={() => setOpenEmoji((prevState) => !prevState)}
            />
            <Tooltip title={t("Send")}>
              <AttachmentBox>
                <IconButton
                  disabled={body.text === "" && body?.file?.length === 0}
                  sx={{
                    flexDirection: "row-reverse",
                    padding: "0px",
                    transform: getLanguage() === "rtl" && "rotate(180deg)",
                  }}
                  onClick={handleSend}
                >
                  <SendIcon
                    sx={{
                      width: { xs: "20px", md: "24px" },
                      height: { xs: "20px", md: "24px" },
                    }}
                  />
                </IconButton>
              </AttachmentBox>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default ChatMessageAdd;
