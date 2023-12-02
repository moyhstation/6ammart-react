import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomTextFieldWithFormik from "../../form-fields/CustomTextFieldWithFormik";
import CustomPhoneInput from "../../custom-component/CustomPhoneInput";
import { t } from "i18next";
import { NoSsr } from "@mui/material";
import {getLanguage} from "../../../helper-functions/getLanguage";

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
  return (
    <NoSsr>
      <CustomStackFullWidth alignItems="center" spacing={{ xs: 3, md: 4 }}>
        <CustomTextFieldWithFormik
          required
          label={t("First Name")}
          touched={signUpFormik.touched.f_name}
          errors={signUpFormik.errors.f_name}
          fieldProps={signUpFormik.getFieldProps("f_name")}
          onChangeHandler={fNameHandler}
          value={signUpFormik.values.f_name}
        />
        <CustomTextFieldWithFormik
          required
          label={t("Last Name")}
          touched={signUpFormik.touched.l_name}
          errors={signUpFormik.errors.l_name}
          fieldProps={signUpFormik.getFieldProps("l_name")}
          onChangeHandler={lNameHandler}
          value={signUpFormik.values.l_name}
        />
        <CustomTextFieldWithFormik
          required
          label={t("Email")}
          touched={signUpFormik.touched.email}
          errors={signUpFormik.errors.email}
          fieldProps={signUpFormik.getFieldProps("email")}
          onChangeHandler={emailHandler}
          value={signUpFormik.values.email}
        />
        <CustomPhoneInput
          value={signUpFormik.values.phone}
          onHandleChange={handleOnChange}
          initCountry={configData?.country}
          touched={signUpFormik.touched.phone}
          errors={signUpFormik.errors.phone}
          lanDirection={lanDirection}
        />
        <CustomTextFieldWithFormik
          required="true"
          type="password"
          label={t("Password")}
          touched={signUpFormik.touched.password}
          errors={signUpFormik.errors.password}
          fieldProps={signUpFormik.getFieldProps("password")}
          onChangeHandler={passwordHandler}
          value={signUpFormik.values.password}
        />
        <CustomTextFieldWithFormik
          required="true"
          type="password"
          label={t("Confirm Password")}
          touched={signUpFormik.touched.confirm_password}
          errors={signUpFormik.errors.confirm_password}
          fieldProps={signUpFormik.getFieldProps("confirm_password")}
          onChangeHandler={confirmPasswordHandler}
          value={signUpFormik.values.confirm_password}
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
