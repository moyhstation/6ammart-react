import { Skeleton, Stack } from '@mui/material'
import React from 'react'
import { SimmerCardWrapper } from './Simmer.style';

const ProductCardSimmerHorizontal = () => {
    return (
        <SimmerCardWrapper>
            <Skeleton
                variant="rectangular"
                animation="pulse"
                width={150}
                height={150}
            />
            <Stack padding="1rem">
                <Skeleton
                    variant="text"
                    animation="wave"
                    height={20}
                    width="80%"
                />
                <Skeleton variant="text" animation="wave" height={20} />

                <Skeleton
                    variant="text"
                    animation="wave"
                    height={20}
                    width="80%"
                />
                <Stack direction="row" spacing={2}>
                    <Skeleton
                        variant="text"
                        animation="wave"
                        width={70}
                        height={20}
                    />

                    <Skeleton
                        variant="text"
                        animation="wave"
                        width={70}
                        height={20}
                    />
                </Stack>
            </Stack>
        </SimmerCardWrapper>
    );
}
export default ProductCardSimmerHorizontal