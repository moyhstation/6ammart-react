import React, { useEffect, useRef, useState } from "react";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import ChatSideBar from "./ChatSideBar";
import ChatView from "./ChatView";
import { Stack } from "@mui/material";
import EmptyView from "./EmptyView";

import useMediaQuery from "@mui/material/useMediaQuery";
// import { useGetConversation } from "../../hooks/react-query/config/chat/useGetConversation";
//import { useStoreMessage } from "../../hooks/react-query/config/chat/useStoreMessage";

import { useRouter } from "next/router";
//import { useSearchList } from "../../hooks/react-query/config/chat/useSearch";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import ConversationInfoTop from "./ConversationInfoTop";
//import Loading from "../custom-loading/Loading";
import LoadingBox from "./LoadingBox";
//import PushNotificationLayout from "../PushNotificationLayout";
import { toast } from "react-hot-toast";
import { useGetChannelList } from "../../api-manage/hooks/react-query/chat/useGetChannelLists";
import { onErrorResponse } from "../../api-manage/api-error-response/ErrorResponses";
import { useGetConversation } from "../../api-manage/hooks/react-query/chat/useGetConversation";
import { useStoreMessage } from "../../api-manage/hooks/react-query/chat/useStoreMessage";
import { useSearchList } from "../../api-manage/hooks/react-query/chat/useSearch";
import PushNotificationLayout from "../PushNotificationLayout";

