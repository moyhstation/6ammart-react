import React from "react";
import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
	alpha,
	useTheme,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { t } from "i18next";
import { Formik, useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { setOfflineInfoStep, setOfflineMethod, setOfflinePaymentInfo } from "../../../../redux/slices/offlinePaymentData";

import Subtitle1 from "../../../typographies/Subtitle1";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../../CustomImageContainer";
import OfflinePaymentImage from "../../assets/offlinePayments.svg";
import CustomTextFieldWithFormik from "../../../form-fields/CustomTextFieldWithFormik";
import { getAmountWithSign } from "../../../../helper-functions/CardHelpers";
import { useRouter } from "next/router";

const OfflineForm = ({
	offlinePaymentOptions,
	placeOrder,
	total_order_amount,
	offlinePaymentLoading,
	usePartialPayment,
}) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const borderColor = theme.palette.neutral[400];
	const { offlineMethod } = useSelector((state) => state.offlinePayment);
	const { profileInfo } = useSelector((state) => state.profileInfo);
	const router = useRouter();
	
	// Create a validation schema using Yup.
	const validationSchema = Yup.object().shape({
		// Define validation rules for each field dynamically.
		...offlinePaymentOptions
			?.filter(
				(item) => item.method_name === offlineMethod?.method_name
			)[0]
			?.method_informations?.reduce((acc, item) => {
				if (item?.is_required === 1) {
					acc[item.customer_input] = Yup.string().required('This field is required');
				}
				return acc;
			}, {}),
	});

	const initialValues = {
		"customer_note": "",
		payment_method: offlineMethod ? offlineMethod.method_name : "",

	};
	offlinePaymentOptions
		?.filter(
			(item) => item.method_name === offlineMethod?.method_name
		)[0]?.method_informations?.forEach((item) => {
			initialValues[item.customer_input] = "";
		});
	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values) => {
			try {
				let newData = {
					...values,
					method_id: offlineMethod.id,
				};
				if (values) {
					dispatch(setOfflinePaymentInfo(newData));
					placeOrder();
				}

			} catch (err) {
				console.log(error)
			}

		},
	});

	const paymentMethodHandler = (e) => {
		formik.setFieldValue("payment_method", e.target.value);
		const newMethod = offlinePaymentOptions?.filter(
			(item) => item.method_name === e.target.value
		)[0];
		dispatch(setOfflineMethod(newMethod));
	};
	const handleCancel = () => {
		router.back();
	};

	return (
		<CustomStackFullWidth
			justifyContent="center"
			alignItems="center"
			paddingInline={{ xs: "0px", sm: "60px" }}
			gap="20px"
		>
			<CustomImageContainer width="120px" src={OfflinePaymentImage.src} />
			<Subtitle1 text="Pay your bill using any of the payment method below and input the required information in the form" />
			<CustomStackFullWidth>
				<form onSubmit={formik.handleSubmit}>
					<Stack spacing={2}>
						<FormControl fullWidth>
							<InputLabel
								// required={required}
								id="demo-simple-select-label"
								sx={{ color: (theme) => theme.palette.neutral[1000] }}
							>
								{t("Payment Method")}
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={offlineMethod?.method_name}
								label={t("Payment Method")}
								onChange={paymentMethodHandler}
								error={Boolean(
									formik.touched.payment_method &&
									formik.errors.payment_method
								)}
								helperText={
									formik.touched.payment_method &&
									formik.errors.payment_method
								}
								ieldProps={formik.getFieldProps("payment_method")}
							>
								{offlinePaymentOptions?.length > 0 &&
									offlinePaymentOptions?.map((item, index) => {
										return (
											<MenuItem
												key={index}
												value={item.method_name}
												sx={{
													"&:hover": {
														backgroundColor: "primary.main",
													},
												}}
											>
												{t(item.method_name)}
											</MenuItem>
										);
									})}
							</Select>
							{formik.touched.payment_method &&
								formik.errors.payment_method &&
								!value && (
									<FormHelperText
										sx={{ color: (theme) => theme.palette.error.main }}
									>
										{t("Please select an option.")}
									</FormHelperText>
								)}
						</FormControl>
						<CustomStackFullWidth
							padding="15px"
							borderRadius="10px"
							gap="15px"
							backgroundColor={alpha(theme.palette.primary.main, 0.1)}
						>
							<Typography fontWeight={500} color={theme.palette.primary.main}>
								{t("Payment Info")}
							</Typography>
							<CustomStackFullWidth>
								<Grid container spacing={1}>
									{offlinePaymentOptions
										?.filter(
											(item) => item.method_name === offlineMethod?.method_name
										)[0]
										?.method_fields?.map((item, index) => (
											<Grid item xs={12} md={6} key={index}>
												<Typography sx={{ textTransform: "capitalize" }}>
													{item.input_name.replaceAll("_", " ")}
													&nbsp;&nbsp;:&nbsp;&nbsp;
													<Typography component="span">
														{item.input_data}
													</Typography>
												</Typography>
											</Grid>
										))}
								</Grid>
							</CustomStackFullWidth>
						</CustomStackFullWidth>
						<Typography
							padding="20px"
							varient="h3"
							fontSize="18px"
							fontWeight="700"
							textAlign="center"
						>
							{`Amount: ${getAmountWithSign(usePartialPayment ? (total_order_amount - profileInfo?.wallet_balance) : total_order_amount)}`}
						</Typography>
						<Grid container spacing={1}>
							{offlinePaymentOptions
								?.filter(
									(item) => item.method_name === offlineMethod?.method_name
								)[0]
								?.method_informations?.map((item, index) => (
									<Grid item xs={12} md={6} key={index}>
										<TextField
											fullWidth
											label={item?.customer_input.replaceAll("_", " ")}
											id={item.customer_input}
											name={item.customer_input}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder={item.customer_placeholder.replaceAll("_", " ")}
											value={formik.values[item.customer_input]}
											error={formik.touched[item.customer_input] && Boolean(formik.errors[item.customer_input])}
											helperText={formik.touched[item.customer_input] && formik.errors[item.customer_input]}
										/>
									</Grid>
								))}
							<Grid item xs={12} md={12}>
								<TextField
									rows={4}
									multiline
									fullWidth
									id="customer_note"
									label="Payment Note"
									name="customer_note"
									value={formik.values["customer_note"]}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								// defaultValue="Default Value"
								/>
							</Grid>
						</Grid>
					</Stack>
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
							{t("Place Order")}
						</LoadingButton>
					</Stack>
				</form>
			</CustomStackFullWidth>
		</CustomStackFullWidth>
	);
};

export default OfflineForm;

