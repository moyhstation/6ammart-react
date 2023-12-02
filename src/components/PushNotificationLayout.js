import React, { useEffect, useState } from "react";
import "firebase/messaging";
import { fetchToken, onMessageListener } from "../firebase";
import { toast } from "react-hot-toast";
import { Stack, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useStoreFcm } from "../api-manage/hooks/react-query/push-notifications/usePushNotification";

const PushNotificationLayout = ({ children, refetch, pathName }) => {
  const theme = useTheme();
  const router = useRouter();
  const [notification, setNotification] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isTokenFound, setTokenFound] = useState(false);
  const [fcmToken, setFcmToken] = useState("");
  const darkToast = () =>
    toast("You have a new message", {
      icon: "",
      style: {
        borderRadius: "12px",
        background: theme.palette.primary.main,
        color: theme.palette.neutral[1000],
        height: "60px",
      },
      position: "top-center",
    });
  useEffect(() => {
    handleFetchToken();
  }, []);

  const handleFetchToken = async () => {
    await fetchToken(setTokenFound, setFcmToken);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setUserToken(localStorage.getItem("token"));
      //userToken = window.localStorage.getItem('token')
    }
  }, [userToken]);

  //const userToken=localStorage.getItem("token")
  const { mutate } = useStoreFcm();

  useEffect(() => {
    if (userToken) {
      mutate(fcmToken);
    }
  }, [fcmToken]);

  const clickHandler = () => {
    if (notification.type === "message") {
      router.push(
        {
          pathname: "/chatting",
          query: {
            conversationId: notification?.conversation_id,
            type: notification.sender_type,
            chatFrom: "true",
          },
        },
        undefined,
        { shallow: true }
      );
    }
    if (notification.type === "order_status") {
      router.push(`/order-history/${notification.order_id}`, undefined, {
        shallow: true,
      });
    }
  };

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        setNotification(payload.data);
        // toast.success(payload.data.title)
      })
      .catch((err) => toast(err));
    if (notification) {
      if (pathName === "chat" && notification.type === "message") {
        refetch();
      } else if (notification.type === "message") {
        darkToast();
      } else {
        toast(
          <>
            <Stack
              sx={{ cursor: "pointer" }}
              onClick={clickHandler}
              color={theme.palette.primary.main}
              width="300px"
            >
              <Typography>{notification.title}</Typography>
              <Typography>{notification.body}</Typography>
            </Stack>
          </>
        );
      }
    }
  }, [notification]);

  return <>{children}</>;
};

export default PushNotificationLayout;
