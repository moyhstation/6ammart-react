import { styled } from "@mui/material/styles";
import {
  alpha,
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack } from "@mui/system";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export const DeliveryTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.neutral[500],
  fontSize: "16px",
  fontWeight: "700",
  paddingBottom: "20px",
}));
export const DeliveryCaption = styled(Typography)(({ theme, parcel }) => ({
  textAlign: parcel === "true" ? "center" : "left",
  fontSize: "16px",
  fontWeight: "700",
  // color: '#414141',
  color: `${theme.palette.mode === "dark" ? "#fff" : "#414141"}`,
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
  },
}));

export const PrefarableCaption = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "700",
  color: `${theme.palette.mode === "dark" ? "#fff" : "#414141"}`,
  paddingTop: "30px",
  paddingBottom: "20px",

  [theme.breakpoints.up("xs")]: {
    textAlign: "center",
  },
  [theme.breakpoints.up("md")]: {
    textAlign: "inherit",
  },
}));

export const SaveAddressBox = styled(Box)(() => ({
  padding: "1rem",
  textAlign: "center",
}));

export const AddNewButton = styled(Button)(() => ({
  color: "#EF7822",
  fontSize: "14px",
  fontWeight: "700",
  background: "rgba(239, 120, 34, 0.1)",
  borderRadious: "5px",
}));
export const DeliveryDetailsGrid = styled(Grid)(() => ({
  // background: '#FFFFFF',
  boxShadow: " 0px 0px 10px rgba(0, 0, 0, 0.05)",
  borderRadius: "5px 5px 0px 0px",
  padding: "25px",
}));
export const CheckoutBox = styled(Card)(() => ({
  padding: "30px",
  // paddingBottom: '180px',
}));
export const StyledPaper = styled(Paper)(() => ({
  padding: "30px",
}));

export const OrderSummaryGrid = styled(Grid)(() => ({
  padding: "10px",
}));
export const PreferableTimeInput = styled(Autocomplete)(({ theme }) => ({
  // border: '1px solid rgba(251, 222, 201)',
  borderRadius: "10px",
  "&.MuiAutocomplete-option": {
    backgroundColor: theme.palette.primary.main,
    height: "100%",
  },
  ".MuiAutocomplete-paper": {
    zIndex: 99999,
    height: "100%",
  },
}));
export const CouponGrid = styled(Grid)(() => ({
  // background: '#FFFFFF',
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
  borderRadius: "5px 5px 0px 0px",
  padding: "25px",
  alignItems: "center",
  marginTop: "20px",
}));
export const CouponTitle = styled(Typography)(({ theme, textAlign }) => ({
  color: theme.palette.neutral[1000],
  fontWeight: "700",
  fontSize: "16px",
  textAlign: textAlign ? textAlign : "center",
  [theme.breakpoints.up("xs")]: {
    textAlign: textAlign ? textAlign : "center",
  },
  [theme.breakpoints.up("md")]: {
    textAlign: textAlign ? textAlign : "center",
  },
}));

