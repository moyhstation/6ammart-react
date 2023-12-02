import { Box, Card, Skeleton, Stack } from '@mui/material'
import React from 'react'
import { CustomBox, SimmerCardWrapperTimer } from './Simmer.style'
import CounterSimmer from './CounterSimmer'

const CampaignSimmerTimmer = () => {
    return (
        <SimmerCardWrapperTimer>
            <Stack>
                <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    width={270}
                    height={260}
                />
                <CustomBox padding="1rem" spacing={1}>
                    <Skeleton
                        variant="text"
                        animation="wave"
                        height={20}
                        width="50%"
                    />
                    <Skeleton
                        variant="text"
                        animation="wave"
                        height={20}
                        width="80%"
                    />
                    <CounterSimmer />
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
                        width="80%"
                    />
                </CustomBox>
            </Stack>
        </SimmerCardWrapperTimer>
    )
}

export default CampaignSimmerTimmer