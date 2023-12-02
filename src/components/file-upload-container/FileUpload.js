import React from "react";
// import { DashedBox } from '../../gurbage/admin/components/forms/FormWithFormik.style'
import { Stack, Tooltip } from "@mui/material";
// import cloudIcon from '../../assets/images/icons/cloud-upload.png'
// import FileFormatInfo from '../file-format-text/FileFormatInfo'
import {
  DashedBox,
  FileUploadHeader,
  FileUploadTextContainer,
  ImageContainerFileUpload,
} from "./FileUpload.style";
import {
  CustomTypographyEllipsis,
  CustomTypographyGray,
} from "../../styled-components/CustomTypographies.style";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileFormatInfo from "../file-format-text/FileFormatInfo";
import { useTranslation } from "react-i18next";

const FileUpload = (props) => {
  const {
    anchor,
    color,
    width,
    errorStatus,
    labelText,
    titleText,
    hintText,
    alignItems,
  } = props;

  const { t } = useTranslation();

  return (
    <Stack width="100%" spacing={3}>
      {titleText && (
        <FileUploadHeader>
          <CustomTypographyGray variant="h5">{titleText}</CustomTypographyGray>
        </FileUploadHeader>
      )}
      <Stack alignItems="baseline" justifyContent="center" spacing={3}>
        <DashedBox
          onClick={() => anchor.current.click()}
          color={color}
          component="label"
          width={width}
          errorStatus={errorStatus}
        >
          <Stack alignItems="center" justifyContent="center" spacing={1.5}>
            <ImageContainerFileUpload>
              <CloudUploadIcon style={{ width: "40px", height: "40px" }} />
              {/*<img src={cloudIcon.src} alt="cloudIcon" />*/}
            </ImageContainerFileUpload>
            <Tooltip title={labelText}>
              <FileUploadTextContainer>
                <CustomTypographyEllipsis
                  sx={{ fontSize: "13px", fontWeight: "400" }}
                >
                  {labelText ? labelText : t("File upload")}
                </CustomTypographyEllipsis>
              </FileUploadTextContainer>
            </Tooltip>
          </Stack>
        </DashedBox>
        {hintText && <FileFormatInfo text={hintText} />}
      </Stack>
    </Stack>
  );
};

FileUpload.propTypes = {};

export default FileUpload;
