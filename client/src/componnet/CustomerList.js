

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { TextField, Button, Typography, Box, Paper, Select, MenuItem, FormControl, InputLabel, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const CustomerList= () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const [formData,setformdata] = useState([])

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
  
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
      };

      const handleMenuClick = (menuItem) => {
        if(menuItem === "Add Shop"){
          // navigate('/bonus', { state: finalBonus })
          navigate('/addShop',{ state: { userId: currentUser } })
        }else 
        if(menuItem === "Shop List"){
          // navigate('/bonus', { state: finalBonus })
          navigate('/shopList',{ state: { userId: currentUser } })
        }else
        if(menuItem === "Customer List"){
          // navigate('/bonus', { state: finalBonus })
          navigate('/customerList',{ state: { userId: currentUser } })
        }else
        if(menuItem === "Update Product"){
          // navigate('/bonus', { state: finalBonus })
          navigate('/updateProducts',{ state: { userId: currentUser } })
        }
        if(menuItem === "Add Product"){
          // navigate('/bonus', { state: finalBonus })
          navigate('/addToProduct',{ state: { userId: currentUser } })
        }else
        if(menuItem === "Logout"){
          // navigate('/bonus', { state: finalBonus })
          navigate('/adminLogout',{ state: { userId: currentUser } })
        } else
        if(menuItem === "OtpList"){
            navigate('/adminOtpDetails',{state:{userId:currentUser}})
        } else
        if(menuItem ===  'PrivatePolicy'){
            navigate('/adminprivatepolicy',{state:{userId:currentUser}})
        }
        
        
      };


      useEffect(()=>{
        const fetchDetails=async()=>{
            const responce =  await axios.get(process.env.REACT_APP_API_BASE_URL + '/customersData')
            console.log(responce.data);
            setformdata(responce.data)
            

        }
        fetchDetails()
      },[])

    return (
    <>
            <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {['Add Shop','Shop List','Customer List','Update Product','Add Product','OtpList','PrivatePolicy','Logout'].map((label) => (
              <p key={label} style={{ marginRight: "90px" ,cursor:"pointer"}} onClick={() => handleMenuClick(label)}>
                {label}
              </p>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <IconButton color="inherit"
             	onClick={() => navigate('/adminProfile', { state: { userId: currentUser } })}>
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
          {['Add Shop','Shop List','Customer List','Update Product','Add Product','OtpList','PrivatePolicy','Logout'].map((text) => (
            <ListItem button key={text} onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box mt={10}>
            <TableContainer component={Paper} style={{ maxHeight: '570px' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>  
                            <TableCell style={{fontWeight:"bold"}}>User ID</TableCell>
                            <TableCell style={{fontWeight:"bold"}}>Email</TableCell>
                            <TableCell style={{fontWeight:"bold"}}>Phone</TableCell>
                            <TableCell style={{fontWeight:"bold"}}>Address</TableCell>
                            <TableCell style={{fontWeight:"bold"}}>Pincode</TableCell>
                            <TableCell style={{fontWeight:"bold"}}>Ref ID 1</TableCell>
                            <TableCell style={{fontWeight:"bold"}}>Ref ID 2</TableCell>
                            <TableCell style={{fontWeight:"bold"}}>Ref ID 3</TableCell>
                            <TableCell style={{fontWeight:"bold"}}>UPI Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {formData.map((customer, index) => (
                            <TableRow key={index}>
                                <TableCell>{customer.userid}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phno}</TableCell>
                                <TableCell>{customer.useraddress}</TableCell>
                                <TableCell>{customer.userpincode}</TableCell>
                                <TableCell>{customer.refid1}</TableCell>
                                <TableCell>{customer.refid2}</TableCell>
                                <TableCell>{customer.refid3}</TableCell>
                                <TableCell>{customer.upiNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    
    </>
    );
};

export default CustomerList;