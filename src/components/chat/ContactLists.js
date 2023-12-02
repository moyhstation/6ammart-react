import { Box, List, Stack } from "@mui/material";
import React from "react";
import SimpleBar from "simplebar-react";
import {
	CustomListItem,
	CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import InfoCard from "./InfoCard";
// import { CustomTypography } from "../custom-tables/Tables.style";
import Skeleton from "@mui/material/Skeleton";
import { t } from "i18next";
import "simplebar-react/dist/simplebar.min.css";

import { useSelector } from "react-redux";
import { CustomTypography } from "../landing-page/hero-section/HeroSection.style";

const ContactLists = ({
	channelList,
	handleChannelOnClick,
	channelLoading,
	selectedId,
	activeTab,
}) => {
	const { configData } = useSelector((state) => state.configData);

	if (channelLoading) {
		return (
			<>
				{[...Array(1, 2, 3, 4)].map((index) => {
					return (
						<Box padding=".5rem" key={index}>
							<Stack direction="row" spacing={1}>
								<Skeleton
									animation="wave"
									variant="circular"
									width={60}
									height={50}
								/>
								<Stack direction="column" width="100%">
									<Skeleton animation="wave" height={15} width="20%" />
									<Skeleton animation="wave" height={15} width="40%" />
								</Stack>
							</Stack>
						</Box>
					);
				})}
			</>
		);
	}
	const handleInfoCard = (item) => {
		if (item.sender_type === "customer") {
			return (
				<InfoCard
					name={item.receiver_type.replaceAll("_", " ")}
					messageTime={item.created_at}
					last_message={item?.last_message}
					receiver={
						item.receiver
							? item.receiver.f_name
							: configData?.business_name
					}
					unRead={item.unread_message_count}
					userList={item}
					selectedId={selectedId}
					currentId={item.id}
				/>
			);
		} else {
			return (
				<InfoCard
					name={item.sender_type.replaceAll("_", " ")}
					messageTime={item.created_at}
					last_message={item?.last_message}
					receiver={
						item?.sender?.f_name.concat(" ", item?.sender?.l_name) || " "
					}
					unRead={item.unread_message_count}
					userList={item}
					selectedId={selectedId}
					currentId={item.id}
				/>
			);
		}
	};

	return (
		<CustomStackFullWidth>
			{channelList?.length > 0 && (
				<SimpleBar style={{ maxHeight: "60vh" }}>
					<List disablePadding>
						{channelList?.map(
							(item, index) =>
								item?.receiver_type == activeTab && (
									<CustomListItem
										key={index}
										disableGutters
										disablePadding
										cursor="true"
										onClick={() => handleChannelOnClick(item)}
									>
										{handleInfoCard(item)}
									</CustomListItem>
								)
						)}
					</List>
				</SimpleBar>
			)}
			{channelList.length === 0 && (
				<Stack width="100%" justifyContent="center" alignItems="center">
					<CustomTypography>{t("You have no channels.")}</CustomTypography>
				</Stack>
			)}
		</CustomStackFullWidth>
	);
};

export default ContactLists;
