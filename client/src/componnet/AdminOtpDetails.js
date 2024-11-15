

// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import moment from 'moment';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import AccountCircle from '@mui/icons-material/AccountCircle';
// // import { TextField, Button, Typography, Box, Paper, Select, MenuItem, FormControl, InputLabel, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

// // const OtpList= () => {
// //     const [drawerOpen, setDrawerOpen] = useState(false);
// //     const navigate = useNavigate();
// //     const [formData,setformdata] = useState([])
// //     const [currentUser, setCurrentUser] = useState("")
// //     const location = useLocation();
// //     const { userId } = location.state || {};
// //     console.log(userId);
  
// //     useEffect(() => {
// //       if (userId) {
// //         setCurrentUser(userId); // Set the current user
// //     } else {
// //         console.error('User ID not found in state');
// //         // Handle case where userId is not available (e.g., redirect or show a message)
// //     }
// //     }, [userId])
  
// //     const handleDrawerToggle = () => {
// //         setDrawerOpen(!drawerOpen);
// //       };

// //       const handleMenuClick = (menuItem) => {
// //         if(menuItem === "Add Shop"){
// //           // navigate('/bonus', { state: finalBonus })
// //           navigate('/addShop',{ state: { userId: currentUser } })
// //         }else 
// //         if(menuItem === "Shop List"){
// //           // navigate('/bonus', { state: finalBonus })
// //           navigate('/shopList',{ state: { userId: currentUser } })
// //         }else
// //         if(menuItem === "Customer List"){
// //           // navigate('/bonus', { state: finalBonus })
// //           navigate('/customerList',{ state: { userId: currentUser } })
// //         }else
// //         if(menuItem === "Update Product"){
// //           // navigate('/bonus', { state: finalBonus })
// //           navigate('/updateProducts',{ state: { userId: currentUser } })
// //         }
// //         if(menuItem === "Add Product"){
// //           // navigate('/bonus', { state: finalBonus })
// //           navigate('/addToProduct',{ state: { userId: currentUser } })
// //         }else
// //         if(menuItem === "Logout"){
// //           // navigate('/bonus', { state: finalBonus })
// //           navigate('/adminLogout',{ state: { userId: currentUser } })
// //         }else
// //         if(MenuItem === "OtpList"){
// //             navigate('/adminOtpDetails',{state:{userId:currentUser}})
// //         }
        
        
// //       };


// //       useEffect(()=>{
// //         const fetchDetails=async()=>{
// //             const responce =  await axios.get(process.env.REACT_APP_API_BASE_URL + '/otpListData')
// //             console.log(responce.data);
// //             setformdata(responce.data)
            

// //         }
// //         fetchDetails()
// //       },[])

