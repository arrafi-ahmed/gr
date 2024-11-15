

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { TextField, Button, Typography, Box, Paper, Select, MenuItem, FormControl, InputLabel, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, FormControlLabel, Checkbox } from '@mui/material';

const AdminLogout = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutConfirmed, setLogoutConfirmed] = useState(false); // State for checkbox
  const [currentUser, setCurrentUser] = useState("")
  const location = useLocation();
  const { userId } = location.state || {};
  console.log(userId);



  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      setCurrentUser(userId); // Set the current user
    } else {
      console.error('User ID not found in state');
      // Handle case where userId is not available (e.g., redirect or show a message)
    }
  }, [userId])



  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCheckboxChange = (event) => {
    setLogoutConfirmed(event.target.checked);
    if (event.target.checked) {
      navigate('/',); // Redirect to login page when checkbox is checked
    }
  };

  const handleMenuClick = (menuItem) => {
    if (menuItem === "Add Shop") {
      // navigate('/bonus', { state: finalBonus })
      navigate('/addShop', { state: { userId: currentUser } })
    } else
      if (menuItem === "Shop List") {
        // navigate('/bonus', { state: finalBonus })
        navigate('/shopList', { state: { userId: currentUser } })
      } else
        if (menuItem === "Customer List") {
          // navigate('/bonus', { state: finalBonus })
          navigate('/customerList', { state: { userId: currentUser } })
        } else
          if (menuItem === "Update Product") {
            // navigate('/bonus', { state: finalBonus })
            navigate('/updateProducts', { state: { userId: currentUser } })
          }
    if (menuItem === "Add Product") {
      // navigate('/bonus', { state: finalBonus })
      navigate('/addToProduct', { state: { userId: currentUser } })
    } else
      if (menuItem === "Logout") {
        // navigate('/bonus', { state: finalBonus })
        navigate('/adminLogout', { state: { userId: currentUser } })
      }else
      if(menuItem === "OtpList"){
          navigate('/adminOtpDetails',{state:{userId:currentUser}})
      } else
      if(menuItem ===  'PrivatePolicy'){
          navigate('/adminprivatepolicy',{state:{userId:currentUser}})
      }


  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product', 'OtpList','PrivatePolicy','Logout'].map((label) => (
              <p key={label} style={{ marginRight: "90px", cursor: "pointer" }} onClick={() => handleMenuClick(label)}>
                {label}
              </p>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <IconButton color="inherit" 	onClick={() => navigate('/adminProfile', { state: { userId: currentUser } })}>
              <AccountCircle />
            </IconButton>
            <Typography variant="body1" color="inherit" sx={{ marginRight: 1, }}>
              {currentUser || 'Username'} {/* Replace 'Username' with actual user name */}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product','OtpList','PrivatePolicy', 'Logout'].map((text) => (
            <ListItem button key={text} onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box>
        <div>
          <Paper style={{ padding: '20px', maxWidth: '100%', textAlign: 'center' }} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Full height of the viewport
            // padding: '20px',
          }}>
            <Typography variant="h4" gutterBottom>
              Thank you for using our app!
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={logoutConfirmed}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Logout and go to login page"
            />
            <Box mt={2}>
              <Typography variant="body2">
                If you have any feedback or suggestions, please let us know!
              </Typography>
            </Box>
          </Paper>
        </div>
      </Box>

    </>
  );
};

export default AdminLogout;