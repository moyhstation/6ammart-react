import { Card, Stack, styled } from "@mui/material";

export const SimmerCardWrapper = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: "15px",
    margin: "15px",

}));

export const SimmerCardWrapperTimer = styled(Card)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    padding: "15px",
    width: "100%",
    marginInline: "15px",

}));
export const SimmerCardWrapperVertical = styled(Card)(({ theme, marginBottom }) => ({
    display: "flex",
    justifyContent: "center",
    padding: "15px",
    width: "100%",
    marginBottom: marginBottom ? marginBottom : "",

}));

export const CustomBox = styled(Stack)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"

}));