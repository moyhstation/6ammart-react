import React from 'react'
import { CustomBox } from '../Simmer.style'
import { Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material'

const WhyChooseSimmer = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Stack padding="0 10px 0 10px">
            <Skeleton
                variant="rectangular"
                animation="pulse"
                width={isSmall ? 140 : 180}
                height={isSmall ? 130 : 150}
            />
            <CustomBox padding="1rem" spacing={1}>
                <Skeleton
                    variant="text"
                    animation="wave"
                    height={20}
                    width="120%"
                />
                <Skeleton
                    variant="text"
                    animation="wave"
                    height={20}
                    width="40%"
                />
            </CustomBox>
        </Stack>
    )
}

export default WhyChooseSimmer