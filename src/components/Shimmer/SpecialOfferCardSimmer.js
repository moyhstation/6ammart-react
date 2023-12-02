import { Card, Skeleton, Stack } from '@mui/material'
import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'

const SpecialOfferCardSimmer = ({width}) => {
  return (
    <Stack
      p="10px"
      alignItems="center"
      justifyContent="center"
      sx={{
        borderRadius: "6px",
        backgroundColor: (theme) => theme.palette.background.default,
        width: width ? "290px" : "210px",
      }}
      spacing={1}
    >
      <Card sx={{ height: "180px", width: "100%" }}>
        <Skeleton variant="ractangle" height="100%" width="100%" />
      </Card>
      <CustomStackFullWidth alignItems="flex-start" justifyContent="flex-start">
        <Skeleton variant="text" width="100px" />
      </CustomStackFullWidth>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Skeleton variant="text" width="80px" />
        <Skeleton variant="text" width="40px" />
      </CustomStackFullWidth>
    </Stack>
  )
}

export default SpecialOfferCardSimmer