// //     return (
// //     <>
// //             <AppBar position="static">
// //         <Toolbar>
// //           <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
// //             <MenuIcon />
// //           </IconButton>
// //           <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
// //             {['Add Shop','Shop List','Customer List','Update Product','Add Product','OtpList','Logout'].map((label) => (
// //               <p key={label} style={{ marginRight: "100px" ,cursor:"pointer"}} onClick={() => handleMenuClick(label)}>
// //                 {label}
// //               </p>
// //             ))}
// //           </Box>
// //           <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
// //             <IconButton color="inherit"
// //              	onClick={() => navigate('/adminProfile', { state: { userId: currentUser } })}>
// //                 <AccountCircle />
// //             </IconButton>
// //             <Typography variant="body1" color="inherit" sx={{ marginRight: 1, }}>
// //                 {currentUser || 'Username'} {/* Replace 'Username' with actual user name */}
// //             </Typography>
// //         </Box>
// //         </Toolbar>
// //       </AppBar>
// //       <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
// //         <List>
// //           {['Add Shop','Shop List','Customer List','Update Product','Add Product','OtpList','Logout'].map((text) => (
// //             <ListItem button key={text} onClick={() => handleMenuClick(text)}>
// //               <ListItemText primary={text} />
// //             </ListItem>
// //           ))}
// //         </List>
// //       </Drawer>
// //       <Box mt={2}>
// //             <TableContainer component={Paper} style={{ maxHeight: '570px' }}>
// //                 <Table stickyHeader>
// //                     <TableHead>
// //                         <TableRow>  
// //                             <TableCell style={{fontWeight:"bold"}}>Id</TableCell>
// //                             <TableCell style={{fontWeight:"bold"}}>Phone Number</TableCell>
// //                             <TableCell style={{fontWeight:"bold"}}>OTP</TableCell>
                            
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {formData.map((customer, index) => (
// //                             <TableRow key={index}>
// //                                 <TableCell>{customer.id}</TableCell>
// //                                 <TableCell>{customer.phoneNumber}</TableCell>
// //                                 <TableCell>{customer.otp}</TableCell>  
// //                             </TableRow>
// //                         ))}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>
// //         </Box>
    
// //     </>
// //     );
// // };

// // export default OtpList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import moment from 'moment';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useLocation, useNavigate } from 'react-router-dom';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import { TextField, Button, Typography, Box, Paper, Select, MenuItem, FormControl, InputLabel, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const OtpList = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState([]);
//   const [currentUser, setCurrentUser] = useState('');
//   const location = useLocation();
//   const { userId } = location.state || {};

//   useEffect(() => {
//     if (userId) {
//       setCurrentUser(userId); // Set the current user
//     } else {
//       console.error('User ID not found in state');
//       // Handle case where userId is not available (e.g., redirect or show a message)
//     }
//   }, [userId]);

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleMenuClick = (menuItem) => {
//     if (menuItem === 'Add Shop') {
//       navigate('/addShop', { state: { userId: currentUser } });
//     } else if (menuItem === 'Shop List') {
//       navigate('/shopList', { state: { userId: currentUser } });
//     } else if (menuItem === 'Customer List') {
//       navigate('/customerList', { state: { userId: currentUser } });
//     } else if (menuItem === 'Update Product') {
//       navigate('/updateProducts', { state: { userId: currentUser } });
//     } else if (menuItem === 'Add Product') {
//       navigate('/addToProduct', { state: { userId: currentUser } });
//     } else if (menuItem === 'Logout') {
//       navigate('/adminLogout', { state: { userId: currentUser } });
//     } else if (menuItem === 'OtpList') {
//       navigate('/adminOtpDetails', { state: { userId: currentUser } });
//     }
//   };

//   useEffect(() => {
//     const fetchDetails = async () => {
//       const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/otpListData');
//       console.log(response.data);
//       setFormData(response.data);
//     };
//     fetchDetails();
//   }, []);

//   const handleEdit = (id) => {
//     navigate(`/editOtp/${id}`, { state: { userId: currentUser } });
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:4000/deleteOtp/${id}`);
//       alert('OTP deleted successfully');
//       setFormData(formData.filter((item) => item.id !== id)); // Remove deleted row from state
//     } catch (err) {
//       console.error('Error deleting OTP:', err);
//       alert('Failed to delete OTP');
//     }
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//             <MenuIcon />
//           </IconButton>
//           <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//             {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product', 'OtpList', 'Logout'].map((label) => (
//               <p key={label} style={{ marginRight: '100px', cursor: 'pointer' }} onClick={() => handleMenuClick(label)}>
//                 {label}
//               </p>
//             ))}
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
//             <IconButton
//               color="inherit"
//               onClick={() => navigate('/adminProfile', { state: { userId: currentUser } })}
//             >
//               <AccountCircle />
//             </IconButton>
//             <Typography variant="body1" color="inherit" sx={{ marginRight: 1 }}>
//               {currentUser || 'Username'} {/* Replace 'Username' with actual user name */}
//             </Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//         <List>
//           {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product', 'OtpList', 'Logout'].map((text) => (
//             <ListItem button key={text} onClick={() => handleMenuClick(text)}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Box mt={2}>
//         <TableContainer component={Paper} style={{ maxHeight: '570px' }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 <TableCell style={{ fontWeight: 'bold' }}>Id</TableCell>
//                 <TableCell style={{ fontWeight: 'bold' }}>Phone Number</TableCell>
//                 <TableCell style={{ fontWeight: 'bold' }}>OTP</TableCell>
//                 <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {formData.map((customer, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{customer.id}</TableCell>
//                   <TableCell>{customer.phoneNumber}</TableCell>
//                   <TableCell>{customer.otp}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleEdit(customer.id)} color="primary">
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton onClick={() => handleDelete(customer.id)} color="secondary">
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </>
//   );
// };


// export default OtpList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { IconButton, AppBar, Toolbar, Box, Drawer, List, ListItem, ListItemText, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, Typography, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const OtpList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [editingRowId, setEditingRowId] = useState(null); // Track which row is being edited
  const [editedRowData, setEditedRowData] = useState({}); // Store the edited data
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
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/otpListData');
      setFormData(response.data);
    };
    fetchDetails();
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (menuItem) => {
    if (menuItem === 'Add Shop') {
      navigate('/addShop', { state: { userId: currentUser } });
    } else if (menuItem === 'Shop List') {
      navigate('/shopList', { state: { userId: currentUser } });
    } else if (menuItem === 'Customer List') {
      navigate('/customerList', { state: { userId: currentUser } });
    } else if (menuItem === 'Update Product') {
      navigate('/updateProducts', { state: { userId: currentUser } });
    } else if (menuItem === 'Add Product') {
      navigate('/addToProduct', { state: { userId: currentUser } });
    } else if (menuItem === 'Logout') {
      navigate('/adminLogout', { state: { userId: currentUser } });
    } else if (menuItem === 'OtpList') {
      navigate('/adminOtpDetails', { state: { userId: currentUser } });
    } else
    if(menuItem ===  'PrivatePolicy'){
        navigate('/adminprivatepolicy',{state:{userId:currentUser}})
    }
  };

  const handleEdit = (id, name,phoneNumber, otp) => {
    setEditingRowId(id); // Set the row ID to be edited
    setEditedRowData({name, phoneNumber, otp }); // Set the current row data for editing
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/editOtp/${id}`, editedRowData);
      alert('OTP updated successfully');
      setEditingRowId(null); // Exit edit mode
      setFormData(formData.map((item) => (item.id === id ? { ...item, ...editedRowData } : item))); // Update the row in the state
    } catch (err) {
      console.error('Error updating OTP:', err);
      alert('Failed to update OTP');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/deleteOtp/${id}`);
      alert('OTP deleted successfully');
      setFormData(formData.filter((item) => item.id !== id)); // Remove deleted row from state
    } catch (err) {
      console.error('Error deleting OTP:', err);
      alert('Failed to delete OTP');
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
            {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product', 'OtpList', 'PrivatePolicy','Logout'].map((label) => (
              <p key={label} style={{ marginRight: '90px', cursor: 'pointer' }} onClick={() => handleMenuClick(label)}>
                {label}
              </p>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <IconButton color="inherit" onClick={() => navigate('/adminProfile', { state: { userId: currentUser } })}>
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
      <Box mt={2}>
        <TableContainer component={Paper} style={{ maxHeight: '570px',marginTop:"84px" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Id</TableCell>
                <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>OTP</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>
                    {editingRowId === customer.id ? (
                      <TextField
                        value={editedRowData.name}
                        onChange={(e) => setEditedRowData({ ...editedRowData, name: e.target.value })}
                      />
                    ) : (
                      customer.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === customer.id ? (
                      <TextField
                        value={editedRowData.phoneNumber}
                        onChange={(e) => setEditedRowData({ ...editedRowData, phoneNumber: e.target.value })}
                      />
                    ) : (
                      customer.phoneNumber
                    )}
                  </TableCell>
                 
                  <TableCell>
                    {editingRowId === customer.id ? (
                      <TextField
                        value={editedRowData.otp}
                        onChange={(e) => setEditedRowData({ ...editedRowData, otp: e.target.value })}
                      />
                    ) : (
                      customer.otp
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowId === customer.id ? (
                      <Button color="primary" onClick={() => handleSave(customer.id)}>
                        Save
                      </Button>
                    ) : (
                      <IconButton onClick={() => handleEdit(customer.id,customer.name, customer.phoneNumber, customer.otp)} color="primary">
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleDelete(customer.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
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

export default OtpList;

