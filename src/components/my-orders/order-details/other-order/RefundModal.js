import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import { Button, IconButton, Stack } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { WrapperForCustomDialogConfirm } from "../../../custom-dialog/confirm/CustomDialogConfirm.style";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import CustomSelectWithFormik from "../../../custom-select/CustomSelectWithFormik";
import CustomTextFieldWithFormik from "../../../form-fields/CustomTextFieldWithFormik";
import MultiFileUploader from "../../../multi-file-uploader/MultiFileUploader";
import { useGetRefundReasons } from "../../../../api-manage/hooks/react-query/refund-request/useGetRefundReasons";
import { getToken } from "../../../../helper-functions/getToken";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
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
const RefundModal = (props) => {
  const {
    open,
    onClick,
    onClose,
    onSuccess,
    dialogTexts,
    formSubmit,
    refundIsLoading,
  } = props;
  const { data: reasonsData, refetch } = useGetRefundReasons();
  const theme = useTheme();
  useEffect(() => {
    if (getToken()) {
      refetch();
    }

  }, []);

  const { t } = useTranslation();
  const RefundRequestFormik = useFormik({
    initialValues: {
      customer_reason: "",
      customer_note: "",
      identity_image: "",
    },
    validationSchema: Yup.object({
      customer_reason: Yup.string().required(t("Please select a reason")),
    }),
    // validationSchema: ValidationSchemaForRestaurant(),
    onSubmit: async (values, helpers) => {
      try {
        formSubmitOnSuccess(values);
      } catch (err) { }
    },
  });

  let reasonsOption = [];
  if (reasonsData && reasonsData?.refund_reasons?.length > 0) {
    reasonsData?.refund_reasons?.forEach((reason) => {
      let obj = {
        label: reason.reason,
        value: reason.reason,
      };
      reasonsOption.push(obj);
    });
  }
  const noteHandler = (value) => {
    RefundRequestFormik.setFieldValue("customer_note", value);
  };
  const reasonsHandler = (value) => {
    RefundRequestFormik.setFieldValue("customer_reason", value);
  };
  const fileImagesHandler = (files) => {
    RefundRequestFormik.setFieldValue("identity_image", files);
  };
  const formSubmitOnSuccess = (values) => {
    formSubmit(values);
  };
  // const imageUrl = `${productImageUrl}/${review.food_image}`
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <IconButton
        onClick={() => onClose()}
        sx={{
          zIndex: "99",
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: (theme) => theme.palette.neutral[100],
          borderRadius: "50%",
          [theme.breakpoints.down("md")]: {
            top: 10,
            right: 5,
          },
        }}
      >
        <CloseIcon sx={{ fontSize: "20px", fontWeight: "500" }} />
      </IconButton>
      <WrapperForCustomDialogConfirm>
        <CustomStackFullWidth spacing={1}>
          <Stack alignItems="start" justifyContent="center">
            <DialogTitle id="alert-dialog-title" sx={{ padding: "10px 24px" }}>
              <Typography>{t("What’s Wrong With This Order? ")}</Typography>
            </DialogTitle>
          </Stack>
          <DialogContent sx={{ padding: "10px 24px" }}>
            <CustomStackFullWidth>
              <form noValidate onSubmit={RefundRequestFormik.handleSubmit}>
                <Stack spacing={2}>
                  <CustomStackFullWidth>
                    <CustomSelectWithFormik
                      selectFieldData={reasonsOption}
                      inputLabel={t("Select an option")}
                      passSelectedValue={reasonsHandler}
                      touched={RefundRequestFormik.touched.customer_reason}
                      errors={RefundRequestFormik.errors.customer_reason}
                      fieldProps={RefundRequestFormik.getFieldProps(
                        "customer_reason"
                      )}
                    />
                  </CustomStackFullWidth>
                  <CustomStackFullWidth>
                    <CustomTextFieldWithFormik
                      type="text"
                      label={t("Note")}
                      touched={RefundRequestFormik.touched.customer_note}
                      errors={RefundRequestFormik.errors.customer_note}
                      fieldProps={RefundRequestFormik.getFieldProps(
                        "customer_note"
                      )}
                      onChangeHandler={noteHandler}
                      value={RefundRequestFormik.values.customer_note}
                      multiline="true"
                      rows="2"
                    />
                  </CustomStackFullWidth>
                  <CustomStackFullWidth paddingTop="20px">
                    <MultiFileUploader
                      fileImagesHandler={fileImagesHandler}
                      totalFiles={RefundRequestFormik.values.identity_image}
                      maxFileSize={20000000}
                      supportedFileFormats={supportedFormatMultiImages}
                      acceptedFileInputFormat={acceptedFileInputFormat}
                      labelText={t("File Upload")}
                      width="8rem"
                      gridControl="true"
                    />
                  </CustomStackFullWidth>
                  <CustomStackFullWidth>
                    <DialogActions sx={{ padding: "0px" }}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                      >
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          sx={{ width: "100%" }}
                          loading={refundIsLoading}
                        >
                          {t("Submit Refund Request")}
                        </LoadingButton>
                      </Stack>
                    </DialogActions>
                  </CustomStackFullWidth>
                </Stack>
              </form>
            </CustomStackFullWidth>
          </DialogContent>
        </CustomStackFullWidth>
      </WrapperForCustomDialogConfirm>
    </Dialog>
  );
};

RefundModal.propTypes = {};

export default RefundModal;
