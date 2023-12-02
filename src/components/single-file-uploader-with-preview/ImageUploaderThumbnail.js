import React from "react";
import { CustomDotBox } from "../file-previewer/FilePreviewer.style";
import emptyImage from "../profile/asset/gallery-add.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Stack } from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";

const ImageUploaderThumbnail = ({
  label,
  maxWidth,
  width,
  error,
  borderRadius,
}) => {
  return (
    <CustomDotBox width={width} error={error} borderRadius={borderRadius}>
      <CustomImageContainer
        src={emptyImage.src}
        width="36px"
        height="36px"
        objectfit="cover"
        borderRadius="0px"
      />
      <Stack width="77px" fontSize="12px" marginTop="10px">
        {label}
      </Stack>
    </CustomDotBox>
  );
};
export default ImageUploaderThumbnail;
