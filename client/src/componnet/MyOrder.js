
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse } from '@mui/material';
import axios from "axios";
import AccountCircle from '@mui/icons-material/AccountCircle';
import '../Style/style.css';

function Myorder() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState("");
    const [orderItem, setOrderItem] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);  // Track which row is expanded
    const location = useLocation();
    const { userId, rendomId } = location.state || {};
    
    useEffect(() => {
        if (userId) {
            setCurrentUser(userId);
        } else {
            console.error('User ID not found in state');
        }
    }, [userId]);

    const handleAlerSubmit = (label) => {
        console.log(label);
        if(label === "My Bonus") {
            navigate('/bonus', { state: { userId: currentUser } })
        } else if(label === "About Us") {
            navigate('/about', { state: { userId: currentUser } })
        } else if(label === "Contact Us") {
            navigate('/contact', { state: { userId: currentUser } })
        // } else if(label === 'KYC') {
        //     navigate('/kyc', { state: { userId: currentUser } })
        } else if(label === "Referrals") {
            navigate('/refferals', { state: { userId: currentUser } })
        } else if(label === "Product List") {
            navigate('/product', { state: { userId: currentUser } })
        } else if(label === "My Profile") {
            navigate('/myprofile', { state: { userId: currentUser } })
        } else if(label === "My Orders") {
            navigate('/myorders', { state: { userId: currentUser } })
        } else if(label === "Our YouTube Channel") {
            navigate('/youtype', { state: { userId: currentUser } })
        } else if(label === "Logout") {
            navigate('/logout', { state: { userId: currentUser } })
        }else if(label === "PrivatePolicy"){
            navigate('/cusPrivatepolicy', { state: { userId: currentUser } }); 
        }
    }

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const getOrderDetails = await axios.get(`http://localhost:4000/orderitem/${currentUser}`)
                
                console.log('API Response:', getOrderDetails.data); // Log the entire response
                console.log(getOrderDetails.data);
                
                
                // Ensure the response is in the expected format
                if (Array.isArray(getOrderDetails.data)) {
                    const uniqueOrders = getOrderDetails.data.filter((order, index, self) =>
                        index === self.findIndex((t) => t.transactionId === order.transactionId)
                    );
    
                    setOrderItem(uniqueOrders)
                    
                } else {
                    console.error('Expected an array of orders, but got:', getOrderDetails.data);
                }
            } catch (err) {
                console.log('Error fetching order details:', err);
            }
        };

        if (currentUser) {
            fetchOrderDetails();
        }
    }, [currentUser]);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    // Toggle the expanded state of a specific row
    const handleRowClick = (index) => {
        if (expandedRow === index) {
            setExpandedRow(null);  // Close the row if it's already expanded
        } else {
            setExpandedRow(index);  // Expand the clicked row
        }
    };

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
                <List>
                    {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'PrivatePolicy', 'Logout'].map((text) => (
                        <ListItem button key={text} onClick={() => handleAlerSubmit(text)}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div >
            <TableContainer component={Paper} style={{ margin: '20px', maxHeight: '2000px',marginTop:"100px" }}>
    <Table stickyHeader>
        <TableHead>
            <TableRow>
                {/* <TableCell>User Id</TableCell> */}
                <TableCell style={{fontWeight:"bold"}}>Order Date</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Order Amount</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Order Items</TableCell>
                <TableCell style={{fontWeight:"bold"}}>TransactionId</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Order Status</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Otp Number</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Commant</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {Array.isArray(orderItem) && orderItem.length > 0 ? (
                orderItem.map((order, index) => (
                    <>
                        <TableRow key={index} onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
                            {/* <TableCell>{order.id}</TableCell> */}
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.price}</TableCell>
                            <TableCell>
                                {Array.isArray(order.orderItem) && order.orderItem.length > 0 ? (
                                    <div>View Items</div>
                                ) : (
                                    <div>No items found</div>
                                )}
                            </TableCell>
                           
                            <TableCell>{order.transactionId}</TableCell>
                            <TableCell>{order.orderstatus}</TableCell>
                            <TableCell>{order.otpnumber}</TableCell>
                            <TableCell>{order.cmd}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
                                <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                                    <div style={{ padding: '10px' }}>
                                        {Array.isArray(order.orderItem) && order.orderItem.length > 0 ? (
                                            <Table size="small" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>Item Name</TableCell>
                                                        <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>Price</TableCell>
                                                        <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>Unit</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {order.orderItem.map((item, idx) => (
                                                        <TableRow key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : 'white' }}>
                                                            <TableCell style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item.itemname}</TableCell>
                                                            <TableCell style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item.itemprice}</TableCell>
                                                            <TableCell style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item.itemunit}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        ) : (
                                            <div>No items available</div>
                                        )}
                                    </div>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={6} align="center">No orders found.</TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>
</TableContainer>


            </div>
        </>
    );
}

export default Myorder;



// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Box, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import axios from "axios";
// import '../Style/style.css';

// function Myorder() {
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const navigate = useNavigate();
//     const [currentUser, setCurrentUser] = useState("");
//     const [orderItem, setOrderItem] = useState([]);
//     const location = useLocation();
//     const { userId, rendomId } = location.state || {};
    
//     useEffect(() => {
//         if (userId) {
//             setCurrentUser(userId);
//         } else {
//             console.error('User ID not found in state');
//         }
//     }, [userId]);

//     const handleAlerSubmit = (label) => {
//         console.log(label);
//         if(label === "My Bonus") {
//             navigate('/bonus', { state: { userId: currentUser } })
//         } else if(label === "About Us") {
//             navigate('/about', { state: { userId: currentUser } })
//         } else if(label === "Contact Us") {
//             navigate('/contact', { state: { userId: currentUser } })
//         } else if(label === 'KYC') {
//             navigate('/kyc', { state: { userId: currentUser } })
//         } else if(label === "Referrals") {
//             navigate('/refferals', { state: { userId: currentUser } })
//         } else if(label === "Product List") {
//             navigate('/product', { state: { userId: currentUser } })
//         } else if(label === "My Profile") {
//             navigate('/myprofile', { state: { userId: currentUser } })
//         } else if(label === "My Orders") {
//             navigate('/myorders', { state: { userId: currentUser } })
//         } else if(label === "Our YouTube Channel") {
//             navigate('/youtype', { state: { userId: currentUser } })
//         } else if(label === "Logout") {
//             navigate('/logout', { state: { userId: currentUser } })
//         }
//     }

//     useEffect(() => {
//         const fetchOrderDetails = async () => {
//             try {
//                 const getOrderDetails = await axios.get(`http://localhost:4000/orderitem/${currentUser}`)
//                 console.log('API Response:', getOrderDetails.data); // Log the entire response
                
//                 // Ensure the response is in the expected format
//                 if (Array.isArray(getOrderDetails.data)) {
//                     setOrderItem(getOrderDetails.data);
//                 } else {
//                     console.error('Expected an array of orders, but got:', getOrderDetails.data);
//                 }
//             } catch (err) {
//                 console.log('Error fetching order details:', err);
//             }
//         };

//         if (currentUser) {
//             fetchOrderDetails();
//         }
//     }, [currentUser]);

//     const handleDrawerToggle = () => {
//         setDrawerOpen(!drawerOpen);
//     };

//     return (
//         <>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//                         <MenuIcon />
//                     </IconButton>
//                     <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//                         {['Product List', 'My Profile', 'KYC', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((label) => (
//                             <Button key={label} onClick={() => handleAlerSubmit(label)} color="inherit" style={{ margin: '0 20px', fontSize: "13px" }}>{label}</Button>
//                         ))}
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//             <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//                 <List>
//                     {['Product List', 'My Profile', 'KYC', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((text) => (
//                         <ListItem button key={text} onClick={() => handleAlerSubmit(text)}>
//                             <ListItemText primary={text} />
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>
//             <div>
//                 <TableContainer component={Paper} style={{ margin: '20px', maxHeight: '2000px' }}>
//                     <Table stickyHeader>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>User Id</TableCell>
//                                 <TableCell>Order Date</TableCell>
//                                 <TableCell>Order Amount</TableCell>
//                                 <TableCell>Order Items</TableCell>
//                                 <TableCell>Order Status</TableCell>
//                                 <TableCell>TransactionId</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {Array.isArray(orderItem) && orderItem.length > 0 ? (
//                                 orderItem.map((order, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell>{order.id}</TableCell>
//                                         <TableCell>{order.date}</TableCell>
//                                         <TableCell>{order.price}</TableCell>
//                                         <TableCell>
//                                             {Array.isArray(order.orderItem) && order.orderItem.length > 0 ? (
//                                                 order.orderItem.map((item, idx) => (
//                                                     <div key={idx}>
//                                                         <strong>{item.itemname}</strong><br />
//                                                         Price: {item.itemprice}<br />
//                                                         Unit: {item.itemunit}
//                                                     </div>
//                                                 ))
//                                             ) : (
//                                                 <div>No items found</div>
//                                             )}
//                                         </TableCell>
//                                         <TableCell>{order.orderstatus}</TableCell>
//                                         <TableCell>{order.transactionId}</TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan={6} align="center">No orders found.</TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </div>
//         </>
//     );
// }

// export default Myorder;



