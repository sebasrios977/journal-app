import { Box, Toolbar } from "@mui/material"
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


const drawerWidth: number = 240;

const JournalLayout = ({children}: any) => {
  return (
    <Box sx={{display: 'flex'}}>

      <Navbar drawerWidth={drawerWidth} />

      <Sidebar drawerWidth={drawerWidth} />

      <Box
        component='main'
        sx={{flexGrow: 1, padding: 2}}
      >
        <Toolbar />

        {children}
      </Box>
      
    </Box>
  )
}

export default JournalLayout
