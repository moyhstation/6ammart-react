import React from "react";
import {
  FilePreviewerWrapper,
  CustomBoxForFilePreviewer,
  IconButtonImagePreviewer,
} from "../file-previewer/FilePreviewer.style";
import { InputLabel } from "@mui/material";
import ImageUploaderThumbnail from "./ImageUploaderThumbnail";
import DeleteIcon from "@mui/icons-material/Delete";

const ImagePreviewer = ({
  anchor,
  file,
  label,
  width,
  imageUrl,
  borderRadius,
  error,
                          objectFit,
                          height
}) => {
  let previewImage;

  if (typeof file !== "string") {
    previewImage = {
      url: URL.createObjectURL(file), // type: file.name.split('.').pop(),
    };
  } else previewImage = file;
  return (
    <>
      <CustomBoxForFilePreviewer>
        {previewImage ? (
          <FilePreviewerWrapper
            onClick={() => anchor.current.click()}
            width={width}

            objectFit={objectFit}
            borderRadius={borderRadius}
            height={height}
          >
            {typeof file !== "string" ? (
              <img src={previewImage.url} alt="preview" />
            ) : (
              <img src={imageUrl ? `${imageUrl}/${previewImage}` :previewImage } alt="profile" />
            )}
          </FilePreviewerWrapper>
        ) : (
          <FilePreviewerWrapper
            onClick={() => anchor.current.click()}
            width={width}
            height={height}
            objectFit
            borderRadius={borderRadius}
          >
            <ImageUploaderThumbnail
              label={label}
              width={width}
              error={error}
              borderRadius={borderRadius}
            />
          </FilePreviewerWrapper>
        )}
      </CustomBoxForFilePreviewer>
    </>
  );
};

export default ImagePreviewer;
