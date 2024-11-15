

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import moment from 'moment';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useLocation, useNavigate } from 'react-router-dom';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import { TextField, Button, Typography, Box, Paper, Select, MenuItem, FormControl, InputLabel, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

// const AdminProfile = () => {
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const navigate = useNavigate();
//     const [formData, setformdata] = useState([])
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
//         const fetchOrderDetails = async () => {
//             try {
//                 const getOrderDetails = await axios.get(`http://localhost:4000/adminPage/${currentUser}`);
//                 console.log(getOrderDetails.data);
//                 setformdata(getOrderDetails.data)
                
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

//     console.log(userId);
    

//     const handleMenuClick = (menuItem) => {
//         if (menuItem === "Add Shop") {
//             // navigate('/bonus', { state: finalBonus })
//             navigate('/addShop', { state: { userId: currentUser } })
//         } else
//             if (menuItem === "Shop List") {
//                 // navigate('/bonus', { state: finalBonus })
//                 navigate('/shopList', { state: { userId: currentUser } })
//             } else
//                 if (menuItem === "Customer List") {
//                     // navigate('/bonus', { state: finalBonus })
//                     navigate('/customerList', { state: { userId: currentUser } })
//                 } else
//                     if (menuItem === "Update Product") {
//                         // navigate('/bonus', { state: finalBonus })
//                         navigate('/updateProducts', { state: { userId: currentUser } })
//                     }
//         if (menuItem === "Add Product") {
//             // navigate('/bonus', { state: finalBonus })
//             navigate('/addToProduct', { state: { userId: currentUser } })
//         } else
//             if (menuItem === "Logout") {
//                 // navigate('/bonus', { state: finalBonus })
//                 navigate('/adminLogout', { state: { userId: currentUser } })
//             }


//     };


//     return (
//         <>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//                         <MenuIcon />
//                     </IconButton>
//                     <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//                         {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product', 'Logout'].map((label) => (
//                             <p key={label} style={{ marginRight: "150px", cursor: "pointer" }} onClick={() => handleMenuClick(label)}>
//                                 {label}
//                             </p>
//                         ))}
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
//                         <IconButton color="inherit" onClick={() => navigate('/adminProfile', { state: { userId: currentUser } })}>
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
//                     {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product', 'Logout'].map((text) => (
//                         <ListItem button key={text} onClick={() => handleMenuClick(text)}>
//                             <ListItemText primary={text} />
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>
//                     <Box display="flex" justifyContent="center" mt={4}>
//                         <Paper elevation={4} sx={{ padding: 4, maxWidth: 500, width: '100%', backgroundColor: '#f9f9f9', borderRadius: 2 }}>
//                             <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
//                                 Admin Profile
//                             </Typography>
//                             <Box mt={3} textAlign="center">
//                                 <Typography variant="h6" sx={{ mb: 1, color: '#555' }}>
//                                     <strong>User ID:</strong> <span style={{ fontWeight: 400 }}>{formData.userid}</span>
//                                 </Typography>
//                                 <Typography variant="h6" sx={{ mb: 1, color: '#555' }}>
//                                     <strong>Email:</strong> <span style={{ fontWeight: 400 }}>{formData.email}</span>
//                                 </Typography>
//                                 <Typography variant="h6" sx={{ color: '#555' }}>
//                                     <strong>Phone Number:</strong> <span style={{ fontWeight: 400 }}>{formData.phno}</span>
//                                 </Typography>
//                             </Box>
//                         </Paper>
//                  </Box>

//         </>
//     );
// };

// export default AdminProfile;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {
  Typography, Box, Paper, AppBar, Toolbar, IconButton, Drawer, List,
  ListItem, ListItemText, Button, TextField
} from '@mui/material';

const AdminProfile = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const { userId } = location.state || {};

  useEffect(() => {
    if (userId) {
      setCurrentUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/adminPage/${currentUser}`);
        setFormData(response.data);
      } catch (err) {
        console.log('Error fetching admin details:', err);
      }
    };

    if (currentUser) {
      fetchAdminProfile();
    }
  }, [currentUser]);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  
  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/adminPage/${currentUser}`, formData);
      setIsEditing(false); // Exit edit mode
      alert('Profile updated successfully');
    } catch (err) {
      console.log('Error updating admin details:', err);
      alert('Error updating profile');
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
            {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product','OtpList', 'PrivatePolicy','Logout'].map((label) => (
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
          {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product','OtpList','PrivatePolicy', 'Logout'].map((text) => (
            <ListItem button key={text} onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box display="flex" justifyContent="center" mt={16}>
        <Paper elevation={4} sx={{ padding: 4, maxWidth: 500, width: '100%', backgroundColor: '#f9f9f9', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
            Admin Profile
          </Typography>
          <Box mt={3} textAlign="center">
            {isEditing ? (
              <>
                <TextField
                  label="User ID"
                  name="userid"
                  value={formData.userid || ""}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Phone Number"
                  name="phno"
                  value={formData.phno || ""}
                  onChange={handleInputChange}
                  fullWidth
                />
              </>
            ) : (
              <>
                <Typography variant="h6" sx={{ mb: 1, color: '#555' }}>
                  <strong>User ID:</strong> <span style={{ fontWeight: 400 }}>{formData.userid}</span>
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, color: '#555' }}>
                  <strong>Email:</strong> <span style={{ fontWeight: 400 }}>{formData.email}</span>
                </Typography>
                <Typography variant="h6" sx={{ color: '#555' }}>
                  <strong>Phone Number:</strong> <span style={{ fontWeight: 400 }}>{formData.phno}</span>
                </Typography>
              </>
            )}
            <Box mt={3} display="flex" justifyContent="center">
              {isEditing ? (
                <>
                  <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
                    Save
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleEditToggle}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="contained" color="primary" onClick={handleEditToggle}>
                  Edit
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default AdminProfile;
