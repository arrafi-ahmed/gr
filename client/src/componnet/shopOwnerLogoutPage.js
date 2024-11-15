

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { TextField, Button, Typography, Box, Paper, Select, MenuItem, FormControl, InputLabel, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';

// const ShopOwnerLogoutPage = () => {
 
//     const [currentUser, setCurrentUser] = useState("");
//     const [drawerOpen, setDrawerOpen] = useState(false)
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { userId, rendomId } = location.state || {};
 


//     useEffect(() => {
//         if (userId) {
//             setCurrentUser(userId);
//         } else {
//             console.error('User ID not found in state');
//         }
//     }, [userId]);

   
 

 
    


//     const handleDrawerToggle = () => {
//         setDrawerOpen(!drawerOpen);
//     };

//       const handleAlerSubmit = (label) => {
//         console.log(label);
//         if (label === "Add inventory") {
//             navigate('/shopOwnerAddProduct', { state: { userId: currentUser } });
//         } else if (label === "View Order") {
//             // navigate('/about');
//             navigate('/updateProductsDetails', { state: { userId: currentUser } });
//         }else if(label === 'Update product'){
//             navigate('/shopownerUpdateproduct',{ state: { userId: currentUser } })

//         }else if(label === 'Logout'){
//             navigate('/shopownerlogoutPage',{ state: { userId: currentUser } })

//         }   
//     };

//     console.log(currentUser);
    

//     return (
//     <>
//      <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//                         <MenuIcon />
//                     </IconButton>
//                     <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//                         {['Add inventory','View Order','Update product','Logout'].map((label) => (
//                             <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 20px', fontSize: "13px" }}>{label}</Button>
//                         ))}
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//             <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//                 <List className="drawer">
//                     {['Add inventory','View Order','Update product','Logout'].map((text) => (
//                         <ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
//                             <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>
     
          
//     </>
//     );
// };

// export default ShopOwnerLogoutPage;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper, Select, MenuItem, FormControl, InputLabel, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, FormControlLabel, Checkbox } from '@mui/material';

const ShopOwnerLogoutPage = () => {
    const [currentUser, setCurrentUser] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { userId, rendomId } = location.state || {};
    const [logoutConfirmed, setLogoutConfirmed] = useState(false); // State for checkbox

    useEffect(() => {
        if (userId) {
            setCurrentUser(userId);
        } else {
            console.error('User ID not found in state');
        }
    }, [userId]);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleCheckboxChange = (event) => {
        setLogoutConfirmed(event.target.checked);
        if (event.target.checked) {
          navigate('/',); // Redirect to login page when checkbox is checked
        }
      };

    const handleAlerSubmit = (label) => {
        console.log(label);
        if (label === "Add inventory") {
            navigate('/shopOwnerAddProduct', { state: { userId: currentUser } });
        } else if (label === "View Order") {
            navigate('/updateProductsDetails', { state: { userId: currentUser } });
        } else if (label === 'Update product') {
            navigate('/shopownerUpdateproduct', { state: { userId: currentUser } });
        } else if (label === 'Logout') {
            navigate('/shopownerlogoutPage', { state: { userId: currentUser } });
        }  else if(label === 'PrivatePolicy'){
            navigate('/shopOwnerPrivatePolicy',{ state: { userId: currentUser } })

        } 
    };

    const handleFeedbackSubmit = () => {
        console.log("Feedback submitted:", feedback);
        // Here, you could make a POST request to save feedback to the backend
        alert("Thank you for your feedback!");
        setFeedback(""); // Clear feedback after submission
        navigate('/'); // Redirect to homepage or another page after logout
    };

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
            <Typography variant="body1" color="inherit" sx={{ marginRight: 1, }}>
                {currentUser || 'Username'} {/* Replace 'Username' with actual user name */}
            </Typography>
        </Box>
    </Toolbar>
</AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <List className="drawer">
                    {['Add inventory', 'View Order', 'Update product', 'PrivatePolicy', 'Logout'].map((text) => (
                        <ListItem button key={text} onClick={handleDrawerToggle} className="list-item">
                            <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box>
        <div>
          <Paper style={{ padding: '20px', maxWidth: '100%', textAlign: 'center' }} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Full height of the viewport
            // padding: '20px',
          }}>
            <Typography variant="h4" gutterBottom>
              Thank you for using our app!
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={logoutConfirmed}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Logout and go to login page"
            />
            <Box mt={2}>
              <Typography variant="body2">
                If you have any feedback or suggestions, please let us know!
              </Typography>
            </Box>
          </Paper>
        </div>
      </Box>
        </>
    );
};

export default ShopOwnerLogoutPage;

