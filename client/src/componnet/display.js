
import { useState } from 'react';
import { Box, AppBar, Typography, Toolbar, IconButton, Drawer, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import '../Style/style.css'; // Ensure this CSS file is correctly linked

const Display = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handledrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handledrawerToggle} sx={{ textAlign: "center" }}>
            <Typography color={"goldenrod"} variant='h6' component="div" sx={{ flexGrow: 1, my: 2 }}>Fio Products</Typography>
            <Divider />
            <ul className='mobilename'>
                <li><Link to={'/diplay'}>Home</Link></li>
                <li><Link to={'/about'}>About</Link></li>
                <li><Link to={'/product'}>Product</Link></li>
                <li><Link to={'/'}>Contact</Link></li>
            </ul>
        </Box>
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
                backgroundImage: 'url(https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', // Path to your background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position : 'fixed',
                right:0,
                color :"white"
            }}
        >
            <AppBar component={"nav"} style={{ backgroundColor: "black" }}>
                <Toolbar>
                    <IconButton color='inherit' aria-label='open drawer' edge="start" sx={{ mr: 2, display: { sm: "none" } }} onClick={handledrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography color='white' variant='h6' component="div" sx={{ flexGrow: 1 }}>Fio Products</Typography>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <ul className='navication'>
                            <li><Link to={'/diplay'}>Home</Link></li>
                            <li><Link to={'/about'}>About</Link></li>
                            <li><Link to={'/product'}>Product</Link></li>
                            <li><Link to={'/'}>Contact</Link></li>
                        </ul>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer 
                    variant='temporary' 
                    open={mobileOpen} 
                    onClose={handledrawerToggle}
                    sx={{ 
                        display: { xs: 'block', sm: "none" }, 
                        "& .MuiDrawer-paper": {
                            boxSizing: 'border-box',
                            width: "240px"
                        } 
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box 
                sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    textAlign: 'center'
                }}
            >
                <Typography variant='h6' sx={{ mb: 4 }}>WELCOME TO S2S CAPTAINGREEN</Typography>
                <Typography variant='h2' sx={{ mb: 4 }}>Lets Share the profit</Typography>
                <Button 
                    variant="contained" 
                    color='primary' 
                    sx={{ 
                        fontSize: '1.2rem', 
                        px: 4, 
                        py: 2 
                    }}
                >
                    Shop Now
                </Button>
            </Box>
        </Box>
    );
};

export default Display;


