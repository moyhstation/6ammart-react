import React, { useEffect, useState } from "react";

import { Stack, Typography } from "@mui/material";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { onErrorResponse } from "../../../../api-manage/api-error-response/ErrorResponses";
import { useVerifyPhone } from "../../../../api-manage/hooks/react-query/forgot-password/useVerifyPhone";
import { usePostEmail } from "../../../../api-manage/hooks/react-query/social-login/useEmailPost";
import { getLanguage } from "../../../../helper-functions/getLanguage";
import {
	setJwtTokenByDispatch,
	setUserInfoByDispatch,
} from "../../../../redux/slices/fbCredentials";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { fb_app_id } from "../../../../utils/staticCredential";
import CustomImageContainer from "../../../CustomImageContainer";
import CustomModal from "../../../modal";
import OtpForm from "../../sign-up/OtpForm";
import facebookLatest from ".././../../../../public/static/facebookLatest.png";
import ModalCustom from "./ModalCustom";
import PhoneInputForm from "./PhoneInputForm";
const FbLoginComp = (props) => {
	const { handleSuccess, configData, handleParentModalClose } = props;
	const { userInfo, jwtToken } = useSelector(
		(state) => state.fbCredentialsStore
	);
	const [openModal, setOpenModal] = useState(false);
	const [openOtpModal, setOpenOtpModal] = useState(false);
	const [otpData, setOtpData] = useState({ phone: "" });
	const [mainToken, setMainToken] = useState(null);
	const dispatch = useDispatch();
	const appId = fb_app_id;
	const { mutate } = usePostEmail();
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
	const responseFacebook = async (res) => {
		dispatch(setUserInfoByDispatch(res));
		dispatch(setJwtTokenByDispatch(res));
		await mutate(
			{
				email: res?.email,
				token: res?.accessToken,
				unique_id: res?.id,
				medium: "facebook",
				phone: res?.phone,
			},
			{
				onSuccess: handlePostRequestOnSuccess,
				onError: (error) => {
					error?.response?.data?.errors?.forEach((item) =>
						item.code === "email"
							? handleToken()
							: toast.error(item.message)
					);
				},
			}
		);
	};
	const handleRegistrationOnSuccess = (token) => {
		//registration on success func remaining
		handleSuccess(token);
		handleParentModalClose();
		setOpenModal(false);
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
	const { t } = useTranslation();
	const lanDirection = getLanguage() ? getLanguage() : "ltr";
	return (
		<>
			<FacebookLogin
				appId={appId}
				autoLoad={false}
				fields="name,email,picture"
				callback={responseFacebook}
				render={(renderProps) => (
					<div
						style={{ cursor: "pointer", width: "100%" }}
						onClick={renderProps.onClick}
					>
						<Stack
							alignItems="center"
							sx={{
								backgroundColor: (theme) => theme.palette.info.dark,
								height: "45px",
								width: "100%",
								borderRadius: "4px",
								padding: "10px",
								textAlign: "center",
							}}
						>
							<CustomStackFullWidth
								direction="row"
								alignItems="center"
								spacing={1}
							>
								<CustomImageContainer
									src={facebookLatest.src}
									alt="facebook"
									height="25px"
									width="25px"
									objectFit="cover"
								/>
								<Typography
									fontSize="14px"
									fontWeight="600"
									sx={{
										color: (theme) =>
											theme.palette.whiteContainer.main,
									}}
								>
									{t("Continue with facebook")}
								</Typography>
							</CustomStackFullWidth>
						</Stack>
					</div>
				)}
			/>
			<ModalCustom
				openModal={openModal}
				setModalOpen={setOpenModal}
				handleClose={() => setOpenModal(false)}
			>
				{userInfo && jwtToken && (
					<PhoneInputForm
						configData={configData}
						userInfo={userInfo}
						jwtToken={jwtToken}
						medium="facebook"
						handleRegistrationOnSuccess={handleRegistrationOnSuccess}
						lanDirection={lanDirection}
					/>
				)}
			</ModalCustom>
			<CustomModal
				openModal={openOtpModal}
				setModalOpen={setOpenOtpModal}
				handleClose={() => setOpenModal(false)}
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

FbLoginComp.propTypes = {};

export default FbLoginComp;
