import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { alpha, Drawer, Stack } from "@mui/material";

export const CustomBoxFullWidth = styled(Box)(({ theme }) => ({
  position: "relative",
  height: `calc(100vh - 100px)`,
  width: "100%",
  overflow: "hidden",
}));
export const CustomInnerBoxFullWidth = styled(Box)(({ theme }) => ({
  display: "flex",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}));
export const ChatSidebarDesktop = styled(Drawer)({
  flexShrink: 0,
  width: "349px",
  // minHeight: "70vh",
  height: "100%",
  "& .MuiDrawer-paper": {
    position: "relative",
    width: "349px",
    height: "100%",
    borderRight: "none !important",
  },
});
export const ChatSidebarMobile = styled(Drawer)({
  maxWidth: "100%",
  width: "100%",
  minHeight: "70vh",
  "& .MuiDrawer-paper": {
    height: "calc(100% - 59px)",
    maxWidth: "100%",
    top: 55,
    width: "100%",
  },
});
export const ChatContentWrapper = styled(Box)(({ theme }) => ({
  alignItems: "flex-start",
  justifyContent: "flex-start",
  display: "flex",
  padding: "1rem",
}));

export const ContactListWrapper = styled(Box)(({ theme }) => ({
  //display:'block'
}));
export const ChatUserTop = styled(Stack)(({ theme, mdup }) => ({
  alignItems: "center",
  justifyContent: "flex-start",
  paddingBottom: "5px",
  marginBottom: "10px",
  width: "100%",
  borderBottom: "1px solid",
  borderColor: alpha(theme.palette.neutral[400], 0.3),
}));
