import {
	Box,
	Grid,
	NoSsr,
	alpha,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	CustomBoxFullWidth,
	CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import CustomContainer from "../../container";
import iconicBg from "../assets/hero_background.png";
import HeroLocationForm from "./HeroLocationForm";
import HeroTitleSection from "./HeroTitleSection";

const DynamicModuleSelection = dynamic(() =>
	import("./module-selection/ModuleSelectionRaw")
);
const HeroSection = ({ configData, landingPageData, handleOrderNow }) => {
	const theme = useTheme();
	const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
	const { t } = useTranslation();
	const [currentLocation, setCurrentLocation] = useState(null);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setCurrentLocation(window.localStorage.getItem("location"));
		}
	}, []);

	return (
		<CustomContainer>
			<CustomBoxFullWidth
				sx={{
					backgroundColor: (theme) =>
						alpha(theme.palette.primary.main, 0.1),
					marginTop: { xs: "4rem", sm: "5rem", md: "7rem" },
					borderRadius: "20px",
					position: "relative",
					overflow: "hidden",
					".shape img": {
						transition: "all ease-in 1s",
					},
					"&:hover": {
						".shape img": {
							transform: "scale(1.2)",
						},
					},
				}}
			>
				<Box sx={{ position: "absolute" }} className="shape">
					<CustomImageContainer
						src={iconicBg.src}
						alt={t("Background")}
						height="100%"
						width="100%"
						borderRadius="20px"
						objectFit="cover"
					/>
				</Box>
				<Grid container>
					<Grid
						item
						xs={8}
						md={7}
						sx={{ padding: { xs: "1rem", sm: "3rem" } }}
					>
						<NoSsr>
							<HeroTitleSection
								configData={configData}
								landingPageData={landingPageData}
								handleOrderNow={handleOrderNow}
							/>
						</NoSsr>
					</Grid>
					<Grid item xs={4} md={5} align="right">
						<CustomStackFullWidth
							height="100%"
							alignItems="flex-start"
							justifyContent="flex-end"
						>
							<Box
								sx={{
									height: { xs: "125px", sm: "300px", md: "400px" },
									width: { xs: "70px", sm: "200px", md: "235px" },
									borderTopLeftRadius: "16px",
									borderTopRightRadius: "16px",
									position: "relative",
									zIndex: "99",
									border: (theme) =>
										`1px solid ${alpha(
											theme.palette.primary.main,
											0.2
										)}`,
									backgroundColor: (theme) =>
										theme.palette.neutral[100],
									marginInline: "auto",
								}}
							>
								<CustomImageContainer
									src={`${landingPageData?.base_urls?.header_banner_url}/${landingPageData?.header_banner}`}
									alt={t("Banner")}
									height="100%"
									width="100%"
									objectFit="cover"
								/>
							</Box>
							<Box
								sx={{
									position: "absolute",
									height: { xs: "52px", sm: "100px", md: "140px" },
									width: { xs: "52px", sm: "100px", md: "150px" },
									bottom: 0,
									right: { xs: 7, sm: 25, md: 30 },
								}}
							>
								<CustomImageContainer
									src={`${landingPageData?.base_urls?.header_icon_url}/${landingPageData?.header_icon}`}
									alt={t("icon")}
									height="100%"
									width="100%"
									objectFit="cover"
								/>
							</Box>
						</CustomStackFullWidth>
					</Grid>
				</Grid>
			</CustomBoxFullWidth>
			{isXSmall && (
				<>
					{currentLocation ? (
						<DynamicModuleSelection isSmall />
					) : (
						<CustomStackFullWidth mt="10px">
							<HeroLocationForm />
						</CustomStackFullWidth>
					)}
				</>
			)}
		</CustomContainer>
	);
};

export default HeroSection;
