import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomPhoneInput from "../../custom-component/CustomPhoneInput";
import CustomTextFieldWithFormik from "../../form-fields/CustomTextFieldWithFormik";
import { t } from "i18next";
import { getLanguage } from "../../../helper-functions/getLanguage";

const SignInForm = ({
  loginFormik,
  configData,
  handleOnChange,
  passwordHandler,
}) => {
  const lanDirection = getLanguage() ? getLanguage() : "ltr";

  return (
    <CustomStackFullWidth alignItems="center" spacing={{ xs: 2, md: 2 }}>
      <CustomPhoneInput
        value={loginFormik.values.phone}
        onHandleChange={handleOnChange}
        initCountry={configData?.country}
        touched={loginFormik.touched.phone}
        errors={loginFormik.errors.phone}
        lanDirection={lanDirection}
        height="45px"
      />
      <CustomTextFieldWithFormik
        required="true"
        type="password"
        label={t("Password")}
        touched={loginFormik.touched.password}
        errors={loginFormik.errors.password}
        fieldProps={loginFormik.getFieldProps("password")}
        onChangeHandler={passwordHandler}
        value={loginFormik.values.password}
      />
    </CustomStackFullWidth>
  );
};

export default SignInForm;
