import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import WalletIcon from "@mui/icons-material/Wallet";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
export const menuData = [
  {
    id: 1,
    name: "profile-settings",
    icon: <AccountCircleIcon />,
    path: "/profile",
  },
  {
    id: 2,
    name: "my-orders",
    icon: <ShoppingCartCheckoutIcon />,
    path: "/my-orders",
  },
  {
    id: 4,
    name: "wallet",
    icon: <WalletIcon />,
    path: "/wallet",
  },
  {
    id: 4,
    name: "coupons",
    icon: <ConfirmationNumberIcon />,
    path: "/coupons",
  },

  {
    id: 5,
    name: "loyalty-points",
    icon: <LoyaltyIcon />,
    path: "/loyalty-points",
  },
  {
    id: 6,
    name: "referral-code",
    icon: <SendToMobileIcon />,
    path: "/referral-code",
  },
  {
    id: 8,
    name: "inbox",
    icon: <SettingsIcon />,
    path: "/settings",
  },
  {
    id: 9,
    name: "settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
  {
    id:10,
    name:"track-order",
    icon:<LocalShippingOutlinedIcon />,
    path:"/track-order"
  }
];
