import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

// import CustomModal from "../../../custom-modal/CustomModal";
// import PhoneInputForm from "./PhoneInputForm";
// import OtpForm from "../../forgot-password/OtpForm";
import { toast } from "react-hot-toast";
// import { useVerifyPhone } from "../../../../hooks/react-query/otp/useVerifyPhone";
import { usePostEmail } from "../../../../api-manage/hooks/react-query/social-login/useEmailPost";
import CustomModal from "../../../modal";
import PhoneInputForm from "./PhoneInputForm";
import { onErrorResponse } from "../../../../api-manage/api-error-response/ErrorResponses";
import OtpForm from "../../sign-up/OtpForm";
import { useVerifyPhone } from "../../../../api-manage/hooks/react-query/forgot-password/useVerifyPhone";
import { google_client_id } from "../../../../utils/staticCredential";
import ModalCustom from "./ModalCustom";
import { getLanguage } from "../../../../helper-functions/getLanguage";

// import { gapi } from 'gapi-scrip
// import { gapi } from 'gapi-script'
const GoogleLoginComp = (props) => {
  const { handleSuccess, configData, handleParentModalClose } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [otpData, setOtpData] = useState({ phone: "" });
  const [mainToken, setMainToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const buttonDiv = useRef(null);
  const router = useRouter();

  const { mutate } = usePostEmail();

  const clientId = google_client_id;
  const handleToken = (response) => {
    if (response?.token) {
      handleSuccess(response.token);
    } else {
      setOpenModal(true);
    }
  };
  useEffect(() => {
    if (otpData?.phone !== "") {
      setOpenOtpModal(true);
    }
  }, [otpData]);

  const handlePostRequestOnSuccess = (response) => {
    if (configData?.customer_verification) {
      if (Number.parseInt(response?.is_phone_verified) === 1) {
        handleToken(response);
      } else {
        if (response?.phone) {
          setOtpData({ phone: response?.phone });
        }
        if (response?.token) {
          setMainToken(response);
        }
      }
    } else {
      handleToken(response);
    }
  };
  const handleCallBackResponse = (res) => {
    const userObj = jwt_decode(res.credential);

    setJwtToken(res);
    setUserInfo(userObj);
    mutate(
      {
        email: userObj.email,
        token: res.credential,
        unique_id: res?.clientId,
        medium: "google",
      },
      {
        onSuccess: handlePostRequestOnSuccess,
        onError: (error) => {
          error?.response?.data?.errors?.forEach((item) =>
            item.code === "email" ? handleToken() : toast.error(item.message)
          );
        },
      }
    );
  };
  const handleTokenCallBackResponse = (res) => {
    //const userObj = jwt_decode(res.credential)
    // setJwtToken(res)
    // setUserInfo(userObj)
    // mutate(
    //     { email: userObj.email },
    //     {
    //         onSuccess: handlePostRequestOnSuccess,
    //     }
    // )
  };

  useEffect(() => {
    /* global google */
    const initializeGoogleSignIn = () => {
      window?.google?.accounts?.id?.initialize({
        client_id: clientId,
        callback: handleCallBackResponse,
      });
      setIsInitialized(true);
    };
    if (!isInitialized) {
      initializeGoogleSignIn();
    }
  }, [clientId, isInitialized]);
  useEffect(() => {
    /* global google */
    if (isInitialized && buttonDiv.current) {
      window?.google?.accounts?.id?.renderButton(buttonDiv.current, {
        theme: "outline",
        size: "large",
        width: "215px",
      });
    }
  }, [isInitialized]);
  const handleRegistrationOnSuccess = (token) => {
    //registration on success func remaining
    setOpenModal(false);
    handleSuccess(token);
    handleParentModalClose();
  };
  const onSuccessHandler = (res) => {
    toast.success(res?.message);
    setOpenOtpModal(false);
    handleToken(mainToken);
    handleParentModalClose();
  };
  const { mutate: signInMutate, isLoading } = useVerifyPhone();
  const formSubmitHandler = (values) => {
    signInMutate(values, {
      onSuccess: onSuccessHandler,
      onError: onErrorResponse,
    });
  };
  const lanDirection = getLanguage() ? getLanguage() : "ltr";
  return (
    <>
      <div
        ref={buttonDiv}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          margin: "auto",
        }}
      ></div>
      <ModalCustom
        openModal={openModal}
        setModalOpen={setOpenModal}
        handleClose={() => setOpenModal(false)}
      >
        {userInfo && jwtToken && (
          <PhoneInputForm
            userInfo={userInfo}
            jwtToken={jwtToken}
            medium="google"
            handleRegistrationOnSuccess={handleRegistrationOnSuccess}
            configData={configData}
            lanDirection={lanDirection}
          />
        )}
      </ModalCustom>
      <CustomModal
        openModal={openOtpModal}
        handleClose={() => setOpenOtpModal(false)}
      >
        <OtpForm
          data={otpData}
          formSubmitHandler={formSubmitHandler}
          isLoading={isLoading}
        />
      </CustomModal>
    </>
  );
};

GoogleLoginComp.propTypes = {};

export default GoogleLoginComp;
