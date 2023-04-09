import { Box } from '@mui/material'
import React from 'react'
import { PrimaryColor, SecondaryColor } from '../../Color.Config'
import SimpleDialogDemo from '../../Components/muiComponents/SimpleDialog'
import Navbaar from '../../Components/Navbaar/Navbaar'

function Admin() {
  return (
    <Box bgcolor={PrimaryColor} minHeight={"100vh"}>
      <Navbaar/>
      <Box style={{ position:"relative", top:"100px"}}>
      <Box display={"grid"} gap={2}>
      <SimpleDialogDemo/>
    </Box>
    </Box>
    </Box>
  )
}

export default Admin