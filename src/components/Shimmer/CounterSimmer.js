import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const CounterSimmer = () => {
    return (
        <Stack direction="row" spacing={2}>
            {[...Array(4)].map(index => {
                return (
                    <Stack display="flex" alignItems="center" key={index}>
                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            width={30}
                            height={30}
                        />
                        <Skeleton
                            variant="text"
                            animation="wave"
                            width={20}
                        />
                    </Stack>)

            })}

        </Stack>
    )
}

export default CounterSimmer