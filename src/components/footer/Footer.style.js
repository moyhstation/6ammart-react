import { Box, alpha, styled } from "@mui/material";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../helper-functions/moduleTypes";
export const StyledFooterBackground = styled(Box)(
	({ theme, nobottommargin }) => ({
		//minHeight: '500px',
		width: "100%",
		backgroundColor: theme.palette.background.custom4,
		borderRadius:'20px 20px 0 0',
		marginTop:'-20px',
		[theme.breakpoints.down("md")]: {
			marginBottom: nobottommargin === "true" ? "none" : "70px",
		},
	})
);

export const StyledFooterTop = styled(CustomStackFullWidth)(({ theme }) => ({
	backgroundColor:
		getCurrentModuleType() === ModuleTypes?.FOOD
			? alpha(theme.palette.moduleTheme.food, 0.051)
			: alpha(theme.palette.primary.main, 0.051),
	width: "100%",
}));
