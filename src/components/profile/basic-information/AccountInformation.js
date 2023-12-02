import React, { useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Typography,
  Card,
  OutlinedInput,
} from "@mui/material";
import { SaveButton, ButtonBox } from "./Profile.style";
import { useFormik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";
import ValidationSechemaProfile from "./Validation";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { AccountCircle } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import H1 from "../../typographies/H1";
import useUpdateProfile from "../../../api-manage/hooks/react-query/profile/useUpdateProfile";
import toast from "react-hot-toast";
import { onSingleErrorResponse } from "../../../api-manage/api-error-response/ErrorResponses";
import { convertValuesToFormData } from "./BasicInformationForm";

const AccountInformation = ({ data, refetch }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const { f_name, l_name, phone, email } = data;
  const profileFormik = useFormik({
    initialValues: {
      f_name: f_name ? f_name : "",
      l_name: l_name ? l_name : "",
      email: email ? email : "",
      phone: phone ? phone : "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required(t("No password provided."))
        .min(6, t("Password is too short - should be 6 chars minimum.")),
      confirm_password: Yup.string()
        .required(t("Confirm Password"))
        .oneOf([Yup.ref("password"), null], t("Passwords must match")),
    }),
    onSubmit: async (values, helpers) => {
      try {
        formSubmitOnSuccess(values);
      } catch (err) {}
    },
  });
  const { mutate: profileUpdateByMutate, isLoading } = useUpdateProfile();
  const formSubmitOnSuccess = (values) => {
    const onSuccessHandler = (response) => {
      if (response) {
        toast.success(response?.message);
        refetch();
      }
    };
    const formData = convertValuesToFormData(values);
    profileUpdateByMutate(formData, {
      onSuccess: onSuccessHandler,
      onError: onSingleErrorResponse,
    });
  };

  return (
    <>
      <form noValidate onSubmit={profileFormik.handleSubmit}>
        <Grid container md={12} xs={12} spacing={2} sx={{ padding: "20px" }}>
          <Grid item md={12} xs={12} textAlign="center">
            <H1 text="Account Information" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              sx={{ width: "100%" }}
              id="password"
              variant="outlined"
              value={profileFormik.values.password}
              onChange={profileFormik.handleChange}
              name="password"
              label={t("Password")}
              type={showPassword ? "text" : "password"}
              InputLabelProps={{ shrink: true }}
              error={
                profileFormik.touched.password &&
                Boolean(profileFormik.errors.password)
              }
              helperText={
                profileFormik.touched.password && profileFormik.errors.password
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              sx={{ width: "100%" }}
              id="confirm_password"
              label={t("Confirm Password")}
              variant="outlined"
              name="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              value={profileFormik.values.confirm_password}
              onChange={profileFormik.handleChange}
              InputLabelProps={{ shrink: true }}
              error={
                profileFormik.touched.confirm_password &&
                Boolean(profileFormik.errors.confirm_password)
              }
              helperText={
                profileFormik.touched.confirm_password &&
                profileFormik.errors.confirm_password
              }
              touched={profileFormik.touched.confirm_password && "true"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setConfirmShowPassword((prevState) => !prevState)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} align="end">
            <SaveButton variant="contained" type="submit" loading={isLoading}>
              {t(" Change")}
            </SaveButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AccountInformation;
