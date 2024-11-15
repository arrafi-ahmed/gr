
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText,Paper,Grid, Typography,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";
import AccountCircle from '@mui/icons-material/AccountCircle';

function Bonus() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate  = useNavigate()
    const [currentUser, setCurrentUser] = useState("")
    const location = useLocation();
    const [error, setError] = useState('');
    const [totalAmount,setTotalAmount] = useState(0)
    const [bonusDetails,setBonusDetails] = useState([])
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
        }else
        // if(label === 'KYC'){
        //     navigate('/kyc',{ state: { userId: currentUser } })
        // }else
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


    
    useEffect(() => {
        const fetchBonusDetails = async () => {
            try {
                console.log("Fetching bonuses for user:", currentUser); // Log the user ID
                const res = await axios.get(`http://localhost:4000/getUserBonuses/${currentUser}`);
                console.log(res);
                console.log("******************");
               
                setBonusDetails(res.data.bonuses || []); // Fallback to an empty array if bonuses not foun
                setError('');
            } catch (err) {
                // Handle errors
                if (err.response) {
                    setError(err.response.data.message || 'Error fetching bonuses');
                } else if (err.request) {
                    setError('No response received from server');
                } else {
                    setError('Error: ' + err.message);
                }
                console.error('Error fetching bonuses:', err);
            }
        };
    
        fetchBonusDetails();
    }, [currentUser]);

    useEffect(() => {
        const calculatedTotal = bonusDetails.reduce((acc, item) => acc + (parseFloat(item.bonus) || 0), 0); // Ensure item.bonus is a number
        setTotalAmount(calculatedTotal); // Set totalAmount state directly
    }, [bonusDetails]); // Depend only on bonusDetails

    // Formatting the total amount as "CRD {amount}"
    const formattedTotalAmount = `CRD ${totalAmount.toFixed(0)}`;

  
   

    
    return (
        <>
              <AppBar  position="fixed" sx={{ width: '100vw', overflow: 'hidden' }}>
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
            <Box component={Paper} p={2} className="styled-container" mt={10}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'left' }}>Transaction Id</th>
                            <th style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'left' }}>UserId</th>
                            <th style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'left' }}>Bonus</th>
                            <th style={{padding :'12px',border:"1px solid #ccc",textAlign:"left"}}>Transaction date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bonusDetails.length > 0 ? (
                            bonusDetails.map((item, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{item.transid}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{item.userid}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{item.bonus}</td>
                                    <td style={{padding:'8px',border:"1px solid #ccc"}}>{item.date}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'center' }}>
                                    No Data Available
                                </td>
                            </tr>
                        )}
                        {bonusDetails.length > 0 && (
                            <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                                <td colSpan={2} style={{ padding: '8px', border: '1px solid #ccc' }}>Total Bonus:</td>
                                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{formattedTotalAmount}</td> {/* Display total as CRD */}
                            </tr>
                        )}
            </tbody>

            </table>
            </Box>

        </>
    );
};

export default Bonus;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Typography, Paper } from '@mui/material';
// import { Bounce } from 'react-toastify';

// const Bonus = ({ userid }) => {
//     const [referralDetails, setReferralDetails] = useState(null);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchReferralDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:4000/referral-details/${userid}`);
//                 setReferralDetails(response.data.data);
//             } catch (err) {
//                 console.error('Error fetching referral details:', err);
//                 setError(err.response?.data?.error || 'An error occurred while fetching details.');
//             }
//         };

//         fetchReferralDetails();
//     }, [userid]);

//     if (error) {
//         return <Typography color="error">{error}</Typography>;
//     }

//     if (!referralDetails) {
//         return <Typography>Loading referral details...</Typography>;
//     }

//     return (
//         <Container>
//             <Paper sx={{ padding: 2 }}>
//                 <Typography variant="h6">Referral Details</Typography>
//                 <Typography variant="body1">Referrer: {referralDetails.referrer.userid} ({referralDetails.referrer.email})</Typography>
//                 <Typography variant="body1">Referrer Phone: {referralDetails.referrer.phno}</Typography>
//                 <Typography variant="body1">Referrer of Referrer: {referralDetails.referrerOfReferrer.userid} ({referralDetails.referrerOfReferrer.email})</Typography>
//                 <Typography variant="body1">Referrer of Referrer Phone: {referralDetails.referrerOfReferrer.phno}</Typography>
//                 <Typography variant="body1">Referrer of Referrer of Referrer: {referralDetails.referrerOfReferrerOfReferrer.userid} ({referralDetails.referrerOfReferrerOfReferrer.email})</Typography>
//                 <Typography variant="body1">Referrer of Referrer of Referrer Phone: {referralDetails.referrerOfReferrerOfReferrer.phno}</Typography>
//             </Paper>
//         </Container>
//     );
// };

// export default Bounce;

