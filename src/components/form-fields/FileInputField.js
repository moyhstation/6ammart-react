import React, { useRef } from "react";

import { CustomBoxFullWidth } from "../../styled-components/CustomStyles.style";
import FileUpload from "../file-upload-container/FileUpload";

const FileInputField = (props) => {
  const {
    width,
    onChange,
    errorStatus,
    acceptedFileInput,
    labelText,
    titleText,
    hintText,
    imagesHandler,
  } = props;
  const imageContainerBusinessRef = useRef();

  return (
    <CustomBoxFullWidth>
      <FileUpload
        titleText={titleText}
        labelText={labelText}
        hintText={hintText}
        width={width}
        anchor={imageContainerBusinessRef}
        errorStatus={errorStatus}
      />
      <input
        ref={imageContainerBusinessRef}
        multiple
        id="file"
        name="file"
        type="file"
        accept={acceptedFileInput}
        hidden
        onChange={(e) => onChange(e)}
      />
    </CustomBoxFullWidth>
  );
};

export default FileInputField;
