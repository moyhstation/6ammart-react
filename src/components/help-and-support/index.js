import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CustomImageContainer from "../CustomImageContainer";
import {
	HelpGrid,
	HelpImgBox,
	HelpTypographyBox,
	VisitBox,
} from "./Help.style";
import img from "./assets/image 43.png";
import img3 from "./assets/image 45.png";
import img2 from "./assets/image 46.png";
import img1 from "./assets/image 47.png";
import SupportImgSvg from "./assets/SupportImgSvg";
import Link from "next/link";
import MapComponent from "../Map/location-view/MapComponent";
import CustomModal from "../modal";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import LocationViewOnMap from "../Map/location-view/LocationViewOnMap";

const HelpAndSupport = (props) => {
	const { configData, t } = props;
	const [open, setOpen] = useState(false)
	const handleOpenCloseMap = () => {
		setOpen(!open)
	}
	return (
		<Box>
			<Grid container>
				<Grid item md={12} xs={12}>
					<SupportImgSvg />
				</Grid>
				<Grid item md={12} xs={12} sx={{ marginY: "1rem" }}>
					<HelpTypographyBox>
						<Typography sx={{ fontSize: { xs: "24px", sm: "28px", md: "32px" }, fontWeight: "600" }}>
							{t("Need Any help?")}
						</Typography>
						<Typography
							sx={{
								color: (theme) => theme.palette.customColor.textGray,
							}}
						>
							{t(
								"Communicate with our support team to get proper guidance to your quaternaries."
							)}
						</Typography>
					</HelpTypographyBox>
				</Grid>
			</Grid>

			<HelpGrid container spacing={2}>
				<Grid item md={4} xs={12}>
					<Box sx={{ cursor: "pointer" }} onClick={handleOpenCloseMap} >
						<VisitBox>
							<HelpImgBox>
								<img src={img1.src} alt={t("help")} />
							</HelpImgBox>
							<Box sx={{ textAlign: "center" }}>
								<Typography sx={{ fontSize: { xs: "18px", sm: "22px", md: "24px" }, fontWeight: "700" }}>
									{t("VISIT US")}
								</Typography>
								<Typography>{configData?.address}</Typography>
							</Box>
						</VisitBox>
					</Box>
				</Grid>
				<Grid item md={4} xs={12}>
					<Link href={`mailto:${configData?.email}`}>
						<VisitBox>
							<HelpImgBox>
								<img src={img2.src} alt={t("help")} />
							</HelpImgBox>
							<Box sx={{ textAlign: "center" }}>
								<Typography sx={{ fontSize: { xs: "18px", sm: "22px", md: "24px" }, fontWeight: "700" }}>
									{t("EMAIL US")}
								</Typography>
								<Typography>{configData?.email}</Typography>
							</Box>
						</VisitBox>
					</Link>
				</Grid>
				<Grid item md={4} xs={12}>
					<Link href={`tel:${configData?.phone}`}>
						<VisitBox>
							<HelpImgBox>
								<img src={img3.src} alt={t("help")} />
							</HelpImgBox>
							<Box sx={{ textAlign: "center" }}>
								<Typography sx={{ fontSize: { xs: "18px", sm: "22px", md: "24px" }, fontWeight: "700" }}>
									{t("CALL US")}
								</Typography>
								<Typography>{configData?.phone}</Typography>
							</Box>
						</VisitBox>
					</Link>
				</Grid>
			</HelpGrid>
			{open &&
				<LocationViewOnMap
					open={open}
					handleClose={handleOpenCloseMap}
					latitude={configData?.default_location?.lat}
					longitude={configData?.default_location?.lng}
					address={configData?.address}
				/>
			}
		</Box>
	);
};

export default HelpAndSupport;
