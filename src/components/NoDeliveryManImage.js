/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import img from "../assets/img/no-deliveryman-assigned.svg";
const NoDeliveryManImage = () => {
	return (
		<>
			<Image src={img.src} width={190} height={190} alt="" />
		</>
	);
};

export default NoDeliveryManImage;
