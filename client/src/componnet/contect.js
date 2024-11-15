 import React, { useEffect, useState } from 'react';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import emailjs from 'emailjs-com';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Typography, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText,Paper,Grid,TextField} from '@mui/material';
import '../Style/style.css'


 

const Contact = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
        const [currentUser, setCurrentUser] = useState("")

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
    //   if(label === 'KYC'){
    //       navigate('/kyc',{ state: { userId: currentUser } })
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .send('service_54igpvq', 'template_61vyiln', formData, 'MgPILiBR-4sE-PfL0')
            .then(
                (result) => {
                    console.log(result.text);
                    alert('Message sent successfully!');
                    setFormData({
                        name: '',
                        email: '',
                        message: '',
                    });
                },
                (error) => {
                    console.log(error.text);
                    alert('Failed to send message. Please try again later.');
                }
            );
    };

        const handleDrawerToggle = () => {
      setDrawerOpen(!drawerOpen);
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
                <List>
                    {['Product List', 'My Profile', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us',  'PrivatePolicy','Logout'].map((text) => (
                        <ListItem button key={text} onClick={() => handleAlerSubmit(text)}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        <Box padding={4} id="contact" mt={9}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <div>
                        <h1 style={{ color: 'black', fontWeight: 'bolder' }}>Get In Touch</h1>
                    </div>
                    <Typography style={{ marginBottom: '40px' }}>
                        Sit vulputate faucibus eget eget scelerisque faucibus malesuada nullam mollis ut montes, dui
                        scelerisque ornare
                    </Typography>
                    <div>
                        <IconButton>
                            <FmdGoodIcon style={{ color: 'green' }} />
                        </IconButton>
                        <span className="contectH1">VISIT US</span>
                        <p style={{ fontWeight: 'bold' }}>F4, Sri nivedha flats, Bharath nager extn, Menambedu Chennai-600053</p>
                    </div>
                    <div>
                        <IconButton>
                            <CallIcon style={{ color: 'green' }} />
                        </IconButton>
                        <span className="contectH1">CALL US</span>
                        <p style={{ fontWeight: 'bold' }}>8072021896</p>
                    </div>
                    <div>
                        <IconButton>
                            <EmailIcon style={{ color: 'green' }} />
                        </IconButton>
                        <span className="contectH1">EMAIL US</span>
                        <p style={{ fontWeight: 'bold' }}>s2scaptiongreen@gmail.com</p>
                    </div>
                    <h2 style={{ fontFamily: 'math' }}>Follow Us</h2>
                    <div>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <IconButton>
                                <InstagramIcon />
                            </IconButton>
                        </a>
                        <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
                            <IconButton>
                                <PinterestIcon />
                            </IconButton>
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <IconButton>
                                <FacebookIcon />
                            </IconButton>
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <IconButton>
                                <YouTubeIcon />
                            </IconButton>
                        </a>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontFamily: 'emoji', marginBottom: '40px' }}>Drop us a line or two</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '20px' }}>
                                <label htmlFor="name">NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Name"
                                    style={{ width: '100%', marginBottom: '10px', height: '40px' }}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label htmlFor="email">EMAIL</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Email"
                                    style={{ width: '100%', marginBottom: '10px', height: '40px' }}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label htmlFor="message">MESSAGE</label>
                                <textarea
                                    name="message"
                                    required
                                    placeholder="Enter your message"
                                    style={{ width: '100%', height: '100px' }}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Box>
       </>
    );
};

export default Contact;


// import React, { useEffect, useState } from 'react';
// import FmdGoodIcon from '@mui/icons-material/FmdGood';
// import CallIcon from '@mui/icons-material/Call';
// import EmailIcon from '@mui/icons-material/Email';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import PinterestIcon from '@mui/icons-material/Pinterest';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import emailjs from 'emailjs-com';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Box, Typography, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText,Paper,Grid,TextField} from '@mui/material';

// const Contact = () => {
//     const location = useLocation();
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         message: '',
//     });
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const navigate = useNavigate()
//     const [currentUser, setCurrentUser] = useState("")

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
//       setDrawerOpen(!drawerOpen);
//     };
  
//     const handleAlerSubmit = (label) => {
//       console.log(label);
//       if(label === "My Bonus"){
//         navigate('/bonus',{ state: { userId: currentUser } })
//       }else 
//       if(label === "About Us"){
//         navigate('/about',{ state: { userId: currentUser } })
//       }else
//       if(label === "Contact Us"){
//         navigate('/contact',{ state: { userId: currentUser } })
//       }else
//       if(label === 'KYC'){
//           navigate('/kyc',{ state: { userId: currentUser } })
//       }else
// 	  if(label === "Referrals"){
// 		navigate('/refferals',{ state: { userId: currentUser } })
// 	  }else
// 	  if(label === "Product List"){
// 		navigate('/product',{ state: { userId: currentUser } })
// 	  }else
// 	  if(label === "My Profile"){
// 		navigate('/myprofile',{ state: { userId: currentUser } })
// 	  }else
// 	  if(label === "My Orders"){
// 		navigate('/myorders',{ state: { userId: currentUser } })
// 	  }else
// 	  if(label === "Our YouTube Channel"){
// 		navigate('/youtype',{ state: { userId: currentUser } })
// 	  }else
// 	  if(label === "Logout"){
// 		navigate('/logout',{ state: { userId: currentUser } })
// 	  }
      
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
//             .then((result) => {
//                 console.log(result.text);
//                 alert('Message sent successfully!');
//                 setFormData({
//                     name: '',
//                     email: '',
//                     message: '',
//                 });
//             }, (error) => {
//                 console.log(error.text);
//                 alert('Failed to send message. Please try again later.');
//             });
//     };

