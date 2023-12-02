import React, { useRef } from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import CustomImageInput from "./CustomImageInput";

const ImageAddIcon = (props) => {
  const { imageChangeHandler } = props;
  const imageContainerRef = useRef();
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "8%",
        right: "0px",
        height: "38px",
        width: "38px",
        borderRadius: "50%",
        background: (theme) => theme.palette.neutral[100],
      }}
    >
      <IconButton onClick={() => imageContainerRef.current.click()}>
        <CreateIcon color={"secondary"} />
      </IconButton>
      <CustomImageInput
        ref={imageContainerRef}
        imageChangeHandler={imageChangeHandler}
      />
    </Box>
  );
};

ImageAddIcon.propTypes = {};

export default ImageAddIcon;
