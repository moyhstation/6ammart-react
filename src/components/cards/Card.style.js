import { Stack, styled } from "@mui/material";

export const CustomOverLay = styled(Stack)(
  ({ theme, hover, border_radius }) => ({
    background: "rgba(75, 86, 107, 0.5)",
    borderRadius: border_radius ? border_radius : "5px 5px 0px 0px",
    width: "100%",
    opacity: hover ? 1 : 0,
    inset: 0,
    position: "absolute",
    top: 0,
    zIndex: 1,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      opacity: 1,
    },
  })
);
