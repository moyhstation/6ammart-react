import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import {useFormik} from "formik";
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import toast from "react-hot-toast";

import CustomPhoneInput from "../../custom-component/CustomPhoneInput";
import {useForgotPassword} from "../../../api-manage/hooks/react-query/forgot-password/useForgotPassword";
import {onErrorResponse, onSingleErrorResponse} from "../../../api-manage/api-error-response/ErrorResponses";
import {forgot_password_header} from "../../../utils/staticTexts";
import {getLanguage} from "../../../helper-functions/getLanguage";

const ForgotPasswordNumberForm = ({data, goNext, handleFirstForm}) => {
    const {t} = useTranslation();
    const {configData} = useSelector((state) => state.configData);
    const phoneFormik = useFormik({
        initialValues: {
            phone: data ? data.phone : "",
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .required(t("Please give a phone number"))
                .min(10, "number must be 10 digits"),
        }),
        onSubmit: async (values, helpers) => {
            try {
                formSubmitHandler(values);
            } catch (err) {
            }
        },
    });

    const onSuccessHandler = (res) => {
        if (res) {
            if(res?.errors?.length>0){
                goNext();
                toast.error(res?.errors[0].message);
            }else{
                goNext();
                toast.success(res.message);
            }

           // goNext();
            //toast.success(res.message);
        }
    };

    const {mutate, isLoading} = useForgotPassword({
        onSuccessHandler,
        onError: (errors) => {
            onErrorResponse(errors);
        },
    });
    const formSubmitHandler = (values) => {
        handleFirstForm(values);
        mutate(values, {onSuccess: onSuccessHandler, onError: onErrorResponse});
    };
    const lanDirection = getLanguage() ? getLanguage() : "ltr";
    const handleOnChange = (value) => {
        phoneFormik.setFieldValue("phone", `+${value}`);
    };
    return (
        <CustomStackFullWidth>
            <Stack>
                <Typography>{t(forgot_password_header)}</Typography>
            </Stack>
            <form noValidate onSubmit={phoneFormik.handleSubmit}>
                <CustomStackFullWidth mt="2rem">
                    <CustomPhoneInput
                        value={phoneFormik.values.phone}
                        onHandleChange={handleOnChange}
                        initCountry={configData?.country}
                        touched={phoneFormik.touched.phone}
                        errors={phoneFormik.errors.phone}
                        lanDirection={lanDirection}
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        loading={isLoading}
                    >
                        {t("Next")}
                    </LoadingButton>
                </CustomStackFullWidth>
            </form>

        </CustomStackFullWidth>
    );
};
export default ForgotPasswordNumberForm;
