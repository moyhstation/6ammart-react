import { styled, Tabs } from "@mui/material";
import { Stack } from "@mui/system";

export const CustomTab = styled(Tabs)(({ theme, width }) => ({
  minHeight: "30px",

  "& .MuiTabs-scroller": {
    "& .MuiTabs-indicator": {
      width: width,
      height: "3px",
      borderRadius: "2px",
    },
  },
  "& .MuiButtonBase-root": {
    minHeight: "0px",
    paddingTop: "0px",
    paddingBottom: "0px",
  },
}));
export const CustomOverFlowStack = styled(Stack)(({ theme, height }) => ({
  overflow: "auto",
  height: height,
}));
