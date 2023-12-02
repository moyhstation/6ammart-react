import { styled } from "@mui/material/styles";
import { alpha, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const OrderIdTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "22px",
  },
}));
export const DateTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "12px",

  [theme.breakpoints.down("md")]: {
    fontSize: "10px",
  },
}));
export const OrderAmountTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
}));
export const SuccessButton = styled(Button)(({ theme }) => ({
  background: "rgba(0, 171, 17, 0.1);",
  color: theme.palette.success.main,
  borderRadius: "5px",
  [theme.breakpoints.up("xs")]: {
    width: "59.68px",
    height: "20.56px",
    fontSize: "12px",
  },
  [theme.breakpoints.up("md")]: {
    width: "88px",
    height: "30px",
    fontSize: "14px",
  },
}));

export const PendingButton = styled(Box)(({ theme }) => ({
  textAlign: "center",
  textTransform: "capitalize",
  background: "rgba(0, 95, 149, 0.1)",
  color: theme.palette.info.dark,
  borderRadius: "5px",
  padding: "5px",
  width: "auto",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100px",
  },
  [theme.breakpoints.up("xs")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
}));
export const TrackOrderButton = styled(Button)(({ theme }) => ({
  width: "100%",
  color: theme.palette.primary.main,
  borderRadius: "5px",
  alignItems: "center",
  padding: "6px 12px",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.whiteContainer.main,
  },
  [theme.breakpoints.down("md")]: {
    padding: "2px 5px",
    fontSize: "12px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.whiteContainer.main,
    fontWeight: 500,
  },
}));
export const HeadingBox = styled(Box)(() => ({
  padding: "10px 0px 20px 0px",
}));
export const OrderStatusBox = styled(Box)(({ theme }) => ({
  padding: "7px 0px 20px 0px",
  [theme.breakpoints.up("xs")]: {
    textAlign: "center",
  },
}));
export const OrderStatusGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.neutral[300],
  borderRadius: "14px",
  padding: "20px",
  rowGap: "10px",
}));
export const InformationGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.custom6,
  borderRadius: "14px",
  padding: "20px",
  [theme.breakpoints.down("md")]: {
    background: theme.palette.neutral[100],
    padding: "12px",
  },
}));
export const OrderStatusButton = styled(Button)(
  ({ theme, background, fontcolor }) => ({
    backgroundColor: background,
    color: theme.palette.neutral[100],
    textTransform: "capitalize",
    padding: "6px 10px",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: alpha(background, 0.9),
    },
    [theme.breakpoints.down("md")]: {
      padding: "5px 5px",
      fontSize: "10px",
    },
  })
);
