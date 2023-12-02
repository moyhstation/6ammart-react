import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { ButtonBox, SaveButton } from "./Profile.style";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useFormik } from "formik";
import ValidationSechemaProfile from "./Validation";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CustomDialogConfirm from "../../custom-dialog/confirm/CustomDialogConfirm";
import toast from "react-hot-toast";
import { useDeleteProfile } from "../../../api-manage/hooks/react-query/profile/useDeleteProfile";
import { useRouter } from "next/router";
import ImageUploaderWithPreview from "../../single-file-uploader-with-preview/ImageUploaderWithPreview";
import useUpdateProfile from "../../../api-manage/hooks/react-query/profile/useUpdateProfile";
import { onSingleErrorResponse } from "../../../api-manage/api-error-response/ErrorResponses";
import { setUser } from "../../../redux/slices/profileInfo";
import { useDispatch } from "react-redux";
import ImageAddIcon from "../../single-file-uploader-with-preview/ImageAddIcon";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomAlert from "../../alert/CustomAlert";
import AccountInformation from "./AccountInformation";
import FormSubmitButton from "../FormSubmitButton";
export const BackIconButton = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  borderRadius: "4px",
  justifyContent: "center",
  fontSize: "13px",
  color: theme.palette.primary.main,
}));
export const ResetButton = styled(Button)(({ theme }) => ({
  borderRadius: "5px",
  borderColor: theme.palette.neutral[400],
  color: theme.palette.neutral[400],
  marginRight: "5px",
  paddingInline: "40px",
}));

