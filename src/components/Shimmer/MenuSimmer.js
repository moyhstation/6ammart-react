import React from 'react'
import { Skeleton, Stack } from '@mui/material'

const MenuSimmer = ({ count }) => {
    return (
        <Stack display="flex" flexDirection="row" gap="10px">
            {[...Array(count)].map((index) => {
                return (
                    <Skeleton
                        key={index}
                        variant="text"
                        animation="wave"
                        height={20}
                        width="50px"
                    />
                );
            })}
        </Stack>
        // <Stack>
        //     {[...Array(10)].map((index) => (
        //         return (
        //     // <Stack key={index}>
        //     //     <h1>hi</h1>
        //     //     <Skeleton
        //     //         variant="text"
        //     //         animation="wave"
        //     //         height={20}
        //     //         width="10%"
        //     //     />
        //     // </Stack>
        //     )

        //     ) 
        //     )}
        // </Stack>
    )
}

export default MenuSimmer