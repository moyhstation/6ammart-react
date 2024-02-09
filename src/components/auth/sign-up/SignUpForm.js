import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomTextFieldWithFormik from "../../form-fields/CustomTextFieldWithFormik";
import CustomPhoneInput from "../../custom-component/CustomPhoneInput";
import { t } from "i18next";
import { InputAdornment, NoSsr, alpha, useTheme } from "@mui/material";
import { getLanguage } from "../../../helper-functions/getLanguage";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';

const SignUpForm = ({
  configData,
  handleOnChange,
  passwordHandler,
  lNameHandler,
  fNameHandler,
  confirmPasswordHandler,
  emailHandler,
  ReferCodeHandler,
  signUpFormik,
}) => {
  const lanDirection = getLanguage() ? getLanguage() : 'ltr';
  const theme = useTheme();
  return (
    <NoSsr>
      <CustomStackFullWidth alignItems="center" spacing={{ xs: 3, md: 4 }}>
        <CustomTextFieldWithFormik
          required
          label={t("First Name")}
          placeholder={t("Enter first name")}
          touched={signUpFormik.touched.f_name}
          errors={signUpFormik.errors.f_name}
          fieldProps={signUpFormik.getFieldProps("f_name")}
          onChangeHandler={fNameHandler}
          value={signUpFormik.values.f_name}
          startIcon={(
            <InputAdornment position="start">
              <AccountCircleIcon sx={{ color: (signUpFormik.touched.f_name && !signUpFormik.errors.f_name) ? theme.palette.primary.main : alpha(theme.palette.neutral[500], 0.4)}} />
            </InputAdornment>
          )}
        />
        <CustomTextFieldWithFormik
          required
          label={t("Last Name")}
          placeholder={t("Enter last name")}
          touched={signUpFormik.touched.l_name}
          errors={signUpFormik.errors.l_name}
          fieldProps={signUpFormik.getFieldProps("l_name")}
          onChangeHandler={lNameHandler}
          value={signUpFormik.values.l_name}
          startIcon={(
            <InputAdornment position="start">
              <AccountCircleIcon sx={{ color: (signUpFormik.touched.l_name && !signUpFormik.errors.l_name) ? theme.palette.primary.main : alpha(theme.palette.neutral[500], 0.4) }} />
            </InputAdornment>
          )}
        />
        <CustomTextFieldWithFormik
          required
          label={t("Email")}
          placeholder={t("Email")}
          touched={signUpFormik.touched.email}
          errors={signUpFormik.errors.email}
          fieldProps={signUpFormik.getFieldProps("email")}
          onChangeHandler={emailHandler}
          value={signUpFormik.values.email}
          startIcon={(
            <InputAdornment position="start">
              <MailIcon sx={{ color: (signUpFormik.touched.email && !signUpFormik.errors.email) ? theme.palette.primary.main : alpha(theme.palette.neutral[500], 0.4) }} />
            </InputAdornment>
          )}
        />
        <CustomPhoneInput
          value={signUpFormik.values.phone}
          onHandleChange={handleOnChange}
          initCountry={configData?.country}
          touched={signUpFormik.touched.phone}
          errors={signUpFormik.errors.phone}
          lanDirection={lanDirection}
          height="45px"
        />
        <CustomTextFieldWithFormik
          required="true"
          type="password"
          label={t("Password")}
          placeholder={t("Password")}
          touched={signUpFormik.touched.password}
          errors={signUpFormik.errors.password}
          fieldProps={signUpFormik.getFieldProps("password")}
          onChangeHandler={passwordHandler}
          value={signUpFormik.values.password}
          startIcon={(
            <InputAdornment position="start">
              <LockIcon sx={{ color: (signUpFormik.touched.password && !signUpFormik.errors.password) ? theme.palette.primary.main : alpha(theme.palette.neutral[500], 0.4) }} />
            </InputAdornment>
          )}
        />
        <CustomTextFieldWithFormik
          required="true"
          type="password"
          label={t("Confirm Password")}
          placeholder={t("Confirm Password")}
          touched={signUpFormik.touched.confirm_password}
          errors={signUpFormik.errors.confirm_password}
          fieldProps={signUpFormik.getFieldProps("confirm_password")}
          onChangeHandler={confirmPasswordHandler}
          value={signUpFormik.values.confirm_password}
          startIcon={(
            <InputAdornment position="start">
              <LockIcon sx={{ color: (signUpFormik.touched.confirm_password && !signUpFormik.errors.confirm_password) ? theme.palette.primary.main : alpha(theme.palette.neutral[500], 0.4) }} />
            </InputAdornment>
          )}
        />
        <CustomTextFieldWithFormik
          label={t("Refer Code (Optional)")}
          touched={signUpFormik.touched.ref_code}
          errors={signUpFormik.errors.ref_code}
          fieldProps={signUpFormik.getFieldProps("ref_code")}
          onChangeHandler={ReferCodeHandler}
          value={signUpFormik.values.ref_code}
        />
      </CustomStackFullWidth>
    </NoSsr>
  );
};

export default SignUpForm;
