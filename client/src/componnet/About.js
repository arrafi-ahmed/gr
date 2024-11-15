

import React, { useEffect } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { Box, Typography, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText,Grid} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';


const About = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState("")
  const location = useLocation();
  const { userId } = location.state || {};
  console.log(userId);

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
      } else
	//   if(label === 'KYC'){
	// 	  navigate('/kyc', { state: { userId: currentUser } })
	//   }else
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
					{['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel','About Us', 'Contact Us', 'PrivatePolicy', 'Logout'].map((text) => (
					<ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
						<ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
					</ListItem>
					))}
				</List>
			</Drawer>
    
			<Box id="about" padding={4} mt={8}>
				<Grid container spacing={4} style={{ marginTop: '35px' }}>
					<Grid item xs={12} md={6} style={{marginTop:"40px"}}>
						<Box display="flex" justifyContent="center" alignItems="center" height="60%">
						<img 
						src ="/images/about.jpeg"
							// src="https://media.istockphoto.com/id/459161499/photo/fresh-organic-vegetables-in-the-basket.jpg?s=2048x2048&w=is&k=20&c=RIITKs7hZZ07YFoGX_BYX1iC5JTBc5C_6-YirtMvhy8="
							alt="About Us" 
							// src='/Project_React/form/public/img/mango.jpg'
							className='imageTag'
							style={{ width: '100%', height: 'auto' }}
						/>
						</Box>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography variant="h4" component="h1" style={{ fontWeight: 'bold', marginBottom: '30px' }} className="aboutHeading">
						About Us
						</Typography>
						
						<Typography variant="body1" paragraph className="aboutText">
						
								This innovative concept was created by Mr. Sanjeev ,the founder of S2S CAPTAIN GREEN,
								a veteran of the network marketing field with over two decades of experience. 
								After analyzing why many individuals struggle to achieve significant income, 
								he developed a groundbreaking idea: earning income through daily expenses. 
								Since every household purchases vegetables and fruits almost daily, 
								his concept allows individuals to earn a share of the company's 
								profits when they buy from his shop and refer others to do the same.
						</Typography>
						<Typography variant="body1" paragraph className="aboutText">
						<span style={{fontWeight:"bold"}}>The motto:</span> Grow and let others grow!
						</Typography>
						
					</Grid>
				</Grid>
			</Box>
      </>
  );
};

export default About;

