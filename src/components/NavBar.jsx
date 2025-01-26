import { AccountCircle } from "@mui/icons-material"
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { useState } from "react";


export const NavBar = ({toggleDrawer}) => {
    const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    toggleDrawer(true);
  };

  return (
      
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Photos
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                // onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Iniciar sesión</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
  )
}
