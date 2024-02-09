import { Stack, Typography } from "@mui/material";
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
  configData,
  setResetState,
}) => {
  const isAdmin =
    channelList && channelList?.find((item) => item.receiver_type === "admin");
  const handleChatWithAdmin = () => {
    if (channelList.length === 0 || !isAdmin) {
      return (
        <ChatWithAdmin
          configData={configData}
          handleChannelOnClick={handleChannelOnClick}
        />
      );
    } else {
      return (
        <ContactLists
          channelList={channelList}
          handleChannelOnClick={handleChannelOnClick}
          channelLoading={channelLoading}
          selectedId={selectedId}
          setIsSidebarOpen={setIsSidebarOpen}
          activeTab="admin"
          setResetState={setResetState}
        />
      );
    }
  };
  return (
    <Stack
      spacing={2}
      padding={{ xs: ".5rem", md: "1rem 1rem 1rem 2rem" }}
      marginTop={{ xs: "-10px", md: "0px" }}
    >
      <Typography
        sx={{
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
      {handleChatWithAdmin()}
      <ChatUserTab
        setUserType={setUserType}
        userType={userType}
        setChannelId={setChannelId}
        handleReset={handleReset}
        setResetState={setResetState}
      />

      <ContactLists
        channelList={channelList}
        handleChannelOnClick={handleChannelOnClick}
        channelLoading={channelLoading}
        selectedId={selectedId}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={userType}
        setResetState={setResetState}
      />
    </Stack>
  );
};
export default ChatContent;
