import { useTheme } from "@emotion/react";
import { Button, Stack, styled, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import appleicon from "../../../../public/static/footer/apple.svg";
import playstoreicon from "../../../../public/static/footer/playstore.svg";
import CustomImageContainer from "../../CustomImageContainer";

export const CustomButton = styled(Button)(({ theme, graybackground }) => ({
	// width: "153px",
	height: "45px",
	borderRadius: "5px",
	cursor: "pointer",
	backgroundColor:
		graybackground === "true"
			? theme.palette.footer.appDownloadButtonBgGray
			: theme.palette.footer.appDownloadButtonBg,
	"&:hover": {
		backgroundColor: theme.palette.footer.appDownloadButtonBgHover,
	},
	[theme.breakpoints.down("md")]: {
		maxWidth: "150px",
		height: "40px",
	},
}));
const AppLinks = (props) => {
	const { changeSingle, graybackground, landingPageData } = props;
	const theme = useTheme();

	let language_direction;
	if (typeof window !== "undefined") {
		language_direction = window.localStorage.getItem("direction");
	}
	const goToApp = (href) => {
		window.open(href);
	};
	const { t } = useTranslation();
	const googlePlay = () => (
		<CustomButton
			onClick={() =>
				goToApp(landingPageData?.download_user_app_links?.playstore_url)
			}
			variant="contained"
			graybackground={graybackground ? "true" : "false"}
		>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				spacing={0.5}
			>
				<CustomImageContainer
					src={playstoreicon.src}
					alt="GooglePlay"
					objectFit="cover"
					height="26px"
					width="26px"
				/>
				<Stack alignItems="flex-start" justifyContent="center">
					<Typography
						sx={{
							fontSize: { xs: "8px", sm: "11px" },
							color: "customColor.textGray",
						}}
					>
						{t("GET IT ON")}
					</Typography>
					<Typography
						sx={{
							fontWeight: "bold",
							fontSize: { xs: "10px", sm: "13px" },
						}}
						color={theme.palette.whiteContainer.main}
					>
						Google Play
					</Typography>
				</Stack>
			</Stack>
		</CustomButton>
	);
	const appleStore = () => (
		<CustomButton
			onClick={() =>
				goToApp(landingPageData?.download_user_app_links?.apple_store_url)
			}
			variant="contained"
			graybackground={graybackground ? "true" : "false"}
		>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				spacing={0.5}
			>
				<CustomImageContainer
					src={appleicon.src}
					alt="GooglePlay"
					objectFit="cover"
					height="26px"
					width="26px"
				/>
				<Stack alignItems="flex-start" justifyContent="center">
					<Typography
						sx={{
							fontSize: { xs: "8px", sm: "11px" },
							color: "customColor.textGray",
						}}
					>
						{t("Download ON")}
					</Typography>
					<Typography
						sx={{
							fontWeight: "bold",
							fontSize: { xs: "10px", sm: "13px" },
						}}
						color={theme.palette.whiteContainer.main}
					>
						{t("App Store")}
					</Typography>
				</Stack>
			</Stack>
		</CustomButton>
	);
	return (
		<Stack
			direction="row"
			spacing={2}
			sx={{ mt: 4 }}
			gap={language_direction === "rtl" && "10px"}
			justifyContent="center"
		>
			{Number.parseInt(
				landingPageData?.download_user_app_links?.playstore_url_status
			) === 1 && googlePlay()}
			{Number.parseInt(
				landingPageData?.download_user_app_links?.apple_store_url_status
			) === 1 && appleStore()}
		</Stack>
	);
};

AppLinks.propTypes = {};

export default AppLinks;
