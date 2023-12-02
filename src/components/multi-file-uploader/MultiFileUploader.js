import React, { useEffect, useRef, useState } from "react";
import FilePreviewer from "../file-previewer/FilePreviewer";
import FileInputField from "../form-fields/FileInputField";
import { Grid, Stack, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { CustomTypographyForMultiImagePreviewer } from "./MultiFileUploader.style";
import { useTranslation } from "react-i18next";

const MultiFileUploader = (props) => {
  const { t } = useTranslation();
  const {
    width,
    fileImagesHandler,
    maxFileSize,
    supportedFileFormats,
    acceptedFileInput,
    labelText,
    titleText,
    hintText,
    totalFiles,
    gridControl,
    prescription,
  } = props;
  const [files, setFiles] = useState(totalFiles ? totalFiles : []);
  const [error, setError] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");

  // const { businessInfoImageReset } = useSelector(
  //     (state) => state.multiStepForm
  // )
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    fileImagesHandler(files);
    // dispatch(setBusinessInfoImageReset(false))
  }, [files]);
  // useEffect(() => {
  //     setFiles([])
  // }, [businessInfoImageReset])
  const FileSelectedHandler = (e) => {
    let file = e.target.files[e.target.files.length - 1];
    let fileExtension = file.name.split(".").pop();
    if (supportedFileFormats.indexOf(fileExtension) !== -1) {
      if (file.size <= maxFileSize) {
        setError(false);
        setFiles([...files, ...e.target.files]);
      } else {
        setError(true);
        setErrorAlert(t("Chose an image max size 2mb"));
      }
    } else {
      setError(true);
      setErrorAlert(t("Unsupported file format chosen"));
    }
  };
  const DeleteImageFromFiles = (id) => {
    let remainingFiles = files.filter((item, index) => index !== id);
    setFiles(remainingFiles);
  };
  const replaceFilesByIndex = (indexNumber) => {};
  return (
    <Stack width="100%" spacing={1}>
      {files.length > 0 ? (
        <>
          <FilePreviewer
            anchor={fileInputRef}
            errorStatus={error}
            titleText={titleText}
            acceptedFileInput={acceptedFileInput}
            file={files}
            width={width}
            onChange={FileSelectedHandler}
            onDelete={DeleteImageFromFiles}
            supportedFileFormats={supportedFileFormats}
            replaceFiles={replaceFilesByIndex}
            gridControl={gridControl}
            prescription={prescription}
          />
        </>
      ) : (
        <FileInputField
          titleText={titleText}
          labelText={labelText}
          hintText={hintText}
          errorStatus={error}
          acceptedFileInput={acceptedFileInput}
          width={width}
          onChange={FileSelectedHandler}
          text="Upload identity file"
          maxFileSize={200000}
        />
      )}
      {error && (
        <CustomTypographyForMultiImagePreviewer>
          {errorAlert}
        </CustomTypographyForMultiImagePreviewer>
      )}
    </Stack>
  );
};

export default MultiFileUploader;
