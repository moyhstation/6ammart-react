import { Box, Button, IconButton, Stack, alpha, styled } from "@mui/material";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";

export const CodePreviewWrapper = styled(CustomStackFullWidth)(({ theme }) => ({
    paddingInlineStart: "24px",
    paddingInlineEnd: "2px",
    paddingBlock: "4px",
    border: "1px dashed",
    borderColor: alpha(theme.palette.primary.main, 0.2),
    borderRadius: "12px",
    [theme.breakpoints.down("md")]: {
        padding: "10px",
    },
}));

export const ReferralShareBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
    padding: "5px",
    borderRadius: ".5rem",
    gap: "1rem",
}));

export const ShareButton = styled(IconButton)(({ theme, size }) => ({
    height: size || "40px",
    width: size || "40px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "50%",
    boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.15)",
    padding: "5px",
}));