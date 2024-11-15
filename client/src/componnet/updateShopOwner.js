


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Paper, Collapse, TextField, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import axios from "axios";
import AccountCircle from '@mui/icons-material/AccountCircle';

function UpdateShopOwner() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const [expandedRow, setExpandedRow] = useState(null);
    const [currentUser, setCurrentUser] = useState("");
    const location = useLocation();
    const [updateDetails, setUpdateDetails] = useState([]);
    const { userId } = location.state || {};
    const [showOtp,setShowOtp] = useState(false)
    const [pinnumber, setPinNumber] = useState('');
    const [otpInputs, setOtpInputs] = useState({}); // Object to hold OTPs per transaction

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
                const getOrderDetails = await axios.get(`http://localhost:4000/shopsDetails/${currentUser}`);
                if (getOrderDetails.data.length > 0) {
                    const pincode = getOrderDetails.data[0].shoppin;
                    setPinNumber(pincode);
                }
            } catch (err) {
                console.log('Error fetching order details:', err);
            }
        };

        if (currentUser) {
            fetchOrderDetails();
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const getOrderDetails = await axios.get(`http://localhost:4000/orderitempincode/${pinnumber}`);
                if (Array.isArray(getOrderDetails.data)) {
                    const uniqueOrders = getOrderDetails.data.filter((order, index, self) =>
                        index === self.findIndex((t) => t.transactionId === order.transactionId)
                    );
                    setUpdateDetails(uniqueOrders);
                } else {
                    console.error('Expected an array of orders, but got:', getOrderDetails.data);
                }
            } catch (err) {
                console.log('Error fetching order details:', err);
            }
        };

        if (pinnumber) {
            fetchOrderDetails();
        }
    }, [pinnumber]);

    console.log(updateDetails);
    

    const handleRowClick = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const handleOrderStatusChange = (index, newStatus) => {
        const updatedOrders = [...updateDetails];
        updatedOrders[index].orderstatus = newStatus;

        let newCmd = '';
        switch (newStatus) {
            case 'Ordered':
                newCmd = 'Ordered successfully!';
                break;
            case 'shipped':
                newCmd = 'Order shipped successfully!';
                break;
            case 'outforDelivery':
                newCmd = 'Order ready for delivery';
                break;
            case 'paymentfailed':
                newCmd = 'Payment status Failed';
                break;
            case 'Undelivered':
                newCmd = 'product Not delivery ';
                break;
            case 'Delivered':
                newCmd = 'Otp verification';
                break;
            default:
                newCmd = 'Order status updated!';
        }
        updatedOrders[index].cmd = newCmd;
        setUpdateDetails(updatedOrders);
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAlerSubmit = (label) => {
        if (label === "Add inventory") {
            navigate('/shopOwnerAddProduct', { state: { userId: currentUser } });
        } else if (label === "View Order") {
            navigate('/updateProductsDetails', { state: { userId: currentUser } });
        }else if(label === 'Update product'){
            navigate('/shopownerUpdateproduct',{ state: { userId: currentUser } })
        }else if(label === 'Logout'){
            navigate('/shopownerlogoutPage',{ state: { userId: currentUser } })

        }else if(label === 'PrivatePolicy'){
            navigate('/shopOwnerPrivatePolicy',{ state: { userId: currentUser } })

        }
    };

    const handleOtpInputChange = (transactionId, otpType, value) => {
        setOtpInputs(prevState => ({
            ...prevState,
            [transactionId]: {
                ...prevState[transactionId],
                [otpType]: value
            }
        }));
    };

    const handleBonusSubmit = async (transactionId, order) => {
        const otpData = otpInputs[transactionId] || {};
        const isOtpValid = otpData.otp2 === order.otpnumber && otpData.otp2 && otpData.otp2.length === 6; // Compare the user input OTP with the predefined OTP
    
        let cmdMessage = order.cmd; // Get the current cmd message from the input
    
        if (isOtpValid && order.orderstatus === 'Delivered') {
            cmdMessage = 'Order delivered successfully';
            setShowOtp(true);
        }
    
        try {
            const response = await axios.put(process.env.REACT_APP_API_BASE_URL + '/updateOrder', {
                transactionId,
                orderstatus: order.orderstatus,
                cmd: cmdMessage  // Send the updated cmd to backend
            });
            console.log('Order updated successfully:', response.data);
            alert(cmdMessage);
    
            // Update the cmd and order status in the state
            setUpdateDetails(prevDetails =>
                prevDetails.map(existingOrder =>
                    existingOrder.transactionId === transactionId
                        ? { ...existingOrder, cmd: cmdMessage, orderstatus: isOtpValid ? "Delivered" : existingOrder.orderstatus }
                        : existingOrder
                )
            );
        } catch (error) {
            console.error('Error updating order:', error);
            alert('Error updating order');
        }
    };
    

    //old data from not textfiled ku munnadii
    // const handleBonusSubmit = async (transactionId, order) => {
    //     const otpData = otpInputs[transactionId] || {};
    //     const isOtpValid = otpData.otp2 === order.otpnumber && otpData.otp2 && otpData.otp2.length === 6; // Compare the user input OTP with the predefined OTP
    
    //     let cmdMessage;
    //     if (isOtpValid && order.orderstatus === 'Delivered') {
    //         cmdMessage = 'Order delivered successfully';
    //         setShowOtp(true);
    //     } else 
    //     if(order.orderstatus === 'Ordered') {
    //         cmdMessage = 'Ordered successfully!';
    //     }else
    //     if(order.orderstatus === 'outforDelivery') {
    //         cmdMessage = 'Order ready for delivery';
    //     }else
    //     if(order.orderstatus === 'shipped'){
    //         cmdMessage="Order shipped successfully!"
    //     }else{
    //         cmdMessage="deliverd process"
    //     }
    
    //     try {
    //         const response = await axios.put(process.env.REACT_APP_API_BASE_URL + '/updateOrder', {
    //             transactionId,
    //             orderstatus: order.orderstatus,
    //             cmd: cmdMessage
    //         });
    //         console.log('Order updated successfully:', response.data);
    //         alert(cmdMessage); // Display appropriate message based on OTP validation
    
    //         // Update the order status and cmd message in the state to reflect the new status immediately
    //         setUpdateDetails(prevDetails => prevDetails.map(existingOrder => 
    //             existingOrder.transactionId === transactionId 
    //                 ? { ...existingOrder, cmd: cmdMessage, orderstatus: isOtpValid ? "Delivered" : existingOrder.orderstatus } 
    //                 : existingOrder
    //         ));
    //     } catch (error) {
    //         console.error('Error updating order:', error);
    //         alert('Error updating order');
    //     }
    // };
    

    console.log(showOtp);
    

    
    return (
        <>
           


<AppBar position="fixed">
    <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
        </IconButton>
        
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {['Add inventory', 'View Order', 'Update product', 'PrivatePolicy', 'Logout'].map((label) => (
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
            <Typography variant="body1" color="inherit" sx={{ marginRight: 1 }}>
                {currentUser || 'Username'} {/* Replace 'Username' with actual user name */}
            </Typography>
        </Box>
    </Toolbar>
</AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <List className="drawer">
                    {['Add inventory', 'View Order','Update product', 'PrivatePolicy','Logout'].map((text) => (
                        <ListItem button key={text} onClick={handleDrawerToggle}>
                            <ListItemText primary={text} onClick={() => handleAlerSubmit(text)} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <TableContainer component={Paper} style={{ margin: '20px', maxHeight: '2000px' ,marginTop:"84px"}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:"bolder",}}>Order Date</TableCell>
                            <TableCell style={{fontWeight:"bolder"}}>Order Amount</TableCell>
                            <TableCell style={{fontWeight:"bolder"}}>Order Items</TableCell>
                            <TableCell style={{fontWeight:"bolder"}}>TransactionId</TableCell>
                            <TableCell style={{fontWeight:"bolder"}}>Order Status</TableCell>
                            <TableCell style={{fontWeight:"bolder"}}>Comment</TableCell>
                            <TableCell style={{fontWeight:"bolder"}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(updateDetails) && updateDetails.length > 0 ? (
                            updateDetails.map((order, index) => (
                                <>
                                    <TableRow>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.price}</TableCell>
                                        <TableCell key={index} onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
                                            {Array.isArray(order.orderItem) && order.orderItem.length > 0 ? (
                                                <div>View Items</div>
                                            ) : (
                                                <div>No items found</div>
                                            )}
                                        </TableCell>
                                        <TableCell>{order.transactionId}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={order.orderstatus}
                                                onChange={(e) => handleOrderStatusChange(index, e.target.value)}
                                                fullWidth
                                            >
                                                <MenuItem value="Ordered">Ordered</MenuItem>
                                                <MenuItem value="shipped">Shipped</MenuItem>
                                                <MenuItem value="outforDelivery">Out For Delivery</MenuItem>
                                                <MenuItem value = "Undelivered">Undelivered</MenuItem>
                                                <MenuItem value = "paymentfailed">Payment Failed</MenuItem>
                                                <MenuItem value="Delivered">Delivered</MenuItem>
                                            </Select>
                                        </TableCell>
                                        {/* <TableCell>{order.cmd}</Ta                          bleCell> */}
                                        <TableCell>
                                            <TextField
                                                value={order.cmd || ""}
                                                onChange={(e) => {
                                                    const updatedOrders = [...updateDetails];
                                                    updatedOrders[index].cmd = e.target.value;
                                                    setUpdateDetails(updatedOrders);
                                                }}
                                                fullWidth
                                            />
                                        </TableCell>

                                        <TableCell>
                                            {(order.orderstatus === 'Delivered' && order.cmd !== 'Order delivered successfully') && (
                                                <>
                                                  
                                                    <TextField
                                                        label="Confirm OTP"
                                                        value={(otpInputs[order.transactionId] || {}).otp2 || ""}
                                                        onChange={(e) => handleOtpInputChange(order.transactionId, 'otp2', e.target.value)}
                                                        fullWidth
                                                        margin="normal"
                                                    />
                                                   <Typography variant="body2" color="error">
                                                        {((order.otpnumber !== otpInputs[order.transactionId]?.otp2) && otpInputs[order.transactionId]?.otp2) ? "OTPs do not match!" : ""}
                                                    </Typography>
                                                </>
                                            )}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleBonusSubmit(order.transactionId, order)}
                                                // onClick={() => handleBonusSubmit(order.transactionId, currentUser, order.orderstatus, order.cmd)}
                                            >
                                                Submit
                                            </Button>
                                        </TableCell>
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
                                <TableCell colSpan={7} align="center">No orders found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default UpdateShopOwner;
