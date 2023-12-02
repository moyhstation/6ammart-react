import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { alpha, Avatar, Card } from "@mui/material";
import { Stack } from "@mui/system";

export const ChatMessageWrapper = styled(Box)(
  ({ theme, authortype, usertype, language_direction }) => ({
    display: "flex",
    flexDirection: authortype === usertype ? "row-reverse" : "row",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    maxWidth: "450px",
    marginLeft:
      authortype === usertype ? (language_direction === "rtl" ? 0 : "auto") : 0,
    marginBottom: "1rem",
    marginRight:
      authortype === usertype ? (language_direction === "rtl" ? "auto" : 0) : 0,
  })
);

export const CustomAvatar = styled(Avatar)(
  ({ theme, authortype, usertype }) => ({
    height: 32,
    marginLeft: authortype === usertype ? 2 : 0,
    marginRight: authortype === usertype ? 0 : 2,
    width: 32,
  })
);
export const BodyWrapper = styled(Box)(({ theme, authortype, usertype }) => ({
  flexGrow: 1,
  maxWidth: `500 !important`,
  display: "flex",
  flexDirection: "column",
  alignItems: authortype === usertype ? "flex-end" : "flex-start",
  width: "100%",
}));
export const CardWrapper = styled(Stack)(({ theme, authortype, usertype }) => ({
  backgroundColor:
    authortype === usertype
      ? theme.palette.primary.main
      : alpha(theme.palette.primary.main, 0.2),

  color:
    authortype === usertype
      ? theme.palette.primary.contrastText
      : "text.primary",
  padding: "8px 20px",
  borderRadius:
    authortype === usertype ? "25px 25px 0px 25px" : "25px 25px 25px 0px",
}));
export const TimeWrapper = styled(Box)(({ theme, authortype, usertype }) => ({
  display: "flex",
  justifyContent: authortype === usertype ? "flex-end" : "flex-start",
  marginTop: 1,
  paddingTop: 2,
}));
