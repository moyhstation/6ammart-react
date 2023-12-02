import React from "react";
import {Container} from "@mui/material";
import {styled} from "@mui/material/styles";

const ContainerWrapper = styled(Container)(({theme}) => ({
    [theme.breakpoints.up('lg')]: {
        // Add your styles for the 'lg' breakpoint here
        maxWidth: '1300px', // Example value, you can replace it with your desired maxWidth
    },
}));
const CustomContainer = (props) => {
    const {children} = props;
    return <ContainerWrapper>{children}</ContainerWrapper>;
};

export default CustomContainer;
