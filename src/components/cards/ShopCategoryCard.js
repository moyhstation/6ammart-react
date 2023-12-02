import { Grid, Skeleton, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { btoa } from "next/dist/compiled/@edge-runtime/primitives/encoding";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { getModuleId } from "../../helper-functions/getModuleId";
import { CustomBoxFullWidth } from "../../styled-components/CustomStyles.style";
import { textWithEllipsis } from "../../styled-components/TextWithEllipsis";
import CustomImageContainer from "../CustomImageContainer";

const Wrapper = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	padding: "5px",
	border: "1px solid #EAEEF2",

	borderRadius: "10px",
	cursor: "pointer",
	width: "225px",
	transition: "all ease 0.5s",
	".MuiTypography-h7": {
		transition: "all ease 0.5s",
	},
	"&:hover": {
		boxShadow: "0px 10px 20px rgba(88, 110, 125, 0.1)",
		".MuiTypography-h7": {
			color: theme.palette.primary.main,
			letterSpacing: "0.02em",
		},
		img: {
			transform: "scale(1.1)",
		},
	},
}));
const ImageWrapper = styled(CustomBoxFullWidth)(({ theme }) => ({
	position: "relative",
	borderRadius: "10px",
	height: "115px",
}));

const ShopCategoryCard = (props) => {
	const { item, imageUrl, onlyshimmer } = props;
	const { t } = useTranslation();
	const classes = textWithEllipsis();
	return (
		<Wrapper>
			{onlyshimmer ? (
				<Grid container>
					<Grid
						item
						xs={6}
						container
						sx={{ p: "8px" }}
						alignItems="center"
						justifyContent="center"
					>
						<Grid item xs={12}>
							<Typography
								variant="h7"
								fontWeight="400"
								className={classes.multiLineEllipsis}
							>
								<Skeleton variant="text" width="50px" />
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body2" color="customColor.textGray">
								{t("Explore Items")}
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Skeleton variant="ractangle" height="120px" width="100%" />
					</Grid>
				</Grid>
			) : (
				<Link
					href={{
						pathname: "/home",
						query: {
							search: "category",
							id: `${item?.slug ? item?.slug : item?.id}`,
							module_id: `${getModuleId()}`,
							name: btoa(item?.name),
						},
					}}
				>
					<Grid container>
						<Grid
							item
							xs={6}
							container
							sx={{ p: "8px" }}
							alignItems="center"
							justifyContent="center"
						>
							<Grid item xs={12}>
								<Typography
									variant="h7"
									fontWeight="400"
									className={classes.multiLineEllipsis}
								>
									{item?.name}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography
									variant="body2"
									color="customColor.textGray"
								>
									{t("Explore Items")}
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<ImageWrapper>
								<CustomImageContainer
									height="100%"
									width="100%"
									src={`${imageUrl}/${item?.image}`}
									borderRadius="5px"
									objectFit="cover"
								/>
							</ImageWrapper>
						</Grid>
					</Grid>
				</Link>
			)}
		</Wrapper>
	);
};

ShopCategoryCard.propTypes = {};

export default ShopCategoryCard;
