import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import CustomImageContainer from "../CustomImageContainer";

const ChatImage = ({ body, removeImage }) => {
  const theme = useTheme();
  const [files, setFiles] = useState();
  useEffect(() => {
    setFiles(body.file);
  }, [body.file]);

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "15px",
        flexWrap: "wrap",
      }}
    >
      {files?.map((item, index) => {
        return (
          <Stack
            sx={{ position: "relative", width: "auto" }}
            direction="row"
            key={index}
          >
            <CustomImageContainer
              objectFit="cover"
              src={URL.createObjectURL(item)}
              height="40px"
              width="40px"
              borderRadius="4px"
            />
            <IconButton
              sx={{
                position: "absolute",
                right: "-7px",
                top: "-7px",
                background: (theme) => theme.palette.neutral[400],
                padding: "2px",
              }}
            >
              <CloseIcon
                onClick={() => removeImage(item.name)}
                sx={{
                  color: (theme) => theme.palette.neutral[100],
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              />
            </IconButton>
          </Stack>
        );
      })}
    </Stack>
  );
};
export default ChatImage;
