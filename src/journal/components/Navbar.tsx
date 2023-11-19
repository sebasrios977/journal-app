import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { startLogOut } from "../../store/auth/thunks";

interface DrawerWidth {
    drawerWidth: number,
}
const Navbar = ({drawerWidth = 240}: DrawerWidth) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch<any>(startLogOut());
    }

  return (
    <AppBar 
        position="fixed"
        sx={{width: {sm: `calc(100% - ${drawerWidth}px)`, 
        ml: {sm: `${drawerWidth}px`}}}}
    >

        <Toolbar>
            <IconButton color='inherit' edge='start' sx={{mr: 2, display: {sm: 'none'}}}>
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between'>
                <Typography variant="h6" noWrap component='div' alignItems='center'>JournalApp</Typography>
                <IconButton onClick={onLogout} color="error">
                    <LogoutOutlined />
                </IconButton>
            </Grid>
        </Toolbar>
        
    </AppBar>
  )
}

export default Navbar
