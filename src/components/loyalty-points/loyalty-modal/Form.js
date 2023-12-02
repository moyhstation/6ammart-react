import React from "react";
import PropTypes from "prop-types";
import { Box, Stack } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import usePostLoyalityConvertValue from "../../../api-manage/hooks/react-query/loyalty-points/usePostLoyalityConvertValue";
import { onErrorResponse } from "../../../api-manage/api-error-response/ErrorResponses";
import { wallet_transfer_message } from "../../../utils/toasterMessages";

const Form = (props) => {
  const { loyalitydata, configData, handleClose, refetch, profileRefetch, t } =
    props;

  const loyalityFormik = useFormik({
    initialValues: { point: loyalitydata ? loyalitydata : 0 },
    validationSchema: Yup.object({
      point: Yup.number().required(t("Please give an amount")),
    }),
    onSubmit: async (values, helpers) => {
      if (
        values.point <= loyalitydata &&
        values.point >= configData?.loyalty_point_exchange_rate
      ) {
        if (values.point < configData?.loyalty_point_minimum_point) {
          toast.error(
            `Please exchange more than ${configData?.loyalty_point_minimum_point} points`
          );
        } else {
          try {
            formSubmitHandler(values);
          } catch (err) {}
        }
      } else {
        toast.error(t("insufficient amount"));
      }
    },
  });
  const { mutate, isLoading, error } = usePostLoyalityConvertValue();
  const formSubmitHandler = (values) => {
    const onSuccessHandler = async (response) => {
      if (response.status === 203) {
        response?.data?.errors?.forEach((item) => toast.error(item.message));
      } else {
        toast.success(t(wallet_transfer_message));
        await refetch();
        await profileRefetch();
        handleClose?.();
      }
    };
    mutate(values, {
      onSuccess: onSuccessHandler,
      onError: onErrorResponse,
    });
  };
  return (
    <CustomStackFullWidth
      spacing={2}
      component="form"
      noValidate
      onSubmit={loyalityFormik.handleSubmit}
    >
      <TextField
        required={true}
        type="number"
        sx={{
          width: "100%",
          color: (theme) => theme.palette.neutral[1000],
        }}
        id="outlined-basic"
        label={t("Amount")}
        variant="outlined"
        name="point"
        value={loyalityFormik.values.point}
        onChange={loyalityFormik.handleChange}
        defaultValue={loyalityFormik.values.point}
        error={
          loyalityFormik.touched.point && Boolean(loyalityFormik.errors.point)
        }
        helperText={loyalityFormik.touched.point && loyalityFormik.errors.point}
      />
      <LoadingButton
        variant="contained"
        type="submit"
        fullWidth
        loading={isLoading}
      >
        {t("Submit")}
      </LoadingButton>
    </CustomStackFullWidth>
  );
};

Form.propTypes = {};

export default Form;
