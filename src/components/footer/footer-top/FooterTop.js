import {
	alpha,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomContainer from "../../container";
import { StyledFooterTop } from "../Footer.style";
import Subscribe from "./Subscribe";
import SubscribeImage from "./SubscribeImage";

const FooterTop = (props) => {
	const { landingPageData } = props;
	const { t } = useTranslation();
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<StyledFooterTop>
				<CustomContainer>
					<Grid
						container
						alignItems="flex-end"
						justifyContent="center"
						sx={{ height: "100%" }}
					>
						<Grid item xs={8} sm={6} md={4} position="relative">
							<Box sx={{
									mt:'-65px', textAlign:{xs:'center', md:'left'}, ml:{md:'-30px'}, position:{sm:'absolute', bottom:'10px'}
								}}>
								<SubscribeImage />
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
							md={8}
							container
							alignItems="center"
							justifyContent="center"
							sx={{
								py:3,
								pl:{lg:2},
								pb:{lg:4}
							}}
						>
							<Grid
								item
								xs={12}
								sm={12}
								md={6}
								align={isSmall ? "center" : "left"}
							>
								<Stack
									height="100%"
									alignItems={isSmall ? "center" : "flex-start"}
									justifyContent="center"
									spacing={1}
									p="10px"
									pt={0}
								>
									<Typography variant="h4">
										{landingPageData?.fixed_newsletter_title}
									</Typography>
									<Typography
										variant="h7"
										fontWeight="400"
										sx={{
											color: (theme) =>
												alpha(theme.palette.neutral[500], 0.8),
										}}
									>
										{landingPageData?.fixed_newsletter_sub_title}
									</Typography>
								</Stack>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<Box sx={{ml:{md:3}}}>
									<Subscribe />
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</CustomContainer>
			</StyledFooterTop>
		</>
	);
};

FooterTop.propTypes = {};

export default FooterTop;
