import { useTheme } from "@emotion/react";
import { alpha, Card, Grid, Typography } from "@mui/material";
import { Stack, styled } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParcelCategories } from "../../../redux/slices/parcelCategoryData";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { textWithEllipsis } from "../../../styled-components/TextWithEllipsis";
import CustomImageContainer from "../../CustomImageContainer";

const ParcelCard = styled(Card)(({ theme }) => ({
	padding: "20px",
	cursor: "pointer",
	border: "1px solid",
	borderColor: alpha(theme.palette.neutral[400], 0.3),
	transition: "all ease 0.5s",
	"&:hover": {
		boxShadow: "0px 10px 20px rgba(88, 110, 125, 0.1)",
		img: {
			transform: "scale(1.1)",
		},
		".MuiTypography-body1:first-child": {
			color: theme.palette.primary.main,
			letterSpacing: "0.02em",
		},
	},
	".MuiTypography-body1:first-child": {
		transition: "all ease 0.5s",
	},
}));

const ParcelCategoryCard = (props) => {
	const theme = useTheme();
	const { data } = props;
	const { configData } = useSelector((state) => state.configData);
	const dispatch = useDispatch();
	const router = useRouter();

	const handleClick = () => {
		dispatch(setParcelCategories(data));
		router.push("/parcel-delivery-info", undefined, { shallow: true });
	};
	const classes = textWithEllipsis();
	return (
		<CustomStackFullWidth>
			<ParcelCard {...props} onClick={handleClick}>
				<Grid container spacing={3}>
					<Grid item xs={3} sm={4} md={4} alignSelf="center">
						<CustomImageContainer
							width={{ xs: "65px", sm: "80px", md: "100px" }}
							src={`${configData?.base_urls?.parcel_category_image_url}/${data?.image}`}
							height={{ xs: "65px", sm: "80px", md: "100px" }}
							objectfit="cover"
							borderRadius=".7rem"
						/>
					</Grid>
					<Grid item xs={9} sm={8} md={8} alignSelf="center">
						<Stack width="100%">
							<Typography
								fontSize={{ xs: "14px", sm: "18px", md: "18px" }}
								fontWeight="500"
							>
								{data?.name}
							</Typography>
							<Typography
								fontSize={{ xs: "12px", sm: "14px", md: "14px" }}
								color={theme.palette.neutral[400]}
								className={classes.multiLineEllipsis}
								maxHeight="40px"
							>
								{data?.description}
							</Typography>
						</Stack>
					</Grid>
				</Grid>
			</ParcelCard>
		</CustomStackFullWidth>
	);
};

export default ParcelCategoryCard;
