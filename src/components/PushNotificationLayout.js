import React, { useEffect, useState } from "react";
import "firebase/messaging";
import { fetchToken, onMessageListener } from "../firebase";
import { toast } from "react-hot-toast";
import {
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useStoreFcm } from "../api-manage/hooks/react-query/push-notifications/usePushNotification";
import CongratulationsIcon from "../assets/img/CongratulationsIcon";
import CloseIcon from "@mui/icons-material/Close";
import { t } from "i18next";

const CustomPaperRefer = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "17px 28px 22px 28px",
  borderRadius: "12px",
  gap: "18px",
  maxWidth: "375px",

  [theme.breakpoints.down("md")]: {
    width: "350px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "301px",
  },
}));

const PushNotificationLayout = ({
  children,
  refetch,
  pathName,
  refetchTrackOrder,
}) => {
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
  const CustomToast = ({ title, description, icon }) => (
    <CustomPaperRefer>
      {icon && icon}
      <Stack gap="7px">
        <Typography
          fontSize="14px"
          fontWeight={700}
          sx={{ color: "primary.main" }}
        >
          {t(title)}
        </Typography>
        <Typography fontSize="12px" sx={{ width: "100%", maxWidth: "283px" }}>
          {t(description)}
        </Typography>
      </Stack>
      <IconButton
        sx={{ position: "absolute", top: 10, right: 15 }}
        onClick={() => toast.dismiss()}
      >
        <CloseIcon sx={{ fontSize: "16px" }} />
      </IconButton>
    </CustomPaperRefer>
  );
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
      // router.push(`/order-history/${notification.order_id}`, undefined, {
      //   shallow: true,
      // });
      router.push(
        `/profile?orderId=${notification.order_id}&page=my-orders&from=checkout`,
        undefined,
        {
          shallow: true,
        }
      );
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
      } else if (notification.type === "referral_code") {
        toast.custom(
          <CustomToast
            title={notification?.title}
            description={notification?.body}
            icon={<CongratulationsIcon />}
          />,
          {
            position: "top-right",
            duration: 5000,
          }
        );
      } else {
        if (pathName === "profile") {
          refetchTrackOrder();
        }
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


// title="Someone just used  your code !"
//   description="Be prepare to receive when they complete there first purchase"
//   icon={<CongratulationsIcon />}
//   position="top-right"