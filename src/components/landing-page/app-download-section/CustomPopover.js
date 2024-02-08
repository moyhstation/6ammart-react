import { ClickAwayListener, Paper, Popper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import CustomDivider from "../../CustomDivider";
import CustomImageContainer from "../../CustomImageContainer";
import appleLogo from "./assets/apple-logo 1.svg";
import playstore from "./assets/playstore 1.png";
import AppleLogo from "./assets/AppleLogo";
import PlayStoreIcon from "./assets/PlayStoreIcon";

const ItemWrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	padding: "12px",
	position: "relative",
	gap: "10px",
	cursor: "pointer",
}));

const Item = ({ image, title, link, t }) => {
	const [hover, setHover] = useState(false);
	const router = useRouter();
	const handleClick = () => {
		if (link) {
			router.push(link);
		} else {
			toast.error(t("No Redirect Url found"));
		}
	};
	return (
		<ItemWrapper
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={handleClick}
		>
			{/* <CustomImageContainer
				src={image.src}
				alt="facebook"
				height="25px"
				width="25px"
				objectFit="cover"
			/> */}
			{image}
			<Typography color={hover ? "primary" : "text.secondary"}>
				{title}
			</Typography>
		</ItemWrapper>
	);
};
const CustomPopover = (props) => {
	const { width,openPopover, handleClose,anchorEl, t, urls } = props;
	return (
		<ClickAwayListener onClickAway={handleClose}>
			<Popper
				open={openPopover}
				anchorEl={anchorEl}
				placement="bottom"
				onClose={handleClose}
				disablePortal={false}
				modifiers={{
					flip: {
						enabled: false,
					},
					preventOverflow: {
						enabled: true,
						boundariesElement: "scrollParent",
					},
				}}
			>
				<Paper sx={{ marginTop: "6px", width: width }}>
					{urls?.playStoreStatus === "1" && (
						<Item
							image={<PlayStoreIcon />}
							title={t("Google Play")}
							link={urls?.playStoreUrl}
							t={t}
						/>
					)}
					{urls?.playStoreStatus === "1" &&
					urls?.appStoreStatus === "1" ? (
						<CustomDivider />
					) : null}
					{urls?.appStoreStatus === "1" && (
						<Item
							image={<AppleLogo />}
							title={t("App Store")}
							link={urls?.appStoreUrl}
							t={t}
						/>
					)}
				</Paper>
			</Popper>
		</ClickAwayListener>
	);
};

CustomPopover.propTypes = {};

export default CustomPopover;
