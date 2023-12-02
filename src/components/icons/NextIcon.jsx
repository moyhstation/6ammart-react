import { useTheme } from "@emotion/react";
import React from "react";

const NextIcon = () => {
	const theme = useTheme();
	const primary = theme.palette.primary.main;
	const secondary = theme.palette.secondary.main;
	return (
		<svg width={31} height={31} viewBox="0 0 31 31" fill="none">
			<circle
				cx="15.175"
				cy="15.5246"
				r="15.175"
				fill="url(#paint0_radial_3_2528)"
			/>
			<path
				d="M12.6711 7.93701L10.8881 9.72007L16.6799 15.5245L10.8881 21.3289L12.6711 23.112L20.2586 15.5245L12.6711 7.93701Z"
				fill="white"
			/>
			<defs>
				<radialGradient
					id="paint0_radial_3_2528"
					cx={0}
					cy={0}
					r={1}
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(15.175 15.5246) rotate(90) scale(15.175)"
				>
					<stop stopColor={primary} />
					<stop offset={1} stopColor={secondary} />
				</radialGradient>
			</defs>
		</svg>
	);
};

export default NextIcon;
