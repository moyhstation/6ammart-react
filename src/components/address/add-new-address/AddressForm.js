import React, { useEffect } from "react";
import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import CustomTextFieldWithFormik from "../../form-fields/CustomTextFieldWithFormik";
import { useTranslation } from "react-i18next";

import CustomPhoneInput from "../../custom-component/CustomPhoneInput";
import ValidationSchemaForAddAddress from "./ValidationSchemaForAddAddress";

import usePostAddress from "../../../api-manage/hooks/react-query/address/usePostAddress";
import toast from "react-hot-toast";
import { onErrorResponse } from "../../../api-manage/api-error-response/ErrorResponses";
import { getLanguage } from "../../../helper-functions/getLanguage";
import FormSubmitButton from "../../profile/FormSubmitButton";

import useUpdatedAddress from "../../../api-manage/hooks/react-query/address/useUpdatedAddress";
import { useDispatch, useSelector } from "react-redux";
import { setGuestUserInfo } from "../../../redux/slices/guestUserInfo";
import { setOpenAddressModal } from "../../../redux/slices/addAddress";
import {t} from "i18next";

const AddressForm = ({
  configData,
  deliveryAddress,
  personName,
  phone,
  lat,
  lng,
  popoverClose,
  refetch,
  isRefetcing,
  atModal,
  addressType,
  editAddress,setAddAddress
}) => {
  const { t } = useTranslation();
  const typeData = [
    {
      label: t("Home"),
      value: "home",
    },
    {
      label: t("Office"),
      value: "Office",
    },
    {
      label: t("Others"),
      value: "Others",
    },
  ];

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { guestUserInfo } = useSelector((state) => state.guestUserInfo);
  const { mutate, isLoading } = usePostAddress();
  const { mutate: updateMutate, isLoading: isUpdateLoading } =
    useUpdatedAddress();

  const addAddressFormik = useFormik({
    initialValues: {
      contact_person_email: "",
      address: "",
      address_type: token
        ? addressType
          ? addressType
          : ""
        : guestUserInfo
        ? guestUserInfo.address_type
        : "",
      address_label: token
        ? ""
        : guestUserInfo
        ? guestUserInfo.address_label
        : "",
      contact_person_name: token
        ? personName
          ? personName
          : ""
        : guestUserInfo
        ? guestUserInfo.contact_person_name
        : "",
      contact_person_number: token
        ? phone
          ? phone
          : ""
        : guestUserInfo
        ? guestUserInfo.contact_person_number
        : "",
      additional_information: token
        ? editAddress
          ? editAddress?.additional_information
          : ""
        : guestUserInfo
        ? guestUserInfo.additional_information
        : "",
      latitude: lat,
      longitude: lng,
      road: "",
      house: token
        ? editAddress
          ? editAddress?.house
          : ""
        : guestUserInfo
        ? guestUserInfo.house
        : "",
      floor: token
        ? editAddress
          ? editAddress?.floor
          : ""
        : guestUserInfo
        ? guestUserInfo.floor
        : "",
    },
    validationSchema: ValidationSchemaForAddAddress(),
    onSubmit: async (values, helpers) => {

      try {
        let newData = {
          ...values,
          address_type:
            values.address_label !== ""
              ? values.address_label
              : values.address_type,
        };
        formSubmitOnSuccess(newData);
      } catch (err) {}
    },
  });

  const formSubmitOnSuccess = (values) => {
    if (token) {
      if (editAddress && editAddress?.address_type) {
        const newValue = { ...values, id: editAddress?.id };
        updateMutate(newValue, {
          onSuccess: (response) => {
            if (atModal === "true") {
              toast.success(response?.message);
              popoverClose();
              refetch?.();
            } else {
              toast.success(response?.message);
              refetch?.();
              setAddAddress(false)
            }

            // if (response?.data) {
            //   refetch();
            //   setOpen(false);
            // }
          },
          onError: onErrorResponse,
        });
      } else {
        mutate(values, {
          onSuccess: (response) => {
            if(response){
              if (atModal === "true") {
                toast.success(response?.message);
                popoverClose?.();
                refetch?.();
              } else {
                toast.success(response?.message);
                refetch?.();
                setAddAddress(false)
              }
            }

            // if (response?.data) {
            //   refetch();
            //   setOpen(false);
            // }
          },
          onError: onErrorResponse,
        });
      }
    } else {

      dispatch(setGuestUserInfo(values));
      dispatch(setOpenAddressModal(false));
    }
  };

  const nameHandler = (value) => {
    addAddressFormik.setFieldValue("contact_person_name", value);
  };
  const numberHandler = (value) => {
    addAddressFormik.setFieldValue("contact_person_number", value);
  };
  const addressTypeHandler = (value) => {
    addAddressFormik.setFieldValue("address_type", value);
  };
  const addressLabelHandler = (value) => {
    addAddressFormik.setFieldValue("address_label", value);
  };
  const additionalHandler = (value) => {
    addAddressFormik.setFieldValue("additional_information", value);
  };
  const roadHandler = (value) => {
    addAddressFormik.setFieldValue("road", value);
  };
  const houseHandler = (value) => {
    addAddressFormik.setFieldValue("house", value);
  };
  const floorHandler = (value) => {
    addAddressFormik.setFieldValue("floor", value);
  };
  const emailHandler = (value) => {
    addAddressFormik.setFieldValue("email", value);
  };
  useEffect(() => {
    addAddressFormik.setFieldValue("address", deliveryAddress);
    addAddressFormik.setFieldValue("address_type", addressType);
    addAddressFormik.setFieldValue("latitude", lat);
    addAddressFormik.setFieldValue("longitude", lng);
  }, [deliveryAddress, addressType, lat, lng]);
  const lanDirection = getLanguage() ? getLanguage() : "ltr";

  const handleReset = () => {
    addAddressFormik.setFieldValue("contact_person_name", "");
    addAddressFormik.setFieldValue("contact_person_number", "");
    addAddressFormik.setFieldValue("additional_information", "");
    addAddressFormik.setFieldValue("house", "");
    addAddressFormik.setFieldValue("floor", "");
    //setAddressType("");
  };

  return (
    <Stack>
      <form noValidate onSubmit={addAddressFormik.handleSubmit}>
        <Grid container spacing={2.8}>
          {addressType === "other" && (
            <Grid item xs={12} md={12}>
              {" "}
              <CustomTextFieldWithFormik
                type="text"
                label={t("Label Name(Optional)")}
                touched={addAddressFormik.touched.address_label}
                errors={addAddressFormik.errors.address_label}
                fieldProps={addAddressFormik.getFieldProps("address_label")}
                onChangeHandler={addressLabelHandler}
                value={addAddressFormik.values.address_label}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik
              required="true"
              type="text"
              label={t("Contact Person Name")}
              touched={addAddressFormik.touched.contact_person_name}
              errors={addAddressFormik.errors.contact_person_name}
              fieldProps={addAddressFormik.getFieldProps("contact_person_name")}
              onChangeHandler={nameHandler}
              value={addAddressFormik.values.contact_person_name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomPhoneInput
              value={addAddressFormik.values.contact_person_number}
              onHandleChange={numberHandler}
              initCountry={configData?.country}
              touched={addAddressFormik.touched.contact_person_number}
              errors={addAddressFormik.errors.contact_person_number}
              rtlChange="true"
              lanDirection={lanDirection}
              height="45px"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik

                label={t("Email")}
                touched={addAddressFormik.touched.contact_person_email}
                errors={addAddressFormik.errors.contact_person_email}
                fieldProps={addAddressFormik.getFieldProps("contact_person_email")}
                onChangeHandler={emailHandler}
                value={addAddressFormik.values.contact_person_email}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik
                type="text"
                label={t("House")}
                touched={addAddressFormik.touched.house}
                errors={addAddressFormik.errors.house}
                fieldProps={addAddressFormik.getFieldProps("house")}
                onChangeHandler={houseHandler}
                value={addAddressFormik.values.house}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik
                type="text"
                label={t("Floor")}
                touched={addAddressFormik.touched.floor}
                errors={addAddressFormik.errors.floor}
                fieldProps={addAddressFormik.getFieldProps("floor")}
                onChangeHandler={floorHandler}
                value={addAddressFormik.values.floor}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik
                type="text"
                label={t("Road")}
                touched={addAddressFormik.touched.road}
                errors={addAddressFormik.errors.road}
                fieldProps={addAddressFormik.getFieldProps("road")}
                onChangeHandler={roadHandler}
                value={addAddressFormik.values.road}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CustomTextFieldWithFormik

                type="text"
                label={t("Additional Information")}
                touched={addAddressFormik.touched.additional_information}
                errors={addAddressFormik.errors.additional_information}
                fieldProps={addAddressFormik.getFieldProps(
                    "additional_information"
                )}
                onChangeHandler={additionalHandler}
                value={addAddressFormik.values.additional_information}
                height="60px"
            />
          </Grid>

          <Grid item xs={12} md={12} align="end">
            <FormSubmitButton
              handleReset={handleReset}
              isLoading={editAddress && editAddress?.address_type ? isUpdateLoading : isLoading}
              reset={t("Reset")}
              submit={
                token
                  ?(editAddress && editAddress?.address_type)?t("Update Address"): t("Add Address")
                  : guestUserInfo
                  ? t("Update Address")
                  : t("Add Address")
              }
            />
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
};
export default AddressForm;
