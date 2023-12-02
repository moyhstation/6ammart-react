import React from 'react'
import { Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material'
import { CustomBox, SimmerCardWrapperVertical } from './Simmer.style'

const ProductCardSimmer = ({marginBottom}) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <SimmerCardWrapperVertical marginBottom={marginBottom}>
            <Stack padding="0 10px 0 10px">
                <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    width={isSmall ? 140 : 200}
                    height={isSmall ? 130 : 190}
                />
                <CustomBox padding="1rem" spacing={1}>
                    <Skeleton
                        variant="text"
                        animation="wave"
                        height={20}
                        width="30%"
                    />
                    <Skeleton
                        variant="text"
                        animation="wave"
                        height={20}
                        width="80%"
                    />
                    <Skeleton
                        variant="text"
                        animation="wave"
                        height={20}
                        width="20%"
                    />
                    <Skeleton
                        variant="text"
                        animation="wave"
                        height={20}
                        width="70%"
                    />
                </CustomBox>
            </Stack>
        </SimmerCardWrapperVertical>
    )
}

export default ProductCardSimmer