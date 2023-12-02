import { useTheme } from "@emotion/react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Typography } from "@mui/material";
import React from "react";
import { TopBarButton } from "./header/NavBar.style";
import ClickToCall from "./header/top-navbar/ClickToCall";

const CallToAdmin = (props) => {
	const { configData } = props;
	const theme = useTheme();
	return (
		<ClickToCall phone={configData?.phone}>
			<TopBarButton
				size="small"
				variant="text"
				sx={{
					".MuiTypography-body1": {
						transition: "all ease 0.5s",
					},
					"&:hover .MuiTypography-body1": {
						color: theme.palette.primary.main + "!important",
					},
				}}
				startIcon={
					<LocalPhoneIcon
						sx={{
							ml: 1,
							color: (theme) => theme.palette.neutral[1000],
						}}
					/>
				}
			>
				<Typography sx={{ color: (theme) => theme.palette.neutral[1000] }}>
					{configData?.phone}
				</Typography>
			</TopBarButton>
		</ClickToCall>
	);
};

CallToAdmin.propTypes = {};

export default CallToAdmin;
