// import { useState } from 'react'

import { Box, Container } from "@mui/material"
import { NavBar } from "./components/NavBar"
import EnhancedTable from "./components/DataTable"
import { Login } from "./components/Login";
import { Progress } from "./components/Progress";

function App() {


  
  return (
    <>
      <Container style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth:'100vw', padding: 0}}>
        <NavBar />
        <Box overflow={"hidden"} sx={{ flexGrow: 1, padding: '40px', backgroundColor: 'secondary.main' }}>
          <EnhancedTable />
        </Box>
        <Login />
      </Container>
      <Progress/>
    </>
  )
}

export default App
