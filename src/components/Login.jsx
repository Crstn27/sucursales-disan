import { Box, Drawer } from '@mui/material'
import React from 'react'

export const Login = ({open, toggleDrawer}) => {
    
  return (
    <Drawer
        anchor={'right'}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          >
            slider
        </Box>
      </Drawer>
  )
}
