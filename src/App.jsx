// import { useState } from 'react'

import { Box, Container, Drawer } from "@mui/material"
import { NavBar } from "./components/NavBar"
import EnhancedTable from "./components/DataTable"
import { useState } from "react";
import { Login } from "./components/Login";

function App() {

  const [open, setOpen] = useState(false);
  
  const toggleDrawer = (newState) => () => {
    setOpen(newState);
  };
  
  return (
    <Container style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth:'100vw', padding: 0}}>
      <NavBar toggleDrawer={ setOpen }/>
      <Box overflow={"hidden"} sx={{ flexGrow: 1, padding: '40px', backgroundColor: 'secondary.main' }}>
        <EnhancedTable />
      </Box>
      <Login open={open} toggleDrawer={toggleDrawer}/>
      
      
    </Container>
  )
}

export default App
