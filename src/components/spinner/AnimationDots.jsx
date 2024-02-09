import React from 'react';
import { styled } from '@mui/system';
import { useMediaQuery, useTheme } from '@mui/material';

const AnimationDots = () => {
    const theme = useTheme();
    const isXsmall = useMediaQuery(theme.breakpoints.down("sm"))

    const AnimationDot = styled('div')({
        position: "relative",
        textAlign: "center",
        width: "35px",
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
    });

    const Dot = styled('span')(({ theme }) => ({
        display: "inline-block",
        width: isXsmall ? "4px" : "5px",
        height: isXsmall ? "4px" : "5px",
        borderRadius: "50%",
        marginRight: "3px",
        background: theme.palette.primary.main,
        animation: "wave 1.3s linear infinite",
        '&:nth-child(2)': {
            animationDelay: '-1.1s',
        },
        '&:nth-child(3)': {
            animationDelay: '-0.9s',
        },
        '@keyframes wave': {
            '0%, 60%, 100%': {
                transform: 'initial',
            },
            '30%': {
                transform: 'translateY(-15px)',
            },
        }
    }));
    return (
        <AnimationDot isXsmall={isXsmall}>
            <Dot></Dot>
            <Dot></Dot>
            <Dot></Dot>
        </AnimationDot>
    );
};

export default AnimationDots;