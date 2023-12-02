import React from "react";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChatSidebarDesktop, ChatSidebarMobile } from "./Chat.style";
import ChatContent from "./ChatContent";
import { CustomPaperBigCard } from "../../styled-components/CustomStyles.style";

const ChatSideBar = ({
  chatFrom,
  open,
  isLoading,
  selectedId,
  handleReset,
  handleToggleSidebar,
  channelLoading,
  isFetched,
  channelList,
  handleChannelOnClick,
  searchSubmitHandler,
  setSearchValue,
  searchValue,
  handleSearch,
  userType,
  setUserType,
  setChannelId,
  setIsSidebarOpen,
}) => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  if (mdUp) {
    return (
      <ChatSidebarDesktop
        variant="persistent"
        anchor="left"
        open={Boolean("true")}
      >
        <ChatContent
          setIsSidebarOpen={setIsSidebarOpen}
          isFetched={isFetched}
          handleToggleSidebar={handleToggleSidebar}
          channelList={channelList}
          handleChannelOnClick={handleChannelOnClick}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          handleSearch={handleSearch}
          isLoading={isLoading}
          handleReset={handleReset}
          searchSubmitHandler={searchSubmitHandler}
          channelLoading={channelLoading}
          selectedId={selectedId}
          userType={userType}
          setUserType={setUserType}
          setChannelId={setChannelId}
        />
      </ChatSidebarDesktop>
    );
  }
  return (
    <>
      {open && (
        <CustomPaperBigCard padding="14px" sx={{ minHeight: "70vh" }}>
          {" "}
          <ChatContent
            setIsSidebarOpen={setIsSidebarOpen}
            isFetched={isFetched}
            handleToggleSidebar={handleToggleSidebar}
            channelList={channelList}
            handleChannelOnClick={handleChannelOnClick}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            handleSearch={handleSearch}
            isLoading={isLoading}
            handleReset={handleReset}
            searchSubmitHandler={searchSubmitHandler}
            channelLoading={channelLoading}
            selectedId={selectedId}
            userType={userType}
            setUserType={setUserType}
            setChannelId={setChannelId}
          />
        </CustomPaperBigCard>
      )}
    </>
  );
};
export default ChatSideBar;
