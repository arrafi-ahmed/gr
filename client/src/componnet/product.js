
import React, { useState, useEffect } from 'react';
// import Alert from '@mui/material/Alert';


import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  IconButton,
  Box,
  Chip,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import '../Style/style.css'


const Product = () => {
  const [products, setProducts] = useState([]);
  const [fruitProducts, setFruitProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [formdata,setFormData] = useState({});
  const [transactionids,setTransactionId] = useState('')
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [fullPrice,setfullPrice] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [shopid,setshopid] = useState('')
  const [quantity, setQuantity] = useState(1);
 
  const [finalBonus, setFinalBonus] = useState({})

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("")
  const location = useLocation();
  const { userId,rendomId} = location.state || {};
  //  var fullPrice = 0// Declare for the calculation of total purchesed amount.
  console.log(fullPrice)
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


  useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/customer/${currentUser}`);
            setshopid(response.data.userpincode)
       
            
        } catch (err) {
            console.error(err);
        }
    };
    

    if (currentUser) {
        fetchUserDetails();
        
    }
}, [currentUser,shopid]);

console.log(shopid);

  


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/vegetables/${shopid}`);
        console.log(response);

        console.log(shopid);
        
        
        // const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/vegetables');
        const vegetables = response.data.map(product => ({
          ...product,
          id: `veg-${product.id}`, // Unique ID for vegetables
        }));
        setProducts(vegetables);
        if (selectedCategory === 'vegetable' || selectedCategory === 'all') {
            setFilteredProducts(vegetables);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };
   if(shopid){
    fetchProducts();
    
   } 
   
  }, [selectedCategory,currentUser,shopid]);

  useEffect(() => {
    const fetchFruitsProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/fruits/${shopid}`);
        console.log(res);
        
        // const res = await axios.get(process.env.REACT_APP_API_BASE_URL + '/fruits');
        const fruits = res.data.map(product => ({
          ...product,
          id: `fruit-${product.id}`, // Unique ID for fruits
        }));
        setFruitProducts(fruits);
        if (selectedCategory === 'fruit' || selectedCategory === 'all') {
         setFilteredProducts(fruits);
        }
      } catch (err) {
        setError('Failed to fetch fruits.');
      }
    };
    if(shopid){
      fetchFruitsProduct();
    }
    
  }, [selectedCategory,shopid]);
     
  useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/customer/${currentUser}`);
            console.log(response.data);
            setFormData(response.data)
           
            // const res = await axios.post(process.env.REACT_APP_API_BASE_URL + '/customer',{})
            
            // setFormData(response.data);
            // setPersonalDetails({
            //     email: response.data.email,
            //     userid: response.data.userid,
            //     phno: response.data.phno,
            //     userpincode: response.data.userpincode,
            //     useraddress: response.data.useraddress,
            // });
        } catch (err) {
            console.error(err);
        }
    };

    if (currentUser) {
        fetchUserDetails();
        
    }
}, [currentUser,fullPrice]);

  useEffect(() => {
    let filtered = [];
    if (selectedCategory === 'vegetable') {
      filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (selectedCategory === 'fruit') {
      filtered = fruitProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if(selectedCategory === 'all') {
      filtered = [...products, ...fruitProducts].filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [searchTerm, products, fruitProducts,selectedCategory]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleAddToCart = (product, quantity) => {
    console.log(cart);

    
    const existingProduct = cart.find(item => item.id === product.id);
   
    if (existingProduct) {
      console.log(existingProduct);
      
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
      
    } else {
      console.log(product);
      
      setCart([...cart, { ...product, quantity }]);
    }
    toast.success(`${quantity} ${product.name} added to cart!`);
    
  };

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  
 


  const handleAlerSubmit = (label) => {
    console.log(label);
    if(label === "My Bonus"){
      // navigate('/bonus', { state: finalBonus })
      navigate('/bonus',{ state: { userId: currentUser } })
    }else 
    if(label === "About Us"){
      navigate('/about',{ state: { userId: currentUser } })
    }else
    if(label === "Contact Us"){
      navigate('/contact',{ state: { userId: currentUser } })
    }else
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
		navigate('/myorders',{ state: { userId: currentUser ,rendomId:transactionids} })
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
  console.log(filteredProducts);
  console.log(cart);


console.log(fullPrice);




const handleBuyNow = async () => {
    setAlertOpen(true);
    setCartOpen(!cartOpen);
    console.log(cart);
    setCart([])  //this one remove empty card
    console.log(formdata);
    toast.success('ThanYou For buy This products');
    navigate('/myorders',{ state: { userId: currentUser ,rendomId:transactionids} })
    
    const today = new Date().toISOString().split('T')[0]; // Just the date
    // const formattedDate = new Date();
// const  today = ('0' + formattedDate.getDate()).slice(-2) + '/' 
//     + ('0' + (formattedDate.getMonth() + 1)).slice(-2) + '/' 
//     + formattedDate.getFullYear();
    var transcationId=0 ;

    try {
        const orders = cart.map(item => ({
            id: userId,
            image_url: item.image_url,
            name: item.name,
            price: item.price,
            unit: item.unit,
            quantity: item.quantity,
            transcationId : transcationId+1,
            date: today // Use formatted date
        }));
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        const otpNumber    = Math.floor(Math.random()*900000)+100000;
        const amt = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)
        setTransactionId(randomNumber)
        // const ordersDetails = {
        //   id : userId,
        //   price : amt,
        //   date  : today,
        //   orderstatus : "delivery",
        //   transcationId : randomNumber,
        //   orderItem: cart.map(item => ({
        //     itemname: item.name,
        //     itemprice: item.price,
        //     itemunit: item.unit,
        //   })),
         
         

        // }
        const ordersDetails = {
          id: userId,
          pincode : shopid,
          price: amt,
          date: today,
          cmd : 'Your Order Scussfully',
          otpnumber:otpNumber,
          orderstatus: "Ordered",
          transactionId: randomNumber, // Corrected the spelling of transactionId
          orderItem: cart.map(item => ({
            itemname: item.name,
            itemprice: (item.price * item.quantity).toFixed(2),
            // itemunit: item.unit 
            itemunit : item.quantity * parseInt(item.unit) >= 1000
            ? `${(item.quantity * parseInt(item.unit)) / 1000} kg`
            : `${item.quantity * parseInt(item.unit)} grm`

            // itemunit  :   item.quantity * parseInt(item.unit) >= 1000
            //   ? `${(item.quantity * parseInt(item.unit)) / 1000} kg`
            //   : `${item.quantity * parseInt(item.unit)} grm`
          
          }))
        };
        

       cart.map((key,value)=>{
        console.log(key.qty);
        console.log(key.quantity);
        const stock = (key.qty - key.quantity)
        console.log(stock);
       })
        

        console.log(ordersDetails);
        console.log("***************************");
        console.log(amt);
        setfullPrice(amt)
        const bonusData = {
          userid: userId,
          // transid: transcationId + 1,
          transid : randomNumber,
          bonus1: amt * 0.30,  // 30% of amt
          refid1: formdata.refid1,
          bonus2: amt * 0.20,  // 20% of amt
          refid2: formdata.refid2,
          bonus3: amt * 0.10,  // 10% of amt
          refid3: formdata.refid3,
          date   : today,
      };
      //   const bonusData = {
      //     userid: userId,
      //     // refid1:  formdata.refid1,// Assuming you have refid1 in customerData
      //     // refid2: formdata.refid2,
      //     // refid3:formdata.refid3,
      //     // transcationId : transcationId+1
      //     transid : transcationId + 1,
      //     // bonus1  : (fullPrice*30/100),
      //     // bonus1 :"200",
      //     bonus1 : amt%30/100,
      //     refid1  : formdata.refid1,
      //     // bonus2 : (fullPrice*20/100),
      //     // bonus2:"300",
      //     bonus2:amt%20/100,
      //     refid2  :  formdata.refid2,
      //     // bonus3 : (fullPrice/10),
      //     // bonus3:"400",
      //     bonus3 : (amt/10),
      //     refid3  :  formdata.refid3,
         
      const orderDetailss  = await axios.post(process.env.REACT_APP_API_BASE_URL + '/orderitem',ordersDetails)
        console.log(orderDetailss.data);
        
        
        for (let item of cart) {
          console.log(item.type);
          
          const newStock = item.qty - item.quantity;  // Calculate new stock
          console.log(newStock);
          console.log(cart);
          
          
          // Check if the item is a fruit or vegetable, then update respective table
          for (let item of cart) {
            const newStock = item.qty - item.quantity;  // Calculate new stock quantity
        
            // Determine type based on the prefix of the item ID
            if (item.id.startsWith('fruit-')) {
                await axios.put(`http://localhost:4000/fruits/updateStock/${item.id.split('-')[1]}`, { newStock });
                console.log(`Updated fruit ${item.name} stock to ${newStock}`);
            } else if (item.id.startsWith('veg-')) {
                await axios.put(`http://localhost:4000/vegetables/updateStock/${item.id.split('-')[1]}`, { newStock });
                console.log(`Updated vegetable ${item.name} stock to ${newStock}`);
            }
        }
        
      }

        // const getOrderDetails =  await axios.get(`http://localhost:4000/orderitem/${ordersDetails.transactionId}`)
        // console.log(getOrderDetails.data);
        
        
          const res = await axios.post(process.env.REACT_APP_API_BASE_URL + '/bonusAdd',bonusData)
          console.log(res);
          const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/orderDetails', orders);
          console.log(response.data);
          
      } catch (err) {
          console.error('Error inserting orders:', err.response ? err.response.data : err.message);
      }
  };


    if (loading) return <Typography variant="h6">Loading...</Typography>;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  console.log(fullPrice);



    return (
      
     <>
        <AppBar position="fixed"  sx={{ width: '100vw', overflow: 'hidden' }}>
          <Toolbar>
            <IconButton edge="start" color="red" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'PrivatePolicy', 'Logout'].map((label) => (
                <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 10px', fontSize: "13px", }}>{label}</Button>
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
            {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us',  'PrivatePolicy','Logout'].map((text) => (
              <ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
                <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <div>
          <Grid container>
            <Grid item xs={12} md={12}>

            <Container maxWidth={false} disableGutters>
         <ToastContainer
             position="bottom-right"
             autoClose={5000}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss
             draggable
             pauseOnHover
             theme="light"   
         />
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3} mt={8} id="product">
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Fresh Fruit & Vegetables
          </Typography>
          <Box>
            <TextField
              variant="outlined"
              placeholder="Search Products"
              size="small"
              value={searchTerm}
              style={{ marginRight: "20px",marginTop:"20px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
            />
              <IconButton color="inherit" onClick={handleCartToggle} style={{marginTop:"20px"}}>
                <Badge badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)} color="error">
                  <AddShoppingCartIcon />
                </Badge>
              </IconButton>
          </Box>
        </Box>
        <Box mb={3}>
          <Chip
            label="All"
            onClick={() => setSelectedCategory('all')}
            color={selectedCategory === 'all' ? 'primary' : 'default'}
            sx={{ mr: 1 }}
          />
          <Chip
            label="Vegetables"
            onClick={() => setSelectedCategory('vegetable')}
            color={selectedCategory === 'vegetable' ? 'primary' : 'default'}
            sx={{ mr: 1 }}
          />
          <Chip
            label="Fruits"
            onClick={() => setSelectedCategory('fruit')}
            color={selectedCategory === 'fruit' ? 'primary' : 'default'}
          />
        </Box>
      <div>
      <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
                 <Card>
                <CardMedia
                  component="img"
                  // height="140"
                  image={product.image_url}
                  onClick={() => handleImageClick(product)} // Add this line
                  style={{ cursor: 'pointer', objectFit: 'cover',width: '100%'}} 
                
                  alt={product.name}
                /> 
                <CardContent>
                  <div>
                    <Typography variant="h5" style={{ display: "flex", justifyContent: "center", fontFamily: "Tahoma, Verdana, sans-serif" }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                    <Typography variant="body2" color="text.primary">Price: ${product.price}</Typography>
                    <Typography variant="body2" color="text.primary">{product.unit}</Typography>
                    <Typography variant="body2" color="text.primary">{product.qty} stock available</Typography>
                  </div>
                  <div style={{ display: "flex", height: "35px" }}>
                  <input
                    type='number'
                    size="4"
                    style={{ height: "35px", width: "50px", marginRight: "20px" }}
                    min="1" // Minimum quantity is 1
                    max={product.qty} // Maximum quantity is the available stock
                    step="1"
                    defaultValue="1"
                    id={`quantity-${product.id}`} // Unique ID for the input
                    onInput={(e) => {
                      // Ensure that the value stays within the range
                      const value = Math.max(1, Math.min(product.qty, e.target.value));
                      e.target.value = value;
                    }}
                  />
                    <Button
                      size="small"
                      color="primary"
                      variant='contained'
                      style={{ marginRight: "20px", width: "100%" }}
                      onClick={() => {
                        const quantity = parseInt(document.getElementById(`quantity-${product.id}`).value) || 1;
                        handleAddToCart(product, quantity);
                      }}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </CardContent>  
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Dialog
          open    ={cartOpen}
          onClose ={handleCartToggle}
          fullWidth
          maxWidth="sm"
          sx={{ '& .MuiDialogContent-root': { padding: '16px' } }} // Adjust padding if necessary
        >
          <DialogTitle color='green' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Shopping Cart
            <Button variant='contained' onClick={handleCartToggle}>Add More</Button>
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', maxHeight: '70vh', overflowY: 'auto' }}>
            {cart.length === 0 ? (
              <Typography>No items in the cart.</Typography>
            ) : (
              cart.map(item => {
                const totalPrice = (item.price * item.quantity).toFixed(2);
                const amt = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)
                
                
                // fullPrice=fullprice+totalPrice

                // fullPrice = fullPrice+ totalPrice;
                //  setfullPrice(fullPrice+totalPrice)
                  
                return (
                  <Box
                    key={item.id}
                    mb={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ borderBottom: '1px solid #ddd', pb: 1 }}
                  >
                    <CardMedia
                      component="img"
                      height="70"
                      image={item.image_url}
                      alt={item.name}
                      sx={{ width: { xs: '30%', sm: '20%' }, borderRadius: 1 }} // Responsive image width
                    />
                    <Box flexGrow={1} ml={2}>
                      <Typography variant="h6" noWrap>{item.name}</Typography>
                      {/* <Typography variant="body2" color="text.primary">{item.quantity * parseInt(item.unit)}kg</Typography> */}
                      <Typography variant="body2" color="text.primary">
                          {item.quantity * parseInt(item.unit) >= 1000
                            ? `${(item.quantity * parseInt(item.unit)) / 1000} kg`
                            : `${item.quantity * parseInt(item.unit)} grm`}
                      </Typography>
                    
                      <Typography variant="body2">Price: ₹{item.price}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ minWidth: '150px', justifyContent: 'space-between', flexShrink: 0 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          if (item.quantity > 1) {
                            setCart(cart.map(cartItem =>
                              cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                            ));
                            
                          }
                        }}
                        sx={{ marginRight: 1 }}
                      >
                        -
                      </Button>
                      <Typography variant="body2" style={{ margin: "0 10px" }}>{item.quantity}</Typography>
                      {/* <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setCart(cart.map(cartItem =>
                            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                          ));
                        }}
                      >
                        +
                      </Button> */}
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          // Increase quantity only if it's less than available stock (item.qty)
                          if (item.quantity < item.qty) {
                            setCart(cart.map(cartItem =>
                              cartItem.id === item.id
                                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                : cartItem
                            ));
                          } else {
                            console.log('Cannot add more, stock limit reached');
                          }
                        }}
                      >
                        +
                      </Button>
                      <Typography variant="body2" fontWeight="bold" style={{ marginLeft: "20px" }}>₹{totalPrice}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => setCart(cart.filter(cartItem => cartItem.id !== item.id))} // Remove item from cart
                        sx={{ marginLeft: 2 }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })
            )}
            {/* <Typography variant='body2' fontWeight="bold" style={{marginLeft:"20px"}}>Total Amount : ₹{}</Typography> */}
            <Typography variant='body2' fontWeight="bold" style={{ marginLeft: "20px" }}>
                Total Amount: ₹{cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
               
            </Typography>

            {alertOpen && (
              <Alert severity="success" onClose={() => setAlertOpen(false)} sx={{ mt: 2 }}>
                Purchase successful! Bonus added.
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCartToggle} color="primary">Close</Button>
            <Button variant="contained" color="secondary" onClick={handleBuyNow}>Buy Now</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
    {/* <DialogTitle>{selectedProduct?.name}</DialogTitle> */}
    <DialogContent>
      {selectedProduct && (
        <Box>
          <CardMedia
            component="img"
            height="200"
            // style={{ cursor: 'pointer', objectFit: 'cover',width: '100%'  }} 
            image={selectedProduct.image_url}
            alt={selectedProduct.name}
          />
          <Typography variant='h5' color='text.secondary' style={{justifyContent:"center",display:"flex"}}>{selectedProduct.name}</Typography>
          <Typography variant="body2" color="text.secondary">{selectedProduct.description}</Typography>
          <Typography variant="body2" color="text.primary"> ₹{selectedProduct.price}</Typography>
          {/* {cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)} */}
          <Typography variant="body2" color="text.primary">{selectedProduct.unit}</Typography>
          {/* <Typography variant="body2" color="text.primary">{quantity * parseFloat(selectedProduct.unit)}kg</Typography>   */}
          <Typography variant="body2" color="text.primary">{selectedProduct.qty} stock available</Typography>
          <div style={{ display: "flex", height: "35px" }}>
          <input
                    type='number'
                    size="4"
                    style={{ height: "35px", width: "50px", marginRight: "20px" }}
                    min="1" // Minimum quantity is 1
                    max={selectedProduct.qty} // Maximum quantity is the available stock
                    step="1"
                    defaultValue="1"
                    id={`quantitys-${selectedProduct.id}`} // Unique ID for the input
                    onInput={(e) => {
                      // Ensure that the value stays within the range
                      const value = Math.max(1, Math.min(selectedProduct.qty, e.target.value));
                      e.target.value = value;
                      setQuantity(e.target.value)
                    }}
                  />
            {/* <input
              type='number'
              size="4"
              style={{ height: "35px", width: "50px", marginRight: "20px" }}
              min="1"
              step="1"
              defaultValue="1"
              id={`quantitys-${selectedProduct.id}`} // unique ID for the input */}
            {/* /> */}
            <Button
              size="small"
              color="primary"
              variant='contained'
              style={{ marginRight: "20px", width: "100%" }}
              onClick={() => {
                const quantity = parseInt(document.getElementById(`quantitys-${selectedProduct.id}`).value) || 1;
                handleAddToCart(selectedProduct, quantity);setModalOpen(false);
                
              }}
            >
              Add
            </Button>
            </div>
            </Box>
        
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setModalOpen(false)} color="primary">Close</Button>
    </DialogActions>
  </Dialog>




      </Container>

            </Grid>

          </Grid>
        </div>
        
      </>
    );
  };

  export default Product;


