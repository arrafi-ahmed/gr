

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Paper, Typography, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

function YouType() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
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

    // const handleAlerSubmit = (label) => {
    //     console.log(label);
    //     switch (label) {
    //         case "My Bonus":
    //             navigate('/bonus',{ state: { userId: currentUser } });
    //             break;
    //         case "About Us":
    //             navigate('/about',{ state: { userId: currentUser } });
    //             break;
    //         case "Contact Us":
    //             navigate('/contact',{ state: { userId: currentUser } });
    //             break;
    //         case 'KYC':
    //             navigate('/kyc',{ state: { userId: currentUser } });
    //             break;
    //         case "Referrals":
    //             navigate('/referrals',{ state: { userId: currentUser } });
    //             break;
    //         case "Product List":
    //             navigate('/product',{ state: { userId: currentUser } });
    //             break;
    //         case "My Profile":
    //             navigate('/myprofile',{ state: { userId: currentUser } });
    //             break;
    //         case "My Orders":
    //             navigate('/myorders',{ state: { userId: currentUser } });
    //             break;
    //         case "Our YouTube Channel":
    //             navigate('/youtype',{ state: { userId: currentUser } });
    //             break;
    //         case "Logout":
    //             navigate('/logout',{ state: { userId: currentUser } });
    //             break;
    //         default:
    //             break;
    //     }
    // };

    const handleAlerSubmit = (label) => {
        console.log(label);
        if(label === "My Bonus"){
          navigate('/bonus',{ state: { userId: currentUser } })
        }else 
        if(label === "About Us"){
          navigate('/about',{ state: { userId: currentUser } })
        }else
        if(label === "Contact Us"){
          navigate('/contact',{ state: { userId: currentUser } })
        } else
        // if(label === 'KYC'){
        //     navigate('/kyc', { state: { userId: currentUser } })
        // }else
        if(label === "Referrals"){
          navigate('/refferals',{ state: { userId: currentUser } })
        }else
        if(label === "Product List"){
          navigate('/product',{ state: { userId: currentUser } })
        }else
        if(label === "My Profile"){
          navigate('/myprofile',{ state: { userId: currentUser } })
        }else
        if(label === "My Orders"){
          navigate('/myorders',{ state: { userId: currentUser } })
        }else
        if(label === "Our YouTube Channel"){
          navigate('/youtype',{ state: { userId: currentUser } })
        }else
        if(label === "Logout"){
          navigate('/logout',{ state: { userId: currentUser } })
        }else if(label === "PrivatePolicy"){
          navigate('/cusPrivatepolicy', { state: { userId: currentUser } }); 
      }
    }
    return (
        <>
             <AppBar position="fixed" sx={{ width: '100vw', overflow: 'hidden' }}>
        <Toolbar>
          <IconButton edge="start" color="red" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'PrivatePolicy', 'Logout'].map((label) => (
              <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 10px', fontSize: "13px" }}>{label}</Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <IconButton
        color="inherit"
        onClick={() => navigate('/myprofile', { state: { userId: currentUser } })}
      >
        <AccountCircle />
      </IconButton>
            <Typography variant="body1" color="inherit" sx={{ marginRight: 1, }}>
                {currentUser || 'Username'} {/* Replace 'Username' with actual user name */}
            </Typography>
        </Box>
        </Toolbar>
        
      </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <List className="drawer">
                    {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'PrivatePolicy', 'Logout'].map((text) => (
                        <ListItem button key={text} onClick={() => { handleAlerSubmit(text); handleDrawerToggle(); }}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div style={{ padding: '20px',marginTop:"84px" }}>
                <Typography variant="h4" gutterBottom>
                    YouTube Channel
                </Typography>
                <Typography variant="body1" paragraph>
                    Welcome to our YouTube channel! Here, you'll find all the latest updates, and much more.
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            href="https://youtube.com/@s2scaptaingreen?si=Qg8xGc_b7-zz5OYR" 
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Our YouTube Channel
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default YouType;

