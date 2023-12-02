import { styled } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Slider from "react-slick";
import { SliderCustom } from "../../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../../CustomImageContainer";
import { settings } from "./sliderSettings";

const ImageWrapper = styled(Box)(({ theme }) => ({
	height: "160px",
	"&:hover img": {
		transform: "scale(1.1)rotate(4deg)",
	},
}));
const Pharmacy = (props) => {
	const { runningCampaigns, handleClick, configData, isFetching } = props;
	return (
		<SliderCustom>
			<Slider {...settings}>
				{runningCampaigns?.length > 0 &&
					runningCampaigns?.map((item, index) => {
						return (
							<ImageWrapper
								key={index}
								sx={{ cursor: "pointer" }}
								onClick={() => handleClick(item)}
							>
								<CustomImageContainer
									src={`${configData?.base_urls?.campaign_image_url}/${item?.image}`}
									alt={item?.title}
									height="100%"
									width="100%"
									objectfit="cover"
									borderRadius="8px"
								/>
							</ImageWrapper>
						);
					})}
			</Slider>
		</SliderCustom>
	);
};

Pharmacy.propTypes = {};

export default Pharmacy;
