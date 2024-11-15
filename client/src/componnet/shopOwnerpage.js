



import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Paper, Grid, Checkbox, FormControlLabel, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function ShopOwnerPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState("");
    const location = useLocation();
    const { userId } = location.state || {};
    
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
        if (label === "Add product") {
            // navigate('/bonus');
            navigate('/shopOwnerAddProduct', { state: { userId: currentUser } });
        } else if (label === "Update Delivery") {
            // navigate('/about');
            navigate('/updateProductsDetails', { state: { userId: currentUser } });
        }else if(label === 'Update product'){
            navigate('/shopownerUpdateproduct',{ state: { userId: currentUser } })

        }else if(label === 'Logout'){
            navigate('/shopownerlogoutPage',{ state: { userId: currentUser } })

        } 
    };

 

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        {['Add product','Update Delivery'].map((label) => (
                            <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 20px', fontSize: "13px" }}>{label}</Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <List className="drawer">
                    {['Add product','Update Delivery'].map((text) => (
                        <ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
                            <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            
        </>
    );
};

export default ShopOwnerPage;
