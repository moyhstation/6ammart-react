import React from "react";
import SingleFileUploader from "../single-file-uploader/SingleFileUploader";
//import CategorySetupFilesUploaderWithText from "../../pages/admin/service-categories/category-setup/CategorySetupFilesUploaderWithText";

const SingleFileUploaderWithPreview = (props) => {
  const {
    onEdit,
    headerLabel,
    labelText,
    hintText,
    deleteImage,
    file,
    onChange,
    onTouch,
    onError,
    imageOnChange,
    width,
    filePreviewFor,
  } = props;

  return (
    <>

        <>
          <SingleFileUploader
            onEdit={onEdit}
            headerLabel={headerLabel}
            labelText={labelText}
            hintText={hintText}
            deleteImage={deleteImage}
            file={file}
            onChange={onChange}
            width={width}
            filePreviewFor={filePreviewFor}
          />
        </>


    </>
  );
};



export default SingleFileUploaderWithPreview;
