import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderType } from "../../redux/slices/utils";
import CustomImageContainer from "../CustomImageContainer";
import active from "./assets/active_image.png";
import past from "./assets/past_image.png";

const CustomButton = styled(Button)(({ theme, isselected }) => ({
	padding: "1rem",
	borderRadius: "14px",
	background: isselected && theme.palette.primary.semiLight,
	[theme.breakpoints.up("xs")]: {
		width: "120.12px",
		height: "84.91px",
	},
	[theme.breakpoints.up("md")]: {
		width: "225px",
		height: "115px",
	},
}));

const menu = [
	{
		name: "Active orders",
		img: active,
	},
	{
		name: "Past orders",
		img: past,
	},
];
const NavigationButtons = (props) => {
	const { t, setOffset } = props;
	const { orderType } = useSelector((state) => state.utilsData);
	const dispatch = useDispatch();
	const handleOrderType = (index) => {
		setOffset(1);
		dispatch(setOrderType(index));
	};
	const customTick = () => (
		<Box
			sx={{
				position: "absolute",
				top: "4px",
				right: "6px",
			}}
		>
			<CheckCircleIcon color="success" />
		</Box>
	);
	return (
		<Grid container spacing={2}>
			{menu?.map((item, index) => {
				return (
					<Grid xs={6} align={index === 0 && "end"} key={index}>
						<CustomButton
							isselected={orderType === index}
							onClick={() => handleOrderType(index)}
						>
							{orderType === index && customTick()}
							<Stack
								alignItems="center"
								justifyContent="center"
								spacing={1}
							>
								<CustomImageContainer
									src={item.img.src}
									alt={t(item?.name)}
									height="70px"
									width="70px"
									objectFit="cover"
								/>
								<Typography
									sx={{
										color:
											orderType !== index && "customColor.textGray",
									}}
								>
									{t(item?.name)}
								</Typography>
							</Stack>
						</CustomButton>
					</Grid>
				);
			})}
		</Grid>
	);
};

NavigationButtons.propTypes = {};

export default NavigationButtons;
