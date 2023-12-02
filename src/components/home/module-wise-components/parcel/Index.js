import { Grid } from "@mui/material";
import React from "react";
import ParcelOnTime from "../../../parcel/ParcelOnTime"
import ParcelFeatures from "../../../parcel/ParcelFeatures"
import ParcelVideo from "../../../parcel/ParcelVideo"
import CustomContainer from "../../../container";
import ParcelCategory from "../../../parcel/parcel-category/ParcelCategory";

const Parcel = ({ configData }) => {
	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<CustomContainer>
					<ParcelCategory />
				</CustomContainer>
				<ParcelOnTime />
				<CustomContainer>
					<ParcelFeatures />
					<ParcelVideo />
				</CustomContainer>
			</Grid>
		</Grid>
	);
};

export default Parcel;