export const convertValuesToFormData = (values) => {
  let formData = new FormData();
  formData.append("f_name", values?.f_name);
  formData.append("l_name", values?.l_name);
  formData.append("phone", values?.phone);
  formData.append("email", values?.email);
  formData.append("image", values?.image);
  if (values?.password) {
    formData.append("password", values?.password);
  }
  return formData;
};
const BasicInformationForm = ({
  data,
  configData,
  t,
  refetch,
  setEditProfile,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const imageContainerRef = useRef();
  const { f_name, l_name, phone, email, image } = data;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const customerImageUrl = configData?.base_urls?.customer_image_url;
  const dispatch = useDispatch();
  const profileFormik = useFormik({
    initialValues: {
      f_name: f_name ? f_name : "",
      l_name: l_name ? l_name : "",
      email: email ? email : "",
      phone: phone ? phone : "",
      image: image ? image : "",
      password: "",
      confirm_password: "",
    },
    validationSchema: ValidationSechemaProfile(),
    onSubmit: async (values, helpers) => {
      try {
        formSubmitOnSuccess(values);
      } catch (err) {}
    },
  });
  const { mutate: profileUpdateByMutate, isLoading } = useUpdateProfile();
  const formSubmitOnSuccess = (values) => {
    const onSuccessHandler = (response) => {
      if (response) {
        toast.success(response?.message);
        refetch();
      }
    };
    const formData = convertValuesToFormData(values);
    profileUpdateByMutate(formData, {
      onSuccess: onSuccessHandler,
      onError: onSingleErrorResponse,
    });
  };
  const singleFileUploadHandlerForImage = (value) => {
    profileFormik.setFieldValue("image", value.currentTarget.files[0]);
  };
  const imageOnchangeHandlerForImage = (value) => {
    profileFormik.setFieldValue("image", value);
  };
  const router = useRouter();
  const onSuccessHandlerForUserDelete = (res) => {
    if (res?.errors) {
      toast.error(res?.errors?.[0]?.message);
    } else {
      localStorage.removeItem("token");
      toast.success(t("Account has been deleted"));
      dispatch(setUser(null));
      router.push("/", undefined, { shallow: true });
    }
    setOpenModal(false);
  };
  const { mutate, isLoading: isLoadingDelete } = useDeleteProfile(
    onSuccessHandlerForUserDelete
  );
  const deleteUserHandler = () => {
    mutate();
  };
  const handleReset = () => {
    profileFormik.setFieldValue("f_name", "");
    profileFormik.setFieldValue("l_name", "");
    profileFormik.setFieldValue("email", "");
    profileFormik.setFieldValue("password", "");
  };
  return (
    <>
      <Grid item md={12} xs={12} alignSelf="center">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2" fontWeight="700">
            {t("Edit Personal Details")}
          </Typography>
          <BackIconButton onClick={() => setEditProfile(false)}>
            <ArrowBackIosNewIcon
              sx={{
                fontSize: "10px",
                color: (theme) => theme.palette.primary.main,
                fontWeight: "700",
                marginRight: "3px",
              }}
            />
            {t("Go Back")}
          </BackIconButton>

          {/*<ButtonBox onClick={() => setOpenModal(true)}>*/}
          {/*  <Button*/}
          {/*    variant="outlined"*/}
          {/*    type="submit"*/}
          {/*    startIcon={<PersonRemoveIcon />}*/}
          {/*  >*/}
          {/*    <Typography fontWeight="400" fontSize="12px">*/}
          {/*      {t("Delete My Account")}*/}
          {/*    </Typography>*/}
          {/*  </Button>*/}
          {/*</ButtonBox>*/}
        </Stack>
      </Grid>
      <form noValidate onSubmit={profileFormik.handleSubmit}>
        <Grid
          container
          md={12}
          xs={12}
          spacing={{ xs: 2, sm: 2, md: 3 }}
          paddingRight={{ xs: "0px", md: "60px" }}
          paddingLeft={{ xs: "0px", md: "60px" }}
          marginLeft="0px"
        >
          <Grid item md={12} xs={12} textAlign="-webkit-center">
            <Stack
              sx={{
                position: "relative",
                width: "140px",
                borderRadius: "50%",
              }}
            >
              <ImageUploaderWithPreview
                type="file"
                labelText={t("Upload your photo")}
                hintText="Image format - jpg, png, jpeg, gif Image Size - maximum size 2 MB Image Ratio - 1:1"
                file={profileFormik.values.image}
                onChange={singleFileUploadHandlerForImage}
                imageOnChange={imageOnchangeHandlerForImage}
                width="8.125rem"
                imageUrl={customerImageUrl}
                borderRadius="50%"
                objectFit
                //height='140px'
              />
              {image && (
                <ImageAddIcon
                  imageChangeHandler={singleFileUploadHandlerForImage}
                />
              )}
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              sx={{ width: "100%" }}
              InputProps={{
                style: {
                  height: "45px", // Set your desired height value here
                },
              }}
              id="outlined-basic"
              variant="outlined"
              name="f_name"
              value={profileFormik.values.f_name}
              onChange={profileFormik.handleChange}
              label={t("Fast Name")}
              required
              error={
                profileFormik.touched.f_name &&
                Boolean(profileFormik.errors.f_name)
              }
              helperText={
                profileFormik.touched.f_name && profileFormik.errors.f_name
              }
              touched={profileFormik.touched.f_name && "true"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              sx={{ width: "100%" }}
              InputProps={{
                style: {
                  height: "45px", // Set your desired height value here
                },
              }}
              id="outlined-basic"
              // label="Enter Last Name"
              variant="outlined"
              name="l_name"
              value={profileFormik.values.l_name}
              onChange={profileFormik.handleChange}
              label={t("Last Name")}
              required
              error={
                profileFormik.touched.l_name &&
                Boolean(profileFormik.errors.l_name)
              }
              helperText={
                profileFormik.touched.l_name && profileFormik.errors.l_name
              }
              touched={profileFormik.touched.l_name && "true"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              sx={{ width: "100%" }}
              InputProps={{
                style: {
                  height: "45px", // Set your desired height value here
                },
              }}
              id="outlined-basic"
              // label="Enter Email"
              variant="outlined"
              name="email"
              value={profileFormik.values.email}
              onChange={profileFormik.handleChange}
              label={t("Email")}
              required
              error={
                profileFormik.touched.email &&
                Boolean(profileFormik.errors.email)
              }
              helperText={
                profileFormik.touched.email && profileFormik.errors.email
              }
              touched={profileFormik.touched.email && "true"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label={
                <span>
                  {t("Phone")}{" "}
                  <span style={{ color: "red" }}>({t("Not changeable")})</span>{" "}
                </span>
              }
              variant="outlined"
              sx={{ width: "100%" }}
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                style: {
                  height: "45px", // Set your desired height value here
                },
              }}
              value={phone}
            />
          </Grid>

          {data?.social_id ? (
            <Stack ml="20px" mr="30px" mb="20px">
              <CustomAlert
                type="info"
                text={t(
                  "Password can not be updated while you are logged in by using social logins."
                )}
              />
            </Stack>
          ) : (
            <>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  sx={{ width: "100%" }}
                  id="password"
                  variant="outlined"
                  value={profileFormik.values.password}
                  onChange={profileFormik.handleChange}
                  name="password"
                  label={t("Password")}
                  type={showPassword ? "text" : "password"}
                  InputLabelProps={{ shrink: true }}
                  error={
                    profileFormik.touched.password &&
                    Boolean(profileFormik.errors.password)
                  }
                  helperText={
                    profileFormik.touched.password &&
                    profileFormik.errors.password
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowPassword((prevState) => !prevState)
                          }
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: {
                      height: "45px", // Set your desired height value here
                    },
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  sx={{ width: "100%" }}
                  id="confirm_password"
                  label={t("Confirm Password")}
                  variant="outlined"
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={profileFormik.values.confirm_password}
                  onChange={profileFormik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={
                    profileFormik.touched.confirm_password &&
                    Boolean(profileFormik.errors.confirm_password)
                  }
                  helperText={
                    profileFormik.touched.confirm_password &&
                    profileFormik.errors.confirm_password
                  }
                  touched={profileFormik.touched.confirm_password && "true"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setConfirmShowPassword((prevState) => !prevState)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: {
                      height: "45px", // Set your desired height value here
                    },
                  }}
                />
              </Grid>
            </>
          )}

          <Grid item md={12} xs={12} align="end">
            <FormSubmitButton
              handleReset={handleReset}
              isLoading={isLoading}
              reset={t("Reset")}
              submit={t("Update Profile")}
            />
            {/*<ResetButton variant="outlined" onClick={handleReset}>*/}
            {/*  {t("Reset")}*/}
            {/*</ResetButton>*/}
            {/*<SaveButton variant="contained" type="submit" loading={isLoading}>*/}
            {/*  {t("Update Profile")}*/}
            {/*</SaveButton>*/}
          </Grid>
        </Grid>
      </form>
      <CustomDialogConfirm
        dialogTexts={t("Are you sure you want to delete your account?")}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={deleteUserHandler}
        isLoading={isLoadingDelete}
      />
    </>
  );
};
export default BasicInformationForm;
