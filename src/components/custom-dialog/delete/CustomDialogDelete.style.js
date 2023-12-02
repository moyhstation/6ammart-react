import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material'

export const CustomPaperForCustomDialogDelete = styled(Paper)(({ theme }) => ({
    paddingLeft: '.5rem',
    paddingRight: '.5rem',
    paddingBottom: '1.40rem',
    paddingTop: '1.75rem',
    width: 'auto',
    [theme.breakpoints.up('md')]: {
        width: '34.313rem',
    },
}))