//     return (
//        <>
//          <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
//             <MenuIcon />
//           </IconButton>
//           <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
//             {['Product List', 'My Profile', 'KYC', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((label) => (
//               <Button key={label} onClick={() => { handleAlerSubmit(label) }} color="inherit" style={{ margin: '0 20px', fontSize: "13px" }}>{label}</Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//         <List className="drawer">
//           {['Product List', 'My Profile', 'KYC', 'My Orders', 'My Bonus', 'Referrals', 'Our YouTube Channel', 'About Us', 'Contact Us', 'Logout'].map((text) => (
//             <ListItem button key={text} onClick={handleDrawerToggle} className="list-item" >
//               <ListItemText primary={text} className="list-item-text" onClick={() => { handleAlerSubmit(text) }} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//         <Box padding={4} id="contact" >
//             <Grid container spacing={4} >
//                 <Grid item xs={12} md={6}>
//                     <div>
//                         <h1 style={{ color: "black", fontWeight: "bolder" }}>Get In Touch</h1>
//                     </div>
//                     <Typography style={{ marginBottom: "40px" }}>
//                         Sit vulputate faucibus eget eget scelerisque faucibus malesuada
//                         nullam mollis ut montes, dui scelerisque ornare
//                     </Typography>
//                     <div>
//                         <IconButton><FmdGoodIcon style={{ color: "green" }} /></IconButton>
//                         <span className="contectH1">VISIT US</span>
//                         <p style={{fontWeight:"bold"}}>F4,Sri nivedha flats,Bharath nager extn,Menambedu Chennai-600053</p>
//                     </div>
//                     <div>
//                         <IconButton><CallIcon style={{ color: "green" }} /></IconButton>
//                         <span className="contectH1">CALL US</span>
//                         <p  style={{fontWeight:"bold"}}>8072021896</p>
//                     </div>
//                     <div>
//                         <IconButton><EmailIcon style={{ color: "green" }} /></IconButton>
//                         <span className="contectH1">EMAIL US</span>
//                         <p style={{fontWeight:"bold"}}>mail@example.com</p>
//                     </div>
//                     <h2 style={{ fontFamily: "math" }}>Follow Us</h2>
//                     <div>
//                         <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
//                             <IconButton><InstagramIcon /></IconButton>
//                         </a>
//                         <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
//                             <IconButton><PinterestIcon /></IconButton>
//                         </a>
//                         <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
//                             <IconButton><FacebookIcon /></IconButton>
//                         </a>
//                         <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
//                             <IconButton><YouTubeIcon /></IconButton>
//                         </a>
//                     </div>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <div style={{ marginBottom: "20px" }}>
//                         <h3 style={{ fontFamily: 'emoji', marginBottom: "40px" }}>Drop us a line or two</h3>
//                         <form action='https://formsubmit.co/muthulakshmimk8@gmail.com' method='POST'>
//                             <div style={{ marginBottom: "20px" }}>
//                                 <label htmlFor="name">NAME</label>
//                                 <input
//                                     type='text'
//                                     name='name'
//                                     required
//                                     placeholder='Name'
//                                     style={{ width: '100%', marginBottom: "10px",height:"40px"}}
//                                 />
//                             </div>
//                             <div style={{ marginBottom: "20px" }}>
//                                 <label htmlFor="email">EMAIL</label>
//                                 <input
//                                     type='email'
//                                     name='email'
//                                     required
//                                     placeholder='Email'
//                                     style={{ width: '100%', marginBottom: "10px",height:"40px" }}
//                                 />
//                             </div>
//                             <div style={{ marginBottom: "20px" }}>
//                                 <label htmlFor="msg">MESSAGE</label>
//                                 <textarea
//                                     name='msg'
//                                     required
//                                     placeholder='Enter your message'
//                                     style={{ width: '100%', rows: '5' }}
//                                 />
//                             </div>
//                             <button type='submit' style={{
//                                     cursor: 'pointer', 
//                                     backgroundColor: '#007bff', // Primary color
//                                     color: 'white', 
//                                     padding: '10px 20px', 
//                                     border: 'none', 
//                                     borderRadius: '5px', 
//                                     fontSize: '16px', 
//                                     transition: 'background-color 0.3s'
//                                 }}
//                                 onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'} // Darker shade on hover
//                                 onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'} // Reset on mouse out
//                             >
//                                 Submit
//                             </button>
//                             {/* <Button type='submit' variant='contained'>Submit</Button> */}
//                         </form>
//                     </div>
//                 </Grid>
              
//             </Grid>
//         </Box>
//        </>
//     );
// };

// export default Contact;
