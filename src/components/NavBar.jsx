import { AccountCircle, Logout } from "@mui/icons-material"
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { onLogout, onOpenLogin } from "../store";
import { useAuthStore } from "../hooks";


export const NavBar = () => {

  const {status, user} = useAuthStore();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const onLogoutMenu = () => {
    handleClose();
    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date');
    dispatch( onLogout());
  }

  const onLoginMenu = () => {
    handleClose();
    dispatch( onOpenLogin());
  }

  return (
      
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Sucursales
            </Typography>
            <div style={{display: "flex", flexDirection:'row', alignItems:'center', gap:'5px'}}>
              <Typography display={status !== 'authenticated' ? 'none' : ''}>
                {user.name}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              > {
                status === 'authenticated' ? <Logout/> : <AccountCircle />
              }
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
                onClose={handleClose}
              >
                {
                status === 'authenticated' 
                  ? <MenuItem onClick={onLogoutMenu}>Cerrar sesión</MenuItem> 
                  : <MenuItem onClick={onLoginMenu}>Iniciar sesión</MenuItem>
              }
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
  )
}
