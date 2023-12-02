// pages/500.js
import { Button, Container, Stack, Typography } from "@mui/material";
import { CustomStackFullWidth } from "../src/styled-components/CustomStyles.style";
import FiveHundred from "../src/assets/img/500.svg"
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
// import FiveHundred from "../src/components/errors-svg/FiveHundred";

export default function Custom500() {
	const { t } = useTranslation();
	const theme = useTheme();
	const router = useRouter();

	const handleRefresh = () => {
		router.reload();
	}
	const handleBack = () =>{
		router.back();
	}

	return (
		<Container
			maxWidth="lg"
			sx={{
				mt: { md: "9rem" },
				mb: { xs: "72px", md: "0" },
			}}
		>
			<CustomStackFullWidth
				justifyContent="center"
				alignItems="center"
				spacing={4}
			>
				<Stack width="100%" spacing={2} padding="1rem" alignItems="center">
					<img src={FiveHundred.src} alt="500" height="150px" />
					<Typography
						align="center"
						variant="h3"
						sx={{
							fontSize: "30px",
							fontWeight: "700",
							display: "flex",
							flexDirection: "column",
							color: theme.palette.text.secondary
						}}
					>
						{t("Internal server error")}
						<Typography component="span" fontSize="16px" fontWeight="400">{t("Try to ")}
							<Typography
								component="span"
								sx={{
									color: theme.palette.info.main,
									cursor: "pointer"
								}}
								onClick={handleRefresh}
							>
								{t("refresh ")}
							</Typography>
							<Typography component="span">{t("this page or go back to previous page")}</Typography>
						</Typography>
					</Typography>
					<Button
						variant="contained"
						onClick={handleBack}
						sx={{ 
							width: "120px",
							backgroundColor: theme.palette.text.secondary
						 }}
					>
						{t("Go Back")}
					</Button>
				</Stack>
			</CustomStackFullWidth>
		</Container>
	);
}
