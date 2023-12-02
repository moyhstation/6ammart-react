import React, { useState } from 'react'
import { CustomStackFullWidth } from '../../../../styled-components/CustomStyles.style';
import { Formik, useFormik } from 'formik';
import Subtitle1 from '../../../typographies/Subtitle1';
import CustomImageContainer from '../../../CustomImageContainer';
import * as Yup from "yup";

import OfflinePaymentImage from "../../assets/offlinePayments.svg";
import { Button, Grid, Stack, TextField, Typography, useTheme } from '@mui/material';
import { t } from 'i18next';
import { useOfflinePaymentUpdate } from '../../../../api-manage/hooks/react-query/offlinePayment/useOfflinePaymentUpdate';
import { LoadingButton } from '@mui/lab';
import { edit_offline_payment_info } from '../../../../utils/toasterMessages';
import toast from 'react-hot-toast';
import { getGuestId } from '../../../../helper-functions/getToken';

const OfflinePaymentEdit = (
    {
        data,
        trackOrderData,
        setOpenOfflineModal,
        refetchTrackOrder
    }) => {

    const theme = useTheme();
	const guest_id = getGuestId();
    const borderColor = theme.palette.neutral[400];
    const { mutate: offlineMutate, isLoading: offlinePaymentLoading } = useOfflinePaymentUpdate();
    const [customerNote, setCustomerNote] = useState(trackOrderData?.offline_payment?.data?.customer_note)

    const initialValues = { "customer_note": customerNote };
    trackOrderData?.offline_payment?.input?.forEach((item) => {
        initialValues[item.user_input] = item?.user_data;
    });

    // Create a validation schema using Yup.
    const validationSchema = Yup.object().shape({
        // Define validation rules for each field dynamically.
        ...trackOrderData?.offline_payment?.input?.reduce((acc, item) => {
            acc[item.user_input] = Yup.string().required('This field is required');
            return acc;
        }, {}),
    });

    const handleCancel = () => {
        setOpenOfflineModal(false)
    }

    const handleSuccess = (response) => {
        if (response) {
            refetchTrackOrder();
            handleCancel();
        }
        toast.success(t(edit_offline_payment_info));

    }
    // Initialize Formik form.
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const newData = {
                ...values,
                method_id: trackOrderData?.offline_payment?.data?.method_id,
                order_id: trackOrderData?.id,
                guest_id: guest_id,
            }
            offlineMutate(newData, { onSuccess: handleSuccess });
        },
    });
    return (
        <CustomStackFullWidth
            justifyContent="center"
            alignItems="center"
            padding={{ xs: "30px 20px", sm: "45px 60px" }}
            gap="20px"
        >
            <CustomImageContainer width="120px" src={OfflinePaymentImage.src} />
            <Typography
                fontSize="16px"
                fontWeight="700"
            >
                {`${t("Update Payment Info")}`}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    {trackOrderData?.offline_payment?.input?.map((item) => (
                        <Grid item xs={12} md={6} key={item.user_input}>
                            <TextField
                                fullWidth
                                label={item.user_input.replaceAll("_", " ")}
                                id={item.user_input}
                                name={item.user_input}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values[item.user_input]}
                                error={formik.touched[item.user_input] && Boolean(formik.errors[item.user_input])}
                                helperText={formik.touched[item.user_input] && formik.errors[item.user_input]}
                            />
                        </Grid>
                    ))}

                    <Grid items xs={12} md={12} padding="20px 0px 0px 18px">
                        <TextField
                            fullWidth
                            label="Payment Note"
                            id="customer_note"
                            name="customer_note"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values["customer_note"]}
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>
                {/* <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button> */}
                <Stack
                    direction="row"
                    width="100%"
                    spacing={1}
                    justifyContent="flex-end"
                    gap="20px"
                    paddingTop={{ xs: "15px", sm: "20px", md: "25px" }}
                >
                    <Button
                        onClick={() => handleCancel()}
                        sx={{
                            border: `1px solid ${borderColor}`,
                            borderRadius: "5px",
                            color: borderColor,
                            padding: "8px 16px",
                        }}
                    >
                        {t("Cancel")}
                    </Button>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={offlinePaymentLoading}
                    >
                        {t("Update")}
                    </LoadingButton>
                </Stack>
            </form>
        </CustomStackFullWidth>
    )
}

export default OfflinePaymentEdit