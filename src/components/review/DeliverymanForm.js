import React from "react";
import PropTypes from "prop-types";
import { Grid, Stack } from "@mui/material";
import {
  CustomColouredTypography,
  CustomStackFullWidth,
  CustomTypographyBold,
  CustomTypographyGray,
} from "../../styled-components/CustomStyles.style";
import CustomImageContainer from "../CustomImageContainer";

import Divider from "@mui/material/Divider";

import CustomTextFieldWithFormik from "../form-fields/CustomTextFieldWithFormik";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useFormik } from "formik";
import toast from "react-hot-toast";

import { useSubmitDeliverymanReview } from "../../api-manage/hooks/react-query/review/useSubmitDeliverymanReview";
import CustomRatings from "../search/CustomRatings";
import { onErrorResponse } from "../../api-manage/api-error-response/ErrorResponses";

const DeliverymanForm = ({ data, orderId }) => {
  const { t } = useTranslation();
  const { configData } = useSelector((state) => state.configData);
  const productImage = configData?.base_urls?.delivery_man_image_url;
  const { mutate, isLoading, error } = useSubmitDeliverymanReview();
  const formik = useFormik({
    initialValues: {
      rating: "",
      comment: "",
    },
    onSubmit: async (values, helpers) => {
      try {
        handleFormsubmit(values);
      } catch (err) {}
    },
  });
  const handleChangeRatings = (value) => {
    formik.setFieldValue("rating", value);
  };
  const handleFormsubmit = (values) => {
    const formData = {
      ...values,
      delivery_man_id: data?.id,
      order_id: orderId,
    };
    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response?.message);
      },
      onError: onErrorResponse,
    });
  };

  return (
    <CustomStackFullWidth>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <CustomStackFullWidth
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <CustomImageContainer
                  src={`${productImage}/${data?.image}`}
                  width="100px"
                  height="90px"
                />
                <Stack>
                  <CustomTypographyBold>
                    {data?.f_name.concat(" ", data?.l_name)}
                  </CustomTypographyBold>
                  {data && (
                    <CustomRatings
                      readOnly={true}
                      handleChangeRatings={handleChangeRatings}
                      ratingValue={data?.avg_rating}
                    />
                  )}
                </Stack>
              </Stack>
            </CustomStackFullWidth>
          </Grid>
          <Grid item xs={12} md={12}>
            <Divider sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} md={12} align="center">
            <Stack alignItems="center">
              <CustomTypographyGray sx={{ fontSize: "18px" }}>
                {t("Rate the deliveryman")}
              </CustomTypographyGray>
              <CustomRatings
                handleChangeRatings={handleChangeRatings}
                ratingValue={formik.values.rating}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12} align="center">
            <Stack alignItems="center" spacing={1}>
              <CustomTypographyGray sx={{ fontSize: "18px" }}>
                {t("Share your opinion")}
              </CustomTypographyGray>
              <CustomTextFieldWithFormik
                type="text"
                label={t("Comment")}
                touched={formik.touched.comment}
                errors={formik.errors.comment}
                fieldProps={formik.getFieldProps("comment")}
                multiline
                rows={2}
                // onChangeHandler={RestaurantNameHandler}
                value={formik.values.comment}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12} mt="1rem">
            <LoadingButton
              fullWidth
              variant="contained"
              type="submit"
              loading={isLoading}
              // sx={{ width: '100%' }}
            >
              {t("Submit")}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </CustomStackFullWidth>
  );
};

DeliverymanForm.propTypes = {};

export default DeliverymanForm;
