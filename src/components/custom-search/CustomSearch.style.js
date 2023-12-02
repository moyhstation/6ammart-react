import { alpha, InputBase, styled } from "@mui/material";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../helper-functions/moduleTypes";

export const Search = styled(CustomStackFullWidth)(({ theme, type2 }) => ({
  backgroundColor: theme.palette.neutral[100],
  color: theme.palette.neutral[600],
  height: "45px",
  border:
    type2 &&
    `1px solid ${alpha(
      getCurrentModuleType() === ModuleTypes.FOOD
        ? theme.palette.moduleTheme.food
        : theme.palette.primary.main,
      0.4
    )}`,
  borderRadius: type2 ? "10px" : "5px",
  // [theme.breakpoints.up("sm")]: {
  //   height: "45px",
  // },
}));
export const SearchIconWrapper = styled("div")(
  ({ theme, language_direction }) => ({
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
  })
);

export const StyledInputBase = styled(InputBase)(
  ({ theme, language_direction }) => ({
    color:
      getCurrentModuleType() === ModuleTypes.FOOD
        ? theme.palette.moduleTheme.food
        : "primary.main",
    width: "100%",

    "& .MuiInputBase-input": {
      padding: "13px 17px",
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  })
);
