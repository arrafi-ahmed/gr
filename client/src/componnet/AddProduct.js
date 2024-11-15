


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper, Select, MenuItem, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, InputLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';

const AddProduct = () => {
  // const allowedShopIds = [600458, 600123, 600110, 600200, 600300, 600400, 600600, 600030, 678998, 600023, 600100, 600029, 600024, 600405, 600460, 600456];
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [shopid, setShopId] = useState('');
  const [qty, setQty] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [productType, setProductType] = useState('vegetable');
  const [currentUser, setCurrentUser] = useState("");
  const location = useLocation();
  const [allowedShopIds, setallowedShopIds] = useState([])
  const { userId } = location.state || {};
  const navigate = useNavigate();
  const [shopIdError, setShopIdError] = useState(''); // Error state for invalid shop IDs

  useEffect(() => {
    if (userId) {
      setCurrentUser(userId);
    } else {
      console.error('User ID not found in state');
    }
  }, [userId]);


  useEffect(() => {
    const fetchDetails = async () => {
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL + '/ShopListdata');
      console.log(res.data);
      res.data.map((key, value) => {
        console.log(key.shoppin);
        setallowedShopIds((prevState) => [...prevState, key.shoppin])

      })
    };
    fetchDetails();
  }, []);

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
      if(menuItem === "OtpList"){
          navigate('/adminOtpDetails',{state:{userId:currentUser}})
      } else
      if(menuItem ===  'PrivatePolicy'){
          navigate('/adminprivatepolicy',{state:{userId:currentUser}})
      }


  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (shopIdError) {
      setResponseMessage('Please enter a valid Shop ID.');
      return;
    }

    const formData = new FormData();
    formData.append('shopid', shopid);
    formData.append('name', name);
    formData.append('unit', unit);
    formData.append('price', price);
    formData.append('qty', qty);
    formData.append('image_url', image);

    const apiUrl = productType === 'vegetable' ? process.env.REACT_APP_API_BASE_URL + '/vegetables' : process.env.REACT_APP_API_BASE_URL + '/fruits';

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponseMessage(response.data.message || 'Product added successfully!');
      setName('');
      setUnit('');
      setPrice('');
      setShopId('');
      setQty('');
      setImage(null);
      setProductType('vegetable');
    } catch (error) {
      setResponseMessage('Error adding product: ' + (error.response ? error.response.data.error : error.message));
    }
  };

  const handleShopIdChange = (e) => {
    const value = e.target.value;
    setShopId(value);

    // Validate shop ID against the allowed list
    if (!allowedShopIds.includes(Number(value))) {
      setShopIdError('Invalid Shop ID. Please enter a valid Shop ID.');
    } else {
      setShopIdError('');
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
          {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product', 'OtpList','PrivatePolicy','Logout'].map((text) => (
            <ListItem button key={text} onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 ,marginTop:"70px"}}>
        <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "40px" }}>
          <Typography style={{ fontWeight: "bold" }} variant='h5' color='primary'>Add Product</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name='shopid'
              label="Shop ID"
              margin="normal"
              variant='standard'
              onChange={handleShopIdChange}
              value={shopid}
              fullWidth
              error={!!shopIdError}
              helperText={shopIdError}
              required
            />
            <InputLabel>Product Type</InputLabel>
            <Select
              fullWidth
              value={productType}
              variant='standard'
              onChange={(e) => setProductType(e.target.value)}
            >
              <MenuItem value="vegetable">Vegetable</MenuItem>
              <MenuItem value="fruit">Fruit</MenuItem>
            </Select>
            <TextField
              label="Product Name"
              variant="standard"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              required
            />
            <TextField
              label="Unit"
              variant="standard"
              fullWidth
              margin="normal"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            />
            <TextField
              label="Price"
              variant="standard"
              fullWidth
              margin="normal"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <TextField
              label="Quantity"
              variant="standard"
              fullWidth
              margin="normal"
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              margin="normal"
            >
              Add Product
            </Button>
          </form>
          {responseMessage && <Typography color="error" sx={{ marginTop: 2 }}>{responseMessage}</Typography>}
        </Paper>
      </Box>
    </>
  );
};

export default AddProduct;

