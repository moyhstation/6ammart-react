import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CustomTypographyForMultiImagePreviewer = styled(Typography)(
    ({ theme }) => ({
        color: theme.palette.error.main,
    })
)
