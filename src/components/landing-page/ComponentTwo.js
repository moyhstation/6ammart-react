import {
	alpha,
	Box,
	Grid,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
import CustomContainer from "../container";
import DownloadApps from "./DownloadApps";
import SolutionSvg from "./SolutionSvg";

export const ComponentTwoContainer = styled(Box)(
	({ theme, paddingTop, paddingBottom, background }) => ({
		marginTop: ".6rem",
		paddingTop: paddingTop ? paddingTop : "1.5rem",
		paddingBottom: paddingBottom ? paddingBottom : "1rem",
		background: alpha(theme.palette.primary.main, 0.3),
	})
);

const ComponentTwo = ({ configData, landingPageData }) => {
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<>
			{(Number.parseInt(
				landingPageData?.download_user_app_links?.playstore_url_status
			) === 1 ||
				Number.parseInt(
					landingPageData?.download_user_app_links?.apple_store_url_status
				) === 1) && (
				<ComponentTwoContainer paddingTop="2rem" paddingBottom="2rem">
					<CustomContainer>
						<Grid
							container
							alignItems="center"
							justifyContent="center"
							spacing={4}
						>
							<Grid
								item
								xs={12}
								sm={12}
								md={6}
								align={isSmall ? "center" : "left"}
							>
								<Box
									sx={{
										position: "relative",
										width: { xs: "223px", md: "440px" },
										height: { xs: "150px", md: "380px" },
										"&:hover": {
											"svg, img": {
												transform: "scale(1.1)",
											},
										},
									}}
								>
									<SolutionSvg />
								</Box>
							</Grid>
							<Grid
								item
								xs={12}
								sm={12}
								md={6}
								align={isSmall ? "center" : "left"}
							>
								<DownloadApps
									theme={theme}
									isSmall={isSmall}
									landingPageData={landingPageData}
								/>
							</Grid>
						</Grid>
					</CustomContainer>
				</ComponentTwoContainer>
			)}
		</>
	);
};

export default ComponentTwo;
