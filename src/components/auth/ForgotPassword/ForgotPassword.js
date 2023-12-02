import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  CustomBoxFullWidth,
  CustomPaper,
  FlexContainerCenter,
} from "../../../styled-components/CustomStyles.style";
import ForgotPasswordNumberForm from "./ForgotPasswordNumberForm";
import OtpForm from "./OtpForm";
import NewPassword from "./NewPassword";
import { useOtp } from "../../../api-manage/hooks/react-query/forgot-password/useOtp";

const ForgotPassword = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    phone: "",
    otp: "",
  });
  const goNext = () => {
    setPage((currPage) => currPage + 1);
  };
  const goBack = () => {
    setPage((currPage) => currPage - 1);
  };
  const handleFirstForm = (values) => {
    setData({
      phone: values.phone,
      reset_token: values.reset_token,
    });
  };
  const pageShow = () => {
    if (page === 0) {
      return (
         <ForgotPasswordNumberForm
             goNext={goNext}
             handleFirstForm={handleFirstForm}
             data={data}
         />
      );
    } else if (page === 1) {
      return (
        <OtpForm
          data={data}
          goBack={goBack}
          formSubmitHandler={formSubmitHandler}
          isLoading={isLoading}
        />
      );
    } else page === 2;
    {
      return (
        <NewPassword
          data={data}
          handleFirstForm={handleFirstForm}
          goBack={goBack}
        />
      );
    }
  };
  const onSuccessHandler = (res) => {
    if (res) {
      goNext();
    }
  };
  const { mutate, isLoading } = useOtp(onSuccessHandler);
  const formSubmitHandler = (values) => {
    handleFirstForm(values);
    mutate(values, { onSuccess: onSuccessHandler });
  };
  return (
    <Box minHeight="50vh">
      <FlexContainerCenter sx={{marginTop:"1rem"}}>
        <CustomPaper elevation={5}>{pageShow()}</CustomPaper>
      </FlexContainerCenter>
    </Box>
  );
};

export default ForgotPassword;
