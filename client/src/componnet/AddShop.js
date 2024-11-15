

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { TextField, Button, Typography, Box, Paper, Select, MenuItem, FormControl, InputLabel, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';

const AddShop = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deliverytimefrom, setDeliveryTimeFrom] = useState(moment().format("HH:mm"));
  const [deliverytimeto, setDeliveryTimeTo] = useState(moment().format("HH:mm"));
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    usertype: "showOwner"
  })

  const [addShopFrmdata, setAddShopFrmdata] = useState({
    shopid: "",
    shopname: "",
    shopaddress: "",
    shoppin: "",
    shopcontactnum: "",
  })
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


  const shopAddOnchangeFunction = (event) => {
    const { name, value } = event.target
    setAddShopFrmdata((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const onChangeFunction = (event) => {
    const { name, value } = event.target;
    setFormData((prevstate) => ({
      ...prevstate,
      [name]: value
    }))

  }

  const handleSubmitAddShop = async (event) => {
    event.preventDefault();
    const dateTimeObj = {
      deliverytimefrom,
      deliverytimeto,
      userid: formData.userid
    };
    const addShopDetails = { ...addShopFrmdata, ...dateTimeObj, };

    try {

      const res = await axios.post(process.env.REACT_APP_API_BASE_URL + '/shops', addShopDetails);
      const loginResponse = await axios.post(process.env.REACT_APP_API_BASE_URL + '/userLogin', formData);
      console.log(res);

      // Clear the form fields after successful submission
      setAddShopFrmdata({

        shopid: '',
        shopname: '',
        shopaddress: '',
        shoppin: '',
        shopcontactnum: '',

      });
      setFormData({
        userid: '',
        password: ''
      })
      setDeliveryTimeFrom('');
      setDeliveryTimeTo('');

      // Show success message
      setSuccessMessage('Shop successfully added!');

      // Optionally, remove the message after a delay
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Hide the message after 3 seconds

    } catch (err) {
      console.log(err);
      // You can also show an error message here if needed
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
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
      if(MenuItem === "OtpList"){
          navigate('/adminOtpDetails',{state:{userId:currentUser}})
      } else
      if(menuItem ===  'PrivatePolicy'){
          navigate('/adminprivatepolicy',{state:{userId:currentUser}})
      }


  };


  return (
    <>
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product','OtpList',  'PrivatePolicy','Logout'].map((label) => (
              <p key={label} style={{ marginRight: "90px", cursor: "pointer" }} onClick={() => handleMenuClick(label)}>
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
          {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product','OtpList', 'PrivatePolicy', 'Logout'].map((text) => (
            <ListItem button key={text} onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 ,marginTop:"84px"}}>
        <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "40px" }}>
          <Typography style={{ fontWeight: "bold" }} variant='h5' color='primary'>Add Shop</Typography>

          <form onSubmit={handleSubmitAddShop}>
            <TextField
              id="userid"
              name="userid"
              label="UserId"
              variant="standard"
              // value={userDetails.userid}
              placeholder="Enter the UserId"
              margin="normal"
              onChange={onChangeFunction}
              fullWidth
              required
            >
            </TextField>

            <TextField
              id="password"
              name="password"
              label="PassWord"
              // value={loginDetails.password}
              placeholder="Enter the UserPassword"
              variant="standard"
              fullWidth
              // error={!!error && error.includes('Password')}

              // helperText={error && error.includes('Password') ? error : ''}
              onChange={onChangeFunction}
              required
              margin="normal"

            >
            </TextField>
            <TextField
              id="shopid"
              name="shopid"
              label="Shop ID"
              variant="standard"
              margin="normal"
              onChange={shopAddOnchangeFunction}
              value={addShopFrmdata.shopid}
              fullWidth
            />
            <TextField
              id="shopname"
              name="shopname"
              label="Shop Name"
              variant="standard"
              margin="normal"
              onChange={shopAddOnchangeFunction}
              value={addShopFrmdata.shopname}
              fullWidth
            />
            <TextField
              id="shopaddress"
              name="shopaddress"
              label="Shop Address"
              variant="standard"
              margin="normal"
              onChange={shopAddOnchangeFunction}
              value={addShopFrmdata.shopaddress}
              fullWidth
            />
            <TextField
              id="shoppin"
              name="shoppin"
              label="Shop Pin"
              variant="standard"
              margin="normal"
              onChange={shopAddOnchangeFunction}
              value={addShopFrmdata.shoppin}
              fullWidth
            />
            <TextField
              id="shopcontactnum"
              name="shopcontactnum"
              type="text"
              variant="standard"
              label="Shop Contact Number"
              onChange={shopAddOnchangeFunction}
              value={addShopFrmdata.shopcontactnum}
              fullWidth
              margin="normal"
            />
            <TextField
              id="deliverytimefrom"
              name="deliverytimefrom"
              label="Delivery Time From"
              type="time"
              variant="standard"
              margin="normal"
              value={deliverytimefrom}
              onChange={(e) => setDeliveryTimeFrom(e.target.value)}
              fullWidth
            />
            <TextField
              id="deliverytimeto"
              name="deliverytimeto"
              label="Delivery Time Till"
              type="time"
              variant="standard"
              margin="normal"
              value={deliverytimeto}
              onChange={(e) => setDeliveryTimeTo(e.target.value)}
              fullWidth
            />
            {successMessage && <Typography color="success">{successMessage}</Typography>}
            <Box sx={{ marginTop: 2 }}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default AddShop;