const Chatting = ({ configData }) => {
  const theme = useTheme();
  const [page_limit, setPageLimit] = useState(10);
  const [offset, setOffset] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [channelId, setChannelId] = useState(null);
  const [channelList, setChannelList] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [apiFor, setApiFor] = useState("conversation_id");
  const [receiverType, setReceiverType] = useState();
  const [receiverName, setReceiverName] = useState();
  const [receiverId, setReceiverId] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [receiver, setReceiver] = useState();
  const [receiverImage, setReceiverImage] = useState();
  const [userType, setUserType] = useState("");
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const router = useRouter();
  const {
    id,
    type,
    routeName,
    conversationId,
    chatFrom,
    deliveryman_name,
    deliveryManData_image,
  } = router.query;
  const [deliveryInfo, setDeliveryInfo] = useState({});
  //const { configData } = useSelector((state) => state.configDataSettings);
  const [scrollBottom, setScrollBottom] = useState(true);

  useEffect(() => {
    setDeliveryInfo({
      name: deliveryman_name,
      image: deliveryManData_image,
    });
  }, [deliveryman_name]);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };
  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };
  const handleChatListOnSuccess = (res) => {
    setChannelList(res.conversations);
  };
  const {
    refetch: refetchChannelList,
    isFetched,
    isLoading: channelLoading,
  } = useGetChannelList(handleChatListOnSuccess);

  const handleConFetchOnSuccess = (res) => {
    setConversationData(res.pages[0]);
  };
  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching: conversationDataRefetching,
    hasPreviousPage,
  } = useGetConversation({ channelId, apiFor, page_limit, offset });

  // from notification

  useEffect(() => {
    if (type) {
      setReceiverType(type);
    }
    if (conversationId) {
      setChannelId(conversationId);
      setScrollBottom(true);
      const tempReceiver =
        channelList.length !== 0 &&
        channelList.filter((item) => item.id == conversationId);
      setReceiver(tempReceiver[0]);
    }
    if (type === "admin") {
      setReceiverId(conversationId);
    } else {
      setReceiverId(null);
    }
  }, [conversationId, channelList, type]);

  //from pages
  useEffect(() => {
    if (id && routeName && type) {
      const tempReceiver =
        channelList.length !== 0 &&
        channelList.filter((item) => {
          if (type === "vendor") {
            return item?.receiver?.vendor_id == id;
          } else if (type === "delivery_man") {
            return item?.sender?.deliveryman_id == id;
          }
        });

      setReceiver(tempReceiver[0]);
      setReceiverImage(tempReceiver[0]?.receiver?.image);
      setChannelId(id);
      setReceiverId(id);
      setReceiverType(type);
      setApiFor(routeName);
      setIsSidebarOpen(false);
      setUserType(type);
    }
  }, [id, type, routeName, chatFrom, channelList]);

  useEffect(() => {
    if (channelId) {
      refetch();
    }
  }, [channelId]);

  useEffect(() => {
    setMessagesData([data]);
  }, [data]);
  const handleChannelOnClick = async (value) => {
    setReceiverId(null);
    await refetchChannelList();
    if (value.receiver_type === "admin") {
      setApiFor("admin_id");
      setChannelId("admin");
      setScrollBottom(true);
      setReceiverType(value.receiver_type);
      // setReceiverName(configData.business_name);
      setReceiverImage(value?.receiver?.image);
      setReceiver(value);
      setIsSidebarOpen(false);
    } else {
      setApiFor("conversation_id");
      setChannelId(value.id);
      setScrollBottom(true);
      setReceiverType(value.receiver_type);
      setReceiverName(value.receiver.f_name);
      setReceiverImage(value?.receiver?.image);
      setReceiver(value);
      setIsSidebarOpen(false);
    }
    setDeliveryInfo(null);
    mdDown && setIsSidebarOpen(false);
  };

  useEffect(() => {
    refetchChannelList().then();
  }, []);

  const { mutate: storeMessageByMutate, isLoading: isLoadingMessageSend } =
    useStoreMessage();
  const handleChatMessageSend = (values) => {
    let newValues = {
      receiver_type: receiverType,
      id: channelId,
      receiverId,
      ...values,
    };
    const handleSuccess = async (res) => {
      await refetch();
      await refetchChannelList();
    };

    storeMessageByMutate(newValues, {
      onSuccess: handleSuccess,
      onError: onErrorResponse,
    });
  };
  const handleSearchFetchOnSuccess = (res) => {
    if (res) {
      setChannelList(res.conversations);
    }
  };
  const {
    isLoading,
    isRefetching: isRefetchingForSearch,
    refetch: searchRefetch,
  } = useSearchList(searchValue, handleSearchFetchOnSuccess);
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (searchValue) {
      try {
        searchRefetch().then();
      } catch (err) {}
    }
  };

  const handleSearch = (values) => {
    setSearchValue(values);
  };
  const handleReset = () => {
    setSearchValue("");
    refetchChannelList().then();
  };
  const handleScroll = (e) => {
    if (e.currentTarget.scrollTop === 0) {
      if (hasNextPage) {
        fetchNextPage().then();
        e.currentTarget.scrollTop = 300;
        setScrollBottom(false);
      }
    }
  };

  const ChatImageUrl = () => {
    if (receiver?.receiver_type === "vendor") {
      return configData?.base_urls?.store_image_url;
    }
    if (receiver?.receiver_type === "delivery_man") {
      return configData?.base_urls?.delivery_man_image_url;
    } else configData?.base_urls?.business_logo_url;
  };
  const userImage = deliveryInfo?.image ? deliveryInfo?.image : receiverImage;

  return (
    <PushNotificationLayout refetch={refetch} pathName="chat">
      <CustomBoxFullWidth mt={{ xs: "1rem", md: "2rem" }}>
        <CustomStackFullWidth spacing={1} direction="row">
          {mdDown ? (
            <>
              {isSidebarOpen && (
                <Stack width="100%">
                  <ChatSideBar
                    onClose={handleCloseSidebar}
                    handleToggleSidebar={handleToggleSidebar}
                    open={isSidebarOpen}
                    handleChannelOnClick={handleChannelOnClick}
                    isFetched={isFetched}
                    channelList={channelList}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleSearch={handleSearch}
                    // isLoading={isLoading}
                    handleReset={handleReset}
                    searchSubmitHandler={searchSubmitHandler}
                    channelLoading={channelLoading}
                    selectedId={receiver?.id}
                    chatFrom={chatFrom}
                    setIsSidebarOpen={setIsSidebarOpen}
                    userType={userType}
                    setUserType={setUserType}
                    setChannelId={setChannelId}
                  />
                </Stack>
              )}
            </>
          ) : (
            <ChatSideBar
              onClose={handleCloseSidebar}
              handleToggleSidebar={handleToggleSidebar}
              open={isSidebarOpen}
              handleChannelOnClick={handleChannelOnClick}
              isFetched={isFetched}
              channelList={channelList}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              handleSearch={handleSearch}
              // isLoading={isLoading}
              handleReset={handleReset}
              searchSubmitHandler={searchSubmitHandler}
              channelLoading={channelLoading}
              selectedId={receiver?.id}
              chatFrom={chatFrom}
              setIsSidebarOpen={setIsSidebarOpen}
              userType={userType}
              setUserType={setUserType}
              setChannelId={setChannelId}
            />
          )}

          <Stack width={mdDown ? (isSidebarOpen ? "" : "100%") : "100%"}>
            {!isSidebarOpen && (
              <ConversationInfoTop
                receiver={receiver}
                mdUp={mdUp}
                handleToggleSidebar={handleToggleSidebar}
                ChatImageUrl={ChatImageUrl}
                userImage={userImage}
                theme={theme}
                deliveryman_name={deliveryInfo?.name}
                deliveryManImage={deliveryInfo?.image}
                deliveryUrl={configData?.base_urls?.delivery_man_image_url}
              />
            )}

            {channelId &&
              messagesData.length > 0 &&
              !isFetchingNextPage &&
              !isSidebarOpen && (
                <ChatView
                  conversationData={messagesData?.[0]?.pages}
                  handleChatMessageSend={handleChatMessageSend}
                  channelList={channelList}
                  handleScroll={handleScroll}
                  scrollBottom={scrollBottom}
                />
              )}
            {isFetchingNextPage && <LoadingBox />}

            {!channelId && !mdDown && <EmptyView />}
          </Stack>
        </CustomStackFullWidth>
      </CustomBoxFullWidth>
    </PushNotificationLayout>
  );
};
export default Chatting;