export const CouponButton = styled(LoadingButton)(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "5px",
}));
export const InputField = styled(Paper)(() => ({
  border: "1px solid rgba(251, 222, 201)",
}));
export const PaymentOptionGrid = styled(Grid)(({ theme }) => ({
  // background: '#FFFFFF',
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
  borderRadius: "5px 5px 0px 0px",
  padding: "25px",
  margin: "20px 0",
  color: `${theme.palette.mode === "dark" ? "#fff" : "#000"}`,
  [theme.breakpoints.up("xs")]: {
    textAlign: "center",
  },
  [theme.breakpoints.up("md")]: {
    textAlign: "inherit",
  },
}));
export const PymentTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "16px",
  fontWeight: "700",
  color: `${theme.palette.mode === "dark" ? "#fff" : "#414141"}`,
  paddingBottom: "16px",
}));
export const ButtonGrid = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));
export const PaymentButton = styled(Button)(({ selected, theme }) => ({
  background: selected ? "rgba(45, 200, 88, 0.1)" : "",
  height: "60px",
  borderRadius: "10px",
  gap: "5px",
  color: `${theme.palette.mode === "dark" ? "#fff" : "#000"}`,
}));
// export const DigitalButton = styled(Button)(() => ({
//     background: 'rgba(45, 200, 88, 0.1)',
//     width: '185px',
//     height: '60px',
//     borderRadius: '10px',
//     gap: '5px',
//     color: 'black',
// }))
// export const WalletButton = styled(Button)(() => ({
//     width: '185px',
//     height: '60px',
//     borderRadius: '10px',
//     gap: '5px',
//     color: 'black',
// }))
export const ConditionTypography = styled(Typography)(() => ({
  color: "#9B9B9B",
  textAlign: "center",
  fontSize: "16px",
  paddingTop: "15px",
  paddingBottom: "20px",
}));
export const StepperCustomBorder = styled(Stack)(
  ({ theme, background, padding, border, boxshadow }) => ({
    borderRadius: "50%",
    padding: padding,
    border: border ? border : `2px solid ${theme.palette.primary.main}`,
    background: background,
    boxShadow: boxshadow && boxshadow,
  })
);
export const OrderSummary = styled(Typography)(({ theme }) => ({
  color: `${theme.palette.mode === "dark" ? "#fff" : "#414141"}`,
  fontSize: "18px",
  fontWeight: "700",
  paddingBottom: "25px",
  textTransform: "capitalize",
  marginLeft: "auto",
  marginRight: "auto",
}));
export const OrderFoodName = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "500",
  color: `${
    theme.palette.mode === "dark"
      ? theme.palette.whiteContainer.main
      : theme.palette.footer.appDownloadButtonBgGray
  }`,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  width: "199px",
}));
export const OrderFoodSubtitle = styled(Typography)(
  ({ theme, orderdetailscolor }) => ({
    fontSize: orderdetailscolor === "true" ? "14px" : "12px",
    color:
      orderdetailscolor === "true"
        ? theme.palette.neutral[1000]
        : theme.palette.neutral[500],
  })
);
export const OrderFoodAmount = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "600",
}));
export const CalculationGrid = styled(Grid)(() => ({
  fontSize: "14px",
}));
export const TotalGrid = styled(Grid)(() => ({
  color: "#EF7822",
  fontSize: "16px",
  fontWeight: "600",
  padding: "0px",
}));
export const RoundButton = styled(Button)(({ theme, minWidth, padding }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  minWidth: minWidth,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "50%",
  textAlign: "center",
  fontWeight: "600",
  padding: padding,
}));
export const CustomTimePicker = styled(MobileTimePicker)(({ theme }) => ({
  "& .MuiInputBase-root": {
    width: "100px",
    background: " rgba(118, 118, 128, 0.12)",
    color: theme.palette.neutral[500], // Customize the text color
    fontSize: "16px", // Customize the font size

    // Add any other custom styles as needed
  },

  "& input": {
    padding: "5px", // Customize the input padding

    // Add any other custom styles as needed
  },

  "& .MuiInputLabel-root": {
    color: "green", // Customize the label color
    // Add any other custom styles as needed
  },

  "& .MuiOutlinedInput-input::placeholder": {
    color: "red", // Customize the placeholder color
  },
}));
export const CustomDatePicker = styled(DateCalendar)(({ theme }) => ({
  "& .MuiPickersCalendarHeader-root": {
    marginTop: "0px",
    "& .MuiPickersCalendarHeader-label": {
      fontSize: "22px",
    },
    "& .MuiPickersArrowSwitcher-root": {
      "& .MuiPickersArrowSwitcher-button": {
        "& .MuiSvgIcon-root": {
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: "50%",
        },
      },
    },
  },
}));
