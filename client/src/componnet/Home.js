
import { Box, Typography, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState("")
    const location = useLocation();
    const { userId } = location.state || {};
    console.log(userId);
  
    useEffect(() => {
      if (userId) {
        setCurrentUser(userId); // Set the current user
    } else {
        console.error('User ID not found in state');
        // Handle case where userId is not available (e.g., redirect or show a message)
    }
    }, [userId])

    console.log(currentUser);
    
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
      };

      const handleAlerSubmit = (label) => {
        console.log(label);
        if(label === "My Bonus"){
          // navigate('/bonus', { state: finalBonus })
          navigate('/bonus')
        }else 
        if(label === "About Us"){
          navigate('/about')
        }else
        if(label === "Contact Us"){
          navigate('/contact')
        }else
        if(label === 'KYC'){
            navigate('kyc', { state: { userId: currentUser } })
        }else
        if(label === "Product List"){
          navigate('/product')
        }
        
        
      }
    return (
       <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        {['Product List', 'My Profile', 'KYC', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((label) => (
                        <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 5px', fontSize: "13px" }}>{label}</Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <List className="drawer">
                {['Product List', 'My Profile', 'KYC', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((text) => (
                    <ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
                    <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
            <Box id="home" sx={{
                height: '100vh',
                backgroundImage: 'url(https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}>
                <Typography variant='h6' sx={{ mb: 4, color: "white" }}>WELCOME TO S2S CAPTAINGREEN</Typography>
                <Typography variant='h2' sx={{ mb: 4, color: "white" }}>Let's Share the Profit</Typography>
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
       </>
    );
};

export default Home;
