/* eslint-disable @next/next/no-img-element */
import { styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import CustomImageContainer from "../CustomImageContainer";

import { useSelector } from "react-redux";
import CustomContainer from "../container";
import DollarSignHighlighter from "../DollarSignHighlighter";
import NextIcon from "../icons/NextIcon";
import PrevIcon from "../icons/PrevIcon";

const PrevWrapper = styled(Box)(({ theme }) => ({
	zIndex: 1,
	[theme.breakpoints.down("lg")]: {
		left: -5,
	},
	[theme.breakpoints.down("sm")]: {
		left: -10,
		display: "none",
	},
}));
const NextWrapper = styled(Box)(({ theme }) => ({
	zIndex: 1,
	[theme.breakpoints.down("lg")]: {
		right: -5,
	},
	[theme.breakpoints.down("sm")]: {
		right: -5,
		display: "none",
	},
}));
const Next = ({ onClick, className }) => {
	return (
		<NextWrapper
			className={`client-nav client-next ${className}`}
			onClick={onClick}
		>
			<NextIcon />
		</NextWrapper>
	);
};
const Prev = ({ onClick, className }) => {
	return (
		<PrevWrapper
			className={`client-nav client-prev ${className}`}
			onClick={onClick}
		>
			<PrevIcon />
		</PrevWrapper>
	);
};
const Testimonials = ({ isSmall, landingPageData }) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const { configData } = useSelector((state) => state.configData);

	const primary = theme.palette.primary.main;
	const [onClient, setOnClient] = useState(false);
	const [nav1, setNav1] = useState(null);
	const [nav2, setNav2] = useState(null);
	const [indexState, setIndexState] = useState({
		oldSlide: 0,
		activeSlide: 0,
		activeSlide2: 0,
	});
	const setting = {
		dots: false,
		arrow: true,
		infinite: landingPageData?.testimonial_list.length > 1 ? true : false,
		slidesToShow: landingPageData?.testimonial_list.length > 2 ? 3 : 1,
		focusOnSelect: true,
		className: "center",
		centerMode: true,
		centerPadding: "164px",
		speed: 1000,
		beforeChange: (current, next) =>
			setIndexState({ oldSlide: current, activeSlide: next }),
		afterChange: (current) => setIndexState({ activeSlide2: current }),
		prevArrow: landingPageData?.testimonial_list.length > 1 && <Prev />,
		nextArrow: landingPageData?.testimonial_list.length > 1 && <Next />,
		responsive: [
			{
				breakpoint: 1023,
				settings: {
					slidesToShow:
						landingPageData?.testimonial_list.length > 2 ? 3 : 1,
					centerPadding: "64px",
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow:
						landingPageData?.testimonial_list.length > 2 ? 3 : 1,
					centerPadding: "0",
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow:
						landingPageData?.testimonial_list.length > 2 ? 3 : 1,
					initialSlide: 2,
					centerPadding: "0",
				},
			},
		],
	};
	const textSliderSettings = {
		fade: true,
	};
	return (
		<>
			{landingPageData && landingPageData?.testimonial_list?.length > 0 && (
				<CustomContainer>
					<CustomStackFullWidth
						py={{ xs: "30px", md: "3.35rem" }}
						spacing={4}
					>
						<Typography
							textAlign="center"
							variant={isSmall ? "h7" : "h4"}
						>
							<DollarSignHighlighter
								theme={theme}
								text={landingPageData?.testimonial_title}
							/>
						</Typography>
					</CustomStackFullWidth>
					<CustomStackFullWidth
						pb={{ xs: "0px", md: "45px" }}
						sx={{
							marginTop: "5px",
							textAlign: "center",
						}}
					>
						<Box sx={{ display: "block", position: "relative" }}>
							<Box sx={{ gap: "35px" }}>
								<Box className="slider-wrapper">
									<Slider
										asNavFor={nav2}
										ref={(e) => setNav1(e)}
										{...setting}
									>
										{landingPageData?.testimonial_list?.map(
											(item, i) => (
												<TestimonialSlideImage
													img={`${landingPageData?.base_urls?.testimonial_image_url}/${item?.reviewer_image}`}
													key={i}
													indexState={indexState}
													currentIndex={i}
												/>
											)
										)}
									</Slider>
								</Box>
								<Slider
									asNavFor={nav1}
									ref={(e) => setNav2(e)}
									{...textSliderSettings}
								>
									{landingPageData?.testimonial_list.map((item, i) => (
										<TestimonialSlideText {...item} key={i} />
									))}
								</Slider>
							</Box>
						</Box>
					</CustomStackFullWidth>
				</CustomContainer>
			)}
		</>
	);
};
export const TestimonialSlideImage = (props) => {
	const { img, indexState, currentIndex } = props;
	const theme = useTheme();
	const primary = theme.palette.primary.main;
	return (
		<>
			<Stack
				p="4px"
				sx={{
					position: "relative",
					width: "100%",
					maxWidth: "140px",
					aspectRatio: "1",
					margin: "0 auto",
				}}
			>
				<Box
					sx={{
						position: "absolute",
						inset: "0",
						background:
							currentIndex === indexState?.activeSlide2 && primary,
						width: "100%",
						height: "100%",
						aspectRatio: "1",
						borderRadius: "50%",
						padding: "5px",
						transition: "all ease 0.2s",
					}}
				>
					<CustomImageContainer
						src={img}
						alt=""
						width="100%"
						objectFit="cover"
						borderRadius="50%"
					/>
				</Box>
			</Stack>
		</>
	);
};

export const TestimonialSlideText = (props) => {
	const theme = useTheme();
	const { name, designation, review, activeState, index } = props;
	const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Box
			className={`slide-item ${
				index > activeState
					? "next-slide"
					: index == activeState
					? "active"
					: "prev-slide"
			}`}
			sx={{ marginTop: "30px" }}
		>
			<Stack className="content" spacing={3} alignItems="center">
				{review && (
					<Typography
						fontSize={{ xs: "12px", md: "18px" }}
						fontWeight="500"
						color={theme.palette.primary.main}
						lineHeight="2"
						fontStyle="italic"
						sx={{ maxWidth: { xs: "280px", sm: "400px", md: "580px" } }}
					>
						“{review}”
					</Typography>
				)}
				<Stack spacing={1}>
					{name && (
						<Typography
							variant={isSmall ? "subtitle2" : "h6"}
							fontWeight="600"
						>
							{name}
						</Typography>
					)}
					{designation && (
						<Typography
							variant={isSmall ? "body2" : "body1"}
							className="designation"
							color="text.secondary"
						>
							{designation}
						</Typography>
					)}
				</Stack>
			</Stack>
		</Box>
	);
};
Testimonials.propTypes = {};

export default Testimonials;
