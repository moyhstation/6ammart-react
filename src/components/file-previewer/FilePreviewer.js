import React, { useEffect, useState } from "react";
import {
  CustomBoxForFilePreviewer,
  FilePreviewerWrapper,
  IconButtonImagePreviewer,
} from "./FilePreviewer.style";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { CustomBoxImageText } from "../form-fields/FileInputField";
import { Grid, Stack, useMediaQuery } from "@mui/material";
import FileInputField from "../form-fields/FileInputField";
import pdfIcon from "./assets/pdf.png";
import docIcon from "./assets/docx.png";
import txtIcon from "./assets/txt-file.png";
import folderIcon from "./assets/folder.png";
import CustomImageContainer from "../CustomImageContainer";

const FilePreviewer = (props) => {
  const {
    file,
    anchor,
    deleteImage,
    hintText,
    width,
    onChange,
    onDelete,
    errorStatus,
    acceptedFileInput,
    label,
    titleText,
    gridControl,
    prescription,
  } = props;

  const [multipleImages, setMultipleImages] = useState([]);
  const matches = useMediaQuery("(min-width:400px)");
  useEffect(() => {
    if (file?.length > 0) {
      const newImages = [];
      file.forEach((image) =>
        newImages.push({
          url: URL.createObjectURL(image),
          type: image.name.split(".").pop(),
        })
      );
      setMultipleImages(newImages);
    } else {
    }
  }, [file]);
  const renderFilePreview = () => {
    if (file?.length > 0) {
      return (
        <Grid container spacing={1}>
          {multipleImages.map((image, index) => {
            return (
              <Grid
                item
                xs={prescription === "true" && matches ? 6 : 12}
                sm={gridControl === "true" ? 4 : 2.5}
                md={gridControl === "true" ? 4 : 2.5}
                key={index}
              >
                <CustomBoxForFilePreviewer width={width}>
                  {previewBasedOnType(image, index)}
                  <IconButtonImagePreviewer onClick={() => onDelete(index)}>
                    <DeleteIcon style={{ width: "12px", height: "12px" }} />
                  </IconButtonImagePreviewer>
                </CustomBoxForFilePreviewer>
              </Grid>
            );
          })}
          <Grid
            item
            xs={prescription === "true" && matches ? 6 : 12}
            sm={gridControl === "true" ? 4 : 2.3}
            md={gridControl === "true" ? 4 : 2.3}
          >
            {multipleImages?.length <= 5 && (
              <FileInputField
                titleText={titleText}
                label={label}
                hintText={hintText}
                errorStatus={errorStatus}
                width
                onChange={onChange}
                acceptedFileInput={acceptedFileInput}
              />
            )}
          </Grid>
        </Grid>
      );
    } else {
      const previewImage = {
        url: URL.createObjectURL(file),
        type: file.name.split(".").pop(),
      };
      return (
        <CustomBoxForFilePreviewer>
          {previewBasedOnType(previewImage)}
          <IconButtonImagePreviewer onClick={() => deleteImage()}>
            <DeleteIcon />
          </IconButtonImagePreviewer>
        </CustomBoxForFilePreviewer>
      );
    }
  };
  const previewBasedOnType = (file, fileIndex) => {
    if (
      file.type === "jpg" ||
      file.type === "jpeg" ||
      file.type === "gif" ||
      file.type === "png"
    ) {
      return (
        <FilePreviewerWrapper
        // onClick={() => anchor.current.click()}
        // width={width}
        >
          <CustomImageContainer src={file.url} alt="preview" height="7.75rem" />
          {/*<img src={file.url} alt="preview" />*/}
        </FilePreviewerWrapper>
      );
    } else if (file.type === "pdf") {
      return (
        <FilePreviewerWrapper
          // onClick={() => anchor.current.click()}
          objectFit
          // width={width}
        >
          <CustomImageContainer src={pdfIcon} alt="pdf" height="7.75rem" />
        </FilePreviewerWrapper>
      );
    } else if (file.type === "docx" || file.type === "docx") {
      return (
        <FilePreviewerWrapper
          // onClick={() => anchor.current.click()}
          objectFit
          // width={width}
        >
          <CustomImageContainer src={docIcon} alt="doc" height="7.75rem" />
        </FilePreviewerWrapper>
      );
    } else if (file.type === "txt") {
      return (
        <FilePreviewerWrapper
          // onClick={() => anchor.current.click()}
          objectFit
          // width={width}
        >
          <CustomImageContainer src={txtIcon} alt="text" height="7.75rem" />
        </FilePreviewerWrapper>
      );
    } else {
      return (
        <FilePreviewerWrapper
          // onClick={() => anchor.current.click()}
          objectFit
          // width={width}
        >
          <CustomImageContainer src={folderIcon} alt="text" />
        </FilePreviewerWrapper>
      );
    }
  };
  return (
    <Stack width="100%" alignItems="center" spacing={3}>
      {renderFilePreview()}
      {hintText && (
        <CustomBoxImageText>
          <Typography>{hintText}</Typography>
        </CustomBoxImageText>
      )}
    </Stack>
  );
};
FilePreviewer.propTypes = {};
export default FilePreviewer;
