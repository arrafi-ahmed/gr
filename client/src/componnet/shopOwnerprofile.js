import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemText, Button, TextField, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';


const ShopOwnerprofile = () => {
    const [formdata, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state || {};

    useEffect(() => {
        if (userId) {
            setCurrentUser(userId);
        }
    }, [userId]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/shopsDetails/${currentUser}`);
                setFormData(response.data[0]);
            } catch (err) {
                console.log('Error fetching order details:', err);
            }
        };
        if (currentUser) {
            fetchOrderDetails();
        }
    }, [currentUser]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:4000/updateprofile/${formdata.shopid}`, formdata);
            setIsEditing(false);
            alert("Shop updated successfully");
        } catch (err) {
            console.log('Error updating shop data:', err);
        }
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAlerSubmit = (label) => {
        console.log(label);
        if (label === "Add inventory") {
            navigate('/shopOwnerAddProduct', { state: { userId: currentUser } });
        } else if (label === "View Order") {
            // navigate('/about');
            navigate('/updateProductsDetails', { state: { userId: currentUser } });
        } else if (label === 'Update product') {
            navigate('/shopownerUpdateproduct', { state: { userId: currentUser } })

        } else if (label === 'Logout') {
            navigate('/shopownerlogoutPage', { state: { userId: currentUser } })

        }else if(label === 'PrivatePolicy'){
            navigate('/shopOwnerPrivatePolicy',{ state: { userId: currentUser } })

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
                    {['Add inventory', 'View Order', 'Update product',  'PrivatePolicy','Logout'].map((text) => (
                        <ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
                            <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box sx={{ padding: 2,mt:"84px" }}>
                {/* <Typography variant="h4" gutterBottom>My Profile</Typography> */}
                {isEditing ? (
                    <Box>
                        <TextField label="Shop Name" name="shopname" value={formdata.shopname || ''} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Address" name="shopaddress" value={formdata.shopaddress || ''} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Contact" name="shopcontactnum" value={formdata.shopcontactnum || ''} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Pincode" name="shoppin" value={formdata.shoppin || ''} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Delivery Time From" name="deliverytimefrom" value={formdata.deliverytimefrom || ''} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Delivery Time To" name="deliverytimeto" value={formdata.deliverytimeto || ''} onChange={handleChange} fullWidth margin="normal" />
                        <Box mt={2}>
                            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                            <Button variant="outlined" color="secondary" onClick={handleEditToggle} sx={{ ml: 2 }}>Cancel</Button>
                        </Box>
                    </Box>
                ) : (
                   

// Inside your component render:
<Box display="flex" justifyContent="center" mt={4}>
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 500, width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center">
             Shop Profile
        </Typography>
        <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item xs={4}>
                <Typography variant="h6" color="textSecondary">
                    Shop Name:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6">
                    {formdata.shopname}
                </Typography>
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h6" color="textSecondary">
                    Address:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6">
                    {formdata.shopaddress}
                </Typography>
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h6" color="textSecondary">
                    Contact:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6">
                    {formdata.shopcontactnum}
                </Typography>
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h6" color="textSecondary">
                    Pincode:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6">
                    {formdata.shoppin}
                </Typography>
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h6" color="textSecondary">
                    Delivery Time:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6">
                    {formdata.deliverytimefrom} to {formdata.deliverytimeto}
                </Typography>
            </Grid>
        </Grid>

        <Box display="flex" justifyContent="center" mt={3}>
            <Button variant="contained" color="primary" onClick={handleEditToggle}>
                Change Profile 
            </Button>
        </Box>
    </Paper>
</Box>

                )}
            </Box>
        </>
    );
};

export default ShopOwnerprofile;
