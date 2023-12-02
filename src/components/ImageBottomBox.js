import { Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { CustomStackFullWidth } from "../styled-components/CustomStyles.style";

const ImageBottomBox = (props) => {
	const { delivery_time, free_delivery } = props;
	return (
		<CustomStackFullWidth
			alignItems="flex-end"
			direction="row"
			justifyContent="center"
			spacing={1}
			padding="5px"
			sx={{
				height: "53px",
				position: "absolute",
				bottom: 0,
				color: "whiteContainer.main",
				background:
					"linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)",
			}}
		>
			<Typography
				textAlign="center"
				sx={{ fontSize: { xs: "10px", sm: "inherit" } }}
			>
				{delivery_time}
			</Typography>
			{free_delivery && (
				<>
					<Typography fontWeight="bold" paddingBottom="8px">
						.
					</Typography>
					<Typography
						textAlign="center"
						sx={{ fontSize: { xs: "10px", sm: "inherit" } }}
					>
						{t("Free Delivery")}
					</Typography>
				</>
			)}
		</CustomStackFullWidth>
	);
};

ImageBottomBox.propTypes = {};

export default ImageBottomBox;
