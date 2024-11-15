

import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Drawer, List, ListItem, ListItemText, TextField, Container, Paper,Button, Typography, Select, InputLabel, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const AdminPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Add Shop");
  const [deliverytimefrom, setDeliveryTimeFrom] = useState(moment().format("HH:mm"));
  const [deliverytimeto, setDeliveryTimeTo] = useState(moment().format("HH:mm"));
  const [successMessage, setSuccessMessage] = useState('');
  const [addShopFrmdata,setAddShopFrmdata] = useState({
    shopid:"",
    shopname:"",
    shopaddress :"",
    shoppin:"",
    shopcontactnum :"",
  })
  const navigate = useNavigate();
  const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState('');
    const [image, setImage] = useState(null);
    const [shopid,setShopId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [productType, setProductType] = useState('vegetable'); // New state for product type

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('shopid',shopid)
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

  const shopAddOnchangeFunction=(event)=>{
    const {name,value} = event.target
    setAddShopFrmdata((prevState)=>({
      ...prevState,
      [name]  : value
    }))
  }

  console.log(addShopFrmdata);
  

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (menuItem) => {
    console.log(menuItem);
    if(menuItem === "Add Shop"){
      // navigate('/bonus', { state: finalBonus })
      navigate('/addShop')
    }else 
    if(menuItem === "Shop List"){
      // navigate('/bonus', { state: finalBonus })
      navigate('/shopList')
    }else
    if(menuItem === "Customer List"){
      // navigate('/bonus', { state: finalBonus })
      navigate('/customerList')
    }else
    if(menuItem === "Update Product"){
      // navigate('/bonus', { state: finalBonus })
      navigate('/updateProducts')
    }
    if(menuItem === "Add Product"){
      // navigate('/bonus', { state: finalBonus })
      navigate('/addToProduct')
    }else
    if(menuItem === "Logout"){
      // navigate('/bonus', { state: finalBonus })
      navigate('/adminLogout')
    } else
    if(menuItem ===  'PrivatePolicy'){
        navigate('/adminprivatepolicy')
    }
    
    
    // setSelectedMenu(menuItem);
  }

  const handleSubmitAddShop = async (event) => {
    event.preventDefault();
    const dateTimeObj = {
      deliverytimefrom,
      deliverytimeto
    };
    const addShopDetails = { ...addShopFrmdata, ...dateTimeObj };
  
    try {
      const res = await axios.post(process.env.REACT_APP_API_BASE_URL + '/shops', addShopDetails);
      console.log(res);
  
      // Clear the form fields after successful submission
      setAddShopFrmdata({
        shopid: '',
        shopname: '',
        shopaddress: '',
        shoppin: '',
        shopcontactnum: '',

      });
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
  //  const handleSubmitAddShop = async(event) => {
  //   event.preventDefault();
  //   console.log(addShopFrmdata);
  //   const dateTimeObj = {
  //     deliverytimefrom,
  //     deliverytimeto
  //   }
  //   const addShodetails = {...addShopFrmdata,...dateTimeObj}
  //   console.log(addShodetails);
  //   try{
  //     const res = await axios.post(process.env.REACT_APP_API_BASE_URL + '/shops',addShodetails)
  //     console.log(res);

  //   }catch(err){
  //     console.log(err);
      

  //   }
  
    

    
      
  //   // Handle form submission logic here
   
  // };

  const shopProdutSubmitFunction=async()=>{
    // const res = await axios.post(process.env.REACT_APP_API_BASE_URL + '/shops',)

  }

  useEffect(()=>{
    if(selectedMenu === "Update Product"){

    }


  },[])

  return (
    <>
      <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
        <MenuIcon />
      </IconButton>
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        {['Add Shop','Shop List','Customer List','Update Product','Add Product','Logout'].map((label) => (
          <p key={label} style={{ marginRight: "150px",cursor:"pointer" }} onClick={() => handleMenuClick(label)}>
            {label}
          </p>
        ))}
      </Box>
    </Toolbar>
  </AppBar>
  {selectedMenu ? 
    "":
    ""
  }

    </>
     
      )
  
};

export default AdminPage;






