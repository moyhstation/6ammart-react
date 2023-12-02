import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const StepperSimmer = () => {
    return (
        <Stack spacing={1}>
            <Skeleton
                variant="text"
                animation="wave"
                height={20}
                width="100%"
            />
            <Skeleton
                variant="text"
                animation="wave"
                height={20}
                width="40%"
            />
        </Stack>
    )
}

export default StepperSimmer