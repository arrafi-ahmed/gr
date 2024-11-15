


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Paper, Grid, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

function PrivatePolicyAdmin() {
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
      }
      else
      if(menuItem ===  'PrivatePolicy'){
          navigate('/adminprivatepolicy',{state:{userId:currentUser}})
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
          <p key={label} style={{ marginRight: "90px", cursor: "pointer" }} onClick={() => handleMenuClick(label)}>
            {label}
          </p>
        ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
        <IconButton color="inherit" 	onClick={() => navigate('/adminProfile', { state: { userId: currentUser } })}>
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
                {['Add Shop', 'Shop List', 'Customer List', 'Update Product', 'Add Product','OtpList', 'PrivatePolicy', 'Logout'].map((text) => (
                    <ListItem button key={text} onClick={() => handleMenuClick(text)}>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
            </Drawer>

      

        <Box sx={{ padding: 2, marginTop: '80px' }}>
            <Paper sx={{ padding: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    S2S website is owned by s2scaptaingreen, which is a data controller of your personal data.
                </Typography>
                <Typography variant="body1" paragraph>
                    We have adopted this Privacy Policy, which determines how we are processing the information collected by S2S, which also provides the reasons why we must collect certain personal data about you. Therefore, you must read this Privacy Policy before using S2S website.
                </Typography>
                <Typography variant="body1" paragraph>
                    We take care of your personal data and undertake to guarantee its confidentiality and security.
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Personal Information We Collect
                </Typography>
                <Typography variant="body1" paragraph>
                    When you visit the S2S, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the installed cookies on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products you view, what websites or search terms referred you to the Site, and how you interact with the Site. We refer to this automatically-collected information as “Device Information.” Moreover, we might collect the personal data you provide to us (including but not limited to Name, Surname, Address, payment information, etc.) during registration to be able to fulfill the agreement.
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Why Do We Process Your Data?
                </Typography>
                <Typography variant="body1" paragraph>
                    Our top priority is customer data security, and, as such, we may process only minimal user data, only as much as it is absolutely necessary to maintain the website. Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding website usage. This statistical information is not otherwise aggregated in such a way that it would identify any particular user of the system.
                </Typography>
                <Typography variant="body1" paragraph>
                    You can visit the website without telling us who you are or revealing any information, by which someone could identify you as a specific, identifiable individual. If, however, you wish to use some of the website’s features, or you wish to receive our newsletter or provide other details by filling a form, you may provide personal data to us, such as your email, first name, last name, city of residence, organization, telephone number. You can choose not to provide us with your personal data, but then you may not be able to take advantage of some of the website’s features. For example, you won’t be able to receive our Newsletter or contact us directly from the website.
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Your Rights
                </Typography>
                <Typography variant="body1" paragraph>
                    If you are a European resident, you have the following rights related to your personal data:
                    <ul>
                        <li>The right to be informed.</li>
                        <li>The right of access.</li>
                        <li>The right to rectification.</li>
                        <li>The right to erasure.</li>
                        <li>The right to restrict processing.</li>
                        <li>The right to data portability.</li>
                        <li>The right to object.</li>
                        <li>Rights in relation to automated decision-making and profiling.</li>
                    </ul>
                </Typography>
                <Typography variant="body1" paragraph>
                    If you would like to exercise these rights, please contact us through the contact information below.
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Links to Other Websites
                </Typography>
                <Typography variant="body1" paragraph>
                    Our website may contain links to other websites that are not owned or controlled by us. Please be aware that we are not responsible for such other websites or third parties' privacy practices. We encourage you to be aware when you leave our website and read the privacy statements of each website that may collect personal information.
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Information Security
                </Typography>
                <Typography variant="body1" paragraph>
                    We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We keep reasonable administrative, technical, and physical safeguards to protect against unauthorized access, use, modification, and personal data disclosure in its control and custody. However, no data transmission over the Internet or wireless network can be guaranteed.
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Legal Disclosure
                </Typography>
                <Typography variant="body1" paragraph>
                    We will disclose any information we collect, use or receive if required or permitted by law, such as to comply with a subpoena or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Contact Information
                </Typography>
                <Typography variant="body1" paragraph>
                    If you would like to contact us to understand more about this Policy or wish to contact us concerning any matter relating to individual rights and your Personal Information, you may send an email to <a href="mailto:godwinaraj@gmail.com">godwinaraj@gmail.com</a>.
                </Typography>
            </Paper>
        </Box>
    </>
        
    )
}

export default PrivatePolicyAdmin;

