import { styled } from "@mui/material/styles";
import { alpha, Drawer, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";

export const CartDrawer = styled(Drawer)(({ theme }) => ({
  width: "420px",
  height: "714px",
  zIndex: "1300",
  "& .MuiDrawer-paper": {
    width: "420px",
    height: "714px",
  },
}));
export const CustomCloseIconButton = styled(IconButton)(({ theme }) => ({
  padding: "5px",
  fontSize: "18px",
  gap: "4px",
}));
export const CartIncrementStack = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  border: `1px solid ${alpha(theme.palette.neutral[400], 0.3)}`,
  padding: "4px",
  borderRadius: "15px",
}));

export const DeliveryProgressBarStack = styled(CustomStackFullWidth)(
  ({ theme }) => ({
    marginTop: "3rem",
    paddingInline: "1.4rem",
  })
);
export const EmptyCartBox = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.primary.light, 0.3),
  width: "80px",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
}));
