import { Skeleton, Stack, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import ChatContactSearch from "./ChatContactSearch";
import ChatUserTab from "./ChatUserTab";
import ChatWithAdmin from "./ChatWithAdmin";
import ContactLists from "./ContactLists";

const ChatContent = ({
	isFetched,
	handleToggleSidebar,
	selectedId,
	handleReset,
	searchSubmitHandler,
	channelLoading,
	isLoading,
	channelList,
	handleChannelOnClick,
	searchValue,
	setSearchValue,
	handleSearch,
	userType,
	setUserType,
	setChannelId,
	setIsSidebarOpen,
}) => {
	const isAdmin =
		channelList &&
		channelList?.find((item) => item.receiver_type === "admin");
	const handleChatWithAdmin = () => {
		if (isFetched) {
			if (channelList.length === 0 || !isAdmin) {
				return (
					<ChatWithAdmin handleChannelOnClick={handleChannelOnClick} />
				);
			}
		} else {
			return <Skeleton variant="rectangle" width="100%" height="50px" />;
		}
	};

	return (
		<Stack
			spacing={2}
			padding={{ xs: ".5rem", md: "1rem" }}
			marginTop={{ xs: "-10px", md: "0px" }}
		>
			<Typography
				sx={{
					paddingInline: { xs: ".5rem", md: "1rem" },
					paddingBlockStart: ".5rem",
				}}
				fontSize="18px"
				fontWeight="700"
			>
				{t("Messages")}
			</Typography>

			<ChatContactSearch
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				handleSearch={handleSearch}
				isLoading={isLoading}
				handleReset={handleReset}
				searchSubmitHandler={searchSubmitHandler}
			/>
			<ChatUserTab
				setUserType={setUserType}
				userType={userType}
				setChannelId={setChannelId}
				handleReset={handleReset}
			/>
			{ userType==="admin"&&handleChatWithAdmin()}
			<ContactLists
				channelList={channelList}
				handleChannelOnClick={handleChannelOnClick}
				channelLoading={channelLoading}
				selectedId={selectedId}
				setIsSidebarOpen={setIsSidebarOpen}
				activeTab={userType}
			/>
		</Stack>
	);
};
export default ChatContent;
