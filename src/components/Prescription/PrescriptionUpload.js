import React, { useState } from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { DeliveryCaption } from "../checkout/CheckOut.style";
import { t } from "i18next";
import MultiFileUploader from "../multi-file-uploader/MultiFileUploader";
import { Stack } from "@mui/system";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";
const acceptedFileInputFormat =
  "application/pdf,image/*,text/plain,.doc, .docx,.txt";
const supportedFormatMultiImages = [
  "jpg",
  "jpeg",
  "gif",
  "png",
  "pdf",
  "doc",
  "docx",
  "deb",
];

const PrescriptionUpload = ({ setPrescriptionImages, prescriptionImages }) => {
  const fileImagesHandler = (files) => {
    setPrescriptionImages(files);
  };
  const longText = t(
    "Note : Please upload a doctor verified prescription and you can upload jpg, Png"
  );
  return (
    <CustomStackFullWidth spacing={2.5}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <DeliveryCaption const id="demo-row-radio-buttons-group-label">
          {t("Upload Prescription")}
        </DeliveryCaption>
        <Tooltip
          title={longText}
          arrow
          placement="bottom-start"
          sx={{ cursor: "pointer", width: "194px" }}
        >
          <InfoIcon style={{ width: "16px", height: "16px" }} />
        </Tooltip>
      </Stack>

      <MultiFileUploader
        fileImagesHandler={fileImagesHandler}
        totalFiles={prescriptionImages}
        maxFileSize={20000000}
        supportedFileFormats={supportedFormatMultiImages}
        acceptedFileInputFormat={acceptedFileInputFormat}
        labelText={t("Upload Image")}
        prescription="true"
        width="7.75rem"
      />
    </CustomStackFullWidth>
  );
};

export default PrescriptionUpload;
