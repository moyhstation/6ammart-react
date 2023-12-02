import { Grid, Typography } from "@mui/material";
import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import CustomButtonComponent from "./CustomButtonComponent";

const LargerScreen = (props) => {
	const { landingPageData, goToApp, t } = props;
	return (
		<Grid container justifyContent="center" alignItems="center" spacing={2}>
			<Grid item xs={12} sm={12} md={6} paddingY="2rem">
				<CustomStackFullWidth spacing={4}>
					<CustomStackFullWidth spacing={1}>
						<Typography variant="h4" color="primary.main">
							{landingPageData?.business_title}
						</Typography>
						<Typography variant="h4" color="primary.main">
							{landingPageData?.business_sub_title}
						</Typography>
					</CustomStackFullWidth>

					<CustomStackFullWidth spacing={2}>
						{landingPageData?.download_business_app_links && (
							<CustomStackFullWidth
								gap={4}
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
												landingPageData?.download_business_app_links
													?.seller_playstore_url_status,
											playStoreUrl:
												landingPageData?.download_business_app_links
													?.seller_playstore_url,
											appStoreStatus:
												landingPageData?.download_business_app_links
													?.seller_appstore_url_status,
											appStoreUrl:
												landingPageData?.download_business_app_links
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
												landingPageData?.download_business_app_links
													?.dm_playstore_url_status,
											playStoreUrl:
												landingPageData?.download_business_app_links
													?.dm_playstore_url,
											appStoreStatus:
												landingPageData?.download_business_app_links
													?.dm_appstore_url_status,
											appStoreUrl:
												landingPageData?.download_business_app_links
													?.dm_appstore_url,
										}}
									/>
								)}
							</CustomStackFullWidth>
						)}
					</CustomStackFullWidth>
				</CustomStackFullWidth>
			</Grid>
			<Grid
				item
				xs={12}
				sm={12}
				md={6}
				textAlign={{ xs: "center", md: "right" }}
				sx={{
					height: "430px",
					position: "relative",
				}}
			>
				<CustomImageContainer
					src={`${landingPageData?.base_urls?.business_image_url}/${landingPageData?.business_image}`}
					objectfit="cover"
					height="100%"
					width="100%"
				/>
			</Grid>
		</Grid>
	);
};

export default LargerScreen;
