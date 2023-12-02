import React, { useRef, useState } from "react";
import {
  TextField,
  Box,
  Tooltip,
  IconButton,
  styled,
  InputAdornment,
  useMediaQuery,
  alpha,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import insertImageIcon from "./asset/inportImage.png";
import Picker from "emoji-picker-react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import ChatImage from "./ChatImage";
import { message_sending_image_limit } from "../../utils/toasterMessages";
import { getLanguage } from "../../helper-functions/getLanguage";
import { Stack } from "@mui/system";
const CssTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "#EF7822",
    background: "#fff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#EF7822",
    background: "#fff",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    border: "1px solid #EAEEF2",
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
  border: "1px solid",
  padding: "11px",
  borderColor: alpha(theme.palette.neutral[400], 0.5),
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
      <Tooltip title={t("Attach photo")}>
        <AttachmentBox>
          <IconButton
            disabled={body.file.length >= 3}
            sx={{ padding: "0px" }}
            onClick={handleAttach}
          >
            <InsertPhotoIcon
              color="primary"
              sx={{
                width: { xs: "20px", md: "24px" },
                height: { xs: "20px", md: "24px" },
              }}
            />
          </IconButton>
        </AttachmentBox>
      </Tooltip>
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
      <CssTextField
        // disabled={disabled}
        fullWidth
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder={t("Start a new message")}
        value={body.text}
        size="small"
        multiline
        InputProps={{
          height: "50px",
          endAdornment: (
            <InputAdornment position="start">
              {!xSmall && (
                <InsertEmoticonIcon
                  sx={{ cursor: "pointer", marginRight: "-10px" }}
                  onClick={() => setOpenEmoji((prevState) => !prevState)}
                />
              )}
            </InputAdornment>
          ),
        }}
      />

      <Tooltip title={t("Send")}>
        <AttachmentBox>
          <IconButton
            disabled={body.text === "" && body?.file?.length === 0}
            sx={{
              color: "primary.contrastText",
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
                color: "primary.main",
              }}
            />
          </IconButton>
        </AttachmentBox>
      </Tooltip>

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
    </Stack>
  );
};
export default ChatMessageAdd;
