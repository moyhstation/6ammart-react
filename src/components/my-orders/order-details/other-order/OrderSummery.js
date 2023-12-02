import React, { useEffect, useState } from "react";
import {
	alpha,
	Button,
	Grid,
	IconButton,
	Skeleton,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import "simplebar-react/dist/simplebar.min.css";
import CustomImageContainer from "../../../CustomImageContainer";
import { Box, Stack } from "@mui/system";
import { getAmountWithSign } from "../../../../helper-functions/CardHelpers";
import OrderCalculation from "./OrderCalculation";
import CustomDivider from "../../../CustomDivider";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { CustomTypographyEllipsis } from "../../../../styled-components/CustomTypographies.style";
import ParcelOrderSummery from "../ParcelOrderSummery";
import SingleOrderAttachment from "../singleOrderAttachment";
import PrescriptionOrderSummery from "../prescription-order/PrescriptionOrderSummery";
import PrescriptionOrderCalculation from "../prescription-order/PerscriptionOrderCalculation";
import InstructionBox from "./InstructionBox";
import CashSvg from "../../assets/CashSvg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomModal from "../../../modal";
import OfflinePaymentEdit from "../offline-order/OfflinePaymentEdit";
import OfflineOrderDetails from "../offline-order/OfflineOrderDetails";
import OfflinePaymentDenied from "../../assets/OfflinePaymentDenied";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from "@mui/icons-material/Close";
import { ReadMore } from "../../../ReadMore";
import OfflineOrderDenied from "../offline-order/OfflineOrderDenied";


const getAddOnsNames = (addOns) => {
	const names = addOns?.map(
		(item, index) =>
			`${addOns[0]?.name}(${addOns[0]?.quantity})${index !== addOns?.length - 1 ? "," : ""
			}`
	);
	return names;
};

const OrderSummery = (props) => {
	const { trackOrderData, configData, t, data, isLoading, dataIsLoading, refetchTrackOrder } =
		props;
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down("md"));
	const [openModal, setModalOpen] = useState(false);
	const [modalImage, setModalImage] = useState(null);
	const [openOfflineDetails, setOpenOfflineDetails] = useState(false);
	const [openOfflineModal, setOpenOfflineModal] = useState(false);
	const [partialWithOffline, setPartialWithOffline] = useState(false)
	useEffect(() => {
		if (trackOrderData?.offline_payment !== null) {
			setPartialWithOffline(true);
		}
	}, [])


	const handleImageOnClick = (value) => {
		setModalImage(value);
		setModalOpen(true);
	};
	const handleModalClose = (value) => {
		setModalOpen(value);
		setModalImage(null);
	};
	const handleClickOffline = () => {
		setOpenOfflineDetails(!openOfflineDetails);
	}
	const buttonBackgroundColor = () => {
		if (trackOrderData?.offline_payment?.data?.status === "denied") {
			return `${alpha(theme.palette.error.deepLight, 0.9)}`;
		}
		else if (trackOrderData?.offline_payment?.data?.status === "unpaid") {
			return theme.palette.info.main;
		}
		else if (trackOrderData?.offline_payment?.data?.status === "verified") {
			return theme.palette.success.main;
		}
		else {
			return theme.palette.warning.lite;
		}
	};
	return (
		<>
			{data && data.module_type === "parcel" ? (
				<ParcelOrderSummery
					data={data}
					trackOrderData={trackOrderData}
					configData={configData}
					refetchTrackOrder={refetchTrackOrder}
				/>
			) : (
				<Grid container pr={{ xs: "0px", sm: "0px", md: "40px" }}>
					<Grid container item md={8} xs={12}>
						<Grid item xs={12} sm={12} md={12}>
							{!data?.prescription_order &&
								trackOrderData?.module_type === "pharmacy" &&
								trackOrderData?.order_attachment && (
									<SingleOrderAttachment
										title="Prescription"
										attachment={trackOrderData?.order_attachment}
										configData={configData}
									/>
								)}
							{data?.prescription_order && (
								<PrescriptionOrderSummery data={data} />
							)}
							{data &&
								data?.length > 0 &&
								data?.map((product) => (
									<Grid
										container
										alignItems="flex-start"
										md={12}
										xs={12}
										spacing={{ xs: 1 }}
										key={product?.id}
										mb="13px"
										pl={{ xs: "0px", sm: "20px", md: "25px" }}
									>
										<Grid item xs={3} sm={1.2} md={1.2}>
											{product.item_campaign_id ? (
												<CustomImageContainer
													src={`${configData?.base_urls?.campaign_image_url}/${product.item_details.image}`}
													height="63px"
													maxWidth="63px"
													width="100%"
													loading="lazy"
													smHeight="50px"
												/>
											) : (
												<CustomImageContainer
													src={`${configData?.base_urls?.item_image_url}/${product.item_details.image}`}
													height="63px"
													maxWidth="63px"
													width="100%"
													loading="lazy"
													smHeight="70px"
													borderRadius=".7rem"
												/>
											)}
										</Grid>
										<Grid item md={10.8} xs={9} sm={10.8} align="left">
											<Stack
												direction={{ xs: "column", md: "row" }}
												justifyContent="space-between"
												paddingBottom={{ xs: "5px", md: "0px" }}
											>
												<Stack>
													<CustomTypographyEllipsis
														fontWeight="500"
														fontSize="13px"
													>
														{product?.item_details?.name}
													</CustomTypographyEllipsis>
													<Typography variant="body2" mt="3px">
														{product?.item_details?.unit_type}
													</Typography>
													<Typography variant="body2" mt="5px">
														Unit Price :{" "}
														{getAmountWithSign(product?.item_details?.price)}
													</Typography>
													{product?.add_ons.length > 0 && (
														<Typography mt="3px" variant="body2">
															{t("Addons")}: {getAddOnsNames(product?.add_ons)}
														</Typography>
													)}
												</Stack>
												<Stack
													direction={isSmall ? "column-reverse" : "column"}
													gap="5px"
												>
													<Typography fontSize="14px" fontWeight="bold">
														{getAmountWithSign(product?.item_details?.price)}
													</Typography>

													<Typography variant="body2" mt="8px">
														{t("Qty")}: {product?.quantity}
													</Typography>
												</Stack>
											</Stack>

											{/*{product?.variation?.length > 0 && (*/}
											{/*    <>{getVariationNames(product, t)}</>*/}
											{/*)}*/}
										</Grid>
										<CustomDivider border="1px" />
									</Grid>
								))}
						</Grid>
						<Grid
							item
							xs={12}
							sm={12}
							md={12}
							pl={{ xs: "0px", sm: "20px", md: "25px" }}
						>
							<CustomStackFullWidth
								direction={{ xs: "column", md: "row" }}
								spacing={2}
								sx={{ flexWrap: "wrap", justifyContent: "space-between", padding: { xs: "0px , 20px", md: "0px 25px" } }}
							>
								<Stack spacing={1}>
									<Typography
										fontSize={{ xs: "14px", md: "16px" }}
										fontWeight="500"
									>
										{t("Address")}
									</Typography>
									<Typography
										fontSize={{ xs: "12px", md: "14px" }}
										fontWeight="400"
										color={theme.palette.neutral[500]}
										width="215px"
										lineHeight="25px"
									>
										{trackOrderData?.delivery_address?.address}
									</Typography>
								</Stack>
								{!isSmall && (
									<Stack
										sx={{
											borderLeft: (theme) =>
												`3px solid ${alpha(theme.palette.neutral[400], 0.2)}`,
											paddingLeft: "30px",

											height: "100px",
										}}
									></Stack>
								)}
								<Stack>
									<Stack spacing={1} flexDirection="row" justifyContent="space-between">
										<Stack gap="12px">
											<Typography
												fontSize={{ xs: "14px", md: "16px" }}
												fontWeight="500"
											>
												{t("Payment")}
											</Typography>
											{trackOrderData?.payment_method ? (
												<CustomStackFullWidth flexDirection="row">
													<CashSvg />
													<Typography
														padding={"0px 10px"}
														fontSize={{ xs: "12px", md: "14px" }}
														fontWeight="400"
														color={theme.palette.neutral[500]}
														width="215px"
														lineHeight="25px"
														textTransform="capitalize"
													>
														{t(trackOrderData?.payment_method.replaceAll("_", " "))}
													</Typography>
												</CustomStackFullWidth>
											) : (
												<Skeleton width="100px" variant="text" />
											)}
										</Stack>
										{(trackOrderData?.payment_method === "offline_payment" || partialWithOffline) &&
											<Stack alignItems="flex-end" gap="5px">
												<Typography
													component="span"
													fontSize="12px"
													sx={{
														textTransform: "capitalize",
														padding: "4px",
														marginLeft: "15px",
														borderRadius: "3px",
														backgroundColor: buttonBackgroundColor(),
														color: theme.palette.whiteContainer.main,
														fontWeight: "600",
													}}
												>
													{/* {trackData?.order_status.replace("_", " ")} */}
													{trackOrderData?.offline_payment?.data?.status}
												</Typography>
												<ExpandMoreIcon onClick={handleClickOffline} sx={{ cursor: "pointer" }} />
											</Stack>
										}
									</Stack>
									{openOfflineDetails && (trackOrderData?.payment_method === "offline_payment" || partialWithOffline) &&
										<OfflineOrderDetails
											trackOrderData={trackOrderData}
											setOpenOfflineModal={setOpenOfflineModal}
										/>
									}
									{trackOrderData?.offline_payment?.data?.status === "denied" &&
										<OfflineOrderDenied
											trackOrderData={trackOrderData}
										/>}
									{openOfflineModal &&
										<CustomModal
											openModal={openOfflineModal}
											handleClose={() => setOpenOfflineModal(false)}
										>
											<CustomStackFullWidth
												direction="row"
												alignItems="center"
												justifyContent="flex-end"
												sx={{ position: "relative" }}
											>
												<IconButton
													onClick={() => setOpenOfflineModal(false)}
													sx={{
														zIndex: "99",
														position: "absolute",
														top: 10,
														right: 10,
														backgroundColor: (theme) => theme.palette.neutral[100],
														borderRadius: "50%",
														[theme.breakpoints.down("md")]: {
															top: 10,
															right: 5,
														},
													}}
												>
													<CloseIcon sx={{ fontSize: "24px", fontWeight: "500" }} />
												</IconButton>
											</CustomStackFullWidth>
											<OfflinePaymentEdit
												trackOrderData={trackOrderData}
												refetchTrackOrder={refetchTrackOrder}
												data={data}
												setOpenOfflineModal={setOpenOfflineModal}
											/>
										</CustomModal>
									}
								</Stack>
								{!isSmall && trackOrderData?.unavailable_item_note && (
									<Stack
										sx={{
											borderLeft: (theme) =>
												`3px solid ${alpha(theme.palette.neutral[400], 0.2)}`,
											paddingLeft: "30px",

											height: "100px",
										}}
									></Stack>
								)}
								{trackOrderData?.unavailable_item_note && (
									<Stack spacing={1}>
										<Typography
											fontSize={{ xs: "14px", md: "16px" }}
											fontWeight="500"
											textTransform="capitalize"
										>
											{t("Unavailable item Note")}
										</Typography>
										<Typography
											fontSize={{ xs: "12px", md: "14px" }}
											fontWeight="400"
											color={theme.palette.neutral[500]}
											width="215px"
											lineHeight="25px"
											textTransform="capitalize"
										>
											{trackOrderData?.unavailable_item_note}
										</Typography>
									</Stack>
								)}
								{trackOrderData?.cutlery && (
									<Stack
										spacing={1}
										sx={{ ":last-child": { marginLeft: "0px" } }}
									>
										<Typography
											fontSize={{ xs: "14px", md: "16px" }}
											fontWeight="500"
											textTransform="capitalize"
										>
											{t("Cutlery")}
										</Typography>
										<Typography
											fontSize={{ xs: "12px", md: "14px" }}
											fontWeight="400"
											color={theme.palette.neutral[500]}
											width="215px"
											lineHeight="25px"
											textTransform="capitalize"
										>
											{t("Yes")}
										</Typography>
									</Stack>
								)}
							</CustomStackFullWidth>
						</Grid>
						<Grid
							item
							xs={12}
							sm={12}
							md={12}
							pl={{ xs: "0px", sm: "20px", md: "25px" }}
						>
							{trackOrderData?.delivery_instruction && (
								<InstructionBox
									title="delivery instruction"
									note={trackOrderData?.delivery_instruction}
								/>
							)}

							{trackOrderData?.order_status === "refund_requested" && (
								<InstructionBox
									title="refund cancellation note"
									note={trackOrderData?.refund?.customer_reason}
								/>
							)}
							{trackOrderData?.order_status === "canceled" && (
								<InstructionBox
									title="cancellation note"
									note={trackOrderData?.cancellation_reason}
								/>
							)}
						</Grid>
					</Grid>

					<Grid item xs={12} md={4} pl={{ xs: "0px", sm: "15px", md: "20px" }}>
						{data?.prescription_order ? (
							<PrescriptionOrderCalculation
								data={data}
								t={t}
								trackOrderData={trackOrderData}
							/>
						) : (
							<OrderCalculation
								data={data}
								t={t}
								trackOrderData={trackOrderData}
								configData={configData}
							/>
						)}
					</Grid>
				</Grid>
			)}
		</>
	);
};

OrderSummery.propTypes = {};

export default OrderSummery;
