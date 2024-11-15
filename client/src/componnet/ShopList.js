

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import moment from 'moment';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useLocation, useNavigate } from 'react-router-dom';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import { TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';

// const ShopList = () => {
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState([]);
//     const [editIdx, setEditIdx] = useState(-1);
//     const [currentUser, setCurrentUser] = useState("")
//     const location = useLocation();
//     const { userId } = location.state || {};
//     console.log(userId);

//     useEffect(() => {
//         if (userId) {
//             setCurrentUser(userId); // Set the current user
//         } else {
//             console.error('User ID not found in state');
//             // Handle case where userId is not available (e.g., redirect or show a message)
//         }
//     }, [userId])

//     useEffect(() => {
//         const fetchDetails = async () => {
//             const res = await axios.get(process.env.REACT_APP_API_BASE_URL + '/ShopListdata');
//             console.log(res.data);
//             setFormData(res.data);
//         };
//         fetchDetails();
//     }, []);

//     const handleDrawerToggle = () => {
//         setDrawerOpen(!drawerOpen);
//     };

//     const handleMenuClick = (menuItem) => {
//         if (menuItem === "Add Shop") {
//             navigate('/addShop', { state: { userId: currentUser } });
//         } else if (menuItem === "Customer List") {
//             navigate('/customerList', { state: { userId: currentUser } });
//         } else if (menuItem === "Update Product") {
//             navigate('/updateProducts', { state: { userId: currentUser } });
//         } else if (menuItem === "Add Product") {
//             navigate('/addToProduct', { state: { userId: currentUser } });
//         } else if (menuItem === "Logout") {
//             navigate('/adminLogout', { state: { userId: currentUser } });
//         }else
//         if(menuItem === "OtpList"){
//             navigate('/adminOtpDetails',{state:{userId:currentUser}})
//         }
//     };

//     const handleEdit = (index) => {
//         setEditIdx(index);
//     };

//     const handleSave = async (index) => {
//         const updatedShop = formData[index];
//         console.log("Updating shop data from frontend:", updatedShop);  // Log the data being sent
//         console.log(updatedShop);


//         try {
//             const response = await axios.put(`http://localhost:4000/updateShop/${updatedShop.shopid}`, updatedShop);
//             console.log("Response from server:", response.data);  // Log the server response
//             setEditIdx(-1);  // Exit edit mode after saving
//         } catch (error) {
//             console.error("Error updating shop data", error);
//         }
//     };


//     const handleChange = (e, index, field) => {
//         const updatedData = [...formData];
//         updatedData[index][field] = e.target.value;
//         setFormData(updatedData);
//     };

//     return (
//         <>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//                         <MenuIcon />
//                     </IconButton>
//                     <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//                         {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product','OtpList', 'Logout'].map((label) => (
//                             <p key={label} style={{ marginRight: "100px", cursor: "pointer" }} onClick={() => handleMenuClick(label)}>
//                                 {label}
//                             </p>
//                         ))}
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
//                         <IconButton color="inherit"
//                         	onClick={() => navigate('/adminProfile', { state: { userId: currentUser } })}>
//                             <AccountCircle />
//                         </IconButton>
//                         <Typography variant="body1" color="inherit" sx={{ marginRight: 1, }}>
//                             {currentUser || 'Username'} {/* Replace 'Username' with actual user name */}
//                         </Typography>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//             <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//                 <List>
//                     {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product','OtpList', 'Logout'].map((text) => (
//                         <ListItem button key={text} onClick={() => handleMenuClick(text)}>
//                             <ListItemText primary={text} />
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>

//             <Box mt={2}>
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell style={{ fontWeight: "bold" }}>Shop ID</TableCell>
//                                 <TableCell style={{ fontWeight: "bold" }}>Shop Name</TableCell>
//                                 <TableCell style={{ fontWeight: "bold" }}>Address</TableCell>
//                                 <TableCell style={{ fontWeight: "bold" }}>Pincode</TableCell>
//                                 <TableCell style={{ fontWeight: "bold" }}>Contact</TableCell>
//                                 <TableCell style={{ fontWeight: "bold" }}>Delivery Time From</TableCell>
//                                 <TableCell style={{ fontWeight: "bold" }}>Delivery Time To</TableCell>
//                                 <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {formData.map((shop, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell>{shop.shopid}</TableCell>
//                                     <TableCell>
//                                         {editIdx === index ? (
//                                             <TextField value={shop.shopname} onChange={(e) => handleChange(e, index, 'shopname')} />
//                                         ) : (
//                                             shop.shopname
//                                         )}
//                                     </TableCell>
//                                     <TableCell>
//                                         {editIdx === index ? (
//                                             <TextField value={shop.shopaddress} onChange={(e) => handleChange(e, index, 'shopaddress')} />
//                                         ) : (
//                                             shop.shopaddress
//                                         )}
//                                     </TableCell>
//                                     <TableCell>
//                                         {editIdx === index ? (
//                                             <TextField value={shop.shoppin} onChange={(e) => handleChange(e, index, 'shoppin')} />
//                                         ) : (
//                                             shop.shoppin
//                                         )}
//                                     </TableCell>
//                                     <TableCell>
//                                         {editIdx === index ? (
//                                             <TextField value={shop.shopcontactnum} onChange={(e) => handleChange(e, index, 'shopcontactnum')} />
//                                         ) : (
//                                             shop.shopcontactnum
//                                         )}
//                                     </TableCell>
//                                     <TableCell>
//                                         {editIdx === index ? (
//                                             <TextField value={shop.deliverytimefrom} onChange={(e) => handleChange(e, index, 'deliverytimefrom')} />
//                                         ) : (
//                                             moment(shop.deliverytimefrom, 'HH:mm:ss').format('hh:mm A')
//                                         )}
//                                     </TableCell>
//                                     <TableCell>
//                                         {editIdx === index ? (
//                                             <TextField value={shop.deliverytimeto} onChange={(e) => handleChange(e, index, 'deliverytimeto')} />
//                                         ) : (
//                                             moment(shop.deliverytimeto, 'HH:mm:ss').format('hh:mm A')
//                                         )}
//                                     </TableCell>
//                                     <TableCell>
//                                         {editIdx === index ? (
//                                             <Button variant="contained" color="primary" onClick={() => handleSave(index)}>Save</Button>
//                                         ) : (
//                                             <Button variant="outlined" color="secondary" onClick={() => handleEdit(index)}>Edit</Button>
//                                         )}
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </>
//     );
// };

// export default ShopList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';

const ShopList = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);
    const [editIdx, setEditIdx] = useState(-1);
    const [currentUser, setCurrentUser] = useState("");
    const location = useLocation();
    const { userId } = location.state || {};

    useEffect(() => {
        if (userId) {
            setCurrentUser(userId); // Set the current user
        } else {
            console.error('User ID not found in state');
        }
    }, [userId]);

    useEffect(() => {
        const fetchDetails = async () => {
            const res = await axios.get(process.env.REACT_APP_API_BASE_URL + '/ShopListdata');
            setFormData(res.data);
        };
        fetchDetails();
    }, []);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleMenuClick = (menuItem) => {
        if (menuItem === "Add Shop") {
            navigate('/addShop', { state: { userId: currentUser } });
        } else if (menuItem === "Customer List") {
            navigate('/customerList', { state: { userId: currentUser } });
        } else if (menuItem === "Update Product") {
            navigate('/updateProducts', { state: { userId: currentUser } });
        } else if (menuItem === "Add Product") {
            navigate('/addToProduct', { state: { userId: currentUser } });
        } else if (menuItem === "Logout") {
            navigate('/adminLogout', { state: { userId: currentUser } });
        } else if (menuItem === "OtpList") {
            navigate('/adminOtpDetails', { state: { userId: currentUser } });
        } else
        if(menuItem ===  'PrivatePolicy'){
            navigate('/adminprivatepolicy',{state:{userId:currentUser}})
        }
    };

    const handleEdit = (index) => {
        setEditIdx(index);
    };

    const handleSave = async (index) => {
        const updatedShop = formData[index];
        try {
            const response = await axios.put(`http://localhost:4000/updateShop/${updatedShop.shopid}`, updatedShop);
            setEditIdx(-1);  // Exit edit mode after saving
        } catch (error) {
            console.error("Error updating shop data", error);
        }
    };

    const handleChange = (e, index, field) => {
        const updatedData = [...formData];
        updatedData[index][field] = e.target.value;
        setFormData(updatedData);
    };

    // Function to delete a shop
    const handleDelete = async (shopid) => {
        try {
            await axios.delete(`http://localhost:4000/deleteShop/${shopid}`);
            // Remove the deleted shop from the state
            setFormData(formData.filter(shop => shop.shopid !== shopid));
            alert('Shop deleted successfully');
        } catch (error) {
            console.error('Error deleting shop:', error);
            alert('Failed to delete shop');
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
                        {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product', 'OtpList','PrivatePolicy', 'Logout'].map((label) => (
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
                        <Typography variant="body1" color="inherit" sx={{ marginRight: 1 }}>
                            {currentUser || 'Username'}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <List>
                    {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product', 'OtpList','PrivatePolicy', 'Logout'].map((text) => (
                        <ListItem button key={text} onClick={() => handleMenuClick(text)}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box mt={10}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>Shop ID</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Shop Name</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Address</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Pincode</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Contact</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Delivery Time From</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Delivery Time To</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Edit</TableCell>
                                <TableCell  style={{ fontWeight: "bold" }}>Delete</TableCell>
                                {/* <TableCell  style={{ fontWeight: "bold" }}></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {formData.map((shop, index) => (
                                <TableRow key={index}>
                                    <TableCell>{shop.shopid}</TableCell>
                                    <TableCell>
                                        {editIdx === index ? (
                                            <TextField value={shop.shopname} onChange={(e) => handleChange(e, index, 'shopname')} />
                                        ) : (
                                            shop.shopname
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editIdx === index ? (
                                            <TextField value={shop.shopaddress} onChange={(e) => handleChange(e, index, 'shopaddress')} />
                                        ) : (
                                            shop.shopaddress
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editIdx === index ? (
                                            <TextField value={shop.shoppin} onChange={(e) => handleChange(e, index, 'shoppin')} />
                                        ) : (
                                            shop.shoppin
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editIdx === index ? (
                                            <TextField value={shop.shopcontactnum} onChange={(e) => handleChange(e, index, 'shopcontactnum')} />
                                        ) : (
                                            shop.shopcontactnum
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editIdx === index ? (
                                            <TextField value={shop.deliverytimefrom} onChange={(e) => handleChange(e, index, 'deliverytimefrom')} />
                                        ) : (
                                            moment(shop.deliverytimefrom, 'HH:mm:ss').format('hh:mm A')
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editIdx === index ? (
                                            <TextField value={shop.deliverytimeto} onChange={(e) => handleChange(e, index, 'deliverytimeto')} />
                                        ) : (
                                            moment(shop.deliverytimeto, 'HH:mm:ss').format('hh:mm A')
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editIdx === index ? (
                                            <Button variant="contained" color="primary" onClick={() => handleSave(index)}>Save</Button>
                                        ) : (
                                            <>
                                                <Button variant="outlined" color="secondary" onClick={() => handleEdit(index)}>Edit</Button>
                                               
                                            </>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                    <Button variant="outlined" color="error" onClick={() => handleDelete(shop.shopid)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default ShopList;

