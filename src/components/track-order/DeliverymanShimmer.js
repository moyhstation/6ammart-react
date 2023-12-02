import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Skeleton } from '@mui/material'

const DeliverymanShimmer = () => {
    return (
        <CustomStackFullWidth
            alignItems="center"
            spacing={1.5}
            justifyContent="center"
        >
            <Skeleton variant="text" width="100px" />
            <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={0.5}
            >
                <Skeleton variant="text" width="100px" />
                <Skeleton variant="rectangle" width="50px" height="50px" />
                <Skeleton variant="text" width="100px" />
            </CustomStackFullWidth>
            <CustomStackFullWidth
                alignItems="center"
                justifyContent="center"
                spacing={0.5}
            >
                <Skeleton variant="rectangle" width="50px" height="50px" />
                <Skeleton variant="text" width="100px" />
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

export default DeliverymanShimmer
