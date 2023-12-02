import { Grid, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import {
	CustomBoxFullWidth,
	CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import DollarSignHighlighter from "../../DollarSignHighlighter";
import CustomButtonComponent from "./CustomButtonComponent";

const Wrapper = styled(CustomBoxFullWidth)(({ theme }) => ({
	position: "relative",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const ImageWrapper = styled(CustomStackFullWidth)(({ theme }) => ({
	position: "relative",
	opacity: 0.1,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	[theme.breakpoints.down("md")]: {
		width: "420px",
	},
	[theme.breakpoints.down("sm")]: {
		width: "350px",
	},
}));
const SmallerScreen = (props) => {
	const { theme, landingPageData, goToApp, t } = props;
	const [openPopover, setOpenPopover] = useState({
		open: false,
		for: "",
	});

	const handleButtonClick = (type) => {
		setOpenPopover({
			open: true,
			for: type,
		});
	};
	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			paddingY="2rem"
			spacing={2}
		>
			<Grid item xs={12}>
				<Wrapper>
					<ImageWrapper>
						<CustomImageContainer
							src={`${landingPageData?.base_urls?.business_image_url}/${landingPageData?.business_image}`}
							objectFit="cover"
							height="auto"
							width="100%"
						/>
					</ImageWrapper>
					<CustomStackFullWidth
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							paddingX: { xs: "2rem" },
						}}
						spacing={3}
					>
						<CustomStackFullWidth spacing={1}>
							<Typography variant="h4" color="primary.main">
								<DollarSignHighlighter
									theme={theme}
									text={landingPageData?.business_title}
								/>
							</Typography>
							<Typography variant="h4" color="primary.main">
								<DollarSignHighlighter
									theme={theme}
									text={landingPageData?.business_sub_title}
								/>
							</Typography>
						</CustomStackFullWidth>
						<CustomStackFullWidth spacing={2}>
							{landingPageData?.download_business_app_links && (
								<CustomStackFullWidth
									gap={{ xs: 2, sm: 4 }}
									direction="row"
									flexGrow={1}
									flexWrap="wrap"
									alignItems="center"
								>
									{(landingPageData?.download_business_app_links
										?.seller_playstore_url_status === "1" ||
										landingPageData?.download_business_app_links
											?.seller_appstore_url_status === "1") && (
										<CustomButtonComponent
											t={t}
											landingPageData={landingPageData}
											title={t("Seller App")}
											urls={{
												playStoreStatus:
													landingPageData
														?.download_business_app_links
														?.seller_playstore_url_status,
												playStoreUrl:
													landingPageData
														?.download_business_app_links
														?.seller_playstore_url,
												appStoreStatus:
													landingPageData
														?.download_business_app_links
														?.seller_appstore_url_status,
												appStoreUrl:
													landingPageData
														?.download_business_app_links
														?.seller_appstore_url,
											}}
										/>
									)}
									{(landingPageData?.download_business_app_links
										?.dm_playstore_url_status === "1" ||
										landingPageData?.download_business_app_links
											?.dm_appstore_url_status === "1") && (
										<CustomButtonComponent
											t={t}
											landingPageData={landingPageData}
											title={t("Deliveryman App")}
											urls={{
												playStoreStatus:
													landingPageData
														?.download_business_app_links
														?.dm_playstore_url_status,
												playStoreUrl:
													landingPageData
														?.download_business_app_links
														?.dm_playstore_url,
												appStoreStatus:
													landingPageData
														?.download_business_app_links
														?.dm_appstore_url_status,
												appStoreUrl:
													landingPageData
														?.download_business_app_links
														?.dm_appstore_url,
											}}
										/>
									)}
								</CustomStackFullWidth>
							)}
						</CustomStackFullWidth>
					</CustomStackFullWidth>
				</Wrapper>
			</Grid>
		</Grid>
	);
};

SmallerScreen.propTypes = {};

export default SmallerScreen;
