import { Paper, styled } from "@mui/material";

export const CustomPaperCard = styled(Paper)(
  ({ theme, minHeight, minHeightForCustomCard }) => ({
    // eslint-disable-next-line no-mixed-operators
    minHeight: (minHeight && "16vh") || (minHeightForCustomCard && "30vh"),
    position: "relative",
    width: "100%",
    height: "100%",
    textAlign: "center",
    padding: "1.875rem",
    boxSizing: "border-box",
    boxShadow:
      "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.1)",
    border: "1px solid rgba(65, 83, 179, 0.3)",
    [theme.breakpoints.up("sm")]: {
      // eslint-disable-next-line no-mixed-operators
      minHeight: (minHeight && "14vh") || (minHeightForCustomCard && "20vh"),
    },
  })
);
