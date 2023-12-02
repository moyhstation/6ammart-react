import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

import {
  CustomColouredTypography,
  CustomFullDivider,
  CustomStackFullWidth,
  CustomTypographyBold,
  CustomTypographyGray,
} from "../../styled-components/CustomStyles.style";
import { Grid, Stack } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";
import CustomTextFieldWithFormik from "../form-fields/CustomTextFieldWithFormik";

import Divider from "@mui/material/Divider";
import CustomImageContainer from "../CustomImageContainer";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";

import { useSubmitItemReview } from "../../api-manage/hooks/react-query/review/useSubmitItemReview";
import CustomRatings from "../search/CustomRatings";
import { onErrorResponse } from "../../api-manage/api-error-response/ErrorResponses";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";

const ItemForm = ({ data }) => {
  const { t } = useTranslation();
  const { configData } = useSelector((state) => state.configData);
  const itemImage = configData?.base_urls?.item_image_url;

  const { mutate, isLoading, error } = useSubmitItemReview();
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
      delivery_man_id: null,
      item_id: data?.item_id,
      order_id: data?.order_id,
    };
    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response?.message);
      },
      onError: onErrorResponse,
    });
  };

  const languageDirection = localStorage.getItem("direction");
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
                gap={languageDirection === "rtl" ? "1rem" : "0rem"}
              >
                <CustomImageContainer
                  src={`${itemImage}/${data?.item_details?.image}`}
                  width="100px"
                  height="90px"
                />
                <Stack>
                  <CustomTypographyBold>
                    {data?.item_details?.name}
                  </CustomTypographyBold>
                  <CustomTypographyBold>
                    {getAmountWithSign(data?.item_details?.price)}
                  </CustomTypographyBold>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CustomTypographyGray sx={{ fontSize: "18px" }}>
                  {t("Quantity")}
                </CustomTypographyGray>
                <CustomTypographyGray sx={{ fontSize: "18px" }}>
                  :
                </CustomTypographyGray>
                <CustomColouredTypography
                  color="primary.main"
                  sx={{ fontSize: "18px" }}
                >
                  {data?.quantity}
                </CustomColouredTypography>
              </Stack>
            </CustomStackFullWidth>
          </Grid>
          <Grid item xs={12} md={12}>
            <Divider sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} md={12} align="center">
            <Stack alignItems="center">
              <CustomTypographyGray sx={{ fontSize: "18px" }}>
                {t("Rate the item")}
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

ItemForm.propTypes = {};

export default ItemForm;
