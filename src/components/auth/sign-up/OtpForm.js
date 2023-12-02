import React, { useRef } from "react";
import { Box, Stack, Typography, TextField } from "@mui/material";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
  StyledInputBase,
} from "../../../styled-components/CustomStyles.style";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import LoadingButton from "@mui/lab/LoadingButton";

import * as Yup from "yup";

const OtpForm = ({ data, formSubmitHandler, isLoading }) => {
  const { t } = useTranslation();
  const otpFormik = useFormik({
    //here reset_token is otp inputs
    initialValues: {
      reset_token: "",
      phone: data?.phone,
    },
    validationSchema: Yup.object({
      reset_token: Yup.string().required(t("field is empty")),
    }),
    onSubmit: async (values) => {
      try {
        formSubmitHandler(values);
      } catch (err) {}
    },
  });

  return (
    <CustomPaperBigCard width="auto" noboxshadow="true">
      <CustomStackFullWidth>
        <Stack alignItems="center" justifyContent="center">
          <Typography>
            {t("Enter the verification code (OTP) sent to")}
          </Typography>
          <Typography>{data?.phone}</Typography>
        </Stack>
        <form noValidate onSubmit={otpFormik.handleSubmit}>
          <Stack
            mt="2rem"
            padding="0 20px"
            alignItems="center"
            justifyContent="center"
          >
            <StyledInputBase
              // inputRef={input => input && input.focus()}
              inputProps={{ maxLength: 4 }}
              width="100px"
              onChange={otpFormik.handleChange}
              value={otpFormik.values.reset_token}
              name="reset_token"
              error={
                otpFormik.touched.reset_token &&
                Boolean(otpFormik.errors.reset_token)
              }
              helperText={
                otpFormik.touched.reset_token && otpFormik.errors.reset_token
              }
              touched={otpFormik.touched.reset_token}
              required
            />

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isLoading}
            >
              {t("Verify")}
            </LoadingButton>
          </Stack>
        </form>
      </CustomStackFullWidth>
    </CustomPaperBigCard>
  );
};
export default OtpForm;
