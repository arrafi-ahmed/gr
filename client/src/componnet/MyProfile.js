import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText,Paper,Grid, Grid2, TextField, Typography,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";
import Avatar from '@mui/material/Avatar'; // Add this line to import Avatar
import AccountCircle from '@mui/icons-material/AccountCircle';


function MyProfile() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate  = useNavigate()
    const [currentUser, setCurrentUser] = useState("")
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(null);
    const [personalDetails, setPersonalDetails] = useState({
      email: '',
      userid: '',
      phno: '',
      useraddress: "",
      userpincode: "",
  });
    const { userId } = location.state || {};
    console.log(userId);
    const handleEditToggle = () => {
      setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/customer/${currentUser}`);
            setFormData(response.data);
            setPersonalDetails({
                email: response.data.email,
                userid: response.data.userid,
                phno: response.data.phno,
                userpincode: response.data.userpincode,
                useraddress: response.data.useraddress,
            });
        } catch (err) {
            console.error(err);
        }
    };
    

    if (currentUser) {
        fetchUserDetails();
        
    }
}, [currentUser]);

  const handleSave = async () => {
    try {
        await axios.put(`http://localhost:4000/customer/${currentUser}`, personalDetails);
        setFormData({ ...formData, ...personalDetails });
        setIsEditing(false);
    } catch (err) {
        console.error('Error updating customer details:', err);
    }
};
  
    useEffect(() => {
      if (userId) {
        setCurrentUser(userId); // Set the current user
    } else {
        console.error('User ID not found in state');
        // Handle case where userId is not available (e.g., redirect or show a message)
    }
    }, [userId])
  
    console.log(currentUser);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAlerSubmit = (label) => {
        console.log(label);
        if(label === "My Bonus"){
          navigate('/bonus',{ state: { userId: currentUser } })
        }else 
        if(label === "About Us"){
          navigate('/about',{ state: { userId: currentUser } })
        }else
        if(label === "Contact Us"){
          navigate('/contact',{ state: { userId: currentUser } })
        }else
        if(label === 'KYC'){
            navigate('/kyc',{ state: { userId: currentUser } })
        }else
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
          navigate('/myorders',{ state: { userId: currentUser } })
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

    const handleChange = (e) => {
      setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
    };

    return (
        <>
              <AppBar position="fixed" sx={{ width: '100vw', overflow: 'hidden' }}>
        <Toolbar>
          <IconButton edge="start" color="red" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us',  'PrivatePolicy','Logout'].map((label) => (
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
                <List className="drawer">
                {['Product List', 'My Profile', 'KYC', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'PrivatePolicy', 'Logout'].map((text) => (
                    <ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
                    <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
            <div >
               <Grid container >
                  <Grid item  xs={12} md={12}>
                  {isEditing ? (
                     <Paper elevation={2} style={{ padding: '16px' }}>
                     <Grid container spacing={2}>
                       <Grid item xs={12} md={6}>
                         <TextField
                           label="Email"
                           name="email"
                           value={personalDetails.email}
                           onChange={handleChange}
                           margin="normal"
                           fullWidth // You can remove this to control the width better if needed
                         />
                       </Grid>
                   
                       <Grid item xs={12} md={6}>
                         <TextField
                           label="User ID"
                           name="userid"
                           value={personalDetails.userid}
                           onChange={handleChange}
                           margin="normal"
                           disabled
                           fullWidth
                         />
                       </Grid>
                   
                       <Grid item xs={12} md={6}>
                         <TextField
                           label="Phone Number"
                           name="phno"
                           value={personalDetails.phno}
                           onChange={handleChange}
                           margin="normal"
                           fullWidth
                         />
                       </Grid>
                   
                       <Grid item xs={12} md={6}>
                         <TextField
                           label="User Pincode"
                           name="userpincode"
                           value={personalDetails.userpincode}
                           onChange={handleChange}
                           margin="normal"
                           fullWidth
                         />
                       </Grid>
                   
                       <Grid item xs={12}>
                         <TextField
                           label="User Address"
                           name="useraddress"
                           value={personalDetails.useraddress}
                           onChange={handleChange}
                           margin="normal"
                           fullWidth
                         />
                       </Grid>
                   
                       <Grid item xs={12} style={{ textAlign: 'right' }}>
                         <Button 
                           onClick={handleSave} 
                           variant="contained" 
                           color="primary" 
                           style={{ marginRight: '16px' }}
                         >
                           Save
                         </Button>
                         <Button 
                           onClick={handleEditToggle} 
                           variant="outlined" 
                           color="secondary"
                         >
                           Cancel
                         </Button>
                       </Grid>
                     </Grid>
                   </Paper>
                   
                        ) : (
                        

<Grid container justifyContent="center" style={{ marginTop: '16px' }}>
{/* Profile Section with Image and Name */}
{/* <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
  <Avatar 
    alt="User Profile" 
    src={formData?.profileImage} // Assuming you have a profile image in formData
    style={{ 
      width: '120px', 
      height: '120px', 
      margin: '0 auto', 
      borderRadius: '50%', 
      border: '4px solid #4CAF50', // Thicker border for better focus
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' // Adding subtle shadow to give depth
    }} 
  />
  <Typography 
    variant="h5" 
    style={{ 
      marginTop: '16px', 
      fontWeight: '600',
      fontFamily: 'Arial',
      color: '#333'
    }}
  >
    {formData?.username} {/* Display the user's name */}
  {/* </Typography>
</Grid> */} 

{/* User Details Section */}
<Grid item xs={12} md={6}>
  <Paper 
    elevation={3} 
    style={{ 
      padding: '24px', 
      marginTop: '24px', 
      backgroundColor: '#f9f9f9', 
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' 
    }}
  >
    <Typography 
      variant="h6" 
      style={{ 
        color: '#4CAF50', 
        marginBottom: '12px', 
        fontWeight: 'bold'
      }}
      gutterBottom
    >
      Person Information
    </Typography>
    <Typography variant="body1" style={{ marginBottom: '8px' }}>
      <strong>Email:</strong> {formData?.email}
    </Typography>
    <Typography variant="body1" style={{ marginBottom: '8px' }}>
      <strong>User ID:</strong> {formData?.userid}
    </Typography>
    <Typography variant="body1" style={{ marginBottom: '8px' }}>
      <strong>Phone Number:</strong> {formData?.phno}
    </Typography>
    <Typography variant="body1" style={{ marginBottom: '8px' }}>
      <strong>User Address:</strong> {formData?.useraddress}
    </Typography>
    <Typography variant="body1" style={{ marginBottom: '8px' }}>
      <strong>User Pincode:</strong> {formData?.userpincode}
    </Typography>
    <Button 
      onClick={handleEditToggle} 
      variant="contained" 
      color="primary" 
      style={{ marginTop: '16px',justifyContent:"center", display:'flex' }}
    >
      Edit
    </Button>
  </Paper>
</Grid>
</Grid>


                        )}


                  </Grid>

               </Grid>
            </div>
          

        </>
    );
};

export default MyProfile;
