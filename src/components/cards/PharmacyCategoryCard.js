import { Skeleton, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { btoa } from "next/dist/compiled/@edge-runtime/primitives/encoding";
import Link from "next/link";
import React, { useState } from "react";
import { getModuleId } from "../../helper-functions/getModuleId";
import { textWithEllipsis } from "../../styled-components/TextWithEllipsis";
import CustomImageContainer from "../CustomImageContainer";

const Wrapper = styled(Box)(({ theme }) => ({
	cursor: "pointer",
	width: "118px",
	height: "183px",
	backgroundColor: theme.palette.background.default,
	borderRadius: "60px 60px 0px 0px",
	transition: "all ease 0.5s",
	"&:hover": {
		boxShadow: "0px 10px 20px rgba(88, 110, 125, 0.1)",
		img: {
			transform: "scale(1.1)",
		},
	},
	[theme.breakpoints.down("md")]: {
		width: "100px",
		height: "140px",
		boxShadow: "0px 10px 20px rgba(88, 110, 125, 0.1)",
	},
	[theme.breakpoints.down("sm")]: {
		boxShadow: "0px 10px 20px rgba(88, 110, 125, 0.1)",
	},
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
	position: "relative",
	borderRadius: "60px 60px 0px 0px",
	[theme.breakpoints.down("md")]: {
		height: "80px",
	},
}));
const TextWrapper = styled(Box)(({ theme }) => ({
	width: "100%",
	padding: "10px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const PharmacyCategoryCard = (props) => {
	const { image, title, id, onlyshimmer, slug } = props;
	const classes = textWithEllipsis();
	const [hover, setHover] = useState(false);

	return (
		<>
			{onlyshimmer ? (
				<Wrapper
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					<Skeleton
						width="100%"
						height="50%"
						variant="rectangle"
						sx={{ borderRadius: "60px 60px 0px 0px" }}
					/>
					<TextWrapper>
						<Skeleton width="70px" variant="text" />
					</TextWrapper>
				</Wrapper>
			) : (
				<Link
					href={{
						pathname: "/home",
						query: {
							search: "category",
							id: `${slug ? slug : id}`,
							module_id: `${getModuleId()}`,
							name: btoa(title),
						},
					}}
				>
					<Wrapper
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
					>
						<ImageWrapper>
							<CustomImageContainer
								src={image}
								alt={title}
								height="100%"
								width="100%"
								borderRadius="60px 60px 0px 0px"
								objectFit="cover"
							/>
						</ImageWrapper>
						<TextWrapper>
							<Typography
								textAlign="center"
								className={classes.singleLineEllipsis}
								maxHeight="20px"
								color={hover && "primary.main"}
							>
								{title}
							</Typography>
						</TextWrapper>
					</Wrapper>
				</Link>
			)}
		</>
	);
};

PharmacyCategoryCard.propTypes = {};

export default PharmacyCategoryCard;
