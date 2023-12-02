import CheckIcon from "@mui/icons-material/Check";
import { Stack, Typography } from "@mui/material";
import React from "react";
import {
	BodyWrapper,
	CardWrapper,
	ChatMessageWrapper,
	CustomAvatar,
	TimeWrapper,
} from "./Message.style";

// import { FormatedDateWithTime } from "../../utils/customFunctions";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import { Box } from "@mui/system";
import { FormatedDateWithTime } from "../../utils/CustomFunctions";
import CustomImageContainer from "../CustomImageContainer";

const ChatMessage = (props) => {
	const theme = useTheme();
	const {
		body,
		createdAt,
		messgageData,
		authorAvatar,
		conversationData,
		image,
		handleImageOnClick,
	} = props;
	const { configData } = useSelector((state) => state.configData);
	const language_direction = localStorage.getItem("direction");
	const receiverImageUrl = () => {
		if (conversationData?.conversation?.receiver_type === "vendor") {
			return configData?.base_urls?.restaurant_image_url;
		}
		if (conversationData?.conversation?.receiver_type === "delivery_man") {
			return configData?.base_urls?.delivery_man_image_url;
		} else configData?.base_urls?.business_logo_url;
	};
	const customerImageUrl = configData?.base_urls?.customer_image_url;
	const authorType = messgageData.sender_id; //sender
	let userType;
	let userImage;
	let senderImage;
	const chatImageUrl = configData?.base_urls?.chat_image_url;
	if (conversationData?.conversation?.sender_type === "customer") {
		userType = conversationData?.conversation.sender_id;
		userImage = conversationData?.conversation?.receiver?.image;
		senderImage = conversationData?.conversation?.sender?.image;
	} else {
		userType = conversationData?.conversation?.receiver?.id;
	}
	const nameHandler = () => {
		if (conversationData?.conversation?.sender_type === "customer") {
			if (authorType === userType) {
				return conversationData?.conversation?.sender?.f_name.concat(
					" ",
					conversationData?.conversation?.sender?.l_name
				);
			} else {
				if (conversationData?.conversation?.receiver?.f_name) {
					return conversationData?.conversation?.receiver?.f_name.concat(
						" ",
						conversationData?.conversation?.receiver?.l_name
					);
				} else {
					return configData?.business_name;
				}
			}
		} else {
			if (authorType === userType) {
				return (
					conversationData?.conversation?.receiver?.f_name.concat(
						" ",
						conversationData?.conversation?.receiver?.l_name
					) || " "
				);
			} else {
				return (
					conversationData?.conversation?.sender?.f_name.concat(
						" ",
						conversationData?.conversation?.sender?.l_name
					) || " "
				);
			}
		}
	};

	return (
		<ChatMessageWrapper
			authortype={authorType}
			usertype={userType}
			language_direction={language_direction}
		>
			{authorType !== userType && (
				<CustomAvatar
					src={`${
						authorType === userType
							? customerImageUrl
							: receiverImageUrl()
					}/${authorType === userType ? senderImage : userImage}`}
					authortype={authorType}
					usertype={userType}
				/>
			)}

			<BodyWrapper authortype={authorType} usertype={userType}>
				<Stack
					direction="row"
					spacing={3}
					justifyContent={
						authorType === userType ? "flex-end" : "flex-start"
					}

					// overflow-x="scroll"
				>
					{image?.map((item, index) => {
						return (
							<Box
								key={index}
								sx={{ cursor: "pointer" }}
								onClick={() =>
									handleImageOnClick(`${chatImageUrl}/${item}`)
								}
							>
								<CustomImageContainer
									src={`${chatImageUrl}/${item}`}
									width="100px"
									height="90px"
									objectFit="cover"
								/>
							</Box>
						);
					})}
				</Stack>
				{body && (
					<CardWrapper authortype={authorType} usertype={userType}>
						{/*<Stack mb={1}>*/}
						{/*  <Typography*/}
						{/*    pt="3px"*/}
						{/*    color={*/}
						{/*      authorType === userType*/}
						{/*        ? theme.palette.footer.appDownloadButtonBg*/}
						{/*        : theme.palette.neutral[100]*/}
						{/*    }*/}
						{/*    variant="subtitle2"*/}
						{/*    align={authorType === userType ? "right" : "left"}*/}

						{/*  >*/}
						{/*    {nameHandler()}*/}
						{/*  </Typography>*/}
						{/*</Stack>*/}
						<Typography
							fontSize={{ xs: "12px", md: "14px" }}
							color={
								authorType === userType
									? theme.palette.neutral[100]
									: theme.palette.text.primary
							}
							sx={{ wordBreak: "break-word"}}
							align={authorType === userType ? "right" : "left"}
						>
							{body ? body : ""}
						</Typography>
					</CardWrapper>
				)}

				<TimeWrapper authortype={authorType} usertype={userType}>
					{authorType === userType ? (
						<CheckIcon
							fontSize="14px"
							style={{
								color:
									messgageData.is_seen === 0
										? theme.palette.primary.main
										: theme.palette.neutral[1000],
							}}
						/>
					) : (
						""
					)}
					<Typography
						color="textSecondary"
						noWrap
						variant="caption"
						fontSize={{ xs: "10px", md: "12px" }}
					>
						{FormatedDateWithTime(createdAt)}
					</Typography>
				</TimeWrapper>
			</BodyWrapper>
		</ChatMessageWrapper>
	);
};

ChatMessage.propTypes = {};

export default ChatMessage;
