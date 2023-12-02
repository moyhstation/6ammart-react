import { useTheme } from "@emotion/react";
import { Paper, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { Stack, alpha } from "@mui/system";
import Router from "next/router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CustomImageContainer from "../CustomImageContainer";

const ProfileStatistics = ({ value, title, image, pathname, isLoading }) => {
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
	const { configData } = useSelector((state) => state.configData);
	const { t } = useTranslation();
    const handleRoute = (value) => {
        if (title === "Days Since Joining") {
        }
		 else {
            Router.push(
                {
                    pathname: "/profile",
                    query: { page: value },
                },
                undefined,
                { shallow: true }
            );
        }
    };
	return (
		<Paper
			sx={{
				minWidth: "100px",
				width: "100%",
				height: "100%",
				padding: "1rem",
				borderRadius: "5px",
				border: "1px solid",
				borderColor: (theme) => theme.palette.neutral[300],
                cursor: title !== "Days Since Joining" && "pointer",
				transition: "all ease 0.3s",
				"&:hover": {
					boxShadow: "0px 10px 20px rgba(88, 110, 125, 0.1)",
					borderColor: alpha(theme.palette.primary.main, 0.4),
				},
			}}
			elevation={6}
			onClick={() => handleRoute(pathname)}
		>
			<Stack justifyContent="center" alignItems="center" spacing={1.3}>
				<Stack
					backgroundColor={theme.palette.primary.semiLight}
					padding="4px"
					borderRadius="50%"
				>
					<CustomImageContainer
						src={
							title === "Days Since Joining"
								? `${configData?.base_urls?.customer_image_url}/${image}`
								: image
						}
						width="20px"
						height="20px"
						alt="join"
					/>
				</Stack>
				<Stack
					flexGrow="wrap"
					width="100%"
					justifyContent="center"
					alignItems="center"
				>
					<Typography fontWeight="600" color={theme.palette.primary.main}>
						{!isLoading ? (
							value
						) : (
							<Skeleton variant="text" width="70px" height="30px" />
						)}
					</Typography>
					<Typography
						sx={{ fontSize: "12px", textTransform: "capitalize" }}
					>
						{t(title)}
					</Typography>
				</Stack>
			</Stack>
		</Paper>
	);
};
export default ProfileStatistics;
