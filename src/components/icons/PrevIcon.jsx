import { useTheme } from "@emotion/react";
import React from "react";

const PrevIcon = () => {
	const theme = useTheme();
	const primary = theme.palette.primary.main;
	const secondary = theme.palette.secondary.main;
	return (
		<svg width={31} height={31} viewBox="0 0 31 31" fill="none">
			<circle
				r="15.175"
				transform="matrix(-1 0 0 1 15.8248 15.5246)"
				fill="url(#paint0_radial_3_2525)"
			/>
			<path
				d="M18.3286 7.93701L20.1117 9.72007L14.3199 15.5245L20.1117 21.3289L18.3286 23.112L10.7411 15.5245L18.3286 7.93701Z"
				fill="white"
			/>
			<defs>
				<radialGradient
					id="paint0_radial_3_2525"
					cx={0}
					cy={0}
					r={1}
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(15.175 15.175) rotate(90) scale(15.175)"
				>
					<stop stopColor={primary} />
					<stop offset={1} stopColor={secondary} />
				</radialGradient>
			</defs>
		</svg>
	);
};

export default PrevIcon;
