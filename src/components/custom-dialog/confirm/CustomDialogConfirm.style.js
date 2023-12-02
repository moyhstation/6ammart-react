import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const WrapperForCustomDialogConfirm = styled(Paper)(
  ({ theme, width }) => ({
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
    paddingBottom: "1.40rem",
    paddingTop: "1.75rem",
    width: "auto",
    [theme.breakpoints.up("md")]: {
      width: width ? width : "34.313rem",
    },
  })
);
