

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { TextField, Button, Typography, Box, Paper, Select, MenuItem, FormControl, InputLabel, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';

const ShopOwnerAddProduct = () => {
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('');
    const [pinnumber,setPinNumber] = useState('')
    const [shopid,setShopId] = useState('');
    const [qty, setQty] = useState('');
    const [currentUser, setCurrentUser] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [formdata,setFormData] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const { userId, rendomId } = location.state || {};
    const [productType, setProductType] = useState('vegetable'); // New state for product type


    useEffect(() => {
        if (userId) {
            setCurrentUser(userId);
        } else {
            console.error('User ID not found in state');
        }
    }, [userId]);

   
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const getOrderDetails = await axios.get(`http://localhost:4000/shopsDetails/${currentUser}`)
                
                console.log('API Response:', getOrderDetails.data); // Log the entire response
                setFormData(getOrderDetails.data)
                console.log(getOrderDetails.data[0]);
                
                if (getOrderDetails.data.length > 0) {
                    console.log(getOrderDetails.data[0]);
                    
                    const pincode = getOrderDetails.data[0].shoppin;  // Assuming 'shoppin' represents the pincode
                    console.log('Pincode:', pincode);
                    setPinNumber(pincode)
                    // You can now use this pincode in your application as needed
                } else {
                    console.log('No data found');
                }
                 
            } catch (err) {
                console.log('Error fetching order details:', err);
            }
        };

        if (currentUser) {
            fetchOrderDetails();
        }
    }, [currentUser]);


    console.log(formdata);
    console.log(pinnumber);
    

 
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        

        const formData = new FormData();
        formData.append('shopid',pinnumber)
        formData.append('name', name);
        formData.append('unit', unit);
        formData.append('price', price);
        formData.append('qty', qty);
        formData.append('image_url', image);


        const apiUrl = productType === 'vegetable' ? process.env.REACT_APP_API_BASE_URL + '/vegetables' : process.env.REACT_APP_API_BASE_URL + '/fruits'; // Conditional endpoint

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
            setShopId('')
            setQty('');
            setImage(null);
            setProductType('vegetable'); 
        } catch (error) {
            setResponseMessage('Error adding product: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

      const handleAlerSubmit = (label) => {
        console.log(label);
        if (label === "Add inventory") {
            navigate('/shopOwnerAddProduct', { state: { userId: currentUser } });
        } else if (label === "View Order") {
            // navigate('/about');
            navigate('/updateProductsDetails', { state: { userId: currentUser } });
        }else if(label === 'Update product'){
            navigate('/shopownerUpdateproduct',{ state: { userId: currentUser } })

        }else if(label === 'Logout'){
            navigate('/shopownerlogoutPage',{ state: { userId: currentUser } })

        }else if(label === 'PrivatePolicy'){
            navigate('/shopOwnerPrivatePolicy',{ state: { userId: currentUser } })

        }
    };

    console.log(currentUser);
    

    return (
    <>
<AppBar position="fixed">
    <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
        </IconButton>
        
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {['Add inventory', 'View Order', 'Update product',  'PrivatePolicy','Logout'].map((label) => (
                <Button
                    key={label}
                    onClick={() => handleAlerSubmit(label)}
                    color="inherit"
                    sx={{
                        margin: '0 10px',
                        fontSize: '13px',
                        marginRight: '100px',
                        ':hover': {
                            backgroundColor: 'primary.main', // Adjust color
                            color: '#800040', // Adjust text color on hover
                        },
                    }}
                >
                    {label}
                </Button>
            ))}
        </Box>
        
        {/* Username and Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
        <IconButton
        color="inherit"
        onClick={() => navigate('/shopOwnerProfile', { state: { userId: currentUser } })}
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
                    {['Add inventory','View Order','Update product', 'PrivatePolicy','Logout'].map((text) => (
                        <ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
                            <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
      <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2,marginTop:"80px" }}>
     <Paper  elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:"5px" }}>
     <Typography style={{fontWeight:"bold"}} variant='h5' color='primary'>Add Product</Typography>
      
          <form onSubmit={handleSubmit}>
              {/* <FormControl fullWidth margin="normal" required> */}
                  <TextField
                   name='Shop id'
                   label= "Shop Id"
                   margin="normal"
                   variant='standard'
                //    onChange={(e) => setShopId(e.target.value)}
                   value={pinnumber}
                  fullWidth
                  style={{marginBottom:"30px"}}
                  
                   required
                   >

                  </TextField>
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
              {/* </FormControl>   */}
              <TextField
                  label="Product Name"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={name}
                  style={{marginBottom:"30px"}}
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

export default ShopOwnerAddProduct;


