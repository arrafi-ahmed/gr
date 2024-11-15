// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Box, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText,Paper,Grid,} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// function Logout() {
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const navigate  = useNavigate()
//     const [currentUser, setCurrentUser] = useState("")
//     const location = useLocation();
//     const { userId } = location.state || {};
//     console.log(userId);
  
//     useEffect(() => {
//       if (userId) {
//         setCurrentUser(userId); // Set the current user
//     } else {
//         console.error('User ID not found in state');
//         // Handle case where userId is not available (e.g., redirect or show a message)
//     }
//     }, [userId])
  
//     console.log(currentUser);

//     const handleDrawerToggle = () => {
//         setDrawerOpen(!drawerOpen);
//     };

//     const handleAlerSubmit = (label) => {
//         console.log(label);
//         if(label === "My Bonus"){
//           navigate('/bonus',{ state: { userId: currentUser } })
//         }else 
//         if(label === "About Us"){
//           navigate('/about',{ state: { userId: currentUser } })
//         }else
//         if(label === "Contact Us"){
//           navigate('/contact',{ state: { userId: currentUser } })
//         }else
//         if(label === 'KYC'){
//             navigate('/kyc',{ state: { userId: currentUser } })
//         }else
//         if(label === "Referrals"){
//           navigate('/refferals',{ state: { userId: currentUser } })
//         }else
//         if(label === "Product List"){
//           navigate('/product',{ state: { userId: currentUser } })
//         }else
//         if(label === "My Profile"){
//           navigate('/myprofile',{ state: { userId: currentUser } })
//         }else
//         if(label === "My Orders"){
//           navigate('/myorders',{ state: { userId: currentUser } })
//         }else
//         if(label === "Our YouTube Channel"){
//           navigate('/youtype',{ state: { userId: currentUser } })
//         }else
//         if(label === "Logout"){
//           navigate('/logout',{ state: { userId: currentUser } })
//         }
        
//     }
//     return (
//         <>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//                         <MenuIcon />
//                     </IconButton>
//                     <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//                         {['Product List', 'My Profile', 'KYC', 'My Orders', 'My Bonus', 'Referrals',  'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((label) => (
//                         <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 20px', fontSize: "13px" }}>{label}</Button>
//                         ))}
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//             <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//                 <List className="drawer">
//                 {['Product List', 'My Profile', 'KYC', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((text) => (
//                     <ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
//                     <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
//                     </ListItem>
//                 ))}
//                 </List>
//             </Drawer>
//             <div>
//                 <h1>Logout</h1>

//             </div>
          

//         </>
//     );
// };

// export default Logout;



import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Paper, Grid, Checkbox, FormControlLabel, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Logout() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState("");
    const location = useLocation();
    const { userId } = location.state || {};
    const [logoutConfirmed, setLogoutConfirmed] = useState(false); // State for checkbox

    useEffect(() => {
        if (userId) {
            setCurrentUser(userId); // Set the current user
        } else {
            console.error('User ID not found in state');
            // Handle case where userId is not available (e.g., redirect or show a message)
        }
    }, [userId]);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAlerSubmit = (label) => {
        console.log(label);
        if (label === "My Bonus") {
            navigate('/bonus', { state: { userId: currentUser } });
        } else if (label === "About Us") {
            navigate('/about', { state: { userId: currentUser } });
        } else if (label === "Contact Us") {
            navigate('/contact', { state: { userId: currentUser } });
        } else if (label === "Referrals") {
            navigate('/refferals', { state: { userId: currentUser } });
        } else if (label === "Product List") {
            navigate('/product', { state: { userId: currentUser } });
        } else if (label === "My Profile") {
            navigate('/myprofile', { state: { userId: currentUser } });
        } else if (label === "My Orders") {
            navigate('/myorders', { state: { userId: currentUser } });
        } else if (label === "Our YouTube Channel") {
            navigate('/youtype', { state: { userId: currentUser } });
        } else if (label === "Logout") {
            navigate('/logout', { state: { userId: currentUser } });
        }
    };

    const handleCheckboxChange = (event) => {
        setLogoutConfirmed(event.target.checked);
        if (event.target.checked) {
            navigate('/'); // Redirect to login page when checkbox is checked
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
                <List className="drawer">
                    {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'PrivatePolicy', 'Logout'].map((text) => (
                        <ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
                            <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div>
            <Paper style={{ padding: '20px', maxWidth: '100%', textAlign: 'center' ,marginTop:"10px"}}  sx={{
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
            {/* {currentUser && (
                <Typography variant="body1" gutterBottom>
                    Logged in as: {currentUser}
                </Typography>
            )} */}
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
                {/* <Button variant="contained" color="primary" onClick={() => navigate('/feedback')}>
                    Give Feedback
                </Button> */}
            </Box>
            {/* <Box mt={2}>
                <Typography variant="body2">
                    Follow us on social media for updates and offers!
                </Typography>
                <Button color="inherit" onClick={() => window.open('https://facebook.com', '_blank')}>Facebook</Button>
                <Button color="inherit" onClick={() => window.open('https://twitter.com', '_blank')}>Twitter</Button>
            </Box> */}
            </Paper>
            </div>
        </>
    );
};

export default Logout;
