



// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Box, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Paper, Grid, Checkbox, FormControlLabel, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import axios from "axios";

// function Logout() {
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const navigate = useNavigate();
//     const [currentUser, setCurrentUser] = useState("");
//     const [pinnumber,setPinNumber] = useState('')
//     const location = useLocation();
//     const [updateItem,SetUpdateItem] = useState()
//     const { userId } = location.state || {};
    
//     useEffect(() => {
//         if (userId) {
//             setCurrentUser(userId); // Set the current user
//         } else {
//             console.error('User ID not found in state');
//             // Handle case where userId is not available (e.g., redirect or show a message)
//         }
//     }, [userId]);

//     const handleDrawerToggle = () => {
//         setDrawerOpen(!drawerOpen);
//     };
   

//     useEffect(() => {
//         const fetchOrderDetails = async () => {
//             try {
//                 const getOrderDetails = await axios.get(`http://localhost:4000/shopsDetails/${currentUser}`)
                
//                 console.log('API Response:', getOrderDetails.data); // Log the entire response
           
//                 console.log(getOrderDetails.data[0]);
                
//                 if (getOrderDetails.data.length > 0) {
//                     console.log(getOrderDetails.data[0]);
                    
//                     const pincode = getOrderDetails.data[0].shoppin;  // Assuming 'shoppin' represents the pincode
//                     console.log('Pincode:', pincode);
//                     setPinNumber(pincode)
//                     // You can now use this pincode in your application as needed
//                 } else {
//                     console.log('No data found');
//                 }
                 
//             } catch (err) {
//                 console.log('Error fetching order details:', err);
//             }
//         };

//         if (currentUser) {
//             fetchOrderDetails();
//         }
//     }, [currentUser]);

//     useEffect(() => {
//         const fetchOrderDetails = async () => {
//             try {
//                 const getOrderDetails = await axios.get(`http://localhost:4000/orderitempincode/${pinnumber}`)
                
//                 console.log('API Response:', getOrderDetails.data); // Log the entire response
                
//                 // Ensure the response is in the expected format
//                 if (Array.isArray(getOrderDetails.data)) {
//                     const uniqueOrders = getOrderDetails.data.filter((order, index, self) =>
//                         index === self.findIndex((t) => t.transactionId === order.transactionId)
//                     );
    
//                     // setOrderItem(uniqueOrders)
                    
//                 } else {
//                     console.error('Expected an array of orders, but got:', getOrderDetails.data);
//                 }
//             } catch (err) {
//                 console.log('Error fetching order details:', err);
//             }
//         };

//         if (pinnumber) {
//             fetchOrderDetails();
//         }
//     }, [pinnumber]);

//     console.log(pinnumber);
    

//     const handleAlerSubmit = (label) => {
//         console.log(label);
//         if (label === "Add inventory") {
//             // navigate('/bonus');
//             navigate('/shopOwnerAddProduct', { state: { userId: currentUser } });
//         } else if (label === "Update Delivery") {
//             // navigate('/about');
//             navigate('/updateProducts', { state: { userId: currentUser } });
//         } 
//     };


 

//     return (
//         <>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//                         <MenuIcon />
//                     </IconButton>
//                     <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//                         {['Add inventory','Update Delivery'].map((label) => (
//                             <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 20px', fontSize: "13px" }}>{label}</Button>
//                         ))}
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//             <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//                 <List className="drawer">
//                     {['Add inventory','Update Delivery'].map((text) => (
//                         <ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
//                             <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>
            
//         </>
//     );
// };

// export default Logout;
